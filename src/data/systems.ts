import type { Bilingual, Language } from '@/lib/i18n/types'

/**
 * Fase 2 de la arquitectura: EL MOTOR. Suscripción mensual.
 * Copy, precios y matriz de docs/CONTENIDO-Web-EN-ES.md §4 — fuente única.
 */

/** Valor idéntico en ambos idiomas (números, símbolos, nombres propios). */
const n = (value: string): Bilingual<string> => ({ en: value, es: value })

export type SystemLevel = {
  slug: string
  name: string
  price: string
  cadence: string
}

const LEVEL_SOURCES: { slug: string; name: string; price: string; cadence: Bilingual<string> }[] = [
  { slug: 'start', name: 'START', price: '$697', cadence: { en: '/month', es: '/mes' } },
  { slug: 'build', name: 'BUILD', price: '$1,800', cadence: { en: '/month', es: '/mes' } },
  { slug: 'engine', name: 'ENGINE', price: '$2,500', cadence: { en: '/month', es: '/mes' } },
  { slug: 'scale', name: 'SCALE', price: '$4,500', cadence: { en: '/month', es: '/mes' } },
]

export function resolveSystemLevels(language: Language): SystemLevel[] {
  return LEVEL_SOURCES.map((l) => ({ ...l, cadence: l.cadence[language] }))
}

export type MatrixRow = { label: string; cells: string[] }

/** Orden de celdas: START · BUILD · ENGINE · SCALE. `—` = no incluido en ese nivel. */
const MATRIX_SOURCES: { label: Bilingual<string>; cells: Bilingual<string>[] }[] = [
  { label: { en: 'Setup', es: 'Setup' }, cells: [n('$500'), n('$1,200'), n('$1,500'), n('$2,500')] },
  {
    label: { en: 'Minimum', es: 'Mínimo' },
    cells: [{ en: '3 mo', es: '3 meses' }, { en: '3 mo', es: '3 meses' }, { en: '6 mo', es: '6 meses' }, { en: '12 mo', es: '12 meses' }],
  },
  { label: { en: 'Pieces', es: 'Piezas' }, cells: [n('8'), n('12'), n('20'), n('40')] },
  { label: { en: 'Static', es: 'Estáticos' }, cells: [n('6'), n('8'), n('12'), n('22')] },
  { label: { en: 'Reels & TikToks', es: 'Reels y TikToks' }, cells: [n('2'), n('4'), n('8'), n('18')] },
  { label: { en: 'Stories', es: 'Stories' }, cells: [n('—'), n('2'), n('4'), n('8')] },
  {
    label: { en: 'On-site production', es: 'Producción on-site' },
    cells: [n('—'), { en: 'Quarterly', es: 'Trimestral' }, { en: 'Monthly', es: 'Mensual' }, { en: '2× monthly', es: '2× mensual' }],
  },
  { label: { en: 'Ad channels', es: 'Canales de anuncios' }, cells: [n('—'), n('1'), n('2'), n('3–4')] },
  { label: { en: 'Ad creatives', es: 'Creativos de anuncios' }, cells: [n('—'), n('4'), n('8'), n('16')] },
  {
    label: { en: 'Campaign landing pages', es: 'Landings de campaña' },
    cells: [n('—'), n('1'), { en: '1–2 /mo', es: '1–2 /mes' }, { en: '3 /mo', es: '3 /mes' }],
  },
  { label: { en: 'A/B testing', es: 'A/B testing' }, cells: [n('—'), { en: 'Basic', es: 'Básico' }, n('✓'), n('✓')] },
  { label: { en: 'Retargeting', es: 'Retargeting' }, cells: [n('—'), n('—'), n('✓'), n('✓')] },
  { label: { en: 'AI Speed-to-Lead <60s', es: 'AI Speed-to-Lead <60s' }, cells: [n('—'), n('✓'), n('✓'), n('✓')] },
  {
    label: { en: 'AI Receptionist', es: 'Recepcionista de IA' },
    cells: [n('—'), { en: 'Add-on', es: 'Add-on' }, n('✓'), n('✓')],
  },
  { label: { en: 'CRM + pipeline', es: 'CRM + pipeline' }, cells: [n('—'), n('✓'), n('✓'), n('✓')] },
  {
    label: { en: 'Email + SMS', es: 'Email + SMS' },
    cells: [n('—'), { en: '1 sequence', es: '1 secuencia' }, n('✓'), n('✓')],
  },
  { label: { en: 'Reviews', es: 'Reseñas' }, cells: [n('✓'), n('✓'), n('✓'), n('✓')] },
  {
    label: { en: 'Reporting', es: 'Reporte' },
    cells: [
      { en: 'Monthly', es: 'Mensual' },
      { en: 'Biweekly', es: 'Quincenal' },
      { en: 'Weekly + dashboard', es: 'Semanal + dashboard' },
      { en: 'Weekly + dashboard', es: 'Semanal + dashboard' },
    ],
  },
  {
    label: { en: 'Strategy calls', es: 'Calls de estrategia' },
    cells: [n('—'), { en: '1 /mo', es: '1 /mes' }, { en: '2 /mo', es: '2 /mes' }, { en: 'Weekly', es: 'Semanal' }],
  },
  {
    label: { en: 'Suggested ad budget', es: 'Presupuesto sugerido' },
    cells: [n('—'), n('$800–1,500'), n('$2,500–6,000'), n('$8,000+')],
  },
]

