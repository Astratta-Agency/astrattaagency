import { SITE } from '@/lib/constants'
import { SERVICE_PAGES } from '@/data/pricing'
import { CASE_STUDIES } from '@/data/caseStudies'

export type SeoEntry = {
  path: string
  title: string
  description: string
  url: string
}

/**
 * Per-project meta description overrides — used when a case study has a
 * concrete, citable stat worth leading with instead of the generic summary.
 * Falls back to `project.summary` for every other project. Consumed by both
 * CaseStudy.tsx (runtime) and scripts/prerender.mjs (build time).
 */
export const CASE_STUDY_SEO_DESCRIPTIONS: Record<string, string> = {
  'perreando-hotdog-social-media':
    'Case study: Perreando HotDog went from zero online presence to 292K+ views across TikTok, Instagram, and Facebook in 90 days — with $0 ad spend.',
}

/**
 * SEO copy for every static (non-parameterized) route. Single source of
 * truth for both the runtime <Seo> component (each page imports its entry
 * here instead of hardcoding title/description) and the prerender script.
 */
export const STATIC_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Astratta Agency — Web Design & Digital Marketing in Dallas, TX',
    description:
      'Astratta builds high-converting websites, funnels, and digital marketing campaigns for Dallas–Fort Worth startups and small businesses. Get a free website audit.',
  },
  '/work': {
    title: 'Our Work — Astratta Agency | Web Design Case Studies, Dallas TX',
    description:
      'Case studies from Astratta Agency: high-converting websites, funnels, and digital marketing for Dallas–Fort Worth startups and small businesses.',
  },
  '/services': {
    title: 'Services — Web Development, E-commerce, Marketing & Design | Astratta Agency',
    description:
      'Web development, e-commerce, digital marketing, graphic design, and website audits for Dallas–Fort Worth startups and small businesses — from Astratta Agency.',
  },
  '/services/digital-marketing': {
    title: 'Digital Marketing for Dallas Businesses — Social, Ads & Lead Gen | Astratta',
    description:
      'Social media management, paid ads (Meta/Google), and full lead generation systems for Dallas–Fort Worth startups and SMBs — every plan reports leads and cost per lead, not vanity metrics.',
  },
  '/pricing': {
    title: 'Get a Custom Quote — Web Design & Marketing Pricing | Astratta Agency Dallas',
    description:
      'Answer a few questions and get a recommended service combination with estimated pricing — for Dallas–Fort Worth businesses evaluating web design, e-commerce, marketing, or design services.',
  },
  '/packages': {
    title: 'Service Bundles & Packages — Save on Combined Services | Astratta Agency',
    description:
      'Pre-built combinations of web development, e-commerce, marketing, and social media services for Dallas businesses — bundled at a lower combined rate than buying separately.',
  },
  '/audit': {
    title: 'Free Website Audit — Astratta Agency | Dallas, TX',
    description:
      'Get a free website audit from Astratta Agency: a prioritized action plan covering performance, mobile UX, messaging, conversion paths, and SEO — for Dallas–Fort Worth businesses.',
  },
  '/contact': {
    title: 'Contact — Astratta Agency | Dallas–Fort Worth, TX',
    description:
      'Get in touch with Astratta Agency, a Dallas–Fort Worth web design and digital marketing studio.',
  },
  '/about': {
    title: 'About — Astratta Agency | Dallas–Fort Worth Web Studio',
    description:
      'Astratta Agency is a boutique, remote-first web design and digital marketing studio based in Dallas–Fort Worth, TX — agency-level quality at small-business-friendly prices.',
  },
}

/** Not part of the prerendered/sitemap set (a 404 has no canonical URL to crawl), but still single-sourced. */
export const NOT_FOUND_SEO = {
  title: 'Page not found — Astratta Agency',
  description: 'Page not found.',
}

function withUrl(path: string, data: { title: string; description: string }): SeoEntry {
  return { path, ...data, url: `https://${SITE.domain}${path}` }
}

/**
 * Every prerenderable route (the 15 pages in public/sitemap.xml, plus one
 * per case study) with fully-resolved title/description/url. This is the
 * list scripts/prerender.mjs iterates to generate static HTML per route —
 * add a case study to caseStudies.ts and it's automatically included here,
 * no script changes needed.
 */
export function getAllSeoRoutes(): SeoEntry[] {
  const staticRoutes = Object.entries(STATIC_SEO).map(([path, data]) => withUrl(path, data))

  const serviceRoutes = SERVICE_PAGES.map((page) =>
    withUrl(`/services/${page.slug}`, { title: page.metaTitle, description: page.metaDescription }),
  )

  const caseStudyRoutes = CASE_STUDIES.map((project) =>
    withUrl(`/work/${project.slug}`, {
      title: `${project.title} — Astratta Agency Case Study`,
      description: CASE_STUDY_SEO_DESCRIPTIONS[project.slug] ?? project.summary,
    }),
  )

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes]
}
