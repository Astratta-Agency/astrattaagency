import type { Bilingual, Language } from '@/lib/i18n/types'
import { resolveTier, type AddOn, type PricingTier, type PricingTierSource } from '@/data/pricing'

/**
 * Fase 1 de la arquitectura: LA BASE. Proyectos de pago único.
 * Copy y precios de docs/CONTENIDO-Web-EN-ES.md §3 — fuente única.
 */
export const FOUNDATION_TIERS: PricingTierSource[] = [
  {
    slug: 'foundation-lite',
    name: { en: 'Foundation Lite', es: 'Foundation Lite' },
    price: '$1,200',
    cadence: { en: 'one-time', es: 'pago único' },
    bestFor: {
      en: 'You need something live now, to run ads to.',
      es: 'Necesitas algo en línea ya, para correr anuncios.',
    },
    features: {
      en: [
        '1 landing page',
        'Conversion copywriting',
        'Brand applied',
        'Lead capture form',
        'GA4 + Meta Pixel + CAPI + UTMs',
        'Google Business Profile',
        '2 revision rounds',
        '1 month post-launch support',
        'Delivered in 10 days',
      ],
      es: [
        '1 landing page',
        'Copy de conversión',
        'Aplicación de marca',
        'Formulario de captura',
        'GA4 + Meta Pixel + CAPI + UTMs',
        'Google Business Profile',
        '2 rondas de revisión',
        '1 mes de soporte post-lanzamiento',
        'Entrega en 10 días',
      ],
    },
  },
  {
    slug: 'foundation',
    name: { en: 'Foundation', es: 'Foundation' },
    price: '$3,500',
    cadence: { en: 'one-time', es: 'pago único' },
    recommended: true,
    bestFor: {
      en: 'The standard for established DFW businesses.',
      es: 'El estándar para negocios establecidos en DFW.',
    },
    features: {
      en: [
        '5–7 pages',
        'Per-page conversion copywriting',
        'Full graphic design and brand identity for Dallas businesses — logo, color system, typography',
        'Full tracking stack',
        'CRM-connected forms',
        'Google Business Profile optimized',
        'On-page SEO + local schema',
        '2 revision rounds',
        '2 months post-launch support',
        'Delivered in 3–4 weeks',
      ],
      es: [
        '5–7 páginas',
        'Copy de conversión por página',
        'Diseño gráfico e identidad de marca completa para negocios de Dallas — logo, sistema de color, tipografía',
        'Medición completa',
        'Formularios conectados a CRM',
        'Google Business Profile optimizado',
        'SEO on-page + schema local',
        '2 rondas de revisión',
        '2 meses de soporte post-lanzamiento',
        'Entrega en 3–4 semanas',
      ],
    },
  },
  {
    slug: 'foundation-pro',
    name: { en: 'Foundation Pro', es: 'Foundation Pro' },
    price: '$6,500',
    cadence: { en: 'one-time', es: 'pago único' },
    bestFor: {
      en: 'You want to show up in Google from day one.',
      es: 'Quieres aparecer en Google desde el primer día.',
    },
    features: {
      en: [
        'Everything in Foundation, plus:',
        '8–12 pages',
        'Service × city pages for local search',
        'Keyword research (20 terms)',
        '10 optimized articles',
        'Internal linking strategy',
        'Search Console + rank tracking',
        'Multi-step forms',
        'Complete brand system with templates',
        '3 revision rounds',
        '3 months support',
        'Delivered in 6 weeks',
      ],
      es: [
        'Todo lo de Foundation, más:',
        '8–12 páginas',
        'Páginas de servicio × ciudad para búsqueda local',
        'Investigación de 20 palabras clave',
        '10 artículos optimizados',
        'Estrategia de enlazado interno',
        'Search Console + seguimiento de posiciones',
        'Formularios multi-paso',
        'Sistema de marca completo con plantillas',
        '3 rondas de revisión',
        '3 meses de soporte',
        'Entrega en 6 semanas',
      ],
    },
  },
]

const FOUNDATION_ADDON_SOURCES: { name: Bilingual<string>; price: string }[] = [
  { name: { en: 'Extra page', es: 'Página adicional' }, price: '$400' },
  { name: { en: 'Advanced multi-step form', es: 'Formulario avanzado multi-paso' }, price: '$300' },
  { name: { en: 'E-commerce setup', es: 'Tienda en línea' }, price: 'from $2,500' },
  { name: { en: 'Additional optimized article', es: 'Artículo optimizado adicional' }, price: '$150' },
]

export function resolveFoundationTiers(language: Language): PricingTier[] {
  return FOUNDATION_TIERS.map((tier) => resolveTier(tier, language))
}

export function resolveFoundationAddOns(language: Language): AddOn[] {
  return FOUNDATION_ADDON_SOURCES.map(({ name, price }) => ({
    name: name[language],
    price: language === 'es' && price.startsWith('from ') ? price.replace('from ', 'desde ') : price,
  }))
}
