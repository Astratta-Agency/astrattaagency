import { getServicePage, type PricingTier } from '@/data/pricing'

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

export const GOAL_OPTIONS: { id: GoalId; label: string }[] = [
  { id: 'leads', label: 'Get more leads' },
  { id: 'ecommerce', label: 'Sell products online' },
  { id: 'brand', label: 'Build brand authority' },
  { id: 'fix-website', label: "Fix a website that isn't converting" },
]

export const CURRENT_STATE_OPTIONS: { id: CurrentStateId; label: string }[] = [
  { id: 'website', label: 'A website' },
  { id: 'social', label: 'Social media presence' },
  { id: 'ads', label: 'Running ads' },
  { id: 'none', label: 'None of the above yet' },
]

export const INTEREST_OPTIONS: { id: InterestId; label: string }[] = [
  { id: 'web-development', label: 'Web Development' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'paid-ads', label: 'Paid Ads' },
  { id: 'lead-generation', label: 'Lead Generation System' },
  { id: 'graphic-design', label: 'Graphic Design' },
]

/** Shown as its own card in step 3 — it's the usual entry point, not a bundle component. */
export const AUDIT_INTEREST: { id: InterestId; label: string } = {
  id: 'website-audits',
  label: 'Website Audits',
}

const GOAL_LABELS: Record<GoalId, string> = Object.fromEntries(
  GOAL_OPTIONS.map((o) => [o.id, o.label]),
) as Record<GoalId, string>
const STATE_LABELS: Record<CurrentStateId, string> = Object.fromEntries(
  CURRENT_STATE_OPTIONS.map((o) => [o.id, o.label]),
) as Record<CurrentStateId, string>
const INTEREST_LABELS: Record<InterestId, string> = Object.fromEntries(
  [...INTEREST_OPTIONS, AUDIT_INTEREST].map((o) => [o.id, o.label]),
) as Record<InterestId, string>

/** Strips a display price like "From $8,500" or "$450/mo" down to a bare number for quote math. */
function priceToNumber(price: string): number {
  const match = price.match(/[\d,]+(\.\d+)?/)
  return match ? Number(match[0].replace(/,/g, '')) : 0
}

function tierBySlug(pageSlug: string, tierSlug: string): { title: string; tier: PricingTier } {
  const page = getServicePage(pageSlug)
  const tier = page?.tiers.find((t) => t.slug === tierSlug)
  if (!page || !tier) throw new Error(`Unknown tier: ${pageSlug}/${tierSlug}`)
  return { title: page.title, tier }
}

export type RecommendationLine = {
  key: string
  serviceTitle: string
  href: string
  tierLabel: string
  low: number
  high: number
}

export type RecommendationResult = {
  lines: RecommendationLine[]
  lowTotal: number
  highTotal: number
  intro: string
}

function rangeLine(pageSlug: string, lowTierSlug: string, highTierSlug: string): RecommendationLine {
  const low = tierBySlug(pageSlug, lowTierSlug)
  const high = tierBySlug(pageSlug, highTierSlug)
  const lowNum = priceToNumber(low.tier.price)
  const highNum = priceToNumber(high.tier.price)
  return {
    key: pageSlug,
    serviceTitle: low.title,
    href: `/services/${pageSlug}`,
    tierLabel: low.tier.slug === high.tier.slug ? low.tier.name : `${low.tier.name} – ${high.tier.name}`,
    low: Math.min(lowNum, highNum),
    high: Math.max(lowNum, highNum),
  }
}

function singleLine(pageSlug: string, tierSlug: string): RecommendationLine {
  return rangeLine(pageSlug, tierSlug, tierSlug)
}

const AUDIT_LINE: RecommendationLine = {
  key: 'website-audits',
  serviceTitle: 'Website Audit',
  href: '/audit',
  tierLabel: 'Free diagnostic',
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
  let intro =
    "Here's a starting point based on your answers — every line links back to the full pricing page."

  switch (goal) {
    case 'leads':
      if (hasWebsite) {
        lines.set('paid-ads', rangeLine('paid-ads', 'ads-prospecting', 'ads-retargeting-warm'))
        intro =
          'You already have a website, so the fastest path to more leads is running accountable ad campaigns against it.'
      } else {
        lines.set('lead-generation', singleLine('lead-generation', 'lead-generation-core'))
        intro =
          "Without a website or funnel in place yet, the Lead Generation System bundles the landing page, ads, and follow-up into one program."
      }
      break
    case 'ecommerce':
      lines.set('ecommerce', rangeLine('ecommerce', 'ecommerce-starter', 'ecommerce-growth'))
      intro =
        'A Shopify build is the foundation — add Paid Ads below if you want traffic running the day the store launches.'
      break
    case 'brand':
      lines.set('social-media', singleLine('social-media', 'social-authority'))
      lines.set('graphic-design', singleLine('graphic-design', 'brand-identity-system'))
      intro =
        'Brand authority comes from a consistent identity plus a content presence that reinforces it — these two work together.'
      break
    case 'fix-website':
      lines.set('website-audits', AUDIT_LINE)
      intro =
        "Start with a free audit to find out exactly what's costing you conversions before spending on a rebuild."
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

/** Human-readable answer summary attached to the lead-capture submission as hidden context. */
export function buildQuizSummary(answers: QuizAnswers, result: RecommendationResult): string {
  const goalText = answers.goal ? GOAL_LABELS[answers.goal] : 'Not answered'
  const stateText = answers.currentState.length
    ? answers.currentState.map((id) => STATE_LABELS[id]).join(', ')
    : 'Not answered'
  const interestText = answers.interests.length
    ? answers.interests.map((id) => INTEREST_LABELS[id]).join(', ')
    : 'None specified'
  const recText = result.lines.map((l) => `${l.serviceTitle} (${l.tierLabel})`).join('; ')

  return [
    `Goal: ${goalText}`,
    `Already has: ${stateText}`,
    `Interested in: ${interestText}`,
    `Recommended: ${recText}`,
    `Estimated range: $${result.lowTotal.toLocaleString('en-US')}–$${result.highTotal.toLocaleString('en-US')}`,
  ].join(' | ')
}
