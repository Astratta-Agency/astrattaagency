import { SITE } from '@/lib/constants'
import { SERVICE_PAGES } from '@/data/pricing'
import { CASE_STUDIES } from '@/data/caseStudies'
import { BLOG_POSTS } from '@/data/blogPosts'
import { INDUSTRIES } from '@/data/industries'
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
      title: 'Pricing — What Web Design & Marketing Costs in Dallas | Astratta',
      description:
        'No hidden pricing and no menu. The ranges for a diagnostic, a foundation build and a monthly growth system for Dallas–Fort Worth businesses, and what moves them.',
    },
    es: {
      title: 'Precios — Cuánto Cuesta Diseño Web y Marketing en Dallas | Astratta',
      description:
        'Sin precios escondidos y sin menú. Los rangos del diagnóstico, la base y el sistema mensual para negocios de Dallas–Fort Worth, y qué los mueve.',
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
  '/industries': {
    en: {
      title: 'Marketing by Industry — Med Spa, Contractors, Restaurants | Astratta',
      description:
        'Same system, different mix. Marketing built around how your industry actually buys — med spas, contractors, restaurants and real estate in Dallas–Fort Worth.',
    },
    es: {
      title: 'Marketing por Industria — Med Spa, Contratistas, Restaurantes | Astratta',
      description:
        'Mismo sistema, distinta mezcla. Marketing construido según cómo compra tu industria — med spas, contratistas, restaurantes y bienes raíces en Dallas–Fort Worth.',
    },
  },
  '/growth-score': {
    en: {
      title: 'Free Growth Score — Rate Your Marketing in 4 Minutes | Astratta',
      description:
        'Twelve questions, four minutes, free. Score your marketing across the five systems that decide whether a Dallas–Fort Worth business grows predictably.',
    },
    es: {
      title: 'Growth Score Gratis — Evalúa tu Marketing en 4 Minutos | Astratta',
      description:
        'Doce preguntas, cuatro minutos, gratis. Evalúa tu marketing en los cinco sistemas que deciden si un negocio de Dallas–Fort Worth crece de forma predecible.',
    },
  },
  '/how-it-works': {
    en: {
      title: 'How We Work — Diagnostic, Foundation, Engine | Astratta Dallas',
      description:
        'One system instead of a menu of services: a diagnostic first, then the foundation, then the engine. How Astratta works with Dallas–Fort Worth businesses.',
    },
    es: {
      title: 'Cómo Trabajamos — Diagnóstico, Base y Motor | Astratta Dallas',
      description:
        'Un sistema en vez de un menú de servicios: primero el diagnóstico, después la base y luego el motor. Así trabaja Astratta con negocios de Dallas–Fort Worth.',
    },
  },
  '/systems': {
    en: {
      title: 'Digital Marketing Systems for Dallas Businesses | Astratta',
      description:
        'Content, paid ads and follow-up automation running as one system. Four levels from $697 to $4,500/month for Dallas–Fort Worth businesses. Measured in leads.',
    },
    es: {
      title: 'Marketing Digital para Negocios de Dallas | Astratta',
      description:
        'Contenido, publicidad paga y automatización de seguimiento en un solo sistema. Cuatro niveles de $697 a $4,500/mes para negocios de Dallas–Fort Worth.',
    },
  },
  '/foundation': {
    en: {
      title: 'Website Design & Brand Foundation — Dallas, TX | Astratta',
      description:
        'High-converting websites, brand identity and tracking built together. Three levels from $1,200 to $6,500 for Dallas–Fort Worth businesses. Flat pricing.',
    },
    es: {
      title: 'Diseño Web y Marca para Negocios de Dallas | Astratta',
      description:
        'Sitios que convierten, identidad de marca y medición construidos juntos. Tres niveles de $1,200 a $6,500 para negocios de Dallas–Fort Worth. Precio cerrado.',
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

  const industryRoutes = INDUSTRIES.flatMap((industry) =>
    entriesFor(`/industries/${industry.slug}`, {
      en: { title: `${industry.heading.en} | Astratta`, description: industry.subtext.en },
      es: { title: `${industry.heading.es} | Astratta`, description: industry.subtext.es },
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

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...caseStudyRoutes, ...blogRoutes]
}
