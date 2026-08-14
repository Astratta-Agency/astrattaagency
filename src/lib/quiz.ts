import { getServicePage, type PricingTierSource } from '@/data/pricing'
import type { Bilingual } from '@/lib/i18n/types'

export type GoalId = 'leads' | 'ecommerce' | 'brand' | 'fix-website'
export type CurrentStateId = 'website' | 'social' | 'ads' | 'none'
export type InterestId =
  | 'web-development'
  | 'ecommerce'
  | 'social-media'
  | 'paid-ads'
  | 'lead-generation'
  | 'graphic-design'
  | 'website-audits'

export type QuizAnswers = {
  goal: GoalId | null
  currentState: CurrentStateId[]
  interests: InterestId[]
}

export const INITIAL_ANSWERS: QuizAnswers = { goal: null, currentState: [], interests: [] }

/** Visible quiz UI labels — bilingual, resolved by the page with `pick()`. */
export const GOAL_OPTIONS: { id: GoalId; label: Bilingual<string> }[] = [
  { id: 'leads', label: { en: 'Get more leads', es: 'Conseguir más leads' } },
  { id: 'ecommerce', label: { en: 'Sell products online', es: 'Vender productos en línea' } },
  { id: 'brand', label: { en: 'Build brand authority', es: 'Construir autoridad de marca' } },
  {
    id: 'fix-website',
    label: { en: "Fix a website that isn't converting", es: 'Arreglar un sitio que no está convirtiendo' },
  },
]

export const CURRENT_STATE_OPTIONS: { id: CurrentStateId; label: Bilingual<string> }[] = [
  { id: 'website', label: { en: 'A website', es: 'Un sitio web' } },
  { id: 'social', label: { en: 'Social media presence', es: 'Presencia en redes sociales' } },
  { id: 'ads', label: { en: 'Running ads', es: 'Anuncios activos' } },
  { id: 'none', label: { en: 'None of the above yet', es: 'Ninguno de estos todavía' } },
]

export const INTEREST_OPTIONS: { id: InterestId; label: Bilingual<string> }[] = [
  { id: 'web-development', label: { en: 'Web Development', es: 'Desarrollo Web' } },
  { id: 'ecommerce', label: { en: 'E-commerce', es: 'E-commerce' } },
  { id: 'social-media', label: { en: 'Social Media', es: 'Redes Sociales' } },
  { id: 'paid-ads', label: { en: 'Paid Ads', es: 'Anuncios Pagados' } },
  { id: 'lead-generation', label: { en: 'Lead Generation System', es: 'Sistema de Generación de Leads' } },
  { id: 'graphic-design', label: { en: 'Graphic Design', es: 'Diseño Gráfico' } },
]

/** Shown as its own card in step 3 — it's the usual entry point, not a bundle component. */
export const AUDIT_INTEREST: { id: InterestId; label: Bilingual<string> } = {
  id: 'website-audits',
  label: { en: 'Diagnostic', es: 'Diagnóstico' },
}

/**
 * Internal-only English labels for the lead-capture summary sent to the
 * CRM (see buildQuizSummary) — deliberately NOT derived from the bilingual
 * *_OPTIONS above, so the visible quiz UI can be translated without ever
 * affecting the internal sales record, which stays English regardless of
 * site language (same rationale as the footer copyright: internal data,
 * not visitor-facing content).
 */
const GOAL_LABELS: Record<GoalId, string> = {
  leads: 'Get more leads',
  ecommerce: 'Sell products online',
  brand: 'Build brand authority',
  'fix-website': "Fix a website that isn't converting",
}
const STATE_LABELS: Record<CurrentStateId, string> = {
  website: 'A website',
  social: 'Social media presence',
  ads: 'Running ads',
  none: 'None of the above yet',
}
const INTEREST_LABELS: Record<InterestId, string> = {
  'web-development': 'Web Development',
  ecommerce: 'E-commerce',
  'social-media': 'Social Media',
  'paid-ads': 'Paid Ads',
  'lead-generation': 'Lead Generation System',
  'graphic-design': 'Graphic Design',
  'website-audits': 'Website Audits',
}

