// Edge Function: send-post-newsletter
// Private endpoint — auth by the `x-newsletter-secret` header, which must
// match the NEWSLETTER_SEND_SECRET secret. Called only by
// scripts/newsletter/send-post.mjs (workflow "Newsletter — enviar artículo").
//
// The script renders the full article email (EN + ES) with two kinds of
// placeholder; this function fills them in and sends:
//   {{IMG_<n>}}         → public URL of image n, uploaded here to the
//                         `newsletter` Storage bucket (JPEG, from the script)
//   {{UNSUBSCRIBE_URL}} → each subscriber's own unsubscribe link
//
// Modes:
//   test — sends both language versions only to NEWSLETTER_TEST_TO
//          (default LEAD_NOTIFY_TO / info@), subject prefixed with [TEST].
//   send — every `subscribed` subscriber gets their language's version via
//          Resend's batch API. The unique (workspace_id, post_slug) row in
//          `newsletter_sends` guarantees an article goes out only once.
//
// Source of truth: supabase/functions/send-post-newsletter/index.ts in the website repo.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const DEFAULT_FROM = "Astratta Agency <info@astrattaagency.com>";
const DEFAULT_TEST_TO = "info@astrattaagency.com";
const DEFAULT_SITE_URL = "https://astrattaagency.com";
const BATCH_SIZE = 100; // Resend batch API limit
const BATCH_PAUSE_MS = 600; // stay under Resend's default 2 requests/second

type Language = "en" | "es";

const EmailSchema = z.object({
  subject: z.string().min(1).max(300),
  html: z.string().min(1),
  text: z.string().min(1),
});

const BodySchema = z.object({
  workspace_slug: z.string().min(1).max(200),
  post_slug: z.string().regex(/^[a-z0-9-]{1,200}$/),
  mode: z.enum(["test", "send"]),
  images: z.array(z.string().min(1)).max(30),
  emails: z.object({ en: EmailSchema, es: EmailSchema }),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

function safeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) return false;
  let diff = 0;
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i];
  return diff === 0;
}

