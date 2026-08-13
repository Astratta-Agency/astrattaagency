import type { Bilingual } from '@/lib/i18n/types'

export type Service = {
  number: string
  slug: string
  title: Bilingual<string>
  description: Bilingual<string>
  /** Resolved link target — usually `/services/{slug}`, but Website Audits routes straight to the real `/audit` page instead of a stub. */
  href: string
}

export const SERVICES: Service[] = [
  {
    number: '/01',
    slug: 'web-development',
    title: { en: 'Web Development', es: 'Desarrollo Web' },
    description: {
      en: 'High-converting landing pages, business websites, and e-commerce stores — built to turn visitors into leads and sales, not just look good.',
      es: 'Landing pages, sitios web de negocios y tiendas de e-commerce de alta conversión — creados para convertir visitantes en leads y ventas, no solo para verse bien.',
    },
    href: '/services/web-development',
  },
  {
    number: '/02',
    slug: 'digital-marketing',
    title: { en: 'Digital Marketing', es: 'Marketing Digital' },
    description: {
      en: 'Social media, paid ads, and lead generation systems that keep your pipeline full — measured by leads and cost per lead, not likes.',
      es: 'Redes sociales, anuncios pagados y sistemas de generación de leads que mantienen tu embudo lleno — medidos por leads y costo por lead, no por likes.',
    },
    href: '/services/digital-marketing',
  },
  {
    number: '/03',
    slug: 'graphic-design',
    title: { en: 'Graphic Design', es: 'Diseño Gráfico' },
    description: {
      en: 'A visual identity that makes a small business look like the market leader — logo, color system, and templates your team can actually use.',
      es: 'Una identidad visual que hace que un pequeño negocio se vea como el líder del mercado — logo, sistema de color y plantillas que tu equipo realmente puede usar.',
    },
    href: '/services/graphic-design',
  },
  {
    number: '/04',
    slug: 'website-audits',
    title: { en: 'Website Audits', es: 'Auditorías de Sitio Web' },
    description: {
      en: "A prioritized action plan: what's broken, what it's costing you, and how we fix it in 30 days.",
      es: 'Un plan de acción priorizado: qué está fallando, cuánto te está costando y cómo lo arreglamos en 30 días.',
    },
    href: '/audit',
  },
]
