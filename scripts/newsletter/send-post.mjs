/**
 * Envía un artículo del blog al newsletter (el artículo completo, en el idioma
 * de cada suscriptor).
 *
 *   node scripts/newsletter/send-post.mjs --mode preview [--slug <slug-en>]
 *   node scripts/newsletter/send-post.mjs --mode test    [--slug <slug-en>]
 *   node scripts/newsletter/send-post.mjs --mode send    [--slug <slug-en>]
 *   node scripts/newsletter/send-post.mjs --mode auto
 *
 *   preview — solo escribe newsletter-preview/<slug>-{en,es}.html (no envía nada)
 *   test    — envía las dos versiones (EN y ES) solo a info@astrattaagency.com
 *   send    — envía a todos los suscriptores activos; un artículo sale una sola vez
 *   auto    — envía cada artículo reciente que ya esté en vivo y aún no se haya
 *             enviado (lo usa .github/workflows/newsletter-auto.yml)
 *
 * Sin --slug, preview/test/send usan el artículo más reciente (por publishedAt).
 * test/send/auto necesitan NEWSLETTER_SEND_SECRET (el mismo valor que el secret
 * de la Edge Function `send-post-newsletter`).
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
/**
 * Ventana del modo auto: solo artículos publicados en los últimos N días. Evita
 * que un fallo en la tabla de envíos dispare el archivo entero del blog.
 */
const AUTO_WINDOW_DAYS = 7

const { values: args } = parseArgs({
  options: {
    slug: { type: 'string' },
    mode: { type: 'string', default: 'preview' },
  },
})
if (!['preview', 'test', 'send', 'auto'].includes(args.mode)) {
  throw new Error(`--mode debe ser preview, test, send o auto (recibido: ${args.mode})`)
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

const postUrl = (source, language) => `${SITE_URL}${routes.translatePath(`/blog/${source.slug.en}`, language)}`

/** Renderiza el correo EN + ES de un artículo y convierte sus imágenes. */
async function buildEmail(source) {
  const imageSrcs = [
    ...new Set(
      [
        source.coverImage,
        ...LANGUAGES.flatMap((l) => source.body[l].map((b) => (b.kind === 'image' ? b.src : undefined))),
      ].filter(Boolean),
    ),
  ]
  const imageIndex = new Map(imageSrcs.map((src, i) => [src, i]))
  const images = await Promise.all(imageSrcs.map((src) => toJpeg(src)))
  console.log(`  Imágenes: ${images.length} (${Math.round(images.reduce((n, b) => n + b.length, 0) / 1024)} KB en JPEG)`)

  const emails = Object.fromEntries(
    LANGUAGES.map((language) => {
      const post = posts.resolveBlogPost(source, language)
      const localize = (route) => `${SITE_URL}${routes.translatePath(route, language)}`
      return [
        language,
        renderPostEmail({
          language,
          post,
          postUrl: postUrl(source, language),
          blogUrl: localize('/blog'),
          category: posts.categoryLabel(source.category, language),
          t: blogDict[language].post,
          localize,
          imageIndex,
        }),
      ]
    }),
  )
  return { images, emails }
}

function writePreview(source, { images, emails }) {
  const outDir = path.join(ROOT, 'newsletter-preview')
  mkdirSync(outDir, { recursive: true })
  for (const language of LANGUAGES) {
    let html = emails[language].html.replaceAll('{{UNSUBSCRIBE_URL}}', '#')
    images.forEach((buf, i) => {
      html = html.replaceAll(`{{IMG_${i}}}`, `data:image/jpeg;base64,${buf.toString('base64')}`)
    })
    const file = path.join(outDir, `${source.slug.en}-${language}.html`)
    writeFileSync(file, html)
    console.log(`  Vista previa: ${path.relative(ROOT, file)}`)
  }
}

async function callFunction(body) {
  const secret = process.env.NEWSLETTER_SEND_SECRET
  if (!secret) throw new Error('Falta NEWSLETTER_SEND_SECRET')
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-newsletter-secret': secret },
    body: JSON.stringify({ workspace_slug: 'astratta-agency', ...body }),
  })
  return { status: res.status, result: await res.json().catch(() => ({})) }
}

async function sendPost(source, mode) {
  const { images, emails } = await buildEmail(source)
  writePreview(source, { images, emails })
  const { status, result } = await callFunction({
    post_slug: source.slug.en,
    mode,
    images: images.map((buf) => buf.toString('base64')),
    emails,
  })
  console.log(`  ${JSON.stringify(result)}`)
  return { status, result }
}

/** El artículo cuenta como publicado cuando su página prerenderizada responde 200 en producción. */
async function isLive(source) {
  const res = await fetch(postUrl(source, 'en'), { method: 'HEAD', redirect: 'manual' }).catch(() => null)
  return res?.status === 200
}

if (args.mode === 'auto') {
  const today = new Date().toISOString().slice(0, 10)
  const since = new Date(Date.now() - AUTO_WINDOW_DAYS * 86_400_000).toISOString().slice(0, 10)
  const recent = posts.BLOG_POSTS.filter((p) => p.publishedAt <= today && p.publishedAt >= since)
  console.log(`Artículos publicados desde ${since}: ${recent.map((p) => p.slug.en).join(', ') || 'ninguno'}`)

  const { status, result } = await callFunction({ mode: 'status' })
  if (status !== 200 || !result.success) throw new Error(`No se pudo leer el registro de envíos: ${JSON.stringify(result)}`)
  const handled = new Set(result.slugs)

  let failures = 0
  for (const source of recent) {
    const slug = source.slug.en
    if (handled.has(slug)) {
      console.log(`· ${slug}: ya enviado — se omite`)
      continue
    }
    if (!(await isLive(source))) {
      console.log(`· ${slug}: todavía no está en vivo — se reintentará en la próxima ejecución`)
      continue
    }
    console.log(`→ ${slug}: enviando a los suscriptores`)
    const sent = await sendPost(source, 'send')
    // 409 = otra ejecución lo envió entre medias: no es un fallo.
    if (sent.status !== 409 && !sent.result.success) failures++
  }
  process.exit(failures > 0 ? 1 : 0)
}

const source = args.slug
  ? posts.BLOG_POSTS.find((p) => p.slug.en === args.slug)
  : [...posts.BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0]
if (!source) {
  const known = posts.BLOG_POSTS.map((p) => p.slug.en).join('\n  ')
  throw new Error(`No existe un artículo con slug EN "${args.slug}". Slugs disponibles:\n  ${known}`)
}
console.log(`Artículo: ${source.slug.en} (${source.publishedAt}) — modo ${args.mode}`)

if (args.mode === 'preview') {
  writePreview(source, await buildEmail(source))
  process.exit(0)
}

const { status, result } = await sendPost(source, args.mode)
if (status !== 200 || !result.success) {
  console.error(`La función respondió ${status}`)
  process.exit(1)
}
