import { SITE } from '@/lib/constants'
import { SERVICE_PAGES } from '@/data/pricing'
import { CASE_STUDIES } from '@/data/caseStudies'
import { BLOG_POSTS } from '@/data/blogPosts'
import type { Bilingual, Language } from '@/lib/i18n/types'
import { LANGUAGES, translatePath } from '@/lib/i18n/routes'

export type SeoEntry = {
  /** The localized path actually served, e.g. "/es/servicios/desarrollo-web". */
  path: string
  language: Language
  title: string
  description: string
  /** Absolute URL for this language — the page's canonical. */
  url: string
  /** Absolute URL per language, for hreflang and sitemap alternates. */
  alternates: Bilingual<string>
}

/**
 * Per-project meta description overrides — used when a case study has a
 * concrete, citable stat worth leading with instead of the generic summary.
 * Falls back to `project.summary` for every other project. Consumed by both
 * CaseStudy.tsx (runtime) and scripts/prerender.mjs (build time).
 */
export const CASE_STUDY_SEO_DESCRIPTIONS: Record<string, Bilingual<string>> = {
  'perreando-hotdog-social-media': {
    en: 'Case study: Perreando HotDog went from zero online presence to 292K+ views across TikTok, Instagram, and Facebook in 90 days — with $0 ad spend.',
    es: 'Caso de éxito: Perreando HotDog pasó de cero presencia online a más de 292K vistas en TikTok, Instagram y Facebook en 90 días — con $0 de inversión publicitaria.',
  },
}

/**
 * SEO copy for every static (non-parameterized) route. Single source of
 * truth for both the runtime <Seo> component (each page imports its entry
 * here instead of hardcoding title/description) and the prerender script
 * (which always renders the English variant — see getAllSeoRoutes below).
 */
