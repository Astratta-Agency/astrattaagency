import { SITE } from '@/lib/constants'
import type { FaqItem, PricingTier } from '@/data/pricing'

const LOCAL_BUSINESS = {
  '@type': 'LocalBusiness',
  name: SITE.name,
  url: `https://${SITE.domain}`,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas–Fort Worth',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
} as const

const AREA_SERVED = {
  '@type': 'City',
  name: 'Dallas–Fort Worth',
} as const

/** Strips a display price like "From $8,500" or "$450/mo" down to a bare numeric string for schema.org's `price`. */
function parsePriceValue(price: string): string | undefined {
  const match = price.match(/[\d,]+(\.\d+)?/)
  return match ? match[0].replace(/,/g, '') : undefined
}

export function buildServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: LOCAL_BUSINESS,
    areaServed: AREA_SERVED,
  }
}

/**
 * Returns a flat array of `Offer` objects — attach directly to a Service
 * schema's `offers` property (schema.org allows multiple values there via a
 * JSON-LD array). Simpler and just as valid as wrapping in `hasOfferCatalog`/
 * `OfferCatalog`, and there's no dedicated "Service" rich result in Google
 * Search to optimize the extra nesting for — flat Offers pass Rich Results
 * Test's generic schema.org validation cleanly.
 */
export function buildOfferSchema(tiers: PricingTier[]) {
  return tiers.map((tier) => ({
    '@type': 'Offer',
    name: tier.name,
    price: parsePriceValue(tier.price),
    priceCurrency: 'USD',
    description: tier.bestFor,
    ...(tier.cadence ? { eligibleDuration: tier.cadence } : {}),
  }))
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
