/**
 * Resizes the founder headshot into two WebP variants used on the site:
 *   - founder-hisbelis-vargas.webp     (~800px wide) — About page hero
 *   - founder-hisbelis-vargas-sm.webp  (~400px wide) — home AboutStats card
 * Run with: node scripts/optimize-founder-photo.mjs
 */
import { createCanvas, loadImage } from '@napi-rs/canvas'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const src = path.join(root, 'src/assets/hisbelis-vargas-astratta-agency.png')

const VARIANTS = [
  { name: 'founder-hisbelis-vargas.webp', width: 780, quality: 82 },
  { name: 'founder-hisbelis-vargas-sm.webp', width: 360, quality: 82 },
]

const image = await loadImage(src)
const aspect = image.height / image.width

for (const variant of VARIANTS) {
  const width = variant.width
  const height = Math.round(width * aspect)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  const buffer = canvas.toBuffer('image/webp', variant.quality)
  const outPath = path.join(root, 'src/assets', variant.name)
  writeFileSync(outPath, buffer)
  console.log(`${variant.name}: ${width}x${height}, ${(buffer.length / 1024).toFixed(1)} KB`)
}