export const STATIC_SEO: Record<string, Bilingual<{ title: string; description: string }>> = {
  '/': {
    en: {
      title: 'Astratta Agency — Web Design & Digital Marketing in Dallas, TX',
      description:
        'Astratta builds high-converting websites and growth systems for Dallas–Fort Worth businesses. Start with a $297 diagnostic — 7 days, 10 prioritized fixes.',
    },
    es: {
      title: 'Astratta Agency — Diseño Web y Marketing Digital en Dallas, TX',
      description:
        'Astratta crea sitios web y sistemas de crecimiento para negocios de Dallas–Fort Worth. Empieza con un diagnóstico de $297 — 7 días, 10 arreglos priorizados.',
    },
  },
  '/work': {
    en: {
      title: 'Our Work — Astratta Agency | Web Design Case Studies, Dallas TX',
      description:
        'Case studies from Astratta Agency: high-converting websites, funnels, and digital marketing for Dallas–Fort Worth startups and small businesses.',
    },
    es: {
      title: 'Nuestro Trabajo — Astratta Agency | Casos de Éxito de Diseño Web, Dallas TX',
      description:
        'Casos de éxito de Astratta Agency: sitios web, embudos y marketing digital de alta conversión para startups y pequeños negocios de Dallas–Fort Worth.',
    },
  },
  '/services': {
    en: {
      title: 'Services — Web Development, E-commerce, Marketing & Design | Astratta Agency',
      description:
        'Web development, e-commerce, digital marketing, graphic design, and website audits for Dallas–Fort Worth startups and small businesses — from Astratta Agency.',
    },
    es: {
      title: 'Servicios — Desarrollo Web, E-commerce, Marketing y Diseño | Astratta Agency',
      description:
        'Desarrollo web, e-commerce, marketing digital, diseño gráfico y auditorías de sitios web para startups y pequeños negocios de Dallas–Fort Worth — por Astratta Agency.',
    },
  },
  '/services/digital-marketing': {
    en: {
      title: 'Digital Marketing for Dallas Businesses — Social, Ads & Lead Gen | Astratta',
      description:
        'Social media management, paid ads (Meta/Google), and full lead generation systems for Dallas–Fort Worth startups and SMBs — every plan reports leads and cost per lead, not vanity metrics.',
    },
    es: {
      title: 'Marketing Digital para Negocios de Dallas — Redes, Anuncios y Leads | Astratta',
      description:
        'Gestión de redes sociales, anuncios pagados (Meta/Google) y sistemas completos de generación de leads para startups y pymes de Dallas–Fort Worth — cada plan reporta leads y costo por lead, no métricas de vanidad.',
    },
  },
  '/pricing': {
    en: {
      title: 'Get a Custom Quote — Web Design & Marketing Pricing | Astratta Agency Dallas',
      description:
        'Answer a few questions and get a recommended service combination with estimated pricing — for Dallas–Fort Worth businesses evaluating web design, e-commerce, marketing, or design services.',
    },
    es: {
      title: 'Cotiza tu Proyecto — Precios de Diseño Web y Marketing | Astratta Agency Dallas',
      description:
        'Responde unas preguntas y obtén una combinación de servicios recomendada con precio estimado — para negocios de Dallas–Fort Worth evaluando diseño web, e-commerce, marketing o diseño.',
    },
  },
  '/packages': {
    en: {
      title: 'Service Bundles & Packages — Save on Combined Services | Astratta Agency',
      description:
        'Pre-built combinations of web development, e-commerce, marketing, and social media services for Dallas businesses — bundled at a lower combined rate than buying separately.',
    },
    es: {
      title: 'Paquetes de Servicios — Ahorra al Combinar Servicios | Astratta Agency',
      description:
        'Combinaciones prearmadas de desarrollo web, e-commerce, marketing y redes sociales para negocios de Dallas — a un precio combinado más bajo que comprar por separado.',
    },
  },
  '/blog': {
    en: {
      title: 'Blog — Web, Marketing & Design Notes | Astratta Agency Dallas',
      description:
        'Web, marketing, and design breakdowns from real Dallas–Fort Worth projects — conversion fixes, local SEO, and design decisions explained, no filler.',
    },
    es: {
      title: 'Blog — Notas de Web, Marketing y Diseño | Astratta Agency Dallas',
      description:
        'Análisis de web, marketing y diseño de proyectos reales de Dallas–Fort Worth — mejoras de conversión, SEO local y decisiones de diseño explicadas, sin relleno.',
    },
  },
  '/systems': {
    en: {
      title: 'Growth Systems — Ads, Content & Follow-up | Astratta Agency Dallas',
      description:
        'Ads, content and follow-up run as one system for Dallas–Fort Worth businesses — measured in customers, not likes. Four levels from $697 to $4,500 a month.',
    },
    es: {
      title: 'Sistemas de Crecimiento — Anuncios, Contenido y Seguimiento | Astratta',
      description:
        'Anuncios, contenido y seguimiento funcionando como un solo sistema para negocios de Dallas–Fort Worth — medidos en clientes, no en likes. Cuatro niveles de $697 a $4,500 al mes.',
    },
  },
  '/foundation': {
    en: {
      title: 'Foundation — Websites, Brand & Tracking | Astratta Agency Dallas',
      description:
        'A site that converts, a brand that holds up, and measurement wired in from day one. One-time projects from $1,200 to $6,500 for Dallas–Fort Worth businesses.',
    },
    es: {
      title: 'Base — Sitios Web, Marca y Medición | Astratta Agency Dallas',
      description:
        'Un sitio que convierte, una marca que se sostiene y medición conectada desde el día uno. Proyectos de pago único de $1,200 a $6,500 para negocios de Dallas–Fort Worth.',
    },
  },
  '/diagnostic': {
    en: {
      title: 'Marketing & Website Diagnostic — Dallas, TX | Astratta',
      description:
        'A 7-day diagnostic of your funnel, tracking and local presence for Dallas–Fort Worth businesses. 10 fixes ranked by return. $297, credited if you hire us.',
    },
    es: {
      title: 'Diagnóstico de Marketing y Sitio Web — Dallas, TX | Astratta',
      description:
        'Un diagnóstico de 7 días de tu embudo, medición y presencia local en Dallas–Fort Worth. 10 arreglos ordenados por retorno. $297, acreditables al contratar.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact — Astratta Agency | Dallas–Fort Worth, TX',
      description:
        'Get in touch with Astratta Agency, a Dallas–Fort Worth web design and digital marketing studio.',
    },
    es: {
      title: 'Contacto — Astratta Agency | Dallas–Fort Worth, TX',
      description:
        'Ponte en contacto con Astratta Agency, un estudio de diseño web y marketing digital en Dallas–Fort Worth.',
    },
  },
  '/about': {
    en: {
      title: 'About — Astratta Agency | Dallas–Fort Worth Web Studio',
      description:
        'Astratta Agency is a boutique, remote-first web design and digital marketing studio based in Dallas–Fort Worth, TX — agency-level quality at small-business-friendly prices.',
    },
    es: {
      title: 'Nosotros — Astratta Agency | Estudio Web de Dallas–Fort Worth',
      description:
        'Astratta Agency es un estudio boutique y remoto de diseño web y marketing digital con sede en Dallas–Fort Worth, TX — calidad de agencia a precios accesibles para pequeños negocios.',
    },
  },
}