export function resolveMatrix(language: Language): MatrixRow[] {
  return MATRIX_SOURCES.map((row) => ({
    label: row.label[language],
    cells: row.cells.map((c) => c[language]),
  }))
}

export type InsideBlock = { title: string; body: string }

const INSIDE_SOURCES: { title: Bilingual<string>; body: Bilingual<string> }[] = [
  {
    title: { en: 'Content & production', es: 'Contenido y producción' },
    body: {
      en: 'We come to your business and shoot. Reels, TikToks, photography, real client testimonials. We edit, write and schedule everything. Between 8 and 40 pieces a month depending on level — each with a defined role in the funnel, not posts to fill a feed. This is where your social media management lives — planned, shot and scheduled as part of the system, not a separate line item.',
      es: 'Vamos a tu negocio y grabamos. Reels, TikToks, fotografía, testimonios de clientes reales. Editamos, escribimos y programamos todo. Entre 8 y 40 piezas al mes según el nivel — y cada una con una función definida dentro del embudo, no publicaciones para llenar el feed. Aquí vive el manejo de redes sociales — planeado, grabado y programado como parte del sistema, no como un renglón aparte.',
    },
  },
  {
    title: { en: 'Paid advertising', es: 'Publicidad paga' },
    body: {
      en: 'Meta and Google, managed against a cost-per-lead target. New creative every month, angles that actually get tested, retargeting by stage. Your ad budget goes straight to the platforms from your own account — it never passes through us, and the account is always yours. Meta Ads management and Google Ads management, run against the same cost-per-lead target as everything else.',
      es: 'Meta y Google, gestionados contra un objetivo de costo por lead. Creativos nuevos cada mes, ángulos que se testean de verdad, retargeting por etapa. Tu presupuesto de anuncios lo pagas directo a las plataformas desde tu propia cuenta — nunca pasa por nosotros y la cuenta siempre es tuya. Manejo de anuncios de Meta y de Google, gestionados contra el mismo objetivo de costo por lead que todo lo demás.',
    },
  },
  {
    title: { en: 'Capture & response', es: 'Captura y respuesta' },
    body: {
      en: 'Landing pages built to convert. Automatic SMS and WhatsApp reply in under 60 seconds, any hour. CRM configured to your pipeline. Appointment reminders. Cold lead reactivation.',
      es: 'Landing pages construidas para convertir. Respuesta automática por SMS y WhatsApp en menos de 60 segundos, a cualquier hora. CRM configurado con tu pipeline. Recordatorios de cita. Reactivación de leads fríos.',
    },
  },
  {
    title: { en: 'Measurement', es: 'Medición' },
    body: {
      en: "Full tracking from day one. Live dashboard with cost per lead, cost per booked appointment and return. You'll know exactly where every customer came from.",
      es: 'Medición completa desde el día uno. Dashboard en vivo con costo por lead, costo por cita agendada y retorno. Vas a saber exactamente de dónde vino cada cliente.',
    },
  },
]

