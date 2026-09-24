// Edge Function: unsubscribe-newsletter
// Public endpoint (no auth) — the subscriber's unsubscribe_token is the
// credential. Two callers:
//   1. The site's confirmation page (/newsletter/unsubscribe, /es/newsletter/baja):
//      POST application/json { token }.
//   2. Mail clients' native "Unsubscribe" button (RFC 8058 one-click):
//      POST ?token=… with body "List-Unsubscribe=One-Click".
// GET never unsubscribes — link scanners and prefetchers would trigger it.
// Idempotent: an already-unsubscribed token still returns success.
//
// Source of truth: supabase/functions/unsubscribe-newsletter/index.ts in the website repo.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TokenSchema = z.string().trim().uuid();

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function readToken(req: Request): Promise<string | null> {
  const fromQuery = new URL(req.url).searchParams.get("token");
  if (fromQuery) return fromQuery;

  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => null);
    return typeof body?.token === "string" ? body.token : null;
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "method_not_allowed" }, 405);

  try {
    const parsed = TokenSchema.safeParse(await readToken(req));
    if (!parsed.success) return json({ success: false, error: "invalid_token" }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: subscriber, error: findErr } = await admin
      .from("subscribers")
      .select("id, status")
      .eq("unsubscribe_token", parsed.data)
      .maybeSingle();
    if (findErr) return json({ success: false, error: "lookup_failed", detail: findErr.message }, 500);
    if (!subscriber) return json({ success: false, error: "not_found" }, 404);

    if (subscriber.status !== "unsubscribed") {
      const { error: updErr } = await admin
        .from("subscribers")
        .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
        .eq("id", subscriber.id);
      if (updErr) {
        console.error("[unsubscribe-newsletter] update failed", updErr);
        return json({ success: false, error: "update_failed", detail: updErr.message }, 500);
      }
    }

    return json({ success: true });
  } catch (e) {
    console.error("[unsubscribe-newsletter] unexpected", e);
    return json({ success: false, error: "unexpected", detail: String(e) }, 500);
  }
});
