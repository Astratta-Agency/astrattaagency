import type { Bilingual } from '@/lib/i18n/types'

export type BundleComponent = {
  label: Bilingual<string>
  href: string
}

export type Bundle = {
  slug: string
  name: Bilingual<string>
  badge?: Bilingual<string>
  components: BundleComponent[]
  /** Struck-through reference price shown when the bundle carries a discount. */
  separatelyLine?: Bilingual<string>
  /** The bundle's actual price — always shown, big. */
  priceLine: Bilingual<string>
  savingsNote?: Bilingual<string>
  bestFor: Bilingual<string>
}

/**
 * Cross-category combos — source: both CSVs' "Combos naturales" sections.
 * Note: "Social → Leads"' separately/bundled figures ($1,050 → $950/mo) come
 * straight from that source sheet and do not arithmetically match summing
 * Social Growth ($750/mo) + Social + Lead Magnet Deluxe ($750/mo) as full
 * standalone tiers from data/pricing.ts ($1,500/mo) — Lead Magnet Deluxe is
 * itself built as "everything in Social Growth" plus more, so the combo is
 * likely Growth-plus-upgrade-increment, not two stacked full-price tiers.
 * Flagged for confirmation, not silently reconciled either way.
 */
export const BUNDLES: Bundle[] = [
  {
    slug: 'social-to-leads',
    name: { en: 'Social → Leads', es: 'Redes → Leads' },
    badge: { en: 'Most popular', es: 'Más popular' },
    components: [
      { label: { en: 'Social Growth', es: 'Social Growth' }, href: '/services/social-media' },
      {
        label: { en: 'Social + Lead Magnet Deluxe', es: 'Social + Lead Magnet Deluxe' },
        href: '/services/social-media',
      },
    ],
    separatelyLine: { en: '$1,050/mo', es: '$1,050/mes' },
    priceLine: { en: '$950/mo', es: '$950/mes' },
    savingsNote: { en: 'Save $100/mo', es: 'Ahorra $100/mes' },
    bestFor: {
      en: 'Businesses that want organic lead flow without ad spend.',
      es: 'Negocios que quieren flujo orgánico de leads sin inversión publicitaria.',
    },
  },
  {
    slug: 'web-plus-ads',
    name: { en: 'Web + Ads', es: 'Web + Anuncios' },
    components: [
      { label: { en: 'Landing Essentials', es: 'Landing Essentials' }, href: '/services/web-development' },
      { label: { en: 'Ads Prospecting', es: 'Ads Prospecting' }, href: '/services/paid-ads' },
    ],
    priceLine: { en: '$800 one-time + $200/mo', es: '$800 pago único + $200/mes' },
    bestFor: {
      en: 'Startups that need a fast page and immediate traffic.',
      es: 'Startups que necesitan una página rápida y tráfico inmediato.',
    },
  },
  {
    slug: 'website-plus-social',
    name: { en: 'Website + Social', es: 'Sitio Web + Redes' },
    components: [
      { label: { en: 'Website Core', es: 'Website Core' }, href: '/services/web-development' },
      {
        label: { en: 'Social Presence (bundled rate)', es: 'Social Presence (tarifa combinada)' },
        href: '/services/social-media',
      },
    ],
    priceLine: { en: '$2,000 one-time + $450/mo', es: '$2,000 pago único + $450/mes' },
    bestFor: {
      en: 'SMBs building complete online presence at once.',
      es: 'Pymes construyendo presencia online completa de una vez.',
    },
  },
  {
    slug: 'full-funnel',
    name: { en: 'Full Funnel', es: 'Embudo Completo' },
    components: [
      { label: { en: 'Landing Essentials', es: 'Landing Essentials' }, href: '/services/web-development' },
      { label: { en: 'Ads + Retargeting', es: 'Ads + Retargeting' }, href: '/services/paid-ads' },
      {
        label: { en: 'Social Growth (bundled rate)', es: 'Social Growth (tarifa combinada)' },
        href: '/services/social-media',
      },
    ],
    priceLine: { en: '$800 one-time + $900/mo', es: '$800 pago único + $900/mes' },
    bestFor: {
      en: 'Coaches, consultants, and SaaS companies selling services.',
      es: 'Coaches, consultores y empresas de SaaS que venden servicios.',
    },
  },
  {
    slug: 'the-store-that-sells',
    name: { en: 'The Store That Sells', es: 'La Tienda Que Vende' },
    components: [
      { label: { en: 'E-commerce Growth', es: 'E-commerce Growth' }, href: '/services/ecommerce' },
      { label: { en: 'Ads + Retargeting', es: 'Ads + Retargeting' }, href: '/services/paid-ads' },
    ],
    separatelyLine: { en: '$5,000 + $650/mo', es: '$5,000 + $650/mes' },
    priceLine: { en: '$5,000 + $600/mo', es: '$5,000 + $600/mes' },
    savingsNote: { en: 'Save $50/mo', es: 'Ahorra $50/mes' },
    bestFor: {
      en: 'Retailers ready to treat their store as a real sales channel, not just a catalog.',
      es: 'Minoristas listos para tratar su tienda como un canal de ventas real, no solo un catálogo.',
    },
  },
  {
    slug: 'launch-complete',
    name: { en: 'Launch Complete', es: 'Lanzamiento Completo' },
    components: [
      { label: { en: 'E-commerce Starter', es: 'E-commerce Starter' }, href: '/services/ecommerce' },
      { label: { en: 'Social Growth', es: 'Social Growth' }, href: '/services/social-media' },
    ],
    separatelyLine: { en: '$2,800 + $900/mo', es: '$2,800 + $900/mes' },
    priceLine: { en: '$2,800 + $850/mo', es: '$2,800 + $850/mes' },
    savingsNote: { en: 'Save $50/mo', es: 'Ahorra $50/mes' },
    bestFor: {
      en: 'New product businesses launching their first real online store.',
      es: 'Negocios de productos nuevos lanzando su primera tienda online real.',
    },
  },
]

