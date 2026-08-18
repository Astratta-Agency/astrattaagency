import { INDUSTRY_QUESTION, REVENUE_QUESTION, TICKET_QUESTION } from '@/data/growthScore'
import { PILLARS, PILLAR_MAX, type Answers, type ScoreResult } from '@/lib/growthScore'
import type { Bilingual, Language } from '@/lib/i18n/types'

/**
 * Resumen del Growth Score que viaja con el lead al CRM.
 *
 * `capture-lead` lo escribe en `leads.notes` bajo "Respuestas del quiz:", así
 * que es lo que lee quien devuelve la llamada. Va **siempre en español**: es
 * texto interno de operación, como el correo de aviso de la propia función, no
 * copy del sitio — no le aplica la regla de paridad EN/ES.
 *
 * La función corta `metadata` en 2000 caracteres; esto ronda los 400.
 */

const PILLAR_LABEL: Record<string, string> = {
  base: 'Base',
  capture: 'Captura',
  response: 'Respuesta',
  acquisition: 'Adquisición',
  retention: 'Retención',
}

const LEVEL_LABEL: Record<string, string> = {
  start: 'START',
  build: 'BUILD',
  engine: 'ENGINE',
  scale: 'SCALE',
}

const CTA_LABEL: Record<string, string> = {
  call: 'llamada directa',
  diagnostic: 'diagnóstico ($297)',
  systems: 'sistemas',
}

/**
 * Las etiquetas de perfil salen de las opciones reales del quiz, no de un mapa
 * paralelo: si mañana cambia un id o un rango, el resumen lo sigue solo. Un
 * mapa a mano ya se había desincronizado de los ids una vez.
 */
function labelOf(
  options: readonly { id: string; label: Bilingual<string> }[],
  id: string | null,
): string {
  if (!id) return 'sin responder'
  return options.find((o) => o.id === id)?.label.es ?? id
}

export function buildGrowthScoreSummary(answers: Answers, result: ScoreResult): string {
  const pillars = PILLARS.map((p) => `${PILLAR_LABEL[p]} ${result.pillars[p]}/${PILLAR_MAX}`).join(
    ' · ',
  )

  return [
    `Growth Score: ${result.total}/100 — nivel sugerido ${LEVEL_LABEL[result.level]}`,
    `Industria: ${labelOf(INDUSTRY_QUESTION.options, answers.industry)}`,
    `Facturación mensual: ${labelOf(REVENUE_QUESTION.options, answers.revenue)}`,
    `Ticket promedio: ${labelOf(TICKET_QUESTION.options, answers.ticket)}`,
    `Pilares: ${pillars}`,
    `Fugas principales: ${result.leaks.map((p) => PILLAR_LABEL[p]).join(', ')}`,
    result.foundation ? `Base recomendada antes del motor: ${result.foundation}` : null,
    result.breakEven !== null
      ? `Punto de equilibrio: ${result.breakEven} clientes nuevos/mes`
      : null,
    `Ruta recomendada: ${CTA_LABEL[result.cta] ?? result.cta}`,
  ]
    .filter(Boolean)
    .join('\n')
}

/** Contexto mínimo para los formularios sin quiz: en qué idioma devolver la llamada. */
export function buildLanguageNote(language: Language): string {
  return `Idioma del formulario: ${language === 'es' ? 'español' : 'inglés'}`
}