function siteUrl(): string {
  return (Deno.env.get("SITE_URL") ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
}

/** Same URLs subscribe-newsletter puts in the welcome email. */
function unsubscribePageUrl(language: Language, token?: string): string {
  const path = language === "es" ? "/es/newsletter/baja" : "/newsletter/unsubscribe";
  return token ? `${siteUrl()}${path}?token=${encodeURIComponent(token)}` : `${siteUrl()}${path}`;
}

function oneClickUrl(token: string): string {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!.replace(/\/+$/, "");
  return `${supabaseUrl}/functions/v1/unsubscribe-newsletter?token=${encodeURIComponent(token)}`;
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ success: false, error: "method_not_allowed" }, 405);

  const expected = Deno.env.get("NEWSLETTER_SEND_SECRET");
  const provided = req.headers.get("x-newsletter-secret") ?? "";
  if (!expected || !safeEqual(provided, expected)) {
    return json({ success: false, error: "unauthorized" }, 401);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return json({ success: false, error: "resend_not_configured" }, 500);
  const from = Deno.env.get("RESEND_FROM") ?? DEFAULT_FROM;

  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return json({ success: false, error: "invalid_body", details: parsed.error.flatten() }, 400);
    }
    const data = parsed.data;

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: workspace, error: wsErr } = await admin
      .from("workspaces")
      .select("id")
      .eq("slug", data.workspace_slug)
      .maybeSingle();
    if (wsErr) return json({ success: false, error: "workspace_lookup_failed", detail: wsErr.message }, 500);
    if (!workspace) return json({ success: false, error: "workspace_not_found" }, 404);

    // Claim the article before anything goes out: the unique constraint makes
    // a second "send" (double click, re-run) fail here instead of re-mailing.
    let sendRowId: string | null = null;
    if (data.mode === "send") {
      const { data: row, error: claimErr } = await admin
        .from("newsletter_sends")
        .insert({ workspace_id: workspace.id, post_slug: data.post_slug })
        .select("id")
        .single();
      if (claimErr && claimErr.code !== "23505") {
        return json({ success: false, error: "claim_failed", detail: claimErr.message }, 500);
      }
      if (claimErr) {
        // Already claimed. Only a run that failed before mailing anyone may retry.
        const { data: prev } = await admin
          .from("newsletter_sends")
          .select("id, status, recipients")
          .eq("workspace_id", workspace.id)
          .eq("post_slug", data.post_slug)
          .single();
        if (!prev || prev.status !== "failed" || prev.recipients > 0) {
          return json({ success: false, error: "already_sent", post_slug: data.post_slug, previous: prev }, 409);
        }
        await admin.from("newsletter_sends").update({ status: "sending", error: null }).eq("id", prev.id);
        sendRowId = prev.id;
      } else {
        sendRowId = row.id;
      }
    }

    let sent = 0;
    const markFailed = async (e: unknown) => {
      if (!sendRowId) return;
      await admin
        .from("newsletter_sends")
        .update({ status: "failed", recipients: sent, error: String(e), finished_at: new Date().toISOString() })
        .eq("id", sendRowId);
    };

    try {
      // Upload images and swap their placeholders for public URLs. The version
      // query string defeats CDN caching if an article's images are re-uploaded.
      const version = Date.now();
      const imageUrls: string[] = [];
      for (let i = 0; i < data.images.length; i++) {
        const objectPath = `posts/${data.post_slug}/${i}.jpg`;
        const { error: upErr } = await admin.storage
          .from("newsletter")
          .upload(objectPath, base64ToBytes(data.images[i]), { contentType: "image/jpeg", upsert: true });
        if (upErr) throw new Error(`image_upload_failed ${i}: ${upErr.message}`);
        imageUrls.push(`${admin.storage.from("newsletter").getPublicUrl(objectPath).data.publicUrl}?v=${version}`);
      }
      const withImages = (html: string) =>
        imageUrls.reduce((acc, url, i) => acc.replaceAll(`{{IMG_${i}}}`, url), html);
      const emails = {
        en: { ...data.emails.en, html: withImages(data.emails.en.html) },
        es: { ...data.emails.es, html: withImages(data.emails.es.html) },
      };

      const personalize = (language: Language, to: string, token?: string) => {
        const e = emails[language];
        const unsubscribe = unsubscribePageUrl(language, token);
        return {
          from,
          to: [to],
          subject: token ? e.subject : `[TEST] ${e.subject}`,
          html: e.html.replaceAll("{{UNSUBSCRIBE_URL}}", unsubscribe),
          text: e.text.replaceAll("{{UNSUBSCRIBE_URL}}", unsubscribe),
          ...(token
            ? {
                headers: {
                  "List-Unsubscribe": `<${oneClickUrl(token)}>`,
                  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
                },
              }
            : {}),
        };
      };

      const sendBatch = async (batch: unknown[]) => {
        const res = await fetch("https://api.resend.com/emails/batch", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify(batch),
        });
        if (!res.ok) throw new Error(`resend_batch_failed ${res.status}: ${await res.text().catch(() => "")}`);
      };

      if (data.mode === "test") {
        const to = Deno.env.get("NEWSLETTER_TEST_TO") ?? Deno.env.get("LEAD_NOTIFY_TO") ?? DEFAULT_TEST_TO;
        await sendBatch([personalize("en", to), personalize("es", to)]);
        return json({ success: true, mode: "test", sent_to: to, images: imageUrls.length });
      }

      // mode === "send"
      const recipients: { email: string; language: Language; unsubscribe_token: string }[] = [];
      for (let offset = 0; ; offset += 1000) {
        const { data: page, error: subErr } = await admin
          .from("subscribers")
          .select("email, language, unsubscribe_token")
          .eq("workspace_id", workspace.id)
          .eq("status", "subscribed")
          .order("created_at")
          .range(offset, offset + 999);
        if (subErr) throw new Error(`subscribers_lookup_failed: ${subErr.message}`);
        recipients.push(...(page as typeof recipients));
        if (!page || page.length < 1000) break;
      }

      for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
        const batch = recipients
          .slice(i, i + BATCH_SIZE)
          .map((r) => personalize(r.language === "es" ? "es" : "en", r.email, r.unsubscribe_token));
        await sendBatch(batch);
        sent += batch.length;
        if (i + BATCH_SIZE < recipients.length) await sleep(BATCH_PAUSE_MS);
      }

      await admin
        .from("newsletter_sends")
        .update({ status: "sent", recipients: sent, finished_at: new Date().toISOString() })
        .eq("id", sendRowId);

      return json({ success: true, mode: "send", recipients: sent, images: imageUrls.length });
    } catch (e) {
      await markFailed(e);
      throw e;
    }
  } catch (e) {
    console.error("[send-post-newsletter] failed", e);
    return json({ success: false, error: "unexpected", detail: String(e) }, 500);
  }
});
