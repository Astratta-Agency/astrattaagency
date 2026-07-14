export type BundleComponent = {
  label: string
  href: string
}

export type Bundle = {
  slug: string
  name: string
  badge?: string
  components: BundleComponent[]
  /** Struck-through reference price shown when the bundle carries a discount. */
  separatelyLine?: string
  /** The bundle's actual price — always shown, big. */
  priceLine: string
  savingsNote?: string
  bestFor: string
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
    name: 'Social → Leads',
    badge: 'Most popular',
    components: [
      { label: 'Social Growth', href: '/services/social-media' },
      { label: 'Social + Lead Magnet Deluxe', href: '/services/social-media' },
    ],
    separatelyLine: '$1,050/mo',
    priceLine: '$950/mo',
    savingsNote: 'Save $100/mo',
    bestFor: 'Businesses that want organic lead flow without ad spend.',
  },
  {
    slug: 'web-plus-ads',
    name: 'Web + Ads',
    components: [
      { label: 'Landing Essentials', href: '/services/web-development' },
      { label: 'Ads Prospecting', href: '/services/paid-ads' },
    ],
    priceLine: '$800 one-time + $200/mo',
    bestFor: 'Startups that need a fast page and immediate traffic.',
  },
  {
    slug: 'website-plus-social',
    name: 'Website + Social',
    components: [
      { label: 'Website Core', href: '/services/web-development' },
      { label: 'Social Presence (bundled rate)', href: '/services/social-media' },
    ],
    priceLine: '$2,000 one-time + $450/mo',
    bestFor: 'SMBs building complete online presence at once.',
  },
  {
    slug: 'full-funnel',
    name: 'Full Funnel',
    components: [
      { label: 'Landing Essentials', href: '/services/web-development' },
      { label: 'Ads + Retargeting', href: '/services/paid-ads' },
      { label: 'Social Growth (bundled rate)', href: '/services/social-media' },
    ],
    priceLine: '$800 one-time + $900/mo',
    bestFor: 'Coaches, consultants, and SaaS companies selling services.',
  },
  {
    slug: 'the-store-that-sells',
    name: 'The Store That Sells',
    components: [
      { label: 'E-commerce Growth', href: '/services/ecommerce' },
      { label: 'Ads + Retargeting', href: '/services/paid-ads' },
    ],
    separatelyLine: '$5,000 + $650/mo',
    priceLine: '$5,000 + $600/mo',
    savingsNote: 'Save $50/mo',
    bestFor: 'Retailers ready to treat their store as a real sales channel, not just a catalog.',
  },
  {
    slug: 'launch-complete',
    name: 'Launch Complete',
    components: [
      { label: 'E-commerce Starter', href: '/services/ecommerce' },
      { label: 'Social Growth', href: '/services/social-media' },
    ],
    separatelyLine: '$2,800 + $900/mo',
    priceLine: '$2,800 + $850/mo',
    savingsNote: 'Save $50/mo',
    bestFor: 'New product businesses launching their first real online store.',
  },
]

export type PhraseRow = {
  saying: string
  weAsk: string
  weRecommend: string
}

export const PHRASE_TABLE: PhraseRow[] = [
  {
    saying: '"I just want social media"',
    weAsk: 'Leads or just presence?',
    weRecommend: 'Social Growth + Lead Magnet if leads matter',
  },
  {
    saying: '"I just want a website"',
    weAsk: 'Do you need traffic too?',
    weRecommend: 'Website Core alone, or Website + Ads if yes',
  },
  {
    saying: '"I just want ads"',
    weAsk: "Where's the traffic going?",
    weRecommend: 'Ads + Landing Essentials at minimum',
  },
  {
    saying: '"My website is outdated"',
    weAsk: 'Audit first ($400) → plan',
    weRecommend: 'Conversion Funnel or Website + SEO Foundation',
  },
  {
    saying: '"I want more visibility"',
    weAsk: 'Visibility for what — leads, authority, traffic?',
    weRecommend: 'Depends — Social Authority or Website Core',
  },
]
