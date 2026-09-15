#!/usr/bin/env node
/**
 * blog-images.mjs — genera la ilustración de portada y las inline de un post del blog
 * con la API de imágenes de Gemini (Nano Banana) y las guarda como .webp optimizado
 * en src/assets/blog/.
 *
 * Uso:
 *   node scripts/blog-images.mjs --test
 *   node scripts/blog-images.mjs --slug local-seo-dallas --spec /tmp/spec.json
 *
 * Formato de --spec (JSON):
 *   {
 *     "cover":  { "concept": "..." },
 *     "inline": [ { "name": "clarity", "concept": "..." },
 *                 { "name": "proof",   "concept": "..." } ]
 *   }
 *
 * `concept` es la METÁFORA VISUAL del argumento del artículo, no una descripción
 * literal del título. El bloque STYLE de abajo se antepone siempre y es lo que
 * mantiene coherente el blog entero — trátalo como parte del sistema de marca.
 *
 * Requiere GEMINI_API_KEY en website/.env (o en el entorno).
 * Depende solo de @napi-rs/canvas, que ya está en devDependencies.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage } from '@napi-rs/canvas'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'src/assets/blog')

const MODEL = process.env.BLOG_IMAGE_MODEL || 'gemini-3.1-flash-image'
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions'

/** Bloque de estilo de marca. No lo edites por artículo — solo si cambia la marca. */
const STYLE = [
  'Minimal abstract vector illustration, flat design.',
  'ABSOLUTELY NO text, no letters, no words, no numbers, no labels anywhere in the image.',
  'Strict palette: deep indigo #5140f2 as the primary color, orange #ff7503 as the single accent,',
  'off-white #eaeaea background, near-black #0e0e12 for line work.',
  'Thin geometric line work, generous negative space, subtle film grain.',
  'Italian design studio aesthetic — precise, restrained, premium, editorial.',
  'No photorealism, no 3D render, no glossy gradients, no stock-illustration people,',
  'no drop shadows, no UI chrome, no logos.',
].join(' ')

const SIZES = {
  cover: { w: 1600, h: 900, aspect: '16:9' },
  inline: { w: 1200, h: 900, aspect: '4:3' },
}

// ─────────────────────────────────────────────────────────────────────────────

async function loadApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY
  const envPath = path.join(ROOT, '.env')
  if (existsSync(envPath)) {
    const raw = await readFile(envPath, 'utf8')
    const match = raw.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m)
    if (match) return match[1].trim().replace(/^["']|["']$/g, '')
  }
  throw new Error(
    'Falta GEMINI_API_KEY. Añádela a website/.env o expórtala en el entorno.\n' +
      'Consíguela en https://aistudio.google.com/apikey (con facturación activa).',
  )
}

async function generate({ apiKey, concept, aspect }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      model: MODEL,
      input: [{ type: 'text', text: `${STYLE}\n\nSubject: ${concept}` }],
      response_format: {
        type: 'image',
        // La API solo devuelve JPEG. Pedimos 2K y bajamos a tamaño final en
        // toWebp(): el supersampling se come los artefactos del JPEG, que en
        // arte vectorial plano se notan en los bordes.
        mime_type: 'image/jpeg',
        aspect_ratio: aspect,
        image_size: '2K',
      },
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 600)}`)
  }

  const json = await res.json()
  const b64 = findImageData(json)
  if (!b64) {
    throw new Error(
      'La respuesta no trae imagen. Payload recibido:\n' + JSON.stringify(json).slice(0, 800),
    )
  }
  return Buffer.from(b64, 'base64')
}

/**
 * Busca los bytes base64 de la imagen sin asumir la forma exacta de la respuesta.
 * La API ha cambiado de forma entre versiones (`inlineData`, `inline_data`, `data`),
 * así que recorremos el objeto en vez de indexar una ruta fija que se rompa en la
 * próxima revisión del endpoint.
 */
function findImageData(node) {
  if (!node || typeof node !== 'object') return null
  if (typeof node.data === 'string' && node.data.length > 1024) return node.data
  if (typeof node.b64_json === 'string') return node.b64_json
  for (const value of Array.isArray(node) ? node : Object.values(node)) {
    const found = findImageData(value)
    if (found) return found
  }
  return null
}

/** Reescala a las dimensiones objetivo y codifica a webp. */
async function toWebp(buffer, { w, h }, quality = 82) {
  const img = await loadImage(buffer)
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')

  // cover-fit: llena el lienzo sin deformar
  const scale = Math.max(w / img.width, h / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)

  return canvas.encode('webp', quality)
}

async function emit({ apiKey, concept, kind, filename }) {
  const size = SIZES[kind]
  process.stdout.write(`  · ${filename} … `)
  const raw = await generate({ apiKey, concept, aspect: size.aspect })
  const webp = await toWebp(raw, size)
  await mkdir(OUT_DIR, { recursive: true })
  const dest = path.join(OUT_DIR, filename)
  await writeFile(dest, webp)
  const kb = (webp.length / 1024).toFixed(1)
  console.log(`${kb} KB`)
  if (webp.length > 90 * 1024) {
    console.warn(`    ⚠ ${filename} pesa ${kb} KB. Baja la calidad o simplifica el concepto.`)
  }
  return path.relative(ROOT, dest)
}

// ─────────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      const next = argv[i + 1]
      args[key] = !next || next.startsWith('--') ? true : (i++, next)
    }
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const apiKey = await loadApiKey()

  if (args.test) {
    console.log(`Modelo: ${MODEL}\nGenerando imagen de prueba…`)
    const out = await emit({
      apiKey,
      kind: 'cover',
      filename: '_test-cover.webp',
      concept:
        'Visitor dots streaming into a browser window, only a few passing through into a nearly empty funnel below.',
    })
    console.log(`\n✓ ${out}\nÁbrela y valida el estilo antes de automatizar nada.`)
    return
  }

  const { slug, spec } = args
  if (!slug || !spec) {
    console.error('Uso: node scripts/blog-images.mjs --slug <slug-en> --spec <archivo.json>')
    console.error('     node scripts/blog-images.mjs --test')
    process.exit(1)
  }

  const parsed = JSON.parse(await readFile(spec, 'utf8'))
  console.log(`Modelo: ${MODEL}\nPost: ${slug}`)

  const written = []
  written.push(
    await emit({
      apiKey,
      kind: 'cover',
      filename: `${slug}-cover.webp`,
      concept: parsed.cover.concept,
    }),
  )
  for (const item of parsed.inline ?? []) {
    written.push(
      await emit({
        apiKey,
        kind: 'inline',
        filename: `${slug}-${item.name}.webp`,
        concept: item.concept,
      }),
    )
  }

  console.log('\nImports para src/data/blogPosts.ts:\n')
  for (const rel of written) {
    const base = path.basename(rel, '.webp')
    const ident = base.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    console.log(`import ${ident} from '@/assets/blog/${path.basename(rel)}'`)
  }
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
})
