import type { Bilingual, Language } from '@/lib/i18n/types'
import medSpaImage from '@/assets/industries/med-spa.webp'
import homeImprovementImage from '@/assets/industries/home-improvement.webp'
import restaurantsImage from '@/assets/industries/restaurants.webp'
import realEstateImage from '@/assets/industries/real-estate.webp'

/**
 * Páginas de industria — el conector de la arquitectura.
 * Copy de docs/CONTENIDO-Web-EN-ES.md §5, §11.1, §11.2 y §11.3.
 *
 * El bloque 6 ("caso del rubro") tiene dos modos y la elección es de
 * honestidad, no estética: `case` solo donde hay trabajo real que mostrar;
 * `metrics` donde todavía no lo hay. Nunca se fabrica un caso.
 */

export type IndustryProof =
  | {
      mode: 'case'
      label: Bilingual<string>
      client: string
      text: Bilingual<string>
      /** Cifras destacadas, cuando el caso las tiene. */
      metrics?: Bilingual<string>[]
      quote?: { text: Bilingual<string>; name: string; role: Bilingual<string> }
      /** Slug en CASE_STUDIES. */
      caseSlug: string
      linkLabel: Bilingual<string>
    }
  | {
      mode: 'metrics'
      label: Bilingual<string>
      intro: Bilingual<string>
      items: Bilingual<string[]>
      closing: Bilingual<string>
    }

export type IndustrySource = {
  /** Clave inglesa; coincide con INDUSTRY_SLUGS en routes.ts. */
  slug: string
  /** Arte de cabecera; también hace de portada en la tarjeta del índice. */
  image: string
  imageAlt: Bilingual<string>
  card: Bilingual<string>
  heading: Bilingual<string>
  subtext: Bilingual<string>
  numbers: Bilingual<string[]>
  path: { month: Bilingual<string>; text: Bilingual<string>; price: string }[]
  different: Bilingual<string>
  breakeven: Bilingual<string>
  proof: IndustryProof
  faq: { question: Bilingual<string>; answer: Bilingual<string> }[]
  /** Nota honesta visible — solo real estate la trae (§5.4). */
  note?: Bilingual<string>
}

const M = (en: string, es: string): Bilingual<string> => ({ en, es })

