/**
 * Plantilla del correo "artículo nuevo" — el artículo completo dentro del
 * correo (referencia: Weplash). Funciones puras: reciben el post ya resuelto y
 * los textos del sitio, y devuelven HTML/texto con dos tipos de marcador que
 * rellena la Edge Function `send-post-newsletter`:
 *
 *   {{UNSUBSCRIBE_URL}}  — enlace de baja propio de cada suscriptor
 *   {{IMG_<n>}}          — URL pública de la imagen n (se sube a Storage)
 *
 * Copy: lo que no sale del artículo ni de src/locales está aprobado por el
 * dueño y registrado en docs/COPY-PENDIENTE.md (bloque N).
 */

const SITE_URL = 'https://astrattaagency.com'

// Brand tokens (CLAUDE.md §12) inlined — los clientes de correo no cargan CSS.
const INK = '#0e0e12'
const PRIMARY = '#5140f2'
const MUTED = '#6b6b73'
const LINE = '#eaeaea'
const FONT = 'Mulish,Helvetica,Arial,sans-serif'

/** Texto propio del correo (aprobado, bloque N). */
export const POST_EMAIL_COPY = {
  en: {
    forwarded: 'Was this forwarded to you?',
    subscribe: 'Subscribe here',
    readOnWeb: 'Read on the web ↗',
    unsubscribe: 'Unsubscribe',
  },
  es: {
    forwarded: '¿Te reenviaron este correo?',
    subscribe: 'Suscríbete aquí',
    readOnWeb: 'Leer en la web ↗',
    unsubscribe: 'Cancelar suscripción',
  },
}

/** Postal line required by CAN-SPAM — mismo valor que la bienvenida. */
const POSTAL_ADDRESS = 'Dallas–Fort Worth, TX'

const escapeHtml = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

/**
 * Mismo marcado inline que BlogPost.tsx: `**negrita**` y `[texto](/ruta)`.
 * Las rutas vienen en forma canónica inglesa; `localize` las traduce.
 */
function renderInline(text, localize) {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return `<strong style="font-weight:800;color:${PRIMARY};">${escapeHtml(part.slice(2, -2))}</strong>`
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        return `<a href="${escapeHtml(localize(link[2]))}" style="color:${PRIMARY};font-weight:800;text-decoration:underline;">${escapeHtml(link[1])}</a>`
      }
      return escapeHtml(part)
    })
    .join('')
}

function plainInline(text, localize) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `${label} (${localize(href)})`)
}

function formatDate(iso, language) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * @param {object} args
 * @param {'en'|'es'} args.language
 * @param {object} args.post        resolveBlogPost(source, language)
 * @param {string} args.postUrl     URL absoluta del artículo en ese idioma
 * @param {string} args.blogUrl     URL absoluta del índice del blog en ese idioma
 * @param {string} args.category    etiqueta de categoría ya resuelta
 * @param {object} args.t           dict.blog.post del idioma
 * @param {(route: string) => string} args.localize  ruta canónica EN → URL absoluta
 * @param {Map<string, number>} args.imageIndex      src del asset → índice de {{IMG_n}}
 */