/** Strips a display price like "From $8,500" or "$450/mo" down to a bare number for quote math. */
function priceToNumber(price: string): number {
  const match = price.match(/[\d,]+(\.\d+)?/)
  return match ? Number(match[0].replace(/,/g, '')) : 0
}

function tierBySlug(pageSlug: string, tierSlug: string): { title: Bilingual<string>; tier: PricingTierSource } {
  const page = getServicePage(pageSlug)
  const tier = page?.tiers.find((t) => t.slug === tierSlug)
  if (!page || !tier) throw new Error(`Unknown tier: ${pageSlug}/${tierSlug}`)
  return { title: page.title, tier }
}

export type RecommendationLine = {
  key: string
  serviceTitle: Bilingual<string>
  href: string
  tierLabel: Bilingual<string>
  low: number
  high: number
}

export type RecommendationResult = {
  lines: RecommendationLine[]
  lowTotal: number
  highTotal: number
  intro: Bilingual<string>
}

function combineTierNames(low: string, high: string): string {
  return low === high ? low : `${low} – ${high}`
}

function rangeLine(pageSlug: string, lowTierSlug: string, highTierSlug: string): RecommendationLine {
  const low = tierBySlug(pageSlug, lowTierSlug)
  const high = tierBySlug(pageSlug, highTierSlug)
  const lowNum = priceToNumber(low.tier.price)
  const highNum = priceToNumber(high.tier.price)
  const sameTier = low.tier.slug === high.tier.slug
  return {
    key: pageSlug,
    serviceTitle: low.title,
    href: `/services/${pageSlug}`,
    tierLabel: sameTier
      ? low.tier.name
      : {
          en: combineTierNames(low.tier.name.en, high.tier.name.en),
          es: combineTierNames(low.tier.name.es, high.tier.name.es),
        },
    low: Math.min(lowNum, highNum),
    high: Math.max(lowNum, highNum),
  }
}

function singleLine(pageSlug: string, tierSlug: string): RecommendationLine {
  return rangeLine(pageSlug, tierSlug, tierSlug)
}

const AUDIT_LINE: RecommendationLine = {
  key: 'website-audits',
  serviceTitle: { en: 'Website Audit', es: 'Auditoría de Sitio Web' },
  href: '/diagnostic',
  tierLabel: { en: 'Free diagnostic', es: 'Diagnóstico gratuito' },
  low: 0,
  high: 0,
}

/**
 * Simple rule-based recommendation — not real AI. Goal (step 1) picks a base
 * recommendation, current state (step 2) refines it, and any services
 * explicitly flagged in step 3 are layered on top if not already covered.
 * Tier prices are pulled live from data/pricing.ts so this stays in sync
 * with the real service pages instead of hardcoding a second price list.
 */
