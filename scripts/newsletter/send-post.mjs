/**
 * Envía un artículo del blog al newsletter (el artículo completo, en el idioma
 * de cada suscriptor). Lo dispara el workflow manual "Newsletter — enviar
 * artículo" (.github/workflows/newsletter-send.yml), o a mano:
 *
 *   node scripts/newsletter/send-post.mjs --mode preview [--slug <slug-en>]
 *   node scripts/newsletter/send-post.mjs --mode test    [--slug <slug-en>]
 *   node scripts/newsletter/send-post.mjs --mode send    [--slug <slug-en>]
 *
 *   preview — solo escribe newsletter-preview/<slug>-{en,es}.html (no envía nada)
 *   test    — envía las dos versiones (EN y ES) solo a info@astrattaagency.com
 *   send    — envía a todos los suscriptores activos; un artículo sale una sola vez
 *
 * Sin --slug usa el artículo más reciente (por publishedAt).
 * test/send necesitan NEWSLETTER_SEND_SECRET (el mismo valor que el secret de
 * la Edge Function `send-post-newsletter`).
 */
import { createServer } from 'vite'
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { renderPostEmail } from './post-email.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const SITE_URL = 'https://astrattaagency.com'
const FUNCTION_URL =
  process.env.NEWSLETTER_FUNCTION_URL ??
  'https://vdnblnrwkkychxzbixam.supabase.co/functions/v1/send-post-newsletter'
const LANGUAGES = ['en', 'es']
const MAX_IMAGE_WIDTH = 1200

const { values: args } = parseArgs({
  options: {
    slug: { type: 'string' },
    mode: { type: 'string', default: 'preview' },
  },
})
if (!['preview', 'test', 'send'].includes(args.mode)) {
  throw new Error(`--mode debe ser preview, test o send (recibido: ${args.mode})`)
}

/** webp/png del repo → JPEG (el formato que todos los clientes de correo muestran), máx. 1200px. */
async function toJpeg(assetPath) {
  const image = await loadImage(readFileSync(path.join(ROOT, assetPath)))
  const scale = Math.min(1, MAX_IMAGE_WIDTH / image.width)
  const width = Math.round(image.width * scale)
  const height = Math.round(image.height * scale)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(image, 0, 0, width, height)
  return canvas.encode('jpeg', 82)
}

async function loadSite() {
  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })
  try {
    const [posts, routes, en, es] = await Promise.all([
      vite.ssrLoadModule('/src/data/blogPosts.ts'),
      vite.ssrLoadModule('/src/lib/i18n/routes.ts'),
      vite.ssrLoadModule('/src/locales/en/blog.ts'),
      vite.ssrLoadModule('/src/locales/es/blog.ts'),
    ])
    return { posts, routes, blogDict: { en: en.blog, es: es.blog } }
  } finally {
    await vite.close()
  }
}

const { posts, routes, blogDict } = await loadSite()

const source = args.slug
  ? posts.BLOG_POSTS.find((p) => p.slug.en === args.slug)
  : [...posts.BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0]
if (!source) {
  const known = posts.BLOG_POSTS.map((p) => p.slug.en).join('\n  ')
  throw new Error(`No existe un artículo con slug EN "${args.slug}". Slugs disponibles:\n  ${known}`)
}
const slug = source.slug.en
console.log(`Artículo: ${slug} (${source.publishedAt}) — modo ${args.mode}`)

// Todas las imágenes reales del artículo (portada + cuerpo, ambos idiomas).
const imageSrcs = [
  ...new Set(
    [source.coverImage, ...LANGUAGES.flatMap((l) => source.body[l].map((b) => (b.kind === 'image' ? b.src : undefined)))].filter(
      Boolean,
    ),
  ),
]
const imageIndex = new Map(imageSrcs.map((src, i) => [src, i]))
const images = await Promise.all(imageSrcs.map((src) => toJpeg(src)))
console.log(`Imágenes: ${images.length} (${Math.round(images.reduce((n, b) => n + b.length, 0) / 1024)} KB en JPEG)`)

const emails = Object.fromEntries(
  LANGUAGES.map((language) => {
    const post = posts.resolveBlogPost(source, language)
    const localize = (route) => `${SITE_URL}${routes.translatePath(route, language)}`
    return [
      language,
      renderPostEmail({
        language,
        post,
        postUrl: localize(`/blog/${slug}`),
        blogUrl: localize('/blog'),
        category: posts.categoryLabel(source.category, language),
        t: blogDict[language].post,
        localize,
        imageIndex,
      }),
    ]
  }),
)

if (args.mode === 'preview') {
  const outDir = path.join(ROOT, 'newsletter-preview')
  mkdirSync(outDir, { recursive: true })
  for (const language of LANGUAGES) {
    let html = emails[language].html.replaceAll('{{UNSUBSCRIBE_URL}}', '#')
    images.forEach((buf, i) => {
      html = html.replaceAll(`{{IMG_${i}}}`, `data:image/jpeg;base64,${buf.toString('base64')}`)
    })
    const file = path.join(outDir, `${slug}-${language}.html`)
    writeFileSync(file, html)
    console.log(`Vista previa: ${path.relative(ROOT, file)}`)
  }
  process.exit(0)
}

const secret = process.env.NEWSLETTER_SEND_SECRET
if (!secret) throw new Error('Falta NEWSLETTER_SEND_SECRET')

const res = await fetch(FUNCTION_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-newsletter-secret': secret },
  body: JSON.stringify({
    workspace_slug: 'astratta-agency',
    post_slug: slug,
    mode: args.mode,
    images: images.map((buf) => buf.toString('base64')),
    emails,
  }),
})
const result = await res.json().catch(() => ({}))
console.log(JSON.stringify(result, null, 2))
if (!res.ok || !result.success) {
  console.error(`La función respondió ${res.status}`)
  process.exit(1)
}