export type PhraseRow = {
  saying: Bilingual<string>
  weAsk: Bilingual<string>
  weRecommend: Bilingual<string>
}

export const PHRASE_TABLE: PhraseRow[] = [
  {
    saying: { en: '"I just want social media"', es: '"Solo quiero redes sociales"' },
    weAsk: { en: 'Leads or just presence?', es: '¿Leads o solo presencia?' },
    weRecommend: {
      en: 'Social Growth + Lead Magnet if leads matter',
      es: 'Social Growth + Lead Magnet si los leads importan',
    },
  },
  {
    saying: { en: '"I just want a website"', es: '"Solo quiero un sitio web"' },
    weAsk: { en: 'Do you need traffic too?', es: '¿También necesitas tráfico?' },
    weRecommend: {
      en: 'Website Core alone, or Website + Ads if yes',
      es: 'Website Core solo, o Website + Anuncios si sí',
    },
  },
  {
    saying: { en: '"I just want ads"', es: '"Solo quiero anuncios"' },
    weAsk: { en: "Where's the traffic going?", es: '¿A dónde va el tráfico?' },
    weRecommend: {
      en: 'Ads + Landing Essentials at minimum',
      es: 'Ads + Landing Essentials como mínimo',
    },
  },
  {
    saying: { en: '"My website is outdated"', es: '"Mi sitio web está desactualizado"' },
    weAsk: { en: 'Audit first ($400) → plan', es: 'Auditoría primero ($400) → plan' },
    weRecommend: {
      en: 'Conversion Funnel or Website + SEO Foundation',
      es: 'Embudo de Conversión o Website + Fundamento SEO',
    },
  },
  {
    saying: { en: '"I want more visibility"', es: '"Quiero más visibilidad"' },
    weAsk: {
      en: 'Visibility for what — leads, authority, traffic?',
      es: '¿Visibilidad para qué — leads, autoridad, tráfico?',
    },
    weRecommend: {
      en: 'Depends — Social Authority or Website Core',
      es: 'Depende — Social Authority o Website Core',
    },
  },
]
