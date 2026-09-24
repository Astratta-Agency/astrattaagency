// Edge Function: capture-lead
// Public endpoint (no auth) — receives lead submissions from:
//   1. The embedded form on app.astrattaagency.com (strict shape)
//   2. The marketing site astrattaagency.com forms: contact, diagnostic,
//      growth-score, pricing-quote (relaxed shape, but phone/company/recaptcha
//      are required whenever source_page is present — i.e. always, for the
//      marketing site).
// Inserts into `leads` via the service-role client (RLS blocks anon inserts)
// and sends a notification email to LEAD_NOTIFY_TO via Resend.
// While RESEND_API_KEY is not configured it falls back to AWS SES (legacy
// sandbox setup) so notifications never go dark during the migration.
// Email failure never blocks the lead insert.
//
// Source of truth: supabase/functions/capture-lead/index.ts in the website repo.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";
import { AwsClient } from "npm:aws4fetch@1.0.20";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEFAULT_FROM = "Astratta Agency <info@astrattaagency.com>";
const DEFAULT_NOTIFY_TO = "info@astrattaagency.com";

const BodySchema = z
  .object({
    workspace_slug: z.string().min(1).max(200),
    company_name: z.string().trim().max(255).optional().nullable(),
    contact_name: z.string().trim().min(1).max(255),
    contact_email: z.string().trim().email().max(255),
    contact_phone: z.string().trim().max(50).optional().nullable(),
    service_interest: z.string().trim().max(100).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
    // Website-form fields
    message: z.string().trim().max(2000).optional().nullable(),
    website: z.string().trim().max(255).optional().nullable(),
    metadata: z.string().trim().max(2000).optional().nullable(),
    source_page: z.string().trim().max(100).optional().nullable(),
    recaptcha_token: z.string().trim().min(1).optional().nullable(),
    referral_sources: z
      .array(z.string().trim().min(1).max(100))
      .max(20)
      .optional()
      .nullable(),
    utm_source: z.string().max(255).optional().nullable(),
    utm_medium: z.string().max(255).optional().nullable(),
    utm_campaign: z.string().max(255).optional().nullable(),
    utm_content: z.string().max(255).optional().nullable(),
    utm_term: z.string().max(255).optional().nullable(),
    honeypot: z.string().optional().nullable(),
  })
  .refine((d) => Boolean(d.notes || d.message), {
    message: "Either notes or message is required",
    path: ["message"],
  })
  // Marketing-site submissions always send source_page. For those, phone
  // and company are now required (CRM's own embedded lead form never sends
  // source_page, so it is unaffected by this rule).
  .refine((d) => !d.source_page || Boolean(d.contact_phone && d.contact_phone.trim().length > 0), {
    message: "Phone is required",
    path: ["contact_phone"],
  })
  .refine((d) => !d.source_page || Boolean(d.company_name && d.company_name.trim().length > 0), {
    message: "Company is required",
    path: ["company_name"],
  });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function deriveSource(
  utmSource: string | null | undefined,
  referralSources: string[] | null | undefined,
  isWebsiteForm: boolean,
): string {
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes("google")) return "google_ads";
    if (s.includes("facebook") || s.includes("meta") || s.includes("instagram")) return "meta_ads";
    return "other";
  }
  const joined = (referralSources ?? []).map((r) => r.toLowerCase()).join(" ");
  if (joined.includes("referido")) return "referral";
  return isWebsiteForm ? "website" : "organic";
}

const SOURCE_PAGE_LABELS: Record<string, string> = {
  "pricing-quote": "Pricing quote (quiz)",
  audit: "Free audit",
  "audit-page": "Free audit",
  contact: "Contact form",
};

// reCAPTCHA v3 verification. Only enforced when RECAPTCHA_SECRET_KEY is
// configured AND the submission includes source_page (marketing site).
// Score threshold 0.5 is Google's own recommended default.
async function verifyRecaptcha(token: string | null | undefined): Promise<{ ok: boolean; reason?: string }> {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) return { ok: true }; // not configured yet — don't block submissions
  if (!token) return { ok: false, reason: "missing_token" };

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await res.json().catch(() => null);
  if (!result?.success) return { ok: false, reason: "verify_failed" };
  if (typeof result.score === "number" && result.score < 0.5) {
    return { ok: false, reason: `low_score_${result.score}` };
  }
  return { ok: true };
}

type LeadEmail = { subject: string; text: string; replyTo: string };

async function sendViaResend(apiKey: string, email: LeadEmail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: Deno.env.get("RESEND_FROM") ?? DEFAULT_FROM,
      to: [Deno.env.get("LEAD_NOTIFY_TO") ?? DEFAULT_NOTIFY_TO],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[capture-lead] Resend send failed", res.status, detail);
  }
}