export function resolveInsideBlocks(language: Language): InsideBlock[] {
  return INSIDE_SOURCES.map((b) => ({ title: b.title[language], body: b.body[language] }))
}

const FAQ_SOURCES: { question: Bilingual<string>; answer: Bilingual<string> }[] = [
  {
    question: { en: 'Can I just buy the ads?', es: '¿Puedo contratar solo los anuncios?' },
    answer: {
      en: "Generally no, and that's on purpose. Ads without a page that converts and without fast follow-up are wasted money — we've seen it enough times. If you already have both of those solved and only need campaign management, let's talk about it in the diagnostic. But it isn't what we sell by default.",
      es: 'En general no, y es a propósito. Los anuncios sin una página que convierta y sin respuesta rápida a los leads son dinero tirado — lo hemos visto suficientes veces. Si ya tienes esas dos piezas resueltas y solo necesitas gestión de campañas, hablémoslo en el diagnóstico. Pero no es lo que vendemos por defecto.',
    },
  },
  {
    question: { en: 'How many reels and TikToks are included?', es: '¿Cuántos reels y TikToks entran?' },
    answer: {
      en: 'Between 2 and 18 a month depending on level, plus ad creatives, which are counted separately. Includes shooting at your business, editing, copy and scheduling.',
      es: 'Entre 2 y 18 al mes según el nivel, más los creativos de anuncios, que se cuentan aparte. Incluye grabación en tu negocio, edición, copy y programación.',
    },
  },
  {
    question: { en: 'Is the video shoot included?', es: '¿La grabación está incluida?' },
    answer: {
      en: 'Yes. BUILD is once a quarter, ENGINE once a month, SCALE twice a month. We arrive with the shot list ready and leave with the content for the whole period.',
      es: 'Sí. En BUILD vamos una vez por trimestre, en ENGINE una vez al mes y en SCALE dos veces al mes. Llegamos con el plan de tomas listo y salimos con el contenido de todo el período.',
    },
  },
  {
    question: { en: 'Who pays for the ad budget?', es: '¿Quién paga el presupuesto de anuncios?' },
    answer: {
      en: 'You do, directly to Meta and Google from your own account. We manage it but never touch your money. That way you see every dollar and never depend on anyone for access to your data.',
      es: 'Tú, directo a Meta y Google desde tu propia cuenta. Nosotros la gestionamos pero nunca tocamos tu dinero. Así ves cada dólar y nunca dependes de nadie para acceder a tus datos.',
    },
  },
  {
    question: { en: 'How much should I spend on ads?', es: '¿Cuánto debo invertir en anuncios?' },
    answer: {
      en: 'Depends on your industry and your ticket. $800 to $1,500 a month to start on BUILD; $2,500 to $6,000 on ENGINE. In the diagnostic we calculate the exact number against your target cost per lead.',
      es: 'Depende de tu rubro y de tu ticket. Entre $800 y $1,500 al mes para empezar en BUILD; entre $2,500 y $6,000 en ENGINE. En el diagnóstico calculamos el número exacto según tu costo por lead objetivo.',
    },
  },
  {
    question: { en: 'Why are there minimum terms?', es: '¿Por qué hay permanencia mínima?' },
    answer: {
      en: "Because marketing needs time to produce reliable data. Anyone promising sales in 30 days is selling you smoke. After the minimum, you cancel with 30 days' notice, and everything we built — site, accounts, CRM, content — is yours and stays with you.",
      es: 'Porque el marketing necesita tiempo para dar datos confiables. Cualquiera que te prometa ventas en 30 días te está vendiendo humo. Después del mínimo cancelas con 30 días de aviso, y todo lo que construimos — sitio, cuentas, CRM, contenido — es tuyo y se queda contigo.',
    },
  },
]

export function resolveSystemsFaq(language: Language) {
  return FAQ_SOURCES.map((f) => ({ question: f.question[language], answer: f.answer[language] }))
}
