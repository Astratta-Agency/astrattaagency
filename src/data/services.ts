export type Service = {
  number: string
  slug: string
  title: string
  description: string
  /** Resolved link target — usually `/services/{slug}`, but Website Audits routes straight to the real `/audit` page instead of a stub. */
  href: string
}

export const SERVICES: Service[] = [
  {
    number: '/01',
    slug: 'web-development',
    title: 'Web Development',
    description:
      'High-converting landing pages, business websites, and e-commerce stores — built to turn visitors into leads and sales, not just look good.',
    href: '/services/web-development',
  },
  {
    number: '/02',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'Social media, paid ads, and lead generation systems that keep your pipeline full — measured by leads and cost per lead, not likes.',
    href: '/services/digital-marketing',
  },
  {
    number: '/03',
    slug: 'graphic-design',
    title: 'Graphic Design',
    description:
      'A visual identity that makes a small business look like the market leader — logo, color system, and templates your team can actually use.',
    href: '/services/graphic-design',
  },
  {
    number: '/04',
    slug: 'website-audits',
    title: 'Website Audits',
    description:
      "A prioritized action plan: what's broken, what it's costing you, and how we fix it in 30 days.",
    href: '/audit',
  },
]
