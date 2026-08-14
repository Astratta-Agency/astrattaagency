import type { Bilingual } from '@/lib/i18n/types'
import type { IndustryId, RevenueId, ScoredQuestionId, TicketId } from '@/lib/growthScore'

/**
 * Las 12 preguntas del Growth Score (docs/CONTENIDO-Web-EN-ES.md §9.1).
 * Una pregunta por pantalla. Las tres primeras no puntúan: asignan industria,
 * nivel y el ticket con el que se calcula el punto de equilibrio.
 * El orden de las opciones define los puntos — ver QUESTION_POINTS.
 */

const B = (en: string, es: string): Bilingual<string> => ({ en, es })

export type ProfileQuestion<T extends string> = {
  key: 'industry' | 'revenue' | 'ticket'
  question: Bilingual<string>
  options: { id: T; label: Bilingual<string> }[]
}

export const INDUSTRY_QUESTION: ProfileQuestion<IndustryId> = {
  key: 'industry',
  question: B('What kind of business do you run?', '¿Qué tipo de negocio tienes?'),
  options: [
    { id: 'med-spa', label: B('Med spa / aesthetics', 'Med spa / estética') },
    { id: 'home-improvement', label: B('Home improvement / contractor', 'Remodelación / contratista') },
    { id: 'restaurant', label: B('Restaurant / food', 'Restaurante / comida') },
    { id: 'real-estate', label: B('Real estate', 'Bienes raíces') },
    { id: 'other', label: B('Other', 'Otro') },
  ],
}

export const REVENUE_QUESTION: ProfileQuestion<RevenueId> = {
  key: 'revenue',
  question: B(
    'Roughly what does the business bring in per month?',
    '¿Cuánto factura el negocio al mes, aproximadamente?',
  ),
  options: [
    { id: 'under-15k', label: B('Under $15K', 'Menos de $15K') },
    { id: '15-30k', label: B('$15K–30K', '$15K–30K') },
    { id: '30-80k', label: B('$30K–80K', '$30K–80K') },
    { id: '80-200k', label: B('$80K–200K', '$80K–200K') },
    { id: 'over-200k', label: B('Over $200K', 'Más de $200K') },
  ],
}

export const TICKET_QUESTION: ProfileQuestion<TicketId> = {
  key: 'ticket',
  question: B(
    'What does an average customer spend the first time?',
    '¿Cuánto gasta un cliente promedio la primera vez?',
  ),
  options: [
    { id: 'under-50', label: B('Under $50', 'Menos de $50') },
    { id: '50-500', label: B('$50–500', '$50–500') },
    { id: '500-3k', label: B('$500–3,000', '$500–3,000') },
    { id: '3k-10k', label: B('$3,000–10,000', '$3,000–10,000') },
    { id: 'over-10k', label: B('Over $10,000', 'Más de $10,000') },
  ],
}

export type ScoredQuestion = {
  id: ScoredQuestionId
  question: Bilingual<string>
  options: Bilingual<string>[]
}

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: 'q4',
    question: B('How would you describe your website?', '¿Cómo describirías tu sitio web?'),
    options: [
      B("I don't have one", 'No tengo'),
      B("I have one, but it's old or slow", 'Tengo, pero está viejo o lento'),
      B("It looks modern, but I don't know if it converts", 'Se ve moderno, pero no sé si convierte'),
      B("It's built to convert and I can prove it", 'Está hecho para convertir y lo puedo demostrar'),
    ],
  },
  {
    id: 'q5',
    question: B("What's installed to measure results?", '¿Qué tienes instalado para medir resultados?'),
    options: [
      B("I'm not sure", 'No sé'),
      B('Nothing', 'Nada'),
      B('Google Analytics', 'Google Analytics'),
      B('GA4 + Pixel + conversion events', 'GA4 + Pixel + eventos de conversión'),
    ],
  },
  {
    id: 'q6',
    question: B(
      'How does someone become a lead on your site?',
      '¿Cómo se convierte alguien en lead en tu sitio?',
    ),
    options: [
      B("They'd have to call or DM me — there's no form", 'Tendrían que llamarme o mandarme DM — no hay formulario'),
      B("There's a contact form", 'Hay un formulario de contacto'),
      B("There's a form and a clear offer", 'Hay formulario y una oferta clara'),
      B('Dedicated landing page with a lead magnet or offer', 'Landing dedicada con oferta o recurso de captura'),
    ],
  },
  {
    id: 'q7',
    question: B(
      'When a new lead comes in, how fast do you actually respond?',
      'Cuando entra un lead nuevo, ¿en cuánto tiempo respondes realmente?',
    ),
    options: [
      B("Over 24 hours, or I'm not sure", 'Más de 24 horas, o no estoy segura'),
      B('Same day', 'El mismo día'),
      B('Within a couple of hours', 'En un par de horas'),
      B("Within minutes — it's automated", 'En minutos — está automatizado'),
    ],
  },
  {
    id: 'q8',
    question: B('Where do your leads live right now?', '¿Dónde viven tus leads ahora mismo?'),
    options: [
      B('On my phone — WhatsApp, DMs, missed calls', 'En mi teléfono — WhatsApp, DMs, llamadas perdidas'),
      B('A spreadsheet', 'Una hoja de cálculo'),
      B('A CRM, but I update it manually', 'Un CRM, pero lo actualizo a mano'),
      B('A CRM with automated follow-up', 'Un CRM con seguimiento automático'),
    ],
  },
  {
    id: 'q9',
    question: B('Are you running paid ads?', '¿Estás corriendo anuncios pagados?'),
    options: [
      B('No', 'No'),
      B("Yes, but I don't know if they work", 'Sí, pero no sé si funcionan'),
      B('Yes, and I track cost per lead', 'Sí, y mido el costo por lead'),
      B('Yes, multi-channel and optimized', 'Sí, multicanal y optimizados'),
    ],
  },
  {
    id: 'q10',
    question: B('How consistently do you publish content?', '¿Con qué consistencia publicas contenido?'),
    options: [
      B('Almost never', 'Casi nunca'),
      B('When I get around to it', 'Cuando puedo'),
      B('Consistently, on a schedule', 'Consistente, con calendario'),
      B('Consistently, and it feeds my campaigns', 'Consistente, y alimenta mis campañas'),
    ],
  },
  {
    id: 'q11',
    question: B('Do you ask customers for reviews?', '¿Le pides reseñas a tus clientes?'),
    options: [
      B('No', 'No'),
      B('Sometimes, when I remember', 'A veces, cuando me acuerdo'),
      B('Yes, but manually', 'Sí, pero a mano'),
      B('Yes, automatically after every job', 'Sí, automáticamente después de cada servicio'),
    ],
  },
  {
    id: 'q12',
    question: B(
      'How often do you contact past customers and old leads?',
      '¿Con qué frecuencia contactas a clientes pasados y leads viejos?',
    ),
    options: [
      B("Never — they're sitting there untouched", 'Nunca — están ahí sin tocar'),
      B('Rarely', 'Rara vez'),
      B('Occasional email or promo', 'Email o promoción ocasional'),
      B('Automated sequences running', 'Secuencias automáticas corriendo'),
    ],
  },
]