/** Not part of the prerendered/sitemap set (a 404 has no canonical URL to crawl), but still single-sourced. */
export const NOT_FOUND_SEO: Bilingual<{ title: string; description: string }> = {
  en: { title: 'Page not found — Astratta Agency', description: 'Page not found.' },
  es: { title: 'Página no encontrada — Astratta Agency', description: 'Página no encontrada.' },
}

/**
 * Builds the pair of entries (English + Spanish) for one canonical English
 * path. Both carry the same `alternates` map, so the hreflang block a page
 * emits and the sitemap's alternate links are generated from one source.
 */
function entriesFor(
  canonicalPath: string,
  copy: Bilingual<{ title: string; description: string }>,
): SeoEntry[] {
  const alternates: Bilingual<string> = {
    en: `https://${SITE.domain}${translatePath(canonicalPath, 'en')}`,
    es: `https://${SITE.domain}${translatePath(canonicalPath, 'es')}`,
  }

  return LANGUAGES.map((language) => ({
    path: translatePath(canonicalPath, language),
    language,
    title: copy[language].title,
    description: copy[language].description,
    url: alternates[language],
    alternates,
  }))
}

/** Reshapes a `Bilingual<{title, description}>` entry into the `<Seo title=.. description=..>` prop shape. */
export function toSeoProps(entry: Bilingual<{ title: string; description: string }>): {
  title: Bilingual<string>
  description: Bilingual<string>
} {
  return {
    title: { en: entry.en.title, es: entry.es.title },
    description: { en: entry.en.description, es: entry.es.description },
  }
}

/**
 * Every prerenderable route, in **both languages** — the manifest that
 * scripts/prerender.mjs and scripts/generate-sitemap.mjs iterate. Add a case
 * study or blog post to its data file and both language variants appear here
 * automatically, no script changes needed.
 */
export function getAllSeoRoutes(): SeoEntry[] {
  const staticRoutes = Object.entries(STATIC_SEO).flatMap(([path, copy]) => entriesFor(path, copy))

  const serviceRoutes = SERVICE_PAGES.flatMap((page) =>
    entriesFor(`/services/${page.slug}`, {
      en: { title: page.metaTitle.en, description: page.metaDescription.en },
      es: { title: page.metaTitle.es, description: page.metaDescription.es },
    }),
  )

  const caseStudyRoutes = CASE_STUDIES.flatMap((project) => {
    // Case-study titles are brand names — identical in both languages, as on the page itself.
    const description = CASE_STUDY_SEO_DESCRIPTIONS[project.slug] ?? project.summary
    const title = `${project.title} — Astratta Agency Case Study`
    return entriesFor(`/work/${project.slug}`, {
      en: { title, description: description.en },
      es: { title, description: description.es },
    })
  })

  const blogRoutes = BLOG_POSTS.flatMap((post) =>
    entriesFor(`/blog/${post.slug.en}`, {
      en: { title: post.metaTitle.en, description: post.metaDescription.en },
      es: { title: post.metaTitle.es, description: post.metaDescription.es },
    }),
  )

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes]
}
