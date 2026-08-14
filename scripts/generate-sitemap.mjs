/**
 * Generates dist/sitemap.xml from src/lib/seo-data.ts.
 *
 * Replaces the hand-maintained public/sitemap.xml, which had already drifted
 * (it was missing every case study and blog post). Each URL carries
 * <xhtml:link rel="alternate"> entries for both languages, which is how Google
 * pairs the English and Spanish versions of a page.
 *
 * Runs before prerendering so a failure here stops the build early:
 *   node scripts/generate-sitemap.mjs
 */
import { createServer } from 'vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

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

function urlEntry(route) {
  const alternates = [
    `      <xhtml:link rel="alternate" hreflang="en" href="${route.alternates.en}" />`,
    `      <xhtml:link rel="alternate" hreflang="es" href="${route.alternates.es}" />`,
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${route.alternates.en}" />`,
  ].join('\n')

  return `   <url>\n      <loc>${route.url}</loc>\n${alternates}\n   </url>`
}

const routes = await loadSeoRoutes()

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...routes.map(urlEntry),
  '</urlset>',
  '',
].join('\n')

mkdirSync(DIST, { recursive: true })
writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
console.log(`Wrote dist/sitemap.xml with ${routes.length} URLs (${routes.filter((r) => r.language === 'es').length} Spanish).`)