/** Texto de cada fuga, por pilar (§9.2). */
export const LEAK_COPY: Record<string, Bilingual<string>> = {
  base: B(
    "Your site isn't built to convert, and you can't measure what happens on it. Every decision after this is a guess.",
    'Tu sitio no está hecho para convertir, y no puedes medir lo que pasa en él. Toda decisión después de esto es una adivinanza.',
  ),
  capture: B(
    "Traffic arrives and leaves without a way to become a lead. You're paying for visits you can't follow up on.",
    'El tráfico llega y se va sin forma de convertirse en lead. Estás pagando por visitas a las que no les puedes dar seguimiento.',
  ),
  response: B(
    'Your leads wait. In your industry, a lead that waits hours has already contacted a competitor.',
    'Tus leads esperan. En tu industria, un lead que espera horas ya contactó a un competidor.',
  ),
  acquisition: B(
    "You're depending on referrals and luck. Nothing here is predictable month to month.",
    'Estás dependiendo de referidos y suerte. Nada de esto es predecible mes a mes.',
  ),
  retention: B(
    "Your existing customers and old leads are your cheapest revenue, and you're not touching them.",
    'Tus clientes actuales y leads viejos son tu ingreso más barato, y no los estás tocando.',
  ),
}

/** Rango mensual a mostrar por nivel (§9.2). No es el precio de lista. */
export const LEVEL_RANGE: Record<string, Bilingual<string>> = {
  start: B('$600–800/month', '$600–800/mes'),
  build: B('$1,500–2,200/month', '$1,500–2,200/mes'),
  engine: B('$2,200–3,000/month', '$2,200–3,000/mes'),
  scale: B('$4,000–5,500/month', '$4,000–5,500/mes'),
}

export const FOUNDATION_COPY: Record<string, Bilingual<string>> = {
  'foundation-lite': B('Foundation Lite — $1,200', 'Base Lite — $1,200'),
  foundation: B('Foundation — $3,500', 'Base — $3,500'),
  'foundation-pro': B('Foundation Pro — $6,500', 'Base Pro — $6,500'),
}

/** Bandas de puntaje (§9.3). */
export const SCORE_BANDS: Bilingual<string>[] = [
  B(
    "You're operating without a system. Almost everything you spend right now leaks.",
    'Estás operando sin sistema. Casi todo lo que gastas ahora mismo se fuga.',
  ),
  B(
    "You have pieces that work, but they're not connected. That gap is what's costing you.",
    'Tienes piezas que funcionan, pero no están conectadas. Esa distancia es lo que te está costando.',
  ),
  B(
    'The foundation is there. What’s missing is volume and optimization.',
    'La base está. Lo que falta es volumen y optimización.',
  ),
  B(
    "You're ahead of most businesses in your market. Let's talk about scale, not repair.",
    'Estás por delante de la mayoría de los negocios de tu mercado. Hablemos de escalar, no de reparar.',
  ),
]