export function renderPostEmail({ language, post, postUrl, blogUrl, category, t, localize, imageIndex }) {
  const c = POST_EMAIL_COPY[language]
  const year = new Date().getFullYear()
  const img = (src) => `{{IMG_${imageIndex.get(src)}}}`

  const p = (html, extra = '') =>
    `<p style="margin:0 0 20px;font-family:${FONT};font-size:17px;line-height:1.7;color:${INK};${extra}">${html}</p>`

  const blocks = post.body
    .map((block) => {
      if (block.kind === 'paragraph') return p(renderInline(block.text, localize))
      if (block.kind === 'heading') {
        return `<h2 style="margin:36px 0 16px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:800;color:${INK};">${renderInline(block.text, localize)}</h2>`
      }
      if (block.kind === 'quote') {
        return `<blockquote style="margin:28px 0;padding:4px 0 4px 20px;border-left:3px solid ${PRIMARY};font-family:${FONT};font-size:20px;line-height:1.5;font-weight:700;color:${INK};">${renderInline(block.text, localize)}</blockquote>`
      }
      if (block.kind === 'image') {
        // Sin foto real el sitio pinta una ilustración vectorial decorativa;
        // en el correo se omite (los SVG no se muestran en Gmail/Outlook).
        if (!block.src) return ''
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;"><tr><td>
          <img src="${img(block.src)}" width="560" alt="${escapeHtml(block.alt ?? '')}" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:12px;" />
          ${block.caption ? `<p style="margin:10px 0 0;font-family:${FONT};font-size:13px;line-height:1.5;color:${MUTED};">${escapeHtml(block.caption)}</p>` : ''}
        </td></tr></table>`
      }
      return ''
    })
    .join('\n')

  const shareLinks = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`],
    ['X', `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`],
    ['WhatsApp', `https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`],
  ]
    .map(([label, href]) => `<a href="${escapeHtml(href)}" style="color:${PRIMARY};font-weight:700;text-decoration:none;">${label}</a>`)
    .join(' &nbsp;·&nbsp; ')

  const html = `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(post.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(post.excerpt)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:24px 20px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
            <tr>
              <td style="padding:0 0 28px;text-align:right;font-family:${FONT};font-size:12px;color:${MUTED};">
                ${c.forwarded} <a href="${blogUrl}" style="color:${MUTED};text-decoration:underline;">${c.subscribe}</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 0 40px;">
                <a href="${SITE_URL}${language === 'es' ? '/es' : '/'}">
                  <img src="${SITE_URL}/email/logo.png" width="200" alt="Astratta Agency" style="display:block;width:200px;height:auto;border:0;" />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h1 style="margin:0 0 12px;font-family:${FONT};font-size:32px;line-height:1.15;font-weight:800;color:${INK};">${escapeHtml(post.title)}</h1>
                <p style="margin:0 0 20px;font-family:${FONT};font-size:18px;line-height:1.5;color:${MUTED};">${escapeHtml(post.excerpt)}</p>
                <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${PRIMARY};">${escapeHtml(category)}</p>
                <p style="margin:0 0 24px;font-family:${FONT};font-size:13px;line-height:1.5;color:${MUTED};">
                  ${escapeHtml(formatDate(post.publishedAt, language))} · ${escapeHtml(post.readingTime)}<br />
                  ${escapeHtml(t.byAuthor)} <strong style="color:${INK};">${escapeHtml(post.author.name)}</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0;border-top:1px solid ${LINE};border-bottom:1px solid ${LINE};text-align:right;">
                <a href="${postUrl}" style="display:inline-block;padding:10px 20px;border:1px solid ${LINE};border-radius:999px;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${INK};text-decoration:none;">${c.readOnWeb}</a>
              </td>
            </tr>
            ${
              post.coverImage
                ? `<tr><td style="padding:32px 0 8px;"><a href="${postUrl}"><img src="${img(post.coverImage)}" width="600" alt="${escapeHtml(post.coverAlt ?? post.title)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px;" /></a></td></tr>`
                : ''
            }
            <tr>
              <td style="padding:32px 0 8px;">
                ${blocks}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0;border-top:1px solid ${LINE};">
                ${p(`${escapeHtml(t.ctaText)} <a href="${localize('/diagnostic')}" style="color:${PRIMARY};font-weight:800;text-decoration:underline;">${escapeHtml(t.ctaLink)}</a>`, 'margin:0 0 16px;')}
                <p style="margin:0;font-family:${FONT};font-size:14px;color:${MUTED};">${escapeHtml(t.share)}: &nbsp;${shareLinks}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 0;border-top:1px solid ${LINE};text-align:center;font-family:${FONT};font-size:12px;line-height:1.8;color:${MUTED};">
                © ${year} Astratta Agency<br />
                ${POSTAL_ADDRESS}<br />
                <a href="{{UNSUBSCRIBE_URL}}" style="color:${MUTED};text-decoration:underline;">${c.unsubscribe}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const textBody = post.body
    .map((block) => {
      if (block.kind === 'paragraph' || block.kind === 'quote') return plainInline(block.text, localize)
      if (block.kind === 'heading') return `## ${plainInline(block.text, localize)}`
      if (block.kind === 'image' && block.src && block.caption) return `[${block.caption}]`
      return ''
    })
    .filter(Boolean)
    .join('\n\n')

  const text = [
    post.title,
    post.excerpt,
    `${formatDate(post.publishedAt, language)} · ${post.readingTime} · ${t.byAuthor} ${post.author.name}`,
    `${c.readOnWeb.replace(' ↗', '')}: ${postUrl}`,
    '',
    textBody,
    '',
    `${t.ctaText} ${t.ctaLink}: ${localize('/diagnostic')}`,
    '',
    '—',
    `© ${year} Astratta Agency · ${POSTAL_ADDRESS}`,
    `${c.unsubscribe}: {{UNSUBSCRIBE_URL}}`,
  ].join('\n')

  return { subject: post.title, html, text }
}
