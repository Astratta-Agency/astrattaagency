/**
 * Generates public/og-image.jpg (1200x630) — the social share card referenced
 * by index.html and src/components/layout/Seo.tsx. Run with:
 *   node scripts/generate-og-image.mjs
 * Requires @napi-rs/canvas (devDependency).
 */
import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const fontsDir = path.join(root, 'node_modules/@fontsource/mulish/files')
GlobalFonts.registerFromPath(path.join(fontsDir, 'mulish-latin-800-normal.woff2'), 'Mulish ExtraBold')
GlobalFonts.registerFromPath(path.join(fontsDir, 'mulish-latin-700-normal.woff2'), 'Mulish Bold')
GlobalFonts.registerFromPath(path.join(fontsDir, 'mulish-latin-600-normal.woff2'), 'Mulish SemiBold')

const WIDTH = 1200
const HEIGHT = 630
const MARGIN_X = 84

const INK = '#0e0e12'
const PRIMARY = '#5140f2'
const SECONDARY = '#ff7503'

const canvas = createCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d')

// Background: near-white gradient (#eaeaea -> white), subtle diagonal.
const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
bg.addColorStop(0, '#eaeaea')
bg.addColorStop(1, '#ffffff')
ctx.fillStyle = bg
ctx.fillRect(0, 0, WIDTH, HEIGHT)

// Logo (reused from the site's own wordmark asset).
const logo = await loadImage(path.join(root, 'src/assets/logo.png'))
const logoWidth = 300
const logoHeight = logoWidth * (logo.height / logo.width)
ctx.drawImage(logo, MARGIN_X, 78, logoWidth, logoHeight)

// Headline.
ctx.textBaseline = 'alphabetic'
ctx.font = '800 78px "Mulish ExtraBold"'
ctx.fillStyle = INK
ctx.fillText('Websites that', MARGIN_X, 340)

ctx.fillStyle = PRIMARY
ctx.fillText('actually convert.', MARGIN_X, 432)

// Footer line.
ctx.font = '600 26px "Mulish SemiBold"'
ctx.fillStyle = '#5b5b66'
ctx.fillText('Web Design & Digital Marketing — Dallas, TX', MARGIN_X, HEIGHT - 56)

// Accent bar.
ctx.fillStyle = SECONDARY
ctx.fillRect(0, HEIGHT - 10, WIDTH, 10)

const buffer = canvas.toBuffer('image/jpeg', 90)
const outPath = path.join(root, 'public/og-image.jpg')
writeFileSync(outPath, buffer)

console.log(`Wrote ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
