/**
 * Build-time prerendering for social/OG crawlers.
 *
 * Google executes JS and sees the runtime meta tags that
 * src/components/layout/Seo.tsx injects — but LinkedIn/WhatsApp/Facebook
 * crawlers do not run JS, so every shared URL was showing index.html's
 * generic (home-page) meta. This script writes a static index.html per
 * route, each with that route's own <title>/description/canonical/OG tags
 * baked in server-side, while leaving <div id="root"> empty so the client
 * app continues to mount exactly as it does today — no hydration, no
 * animation-replay risk, no behavior change for real visitors.
 *
 * Run after `vite build`:
 *   node scripts/prerender.mjs
 *
 * How each route's title/description is sourced (see src/lib/seo-data.ts):
 *   1. Loaded via Vite's own SSR module runner (`ssrLoadModule`), so
 *      `@/` aliases and asset imports resolve exactly like they do in the
 *      app — no separate build step or duplicate data needed.
 *   2. Puppeteer then navigates the *real built app* (served via
 *      `vite preview`) to each route and reads back what Seo.tsx actually
 *      set at runtime, failing loudly if it doesn't match — this catches a
 *      page that forgot to render <Seo> or passed the wrong path, not just
 *      a script bug.
 *   3. The verified, browser-confirmed <head> is what gets written to disk.
 */
import puppeteer from 'puppeteer'
import { createServer, preview } from 'vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4173

async function loadSeoRoutes() {
  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })
  try {
    const mod = await vite.ssrLoadModule('/src/lib/seo-data.ts')
    return mod.getAllSeoRoutes()
  } finally {
    await vite.close()
  }
}

/**
 * Static hosts resolve "clean URLs" differently — some map `/services` to
 * `services/index.html` (folder convention), others to `services.html`
 * (flat-file convention), and dev tools like `vite preview` only honor the
 * folder convention when the request has a trailing slash. Writing both per
 * route means the canonical no-trailing-slash URL (what's actually in
 * sitemap.xml and every <link rel="canonical">) resolves correctly
 * regardless of which convention the eventual host uses.
 */
function outputPathsFor(routePath) {
  if (routePath === '/') return [path.join(DIST, 'index.html')]
  const trimmed = routePath.replace(/^\//, '')
  return [path.join(DIST, trimmed, 'index.html'), path.join(DIST, `${trimmed}.html`)]
}

async function main() {
  const routes = await loadSeoRoutes()
  console.log(`Prerendering ${routes.length} routes from src/lib/seo-data.ts...\n`)

  const previewServer = await preview({ root: ROOT, preview: { port: PORT }, logLevel: 'error' })
  const base = previewServer.resolvedUrls.local[0].replace(/\/$/, '')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  let failures = 0

  for (const route of routes) {
    await page.goto(`${base}${route.path}`, { waitUntil: 'networkidle0' })

    const actual = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? null,
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? null,
      ogDescription:
        document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? null,
    }))

    const mismatches = []
    if (actual.title !== route.title) mismatches.push(`title: expected "${route.title}", got "${actual.title}"`)
    if (actual.description !== route.description) mismatches.push('description mismatch')
    if (actual.canonical !== route.url) mismatches.push(`canonical: expected "${route.url}", got "${actual.canonical}"`)
    if (actual.ogUrl !== route.url) mismatches.push('og:url mismatch')
    if (actual.ogTitle !== route.title) mismatches.push('og:title mismatch')
    if (actual.ogDescription !== route.description) mismatches.push('og:description mismatch')

    if (mismatches.length > 0) {
      console.error(`  ✗ ${route.path}`)
      for (const m of mismatches) console.error(`      ${m}`)
      failures++
      continue
    }

    // Strip the CSR-rendered body back to the pristine SPA shell before
    // serializing — the shipped file gets corrected <head> tags only, never
    // a DOM snapshot, so the client always does a normal fresh mount.
    await page.evaluate(() => {
      const rootEl = document.getElementById('root')
      if (rootEl) rootEl.innerHTML = ''
    })

    // page.content() already includes the <!DOCTYPE html> declaration.
    const html = await page.content()
    for (const outPath of outputPathsFor(route.path)) {
      mkdirSync(path.dirname(outPath), { recursive: true })
      writeFileSync(outPath, html)
    }
    console.log(`  ✓ ${route.path}`)
  }

  await browser.close()
  await new Promise((resolve) => previewServer.httpServer.close(resolve))

  if (failures > 0) {
    console.error(`\n${failures}/${routes.length} route(s) failed SEO verification — see above.`)
    process.exitCode = 1
    return
  }

  console.log(`\nPrerendered ${routes.length} routes into dist/.`)
}

main()
