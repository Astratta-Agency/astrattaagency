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

/**
 * Nav principal (docs/CONTENIDO-Web-EN-ES.md §7).
 * `children` convierte la entrada en desplegable — hoy solo Industrias.
 * Blog, Pricing y Contact salen del nav y viven en el footer.
 */
export type NavLink = {
  label: Bilingual<string>
  href: string
  children?: { label: Bilingual<string>; href: string }[]
}

export const NAV_LINKS: NavLink[] = [
  { label: { en: 'How it works', es: 'Cómo trabajamos' }, href: '/how-it-works' },
  { label: { en: 'Systems', es: 'Sistemas' }, href: '/systems' },
  { label: { en: 'Foundation', es: 'Base' }, href: '/foundation' },
  {
    label: { en: 'Industries', es: 'Industrias' },
    href: '/industries',
    children: [
      { label: { en: 'Med Spas', es: 'Med Spas' }, href: '/industries/med-spa' },
      { label: { en: 'Home Improvement', es: 'Remodelación' }, href: '/industries/home-improvement' },
      { label: { en: 'Restaurants', es: 'Restaurantes' }, href: '/industries/restaurants' },
      { label: { en: 'Real Estate', es: 'Bienes Raíces' }, href: '/industries/real-estate' },
    ],
  },
  { label: { en: 'Work', es: 'Trabajos' }, href: '/work' },
  { label: { en: 'About', es: 'Nosotros' }, href: '/about' },
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
      // Brand/graphic design lives inside Foundation now (§12: /services/graphic-design → 301 /foundation).
      { label: { en: 'Graphic Design', es: 'Diseño Gráfico' }, href: '/foundation' },
      { label: { en: 'Diagnostic', es: 'Diagnóstico' }, href: '/diagnostic' },
    ],
  },
  {
    title: { en: 'Pricing', es: 'Precios' },
    links: [
      { label: { en: 'Get a quote', es: 'Cotizar' }, href: '/pricing' },
      { label: { en: 'Growth Systems', es: 'Sistemas' }, href: '/systems' },
    ],
  },
  {
    title: { en: 'Work', es: 'Trabajo' },
    links: [
      { label: { en: 'Case studies', es: 'Casos de éxito' }, href: '/work' },
      { label: { en: 'Blog', es: 'Blog' }, href: '/blog' },
      { label: { en: 'Get your diagnostic — $297', es: 'Agenda tu diagnóstico — $297' }, href: '/diagnostic' },
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