/** Legacy path — only used while RESEND_API_KEY is missing. */
async function sendViaSes(email: LeadEmail): Promise<void> {
  const accessKeyId = Deno.env.get("SES_ACCESS_KEY_ID");
  const secretAccessKey = Deno.env.get("SES_SECRET_ACCESS_KEY");
  const region = Deno.env.get("SES_REGION") ?? "us-east-1";
  const from = Deno.env.get("SES_FROM");
  const to = Deno.env.get("SES_TO");

  if (!accessKeyId || !secretAccessKey || !from || !to) {
    console.warn("[capture-lead] neither Resend nor SES configured — skipping email");
    return;
  }

  const aws = new AwsClient({ accessKeyId, secretAccessKey, region, service: "ses" });
  const res = await aws.fetch(`https://email.${region}.amazonaws.com/v2/email/outbound-emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [email.replyTo],
      Content: {
        Simple: {
          Subject: { Data: email.subject, Charset: "UTF-8" },
          Body: { Text: { Data: email.text, Charset: "UTF-8" } },
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[capture-lead] SES send failed", res.status, detail);
  }
}

async function sendLeadEmail(params: {
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  serviceInterest?: string | null;
  notes: string;
  sourcePage?: string | null;
}): Promise<void> {
  const pageLabel = params.sourcePage
    ? SOURCE_PAGE_LABELS[params.sourcePage] ?? params.sourcePage
    : "Website";

  const lines = [
    `Nuevo lead desde: ${pageLabel}`,
    "",
    `Nombre: ${params.contactName}`,
    `Email: ${params.contactEmail}`,
    params.contactPhone ? `Teléfono: ${params.contactPhone}` : null,
    params.serviceInterest ? `Interés: ${params.serviceInterest}` : null,
    "",
    "— Detalles —",
    params.notes,
    "",
    "Ver en el módulo de venta: https://app.astrattaagency.com",
  ].filter((l): l is string => l !== null);

  const email: LeadEmail = {
    subject: `🟣 Nuevo lead — ${pageLabel}: ${params.contactName}`,
    text: lines.join("\n"),
    replyTo: params.contactEmail,
  };

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) return sendViaResend(resendKey, email);
  return sendViaSes(email);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return json({ success: false, error: "invalid_body", details: parsed.error.flatten() }, 400);
    }
    const data = parsed.data;

    if (data.honeypot && data.honeypot.trim().length > 0) {
      return json({ success: true });
    }

    const isWebsiteForm = Boolean(data.source_page);
    if (isWebsiteForm) {
      const rc = await verifyRecaptcha(data.recaptcha_token);
      if (!rc.ok) {
        console.warn("[capture-lead] recaptcha rejected", rc.reason);
        return json({ success: false, error: "recaptcha_failed" }, 400);
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: workspace, error: wsErr } = await admin
      .from("workspaces")
      .select("id")
      .eq("slug", data.workspace_slug)
      .maybeSingle();
    if (wsErr) return json({ success: false, error: "workspace_lookup_failed", detail: wsErr.message }, 500);
    if (!workspace) return json({ success: false, error: "workspace_not_found" }, 404);

    const source = deriveSource(data.utm_source, data.referral_sources, isWebsiteForm);

    const notesFinal = [
      data.notes || data.message,
      data.website ? `Website del cliente: ${data.website}` : null,
      data.metadata ? `Respuestas del quiz: ${data.metadata}` : null,
      data.source_page ? `Origen: ${SOURCE_PAGE_LABELS[data.source_page] ?? data.source_page}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const serviceInterest =
      data.service_interest ??
      (data.source_page ? SOURCE_PAGE_LABELS[data.source_page] ?? data.source_page : null);

    const { error: insErr } = await admin.from("leads").insert({
      workspace_id: workspace.id,
      company_name: data.company_name?.trim() || data.contact_name,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone || null,
      service_interest: serviceInterest,
      notes: notesFinal,
      referral_sources: data.referral_sources?.length ? data.referral_sources : null,
      source,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_content: data.utm_content || null,
      utm_term: data.utm_term || null,
      stage: "lead",
      probability: 10,
    });

    if (insErr) {
      console.error("[capture-lead] insert failed", insErr);
      return json({ success: false, error: "insert_failed", detail: insErr.message }, 500);
    }

    try {
      await sendLeadEmail({
        contactName: data.contact_name,
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone,
        serviceInterest,
        notes: notesFinal,
        sourcePage: data.source_page,
      });
    } catch (e) {
      console.error("[capture-lead] email error (lead saved)", e);
    }

    return json({ success: true });
  } catch (e) {
    console.error("[capture-lead] unexpected", e);
    return json({ success: false, error: "unexpected", detail: String(e) }, 500);
  }
});
