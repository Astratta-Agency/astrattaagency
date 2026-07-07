export type Service = {
  number: string
  slug: string
  title: string
  description: string
}

export const SERVICES: Service[] = [
  {
    number: '/01',
    slug: 'web-development',
    title: 'Web Development',
    description:
      'Landing pages, sites, and funnels engineered around one job: turning visitors into leads.',
  },
  {
    number: '/02',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'IG, Facebook, LinkedIn, and Google campaigns that feed your pipeline — measured, not guessed.',
  },
  {
    number: '/03',
    slug: 'graphic-design',
    title: 'Graphic Design',
    description: 'A visual identity that makes a small business look like the market leader.',
  },
  {
    number: '/04',
    slug: 'website-audits',
    title: 'Website Audits',
    description:
      "A prioritized action plan: what's broken, what it costs you, and how we fix it in 30 days.",
  },
]

export const WE_DO_ITEMS = [
  'Brand & Graphic Design',
  'Web Development',
  'Digital Marketing',
  'Website Audits',
] as const
