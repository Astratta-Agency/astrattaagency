export const SITE = {
  name: 'Astratta Agency',
  domain: 'astrattaagency.com',
  email: 'info@astrattaagency.com',
  location: 'Dallas–Fort Worth, TX',
  tagline: 'Agency-level quality at small-business-friendly prices.',
  whatsapp: 'https://wa.me/19454074349',
} as const

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Audit', href: '/audit' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/astrattaagency' },
  { label: 'Facebook', href: 'https://facebook.com/astrattaagency' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/astrattaagency' },
] as const

export const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'Website Audits', href: '/audit' },
    ],
  },
  {
    title: 'Pricing',
    links: [
      { label: 'Get a quote', href: '/pricing' },
      { label: 'Packages', href: '/packages' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Case studies', href: '/work' },
      { label: 'Free website audit', href: '/audit' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: 'Get in touch', href: '/contact' },
    ],
  },
] as const

/** Lead capture endpoint (Supabase Edge Function `capture-lead`) — set VITE_FORM_ENDPOINT in .env / Vercel. */
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? ''
