import type { Bilingual } from '@/lib/i18n/types'

export const SITE = {
  name: 'Astratta Agency',
  domain: 'astrattaagency.com',
  email: 'info@astrattaagency.com',
  location: 'Dallas–Fort Worth, TX',
  tagline: {
    en: 'Agency-level quality at small-business-friendly prices.',
    es: 'Calidad de agencia a precios accesibles para pequeños negocios.',
  } satisfies Bilingual<string>,
  whatsapp: 'https://wa.me/19454074349',
} as const

export const NAV_LINKS: { label: Bilingual<string>; href: string }[] = [
  { label: { en: 'Work', es: 'Trabajo' }, href: '/work' },
  { label: { en: 'Blog', es: 'Blog' }, href: '/blog' },
  { label: { en: 'Services', es: 'Servicios' }, href: '/services' },
  { label: { en: 'Pricing', es: 'Precios' }, href: '/pricing' },
  { label: { en: 'About', es: 'Nosotros' }, href: '/about' },
  { label: { en: 'Contact', es: 'Contacto' }, href: '/contact' },
]

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/astrattaagency' },
  { label: 'Facebook', href: 'https://facebook.com/astrattaagency' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/astrattaagency' },
] as const

export const FOOTER_COLUMNS: { title: Bilingual<string>; links: { label: Bilingual<string>; href: string }[] }[] = [
  {
    title: { en: 'Services', es: 'Servicios' },
    links: [
      { label: { en: 'Web Development', es: 'Desarrollo Web' }, href: '/services/web-development' },
      { label: { en: 'Digital Marketing', es: 'Marketing Digital' }, href: '/services/digital-marketing' },
      { label: { en: 'Graphic Design', es: 'Diseño Gráfico' }, href: '/services/graphic-design' },
      { label: { en: 'Website Audits', es: 'Auditorías de Sitio Web' }, href: '/audit' },
    ],
  },
  {
    title: { en: 'Pricing', es: 'Precios' },
    links: [
      { label: { en: 'Get a quote', es: 'Cotizar' }, href: '/pricing' },
      { label: { en: 'Packages', es: 'Paquetes' }, href: '/packages' },
    ],
  },
  {
    title: { en: 'Work', es: 'Trabajo' },
    links: [
      { label: { en: 'Case studies', es: 'Casos de éxito' }, href: '/work' },
      { label: { en: 'Blog', es: 'Blog' }, href: '/blog' },
      { label: { en: 'Free website audit', es: 'Auditoría gratuita' }, href: '/audit' },
    ],
  },
  {
    title: { en: 'Contact', es: 'Contacto' },
    links: [
      { label: { en: SITE.email, es: SITE.email }, href: `mailto:${SITE.email}` },
      { label: { en: 'Get in touch', es: 'Escríbenos' }, href: '/contact' },
    ],
  },
]

/** Lead capture endpoint (Supabase Edge Function `capture-lead`) — set VITE_FORM_ENDPOINT in .env / Vercel. */
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? ''

/** Newsletter capture endpoint (Supabase Edge Function `subscribe-newsletter`) — set VITE_NEWSLETTER_ENDPOINT in .env / Vercel. */
export const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT ?? ''

/** reCAPTCHA v3 site key (public) — set VITE_RECAPTCHA_SITE_KEY in .env / Vercel. Forms skip reCAPTCHA if unset. */
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''
