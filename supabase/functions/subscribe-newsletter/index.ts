// Edge Function: subscribe-newsletter
// Public endpoint (no auth) — receives newsletter signups from the blog
// (inline opt-in, footer opt-in, /newsletter landing).
// Upserts into `subscribers` via the service-role client (RLS blocks
// anon writes) scoped to the astratta-agency workspace. Re-subscribing
// with the same email flips status back to 'subscribed'.
//
// Sends a welcome email through Resend to new (or returning) subscribers,
// in the language they signed up in. Every email carries the subscriber's
// unsubscribe link plus RFC 8058 List-Unsubscribe headers (one-click
// unsubscribe, handled by the `unsubscribe-newsletter` function).
// Email failure never blocks the signup.
//
// Source of truth: supabase/functions/subscribe-newsletter/index.ts in the website repo.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEFAULT_FROM = "Astratta Agency <info@astrattaagency.com>";
const DEFAULT_SITE_URL = "https://astrattaagency.com";

const BodySchema = z.object({
  workspace_slug: z.string().min(1).max(200),
  email: z.string().trim().email().max(255),
  interest_tag: z.string().trim().max(100).optional().nullable(),
  source_page: z.string().trim().max(100).optional().nullable(),
  language: z.enum(["en", "es"]).optional().nullable(),
  recaptcha_token: z.string().trim().min(1).optional().nullable(),
  honeypot: z.string().optional().nullable(),
});

type Language = "en" | "es";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// reCAPTCHA v3 verification. Only enforced when RECAPTCHA_SECRET_KEY is
// configured — same secret already used by capture-lead.
async function verifyRecaptcha(token: string | null | undefined): Promise<{ ok: boolean; reason?: string }> {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) return { ok: true };
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

// Copy approved by the owner — registered in docs/COPY-PENDIENTE.md (bloque L).
const WELCOME_COPY: Record<Language, { subject: string; greeting: string; body: string; outro: string; unsubscribe: string }> = {
  en: {
    subject: "You're in — welcome to Astratta",
    greeting: "Hi!",
    body: "Thanks for subscribing. You'll get our web, marketing, and design breakdowns — no spam.",
    outro: "If you ever want out, one click:",
    unsubscribe: "Unsubscribe",
  },
  es: {
    subject: "Ya estás dentro — bienvenido a Astratta",
    greeting: "¡Hola!",
    body: "Gracias por suscribirte. Vas a recibir nuestros análisis de web, marketing y diseño — sin spam.",
    outro: "Si algún día quieres salir, un clic:",
    unsubscribe: "Cancelar suscripción",
  },
};

/** The site page that confirms the unsubscribe — kept in sync with ROUTE_DEFS.newsletterUnsubscribe. */
function unsubscribePageUrl(language: Language, token: string): string {
  const site = (Deno.env.get("SITE_URL") ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
  const path = language === "es" ? "/es/newsletter/baja" : "/newsletter/unsubscribe";
  return `${site}${path}?token=${encodeURIComponent(token)}`;
}

/** RFC 8058 one-click endpoint — mail clients POST here directly from their own "Unsubscribe" button. */
function oneClickUrl(token: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!.replace(/\/+$/, "");
  return `${supabaseUrl}/functions/v1/unsubscribe-newsletter?token=${encodeURIComponent(token)}`;
}

function welcomeHtml(language: Language, unsubscribeUrl: string): string {
  const t = WELCOME_COPY[language];
  return `<!doctype html>
<html lang="${language}">
  <body style="margin:0;padding:0;background:#eaeaea;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eaeaea;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;">
            <tr>
              <td style="padding:40px;font-family:Mulish,Helvetica,Arial,sans-serif;color:#0e0e12;">
                <p style="margin:0 0 32px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5140f2;">Astratta Agency</p>
                <p style="margin:0 0 16px;font-size:22px;font-weight:700;">${t.greeting}</p>
                <p style="margin:0 0 32px;font-size:16px;line-height:1.6;">${t.body}</p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#6b6b73;">${t.outro} <a href="${unsubscribeUrl}" style="color:#5140f2;">${t.unsubscribe}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function welcomeText(language: Language, unsubscribeUrl: string): string {
  const t = WELCOME_COPY[language];
  return [t.greeting, "", t.body, "", `${t.outro} ${t.unsubscribe}: ${unsubscribeUrl}`].join("\n");
}

async function sendWelcomeEmail(to: string, language: Language, token: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.warn("[subscribe-newsletter] RESEND_API_KEY not configured — skipping welcome email");
    return;
  }

  const pageUrl = unsubscribePageUrl(language, token);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: Deno.env.get("RESEND_FROM") ?? DEFAULT_FROM,
      to: [to],
      subject: WELCOME_COPY[language].subject,
      html: welcomeHtml(language, pageUrl),
      text: welcomeText(language, pageUrl),
      headers: {
        "List-Unsubscribe": `<${oneClickUrl(token)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      tags: [{ name: "category", value: "newsletter_welcome" }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[subscribe-newsletter] Resend send failed", res.status, detail);
  }
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

    const rc = await verifyRecaptcha(data.recaptcha_token);
    if (!rc.ok) {
      console.warn("[subscribe-newsletter] recaptcha rejected", rc.reason);
      return json({ success: false, error: "recaptcha_failed" }, 400);
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

    const email = data.email.toLowerCase();
    const language: Language = data.language ?? "en";

    // Someone already subscribed who submits the form again doesn't get a
    // second welcome — only brand-new and returning (previously unsubscribed)
    // addresses do.
    const { data: existing } = await admin
      .from("subscribers")
      .select("status")
      .eq("workspace_id", workspace.id)
      .eq("email", email)
      .maybeSingle();
    const shouldWelcome = existing?.status !== "subscribed";

    const { data: row, error: upsertErr } = await admin
      .from("subscribers")
      .upsert(
        {
          workspace_id: workspace.id,
          email,
          interest_tag: data.interest_tag || null,
          source_page: data.source_page || null,
          language,
          status: "subscribed",
          unsubscribed_at: null,
        },
        { onConflict: "workspace_id,email" },
      )
      .select("unsubscribe_token")
      .single();

    if (upsertErr) {
      console.error("[subscribe-newsletter] upsert failed", upsertErr);
      return json({ success: false, error: "insert_failed", detail: upsertErr.message }, 500);
    }

    if (shouldWelcome && row?.unsubscribe_token) {
      try {
        await sendWelcomeEmail(email, language, row.unsubscribe_token);
      } catch (e) {
        console.error("[subscribe-newsletter] email error (subscriber saved)", e);
      }
    }

    return json({ success: true });
  } catch (e) {
    console.error("[subscribe-newsletter] unexpected", e);
    return json({ success: false, error: "unexpected", detail: String(e) }, 500);
  }
});
