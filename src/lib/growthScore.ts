/**
 * Motor del Growth Score (docs/CONTENIDO-Web-EN-ES.md §9.1 y §9.2).
 *
 * Lógica pura, sin idioma ni UI: opera sobre ids y devuelve números y claves.
 * El copy vive en src/data/growthScore.ts y en los locales.
 *
 * ⚠️ Producto DISTINTO del diagnóstico de $297 (regla 6 de CLAUDE.md).
 * Esto es gratis, automático y de 4 minutos. Nunca llamarlo "diagnóstico".
 */

export type IndustryId = 'med-spa' | 'home-improvement' | 'restaurant' | 'real-estate' | 'other'
export type RevenueId = 'under-15k' | '15-30k' | '30-80k' | '80-200k' | 'over-200k'
export type TicketId = 'under-50' | '50-500' | '500-3k' | '3k-10k' | 'over-10k'
export type PillarId = 'base' | 'capture' | 'response' | 'acquisition' | 'retention'
export type LevelId = 'start' | 'build' | 'engine' | 'scale'
export type FoundationId = 'foundation-lite' | 'foundation' | 'foundation-pro'
export type CtaRoute = 'call' | 'diagnostic' | 'systems'

/** Cada pilar suma 20; el total es 100. */
export const PILLAR_MAX = 20
export const PILLARS: PillarId[] = ['base', 'capture', 'response', 'acquisition', 'retention']

/** Q4–Q12. Las tres primeras preguntas no puntúan: asignan nivel e industria. */
export type ScoredQuestionId = 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'q9' | 'q10' | 'q11' | 'q12'

export const QUESTION_PILLAR: Record<ScoredQuestionId, PillarId> = {
  q4: 'base',
  q5: 'base',
  q6: 'capture',
  q7: 'response',
  q8: 'response',
  q9: 'acquisition',
  q10: 'acquisition',
  q11: 'retention',
  q12: 'retention',
}

/** Puntos por opción, en el orden en que se muestran. */
export const QUESTION_POINTS: Record<ScoredQuestionId, number[]> = {
  q4: [0, 5, 10, 14],
  q5: [0, 1, 3, 6],
  q6: [0, 6, 13, 20],
  q7: [0, 4, 8, 12],
  q8: [0, 2, 5, 8],
  q9: [0, 4, 8, 12],
  q10: [0, 2, 5, 8],
  q11: [0, 3, 6, 8],
  q12: [0, 3, 8, 12],
}

export type Answers = {
  industry: IndustryId | null
  revenue: RevenueId | null
  ticket: TicketId | null
  scores: Partial<Record<ScoredQuestionId, number>>
}

export const INITIAL_ANSWERS: Answers = {
  industry: null,
  revenue: null,
  ticket: null,
  scores: {},
}

/** Margen de contribución por industria, para el punto de equilibrio (§9.2). */
const CONTRIBUTION_MARGIN: Record<IndustryId, number> = {
  'med-spa': 0.7,
  'home-improvement': 0.35,
  restaurant: 0.6,
  'real-estate': 1.0,
  other: 0.5,
}

/** Valor representativo de cada tramo de ticket, para el cálculo. */
const TICKET_VALUE: Record<TicketId, number> = {
  'under-50': 35,
  '50-500': 275,
  '500-3k': 1750,
  '3k-10k': 6500,
  'over-10k': 15000,
}

/** Precio mensual canónico de cada nivel (CLAUDE.md regla 4). */
const LEVEL_PRICE: Record<LevelId, number> = {
  start: 697,
  build: 1800,
  engine: 2500,
  scale: 4500,
}

const LEVEL_BY_REVENUE: Record<RevenueId, LevelId> = {
  'under-15k': 'start',
  '15-30k': 'start',
  '30-80k': 'build',
  '80-200k': 'engine',
  'over-200k': 'scale',
}

const FOUNDATION_BY_REVENUE: Record<RevenueId, FoundationId> = {
  'under-15k': 'foundation-lite',
  '15-30k': 'foundation-lite',
  '30-80k': 'foundation',
  '80-200k': 'foundation-pro',
  'over-200k': 'foundation-pro',
}

const CTA_BY_REVENUE: Record<RevenueId, CtaRoute> = {
  'under-15k': 'systems',
  '15-30k': 'systems',
  '30-80k': 'diagnostic',
  '80-200k': 'call',
  'over-200k': 'call',
}

export type ScoreResult = {
  total: number
  pillars: Record<PillarId, number>
  /** Los tres pilares con peor puntaje, de peor a mejor. */
  leaks: PillarId[]
  band: 0 | 1 | 2 | 3
  level: LevelId
  /** Solo cuando el pilar BASE queda por debajo de 10/20. */
  foundation: FoundationId | null
  /** Clientes nuevos al mes para cubrir el retainer. `null` si faltan datos. */
  breakEven: number | null
  cta: CtaRoute
}

function band(total: number): 0 | 1 | 2 | 3 {
  if (total <= 35) return 0
  if (total <= 60) return 1
  if (total <= 80) return 2
  return 3
}

export function scorePillars(answers: Answers): Record<PillarId, number> {
  const pillars: Record<PillarId, number> = {
    base: 0,
    capture: 0,
    response: 0,
    acquisition: 0,
    retention: 0,
  }
  for (const [q, points] of Object.entries(answers.scores)) {
    pillars[QUESTION_PILLAR[q as ScoredQuestionId]] += points ?? 0
  }
  return pillars
}

export function getResult(answers: Answers): ScoreResult {
  const pillars = scorePillars(answers)
  const total = PILLARS.reduce((sum, p) => sum + pillars[p], 0)

  // Las tres fugas más caras: los pilares peor puntuados. El desempate sigue
  // el orden del embudo, así que un empate favorece arreglar lo que está antes.
  const leaks = [...PILLARS].sort((a, b) => pillars[a] - pillars[b]).slice(0, 3)

  const revenue = answers.revenue ?? 'under-15k'
  let level = LEVEL_BY_REVENUE[revenue]

  // Excepción de restaurantes (§9.2). El doc marca el corte en $45K, pero los
  // tramos de la pregunta no tienen esa frontera: el más cercano es $30–80K.
  // Se aplica ahí, que es la lectura conservadora — un restaurante en ese
  // tramo arranca en START en vez de BUILD.
  if (answers.industry === 'restaurant' && revenue === '30-80k') level = 'start'

  const foundation = pillars.base < 10 ? FOUNDATION_BY_REVENUE[revenue] : null

  let breakEven: number | null = null
  if (answers.ticket && answers.industry) {
    const contribution = TICKET_VALUE[answers.ticket] * CONTRIBUTION_MARGIN[answers.industry]
    breakEven = Math.max(1, Math.ceil(LEVEL_PRICE[level] / contribution))
  }

  return { total, pillars, leaks, band: band(total), level, foundation, breakEven, cta: CTA_BY_REVENUE[revenue] }
}