export const INDUSTRIES: IndustrySource[] = [
  {
    slug: 'med-spa',
    image: medSpaImage,
    imageAlt: M(
      'An appointment grid where half the slots are confirmed in orange and half are empty outlines, next to a clock.',
      'Una cuadrícula de citas donde la mitad están confirmadas en naranja y la otra mitad son casillas vacías, junto a un reloj.',
    ),
    card: M("Your problem isn't leads. It's that half of them never show up.", 'Tu problema no son los leads. Es que la mitad nunca llega.'),
    heading: M('Marketing for med spas in Dallas–Fort Worth', 'Marketing para med spas en Dallas–Fort Worth'),
    subtext: M(
      "Your problem isn't leads. It's that half of them never show up to the consultation. That's the number we fix first.",
      'Tu problema no son los leads. Es que la mitad nunca llega a la consulta. Ese es el número que arreglamos primero.',
    ),
    numbers: {
      en: [
        "Show-up rate — most med spas sit between 45% and 60% and don't know it.",
        "Cost per booked consultation — not cost per form fill. They're not the same thing.",
        'First-year patient value — what a new patient is actually worth over twelve months.',
      ],
      es: [
        'Tasa de asistencia — la mayoría de los med spas está entre 45% y 60% y no lo sabe.',
        'Costo por consulta agendada — no por formulario llenado. No son lo mismo.',
        'Valor del paciente en el año 1 — cuánto vale realmente un paciente nuevo en doce meses.',
      ],
    },
    path: [
      { month: M('Month 0', 'Mes 0'), text: M('Diagnostic — show-up rate, cost per consult, competitor audit', 'Diagnóstico — tasa de asistencia, costo por consulta, auditoría de competencia'), price: '$297' },
      { month: M('Month 1', 'Mes 1'), text: M('Foundation — before/after site, booking, 3-field form, full tracking', 'Base — sitio con antes/después, reservas, formulario de 3 campos, medición completa'), price: '$3,500' },
      { month: M('Month 2', 'Mes 2'), text: M('BUILD — Meta live, speed-to-lead under 60s, reminder sequence, 12 pieces/mo', 'BUILD — Meta activo, respuesta en menos de 60s, recordatorios, 12 piezas/mes'), price: '$1,800/mo' },
      { month: M('Month 5', 'Mes 5'), text: M('ENGINE — add Google Search, per-treatment landing pages, 20 pieces/mo', 'ENGINE — se suma Google Search, landing por tratamiento, 20 piezas/mes'), price: '$2,500/mo' },
    ],
    different: M(
      "In med spa we prioritize response speed over content volume. A lead that waits thirty minutes has already called another clinic. We install speed-to-lead before anything else — it's the highest-return intervention in this vertical and it costs little to implement.",
      'En med spa priorizamos velocidad de respuesta sobre volumen de contenido. Un lead que espera treinta minutos ya llamó a otra clínica. Instalamos la respuesta automática antes que cualquier otra cosa — es la intervención de mayor retorno en este vertical y cuesta poco implementarla.',
    ),
    breakeven: M(
      'At a $400 first visit, you need 6 to 9 new patients a month for this to pay for itself.',
      'Con una primera visita de $400, necesitas entre 6 y 9 pacientes nuevos al mes para que esto se pague solo.',
    ),
    proof: {
      mode: 'metrics',
      label: M('What we measure', 'Lo que medimos'),
      intro: M(
        "We're currently instrumenting our first med spa account. Rather than show you numbers we can't back yet, here's exactly what we'll be reporting from month one:",
        'Estamos instrumentando nuestra primera cuenta de med spa. En vez de mostrarte números que todavía no podemos respaldar, esto es exactamente lo que vas a ver reportado desde el primer mes:',
      ),
      items: {
        en: [
          "Show-up rate — the single number most med spas don't track",
          'Cost per booked consultation, not per form fill',
          'Response time from first contact to first reply',
          'First-visit conversion to package',
          'Revenue per patient, first twelve months',
        ],
        es: [
          'Tasa de asistencia — el número que casi ningún med spa mide',
          'Costo por consulta agendada, no por formulario llenado',
          'Tiempo de respuesta desde el primer contacto',
          'Conversión de primera visita a paquete',
          'Ingreso por paciente en los primeros doce meses',
        ],
      },
      closing: M(
        "If your current agency isn't reporting these five, ask them why.",
        'Si tu agencia actual no te reporta estos cinco, pregúntale por qué.',
      ),
    },
    faq: [
      {
        question: M('Can you use before/after photos?', '¿Pueden usar fotos de antes y después?'),
        answer: M(
          'Yes, with written patient consent, which we help you set up. We never publish anything without it.',
          'Sí, con consentimiento escrito del paciente, que te ayudamos a formalizar. Nunca publicamos nada sin él.',
        ),
      },
      {
        question: M('What about medical claims?', '¿Y los claims médicos?'),
        answer: M(
          "We don't make them. No guaranteed results, no medical promises. Compliance is something we check, not something we leave to you.",
          'No los hacemos. Sin resultados garantizados, sin promesas médicas. El cumplimiento lo verificamos nosotros, no lo dejamos en tus manos.',
        ),
      },
    ],
  },

  {
    slug: 'home-improvement',
    image: homeImprovementImage,
    imageAlt: M(
      'A phone with call signal arcs, two of them breaking apart mid-air, in front of a house silhouette.',
      'Un teléfono con ondas de llamada, dos de ellas rompiéndose en el aire, frente a la silueta de una casa.',
    ),
    card: M('Every missed call is an $8,000 job that goes to your competitor.', 'Cada llamada perdida es un trabajo de $8,000 que se va a tu competencia.'),
    heading: M('Marketing for contractors in Dallas–Fort Worth', 'Marketing para contratistas en Dallas–Fort Worth'),
    subtext: M(
      'Every call you miss is an $8,000 job that goes to your competitor. Most contractors miss 30 to 40% of them.',
      'Cada llamada que no contestas es un trabajo de $8,000 que se va a tu competencia. La mayoría de los contratistas pierde entre el 30% y el 40%.',
    ),
    numbers: {
      en: [
        'Percentage of calls answered — the one nobody tracks.',
        'Cost per booked estimate — not per lead.',
        'Estimate-to-close rate — where your real bottleneck usually is.',
      ],
      es: [
        'Porcentaje de llamadas contestadas — el número que nadie mide.',
        'Costo por estimate agendado — no por lead.',
        'Tasa de estimate a venta — donde suele estar tu cuello de botella real.',
      ],
    },
    path: [
      { month: M('Month 0', 'Mes 0'), text: M('Diagnostic — missed-call audit, funnel, local competitors', 'Diagnóstico — auditoría de llamadas perdidas, embudo, competencia local'), price: '$297' },
      { month: M('Month 1', 'Mes 1'), text: M('Foundation Pro — site + service × city pages + LSA + call tracking', 'Base Pro — sitio + páginas de servicio × ciudad + LSA + rastreo de llamadas'), price: '$6,500' },
      { month: M('Month 2', 'Mes 2'), text: M('BUILD — Google Search + LSA live, AI Receptionist 24/7, 8 pieces/mo', 'BUILD — Google Search + LSA activos, recepcionista de IA 24/7, 8 piezas/mes'), price: '$1,800/mo' },
      { month: M('Month 6', 'Mes 6'), text: M('ENGINE — add Meta retargeting, estimate follow-up, more cities', 'ENGINE — se suma Meta retargeting, seguimiento de estimates, más ciudades'), price: '$2,500/mo' },
    ],
    different: M(
      "Contractors need less content and more coverage. Your customer isn't scrolling Instagram looking for a roofer — they're searching Google at 7 AM after a storm. So we put the weight on search, local service ads and call handling, and keep content lean and proof-driven.",
      'Los contratistas necesitan menos contenido y más cobertura. Tu cliente no está en Instagram buscando un techador — está buscando en Google a las 7 de la mañana después de una tormenta. Por eso ponemos el peso en búsqueda, anuncios de servicios locales y manejo de llamadas, y mantenemos el contenido enfocado en prueba.',
    ),
    breakeven: M(
      'At an $8,000 average job, you need less than one job a month for this to pay for itself.',
      'Con un trabajo promedio de $8,000, necesitas menos de un trabajo al mes para que esto se pague solo.',
    ),
    proof: {
      mode: 'case',
      label: M('Proof', 'Prueba'),
      client: "Amazon's Flooring — Dallas, TX",
      text: M(
        'A Dallas flooring company with no digital presence. We built the site and the brand identity from zero — designed around one job: turning a visitor into a quote request.',
        'Una empresa de pisos en Dallas sin presencia digital. Construimos el sitio y la identidad desde cero — diseñados alrededor de una sola tarea: convertir una visita en una solicitud de cotización.',
      ),
      quote: {
        text: M(
          'Working with Astratta was a game-changer. They understood exactly what our startup needed and delivered a website that truly represents our brand.',
          'Trabajar con Astratta fue un antes y un después. Entendieron exactamente lo que nuestra empresa necesitaba y entregaron un sitio que representa de verdad nuestra marca.',
        ),
        name: 'George Lopez',
        role: M('Founder', 'Fundador'),
      },
      caseSlug: 'amazons-flooring',
      linkLabel: M('See the full case study', 'Ver el caso completo'),
    },
    faq: [
      {
        question: M('What about storm season?', '¿Qué pasa en temporada de tormentas?'),
        answer: M(
          'Roofing spikes after spring hail in DFW, HVAC in summer. We plan budget flex into the contract from the start.',
          'El roofing se dispara después del granizo de primavera en DFW, y el HVAC en verano. La flexibilidad de presupuesto queda planeada en el contrato desde el inicio.',
        ),
      },
      {
        question: M('Are these shared leads like Angi?', '¿Son leads compartidos como los de Angi?'),
        answer: M(
          'No. Every lead is exclusively yours and fully traceable to the campaign that produced it.',
          'No. Cada lead es exclusivamente tuyo y totalmente rastreable hasta la campaña que lo generó.',
        ),
      },
    ],
  },

  {
    slug: 'restaurants',
    image: restaurantsImage,
    imageAlt: M(
      'A dinner plate with cutlery and a floating message bubble above it, with seats marked taken and empty.',
      'Un plato con cubiertos y una burbuja de mensaje flotando encima, con asientos marcados como ocupados y vacíos.',
    ),
    card: M("You don't need more followers. You need Tuesday full.", 'No necesitas más seguidores. Necesitas el martes lleno.'),
    heading: M('Marketing for restaurants in Dallas–Fort Worth', 'Marketing para restaurantes en Dallas–Fort Worth'),
    subtext: M(
      "You don't need more followers. You need Tuesday and Wednesday full.",
      'No necesitas más seguidores. Necesitas los martes y miércoles llenos.',
    ),
    numbers: {
      en: ['Covers on slow days.', 'Average ticket.', '90-day repeat rate — where the real money is.'],
      es: ['Comensales en días lentos.', 'Ticket promedio.', 'Tasa de repetición a 90 días — donde está el dinero real.'],
    },
    path: [
      { month: M('Month 0', 'Mes 0'), text: M('Diagnostic', 'Diagnóstico'), price: '$297' },
      { month: M('Month 1', 'Mes 1'), text: M('Foundation Lite — menu/reservation landing + GBP + reviews', 'Base Lite — landing de menú y reservas + GBP + reseñas'), price: '$1,200' },
      { month: M('Month 2', 'Mes 2'), text: M('START — 10 pieces/mo, SMS club, quarterly shoot', 'START — 10 piezas/mes, club de SMS, producción trimestral'), price: '$697/mo' },
      { month: M('Month 8', 'Mes 8'), text: M('BUILD — add local Meta, 16 pieces, monthly shoot', 'BUILD — se suma Meta local, 16 piezas, producción mensual'), price: '$1,800/mo' },
    ],
    different: M(
      "In food, content is the marketing — the decision is visual and impulsive. But the money isn't in new customers, it's in frequency. The SMS club is the product: a list you can text an offer to at 3 PM on a Tuesday and fill the room by 7.",
      'En comida, el contenido es el marketing — la decisión es visual e impulsiva. Pero el dinero no está en clientes nuevos, está en la frecuencia. El club de SMS es el producto: una lista a la que le mandas una oferta un martes a las 3 de la tarde y llenas el local a las 7.',
    ),
    breakeven: M(
      'At START, you need about 42 extra covers a month — less than one and a half a day.',
      'En START necesitas unos 42 comensales adicionales al mes — menos de uno y medio por día.',
    ),
    proof: {
      mode: 'case',
      label: M('Proof', 'Prueba'),
      client: 'Perreando HotDog — Dallas, TX',
      text: M(
        'A Venezuelan street-food truck with zero online presence. In 90 days: 292,000+ views across TikTok, Instagram and Facebook — with $0 in ad spend.',
        'Un food truck venezolano sin presencia en línea. En 90 días: más de 292,000 vistas entre TikTok, Instagram y Facebook — con $0 de inversión publicitaria.',
      ),
      metrics: [
        M('292K+ views', '292K+ vistas'),
        M('90 days', '90 días'),
        M('$0 ad spend', '$0 en publicidad'),
      ],
      caseSlug: 'perreando-hotdog-social-media',
      linkLabel: M('See the full case study', 'Ver el caso completo'),
    },
    faq: [
      {
        question: M('Do you come to the restaurant to shoot?', '¿Van al restaurante a grabar?'),
        answer: M(
          "Yes. In this industry it's not optional — stock food photography doesn't sell. One shoot day gives us four to five hours on site and produces content for the whole period. We arrive with the shot list already written.",
          'Sí. En este rubro no es opcional — la fotografía de comida de stock no vende. Un día de producción son cuatro o cinco horas en tu local y produce el contenido de todo el período. Llegamos con el plan de tomas ya escrito.',
        ),
      },
      {
        question: M('What is the SMS club exactly?', '¿Qué es exactamente el club de SMS?'),
        answer: M(
          "A list of customers who opted in to receive offers by text. You send one at 3 PM on a slow Tuesday and fill the room by 7. It's the highest-return asset in this industry and almost nobody in DFW runs it properly.",
          'Una lista de clientes que aceptaron recibir ofertas por mensaje. Mandas una un martes lento a las 3 de la tarde y llenas a las 7. Es el activo de mayor retorno de esta industria y casi nadie en DFW lo trabaja bien.',
        ),
      },
      {
        question: M('Why is the ad budget so low compared to other industries?', '¿Por qué el presupuesto de anuncios es tan bajo comparado con otras industrias?'),
        answer: M(
          "Because food content performs organically better than almost any other category. Paid spend has a low ceiling here. We'd rather put the weight on production and the SMS list, where the return is real.",
          'Porque el contenido de comida rinde orgánicamente mejor que casi cualquier otra categoría. El gasto pagado tiene un techo bajo aquí. Preferimos poner el peso en producción y en la lista de SMS, donde el retorno sí existe.',
        ),
      },
      {
        question: M('Can you help with delivery apps?', '¿Nos ayudan con las apps de delivery?'),
        answer: M(
          "We can optimize your listings and photography for them, but we won't build your business on a channel that takes 30% and owns your customer. The SMS club exists precisely so you don't depend on that.",
          'Podemos optimizar tus fichas y la fotografía, pero no vamos a construir tu negocio sobre un canal que se lleva el 30% y es dueño de tu cliente. El club de SMS existe justamente para que no dependas de eso.',
        ),
      },
    ],
  },

  {
    slug: 'real-estate',
    image: realEstateImage,
    imageAlt: M(
      'A fanned stack of grey contact cards with one lifted and reactivated in indigo, beside a small house.',
      'Una pila abierta de tarjetas de contacto grises con una levantada y reactivada en índigo, junto a una casa pequeña.',
    ),
    card: M("You have 800 contacts you haven't touched in a year.", 'Tienes 800 contactos que no has tocado en un año.'),
    heading: M('Marketing for real estate agents in Dallas–Fort Worth', 'Marketing para agentes de bienes raíces en Dallas–Fort Worth'),
    subtext: M(
      "You have 800 contacts you haven't touched in a year. Your next closing is already in there.",
      'Tienes 800 contactos que no has tocado en un año. Tu próximo cierre ya está ahí.',
    ),
    numbers: {
      en: ['Cost per qualified lead.', 'Percentage of leads still responding at 90 days.', 'Listing appointments per month.'],
      es: ['Costo por lead calificado.', 'Porcentaje de leads que siguen respondiendo a los 90 días.', 'Citas de listing al mes.'],
    },
    path: [
      { month: M('Month 0', 'Mes 0'), text: M('Diagnostic — database and positioning audit', 'Diagnóstico — auditoría de base de datos y posicionamiento'), price: '$297' },
      { month: M('Month 1', 'Mes 1'), text: M('Foundation — personal site + home valuation + CRM', 'Base — sitio personal + valuación de vivienda + CRM'), price: '$3,500' },
      { month: M('Month 1', 'Mes 1'), text: M('Database reactivation (add-on)', 'Reactivación de base de datos (add-on)'), price: '$1,800' },
      { month: M('Month 2', 'Mes 2'), text: M('BUILD — personal brand, 14 pieces/mo, 12-month nurture, Meta', 'BUILD — marca personal, 14 piezas/mes, nurture de 12 meses, Meta'), price: '$1,800/mo' },
    ],
    different: M(
      "A real estate lead matures over six to eighteen months. That changes everything. The product here isn't ads — it's the nurture system and your personal brand. Nobody hires a brokerage. They hire you.",
      'Un lead de bienes raíces madura entre seis y dieciocho meses. Eso cambia todo. Aquí el producto no son los anuncios — es el sistema de seguimiento y tu marca personal. Nadie contrata a un brokerage. Te contratan a ti.',
    ),
    breakeven: M(
      'At a $9,000 average commission, 2.4 closings a year covers it.',
      'Con una comisión promedio de $9,000, 2.4 cierres al año lo cubren.',
    ),
    note: M(
      "We won't promise closings in 90 days. Anyone who does doesn't understand this business.",
      'No prometemos cierres en 90 días. Quien lo hace no entiende este negocio.',
    ),
    proof: {
      mode: 'metrics',
      label: M('What we measure', 'Lo que medimos'),
      intro: M(
        "Real estate leads mature over six to eighteen months, which means most agency reporting in this vertical is theater. Here's what we actually track:",
        'Los leads de bienes raíces maduran entre seis y dieciocho meses, lo que significa que casi todo el reporte de agencia en este rubro es teatro. Esto es lo que sí medimos:',
      ),
      items: {
        en: [
          'Cost per qualified lead',
          'Percentage of leads still responding at 90 days',
          'Database reactivation rate — how many dormant contacts came back',
          'Listing appointments per month',
          'Attributed commission, tracked to the source that produced it',
        ],
        es: [
          'Costo por lead calificado',
          'Porcentaje de leads que siguen respondiendo a los 90 días',
          'Tasa de reactivación de base — cuántos contactos dormidos volvieron',
          'Citas de listing al mes',
          'Comisión atribuida, rastreada hasta la fuente que la produjo',
        ],
      },
      closing: M(
        "We won't promise closings in 90 days. Anyone who does doesn't understand this business.",
        'No prometemos cierres en 90 días. Quien lo hace no entiende este negocio.',
      ),
    },
    faq: [
      {
        question: M('How long before I see a closing?', '¿En cuánto tiempo veo un cierre?'),
        answer: M(
          "Honestly: six to eighteen months for leads generated from scratch. That's the cycle in this business. The fastest win is your existing database — that's where we start, before spending a dollar on ads.",
          'Honestamente: entre seis y dieciocho meses para leads generados desde cero. Ese es el ciclo de este negocio. El win más rápido es tu base actual — ahí empezamos, antes de gastar un dólar en anuncios.',
        ),
      },
      {
        question: M('Do I need my own site if my brokerage gives me one?', '¿Necesito mi propio sitio si mi brokerage me da uno?'),
        answer: M(
          'Yes. Brokerage sites are built for the brokerage, not for you. Nobody hires Keller Williams — they hire you. Your site is where your personal brand lives and where your leads actually land.',
          'Sí. Los sitios de brokerage están hechos para el brokerage, no para ti. Nadie contrata a Keller Williams — te contratan a ti. Tu sitio es donde vive tu marca personal y donde de verdad aterrizan tus leads.',
        ),
      },
      {
        question: M('What is database reactivation?', '¿Qué es la reactivación de base de datos?'),
        answer: M(
          "We take the contacts sitting untouched in your CRM and run a structured re-engagement sequence across email and SMS. It's the cheapest revenue available to any agent and it usually pays for the entire first quarter.",
          'Tomamos los contactos que están sin tocar en tu CRM y corremos una secuencia estructurada de reenganche por email y SMS. Es el ingreso más barato disponible para cualquier agente y normalmente paga el primer trimestre completo.',
        ),
      },
      {
        question: M('Can you help me with listing presentations?', '¿Me ayudan con las presentaciones de listing?'),
        answer: M(
          'Design work for listing presentations and property marketing is available as an add-on. The monthly system covers your acquisition and nurture, not per-listing collateral.',
          'El diseño para presentaciones de listing y marketing de propiedades está disponible como add-on. El sistema mensual cubre tu adquisición y seguimiento, no material por propiedad.',
        ),
      },
    ],
  },
]

export function getIndustry(slugEn: string): IndustrySource | undefined {
  return INDUSTRIES.find((i) => i.slug === slugEn)
}

export type ResolvedIndustry = {
  slug: string
  card: string
  heading: string
  subtext: string
  image: string
  imageAlt: string
  numbers: string[]
  path: { month: string; text: string; price: string }[]
  different: string
  breakeven: string
  note?: string
  faq: { question: string; answer: string }[]
}

export function resolveIndustry(source: IndustrySource, language: Language): ResolvedIndustry {
  return {
    slug: source.slug,
    card: source.card[language],
    heading: source.heading[language],
    subtext: source.subtext[language],
    image: source.image,
    imageAlt: source.imageAlt[language],
    numbers: source.numbers[language],
    path: source.path.map((p) => ({ month: p.month[language], text: p.text[language], price: p.price })),
    different: source.different[language],
    breakeven: source.breakeven[language],
    note: source.note?.[language],
    faq: source.faq.map((f) => ({ question: f.question[language], answer: f.answer[language] })),
  }
}
