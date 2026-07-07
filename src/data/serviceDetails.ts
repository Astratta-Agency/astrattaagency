export type ServiceDetail = {
  slug: string
  number: string
  title: string
  intro: string
  bullets: string[]
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'web-development',
    number: '/01',
    title: 'Web Development',
    intro:
      'Landing pages, sites, and funnels engineered around one job: turning visitors into leads. Every layout decision is made for conversion first, aesthetics second — not the other way around.',
    bullets: [
      'Conversion-first landing pages and multi-page sites',
      'Funnels built around a single clear action',
      'Fast, SEO-ready code — no bloated page builders',
      'Fully responsive, from mobile to desktop',
    ],
  },
  {
    slug: 'digital-marketing',
    number: '/02',
    title: 'Digital Marketing',
    intro:
      'IG, Facebook, LinkedIn, and Google campaigns that feed your pipeline — measured, not guessed. Every campaign ties back to a lead or sale, not just impressions.',
    bullets: [
      'Instagram & Facebook ad campaigns',
      'LinkedIn campaigns for B2B and industrial clients',
      'Google Ads for local search intent',
      'Reporting tied to leads, not vanity metrics',
    ],
  },
  {
    slug: 'graphic-design',
    number: '/03',
    title: 'Graphic Design',
    intro:
      'A visual identity that makes a small business look like the market leader — logo, color system, and templates your team can actually use consistently.',
    bullets: [
      'Logo and brand identity systems',
      'Marketing collateral and social templates',
      'Design systems that stay consistent as you grow',
      'Print and digital-ready assets',
    ],
  },
  {
    slug: 'website-audits',
    number: '/04',
    title: 'Website Audits',
    intro:
      "A prioritized action plan: what's broken, what it costs you, and how we fix it in 30 days. No jargon, no upsell pressure — just a clear diagnosis.",
    bullets: [
      'Performance & Core Web Vitals review',
      'Mobile experience and usability check',
      'Messaging and conversion path analysis',
      'SEO fundamentals audit',
    ],
  },
]