export function getRecommendation(answers: QuizAnswers): RecommendationResult {
  const { goal, currentState, interests } = answers
  const hasWebsite = currentState.includes('website')

  const lines = new Map<string, RecommendationLine>()
  let intro: Bilingual<string> = {
    en: "Here's a starting point based on your answers — every line links back to the full pricing page.",
    es: 'Este es un punto de partida basado en tus respuestas — cada línea enlaza a la página de precios completa.',
  }

  switch (goal) {
    case 'leads':
      if (hasWebsite) {
        lines.set('paid-ads', rangeLine('paid-ads', 'ads-prospecting', 'ads-retargeting-warm'))
        intro = {
          en: 'You already have a website, so the fastest path to more leads is running accountable ad campaigns against it.',
          es: 'Ya tienes un sitio web, así que el camino más rápido a más leads es correr campañas de anuncios responsables sobre él.',
        }
      } else {
        lines.set('lead-generation', singleLine('lead-generation', 'lead-generation-core'))
        intro = {
          en: "Without a website or funnel in place yet, the Lead Generation System bundles the landing page, ads, and follow-up into one program.",
          es: 'Sin un sitio web o embudo todavía, el Sistema de Generación de Leads combina la landing page, anuncios y seguimiento en un solo programa.',
        }
      }
      break
    case 'ecommerce':
      lines.set('ecommerce', rangeLine('ecommerce', 'ecommerce-starter', 'ecommerce-growth'))
      intro = {
        en: 'A Shopify build is the foundation — add Paid Ads below if you want traffic running the day the store launches.',
        es: 'Una tienda en Shopify es la base — agrega Anuncios Pagados abajo si quieres tráfico corriendo el día que lance la tienda.',
      }
      break
    case 'brand':
      lines.set('social-media', singleLine('social-media', 'social-authority'))
      lines.set('graphic-design', singleLine('graphic-design', 'brand-identity-system'))
      intro = {
        en: 'Brand authority comes from a consistent identity plus a content presence that reinforces it — these two work together.',
        es: 'La autoridad de marca viene de una identidad consistente más una presencia de contenido que la refuerza — estos dos trabajan juntos.',
      }
      break
    case 'fix-website':
      lines.set('website-audits', AUDIT_LINE)
      intro = {
        en: "Start with a free audit to find out exactly what's costing you conversions before spending on a rebuild.",
        es: 'Empieza con una auditoría gratuita para descubrir exactamente qué te está costando conversiones antes de gastar en una reconstrucción.',
      }
      break
    default:
      break
  }

  // layer in explicit step-3 interests not already covered by the goal-based recommendation
  if (interests.includes('web-development') && !lines.has('web-development')) {
    lines.set('web-development', singleLine('web-development', 'website-core'))
  }
  if (interests.includes('ecommerce') && !lines.has('ecommerce')) {
    lines.set('ecommerce', rangeLine('ecommerce', 'ecommerce-starter', 'ecommerce-growth'))
  }
  if (interests.includes('social-media') && !lines.has('social-media')) {
    lines.set('social-media', singleLine('social-media', 'social-growth'))
  }
  if (interests.includes('paid-ads') && !lines.has('paid-ads')) {
    lines.set('paid-ads', singleLine('paid-ads', 'ads-retargeting-warm'))
  }
  if (interests.includes('lead-generation') && !lines.has('lead-generation')) {
    lines.set('lead-generation', singleLine('lead-generation', 'lead-generation-core'))
  }
  if (interests.includes('graphic-design') && !lines.has('graphic-design')) {
    lines.set('graphic-design', singleLine('graphic-design', 'brand-identity-system'))
  }
  if (interests.includes('website-audits') && !lines.has('website-audits')) {
    lines.set('website-audits', AUDIT_LINE)
  }

  if (lines.size === 0) {
    lines.set('website-audits', AUDIT_LINE)
  }

  const linesArr = Array.from(lines.values())
  const lowTotal = linesArr.reduce((sum, l) => sum + l.low, 0)
  const highTotal = linesArr.reduce((sum, l) => sum + l.high, 0)

  return { lines: linesArr, lowTotal, highTotal, intro }
}

/** Human-readable answer summary attached to the lead-capture submission as hidden context — always English (internal CRM data, not visitor-facing). */
export function buildQuizSummary(answers: QuizAnswers, result: RecommendationResult): string {
  const goalText = answers.goal ? GOAL_LABELS[answers.goal] : 'Not answered'
  const stateText = answers.currentState.length
    ? answers.currentState.map((id) => STATE_LABELS[id]).join(', ')
    : 'Not answered'
  const interestText = answers.interests.length
    ? answers.interests.map((id) => INTEREST_LABELS[id]).join(', ')
    : 'None specified'
  const recText = result.lines.map((l) => `${l.serviceTitle.en} (${l.tierLabel.en})`).join('; ')

  return [
    `Goal: ${goalText}`,
    `Already has: ${stateText}`,
    `Interested in: ${interestText}`,
    `Recommended: ${recText}`,
    `Estimated range: $${result.lowTotal.toLocaleString('en-US')}–$${result.highTotal.toLocaleString('en-US')}`,
  ].join(' | ')
}
