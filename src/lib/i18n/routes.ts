import type { Bilingual, Language } from '@/lib/i18n/types'
import { BLOG_POSTS } from '@/data/blogPosts'

export const LANGUAGES = ['en', 'es'] as const

/** Spanish lives under a folder; English keeps the bare root so existing indexed URLs never move. */
const ES_PREFIX = '/es'

export type RouteId =
  | 'home'
  | 'howItWorks'
  | 'systems'
  | 'foundation'
  | 'industries'
  | 'industryDetail'
  | 'diagnostic'
  | 'growthScore'
  | 'work'
  | 'workDetail'
  | 'blog'
  | 'blogDetail'
  | 'services'
  | 'serviceDetail'
  | 'pricing'
  | 'packages'
  | 'contact'
  | 'about'

/**
 * Path template per route, per language, relative to the language root (no
 * leading slash, no `/es` prefix — those are added by localizedPath). `:slug`
 * is the single supported parameter, matching the two dynamic routes.
 */
const ROUTE_DEFS: Record<RouteId, Bilingual<string>> = {
  home: { en: '', es: '' },

  // Nueva arquitectura de servicios: una puerta (diagnostic), dos fases
  // (foundation → systems) y el conector por industria.
  howItWorks: { en: 'how-it-works', es: 'como-trabajamos' },
  systems: { en: 'systems', es: 'sistemas' },
  foundation: { en: 'foundation', es: 'base' },
  industries: { en: 'industries', es: 'industrias' },
  industryDetail: { en: 'industries/:slug', es: 'industrias/:slug' },
  diagnostic: { en: 'diagnostic', es: 'diagnostico' },
  growthScore: { en: 'growth-score', es: 'growth-score' },

  work: { en: 'work', es: 'proyectos' },
  workDetail: { en: 'work/:slug', es: 'proyectos/:slug' },
  blog: { en: 'blog', es: 'blog' },
  blogDetail: { en: 'blog/:slug', es: 'blog/:slug' },
  services: { en: 'services', es: 'servicios' },
  serviceDetail: { en: 'services/:slug', es: 'servicios/:slug' },
  pricing: { en: 'pricing', es: 'precios' },
  packages: { en: 'packages', es: 'paquetes' },
  contact: { en: 'contact', es: 'contacto' },
  about: { en: 'about', es: 'nosotros' },
}

/**
 * Slugs for the 7 service pages. Keyed by the English slug, which stays the
 * canonical id used by SERVICE_PAGES in src/data/pricing.ts.
 */
/**
 * Slugs de las 4 páginas de industria. La clave es el slug inglés, que actúa
 * como id canónico igual que en SERVICE_SLUGS.
 */
export const INDUSTRY_SLUGS: Record<string, Bilingual<string>> = {
  'med-spa': { en: 'med-spa', es: 'med-spa' },
  'home-improvement': { en: 'home-improvement', es: 'remodelacion' },
  restaurants: { en: 'restaurants', es: 'restaurantes' },
  'real-estate': { en: 'real-estate', es: 'bienes-raices' },
}

export const SERVICE_SLUGS: Record<string, Bilingual<string>> = {
  'web-development': { en: 'web-development', es: 'desarrollo-web' },
  ecommerce: { en: 'ecommerce', es: 'tienda-online' },
  'digital-marketing': { en: 'digital-marketing', es: 'marketing-digital' },
  'social-media': { en: 'social-media', es: 'redes-sociales' },
  'paid-ads': { en: 'paid-ads', es: 'publicidad-pagada' },
  'lead-generation': { en: 'lead-generation', es: 'generacion-de-leads' },
  'graphic-design': { en: 'graphic-design', es: 'diseno-grafico' },
}

export function languageFromPath(pathname: string): Language {
  return pathname === ES_PREFIX || pathname.startsWith(`${ES_PREFIX}/`) ? 'es' : 'en'
}

function languageRoot(language: Language): string {
  return language === 'es' ? ES_PREFIX : '/'
}

/** Strips the language prefix and surrounding slashes, leaving a bare template-shaped tail. */
function tailOf(pathname: string, language: Language): string {
  const withoutPrefix = language === 'es' ? pathname.slice(ES_PREFIX.length) : pathname
  return withoutPrefix.replace(/^\/+/, '').replace(/\/+$/, '')
}

/**
 * Builds a localized path. Without `params` the `:slug` placeholder is left in
 * place, which is exactly the shape <Route path> wants — see routePattern.
 */
export function localizedPath(id: RouteId, language: Language, params?: { slug?: string }): string {
  let tail = ROUTE_DEFS[id][language]
  if (params?.slug) tail = tail.replace(':slug', params.slug)

  if (!tail) return languageRoot(language)
  return language === 'es' ? `${ES_PREFIX}/${tail}` : `/${tail}`
}

/** The `<Route path=...>` pattern for a route in a given language. */
export function routePattern(id: RouteId, language: Language): string {
  return localizedPath(id, language)
}

/** Resolves a bare tail back to the route that produced it. Exact routes win over `:slug` ones. */
function matchTail(tail: string, language: Language): { id: RouteId; slug?: string } | null {
  const defs = Object.entries(ROUTE_DEFS) as [RouteId, Bilingual<string>][]

  for (const [id, def] of defs) {
    if (!def[language].includes(':slug') && def[language] === tail) return { id }
  }

  for (const [id, def] of defs) {
    const template = def[language]
    if (!template.includes(':slug')) continue
    const base = template.replace('/:slug', '')
    if (!tail.startsWith(`${base}/`)) continue
    const slug = tail.slice(base.length + 1)
    if (slug && !slug.includes('/')) return { id, slug }
  }

  return null
}

/**
 * Translates a content slug across languages. Case-study slugs are brand names
 * and deliberately shared by both languages, so they pass through untouched.
 */
function translateSlug(id: RouteId, slug: string, from: Language, to: Language): string {
  if (id === 'serviceDetail') {
    const entry = Object.values(SERVICE_SLUGS).find((s) => s[from] === slug)
    return entry ? entry[to] : slug
  }

  if (id === 'industryDetail') {
    const entry = Object.values(INDUSTRY_SLUGS).find((s) => s[from] === slug)
    return entry ? entry[to] : slug
  }

  if (id === 'blogDetail') {
    const post = BLOG_POSTS.find((p) => p.slug[from] === slug)
    return post ? post.slug[to] : slug
  }

  return slug
}

/**
 * Rewrites a full path into another language — the single helper behind
 * hreflang alternates, the language switch, and the <Link> wrapper. Unknown
 * paths fall back to the target language's home rather than throwing, so a
 * stray link can never break navigation.
 */
export function translatePath(pathname: string, to: Language): string {
  if (!pathname.startsWith('/')) return pathname

  const [pathOnly, suffix = ''] = splitSuffix(pathname)
  const from = languageFromPath(pathOnly)
  const tail = tailOf(pathOnly, from)

  if (!tail) return languageRoot(to) + suffix

  const match = matchTail(tail, from)
  if (!match) return languageRoot(to) + suffix

  const slug = match.slug ? translateSlug(match.id, match.slug, from, to) : undefined
  return localizedPath(match.id, to, slug ? { slug } : undefined) + suffix
}

/** Splits a trailing `?query` / `#hash` off so it survives translation untouched. */
function splitSuffix(pathname: string): [string, string] {
  const index = pathname.search(/[?#]/)
  return index === -1 ? [pathname, ''] : [pathname.slice(0, index), pathname.slice(index)]
}
