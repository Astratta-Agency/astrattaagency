import type { Bilingual } from '@/lib/i18n/types'

export type FaqEntry = {
  question: Bilingual<string>
  answer: Bilingual<string>
}

// NOTE: timeline and pricing answers below are written without specific
// weeks/dollar figures on purpose — confirm real numbers with the client
// before launch, then tighten this copy (see working-method rule: never
// invent stats, client names, or prices).
export const FAQ_ITEMS: FaqEntry[] = [
  {
    question: {
      en: 'How long does a website take?',
      es: '¿Cuánto tiempo toma un sitio web?',
    },
    answer: {
      en: "It depends on scope — a single landing page moves much faster than a multi-page site with custom features. You'll get a firm timeline after the diagnostic, before any work starts.",
      es: 'Depende del alcance — una landing page individual avanza mucho más rápido que un sitio de varias páginas con funciones personalizadas. Recibirás un cronograma firme después del diagnóstico, antes de comenzar cualquier trabajo.',
    },
  },
  {
    question: {
      en: 'How much does a website cost in Dallas?',
      es: '¿Cuánto cuesta un sitio web en Dallas?',
    },
    answer: {
      en: 'Pricing depends on scope, not a one-size-fits-all package. Astratta is boutique and remote-first, so you get senior-level work without traditional agency overhead — you\'ll get a clear, itemized quote after the diagnostic.',
      es: 'El precio depende del alcance, no es un paquete único para todos. Astratta es boutique y remota, así que obtienes trabajo de nivel senior sin los gastos generales de una agencia tradicional — recibirás una cotización clara y detallada después del diagnóstico.',
    },
  },
  {
    question: {
      en: "What's included in the audit?",
      es: '¿Qué incluye la auditoría?',
    },
    answer: {
      en: 'A full review of your current site (or lack of one): performance, mobile experience, messaging clarity, conversion paths, and SEO fundamentals — plus a prioritized action plan of what to fix first and why.',
      es: 'Una revisión completa de tu sitio actual (o la falta de uno): rendimiento, experiencia móvil, claridad del mensaje, rutas de conversión y fundamentos de SEO — más un plan de acción priorizado sobre qué corregir primero y por qué.',
    },
  },
  {
    question: {
      en: 'Do you work only with Dallas businesses?',
      es: '¿Solo trabajan con negocios de Dallas?',
    },
    answer: {
      en: "Dallas–Fort Worth is home base and where most of our clients are, but Astratta is remote-first — we work with startups and small/mid businesses anywhere, industrial, retail, and service companies alike.",
      es: 'Dallas–Fort Worth es nuestra base y donde está la mayoría de nuestros clientes, pero Astratta trabaja de forma remota — trabajamos con startups y negocios pequeños/medianos en cualquier lugar, tanto empresas industriales, minoristas como de servicios.',
    },
  },
  {
    question: {
      en: 'I have traffic but no leads — can you fix that?',
      es: 'Tengo tráfico pero no leads — ¿pueden solucionarlo?',
    },
    answer: {
      en: "That's usually a conversion problem, not a traffic problem — and it's exactly what the diagnostic is built to find. We look at messaging, page speed, mobile UX, and funnel friction to find where visitors are dropping off.",
      es: 'Eso suele ser un problema de conversión, no de tráfico — y es exactamente lo que el diagnóstico está diseñado para encontrar. Analizamos el mensaje, la velocidad de carga, la experiencia móvil y la fricción del embudo para encontrar dónde se están yendo los visitantes.',
    },
  },
  {
    question: {
      en: 'Do you offer ongoing support?',
      es: '¿Ofrecen soporte continuo?',
    },
    answer: {
      en: 'Yes. After launch we can stay on for maintenance, iteration, and ongoing digital marketing so the site keeps improving instead of going stale.',
      es: 'Sí. Después del lanzamiento podemos continuar con mantenimiento, iteración y marketing digital continuo para que el sitio siga mejorando en lugar de quedarse estancado.',
    },
  },
]

/** About-page FAQ — targets AI/local-search queries about the studio and its founder, not services/pricing. */
export const ABOUT_FAQ_ITEMS: FaqEntry[] = [
  {
    question: {
      en: 'Who is behind Astratta Agency?',
      es: '¿Quién está detrás de Astratta Agency?',
    },
    answer: {
      en: 'Astratta Agency was founded by Hisbelis Vargas, who leads strategy and execution on every engagement, alongside a small senior team including a dedicated community manager. Every project is founder-led from start to finish.',
      es: 'Astratta Agency fue fundada por Hisbelis Vargas, quien lidera la estrategia y ejecución de cada proyecto, junto a un pequeño equipo senior que incluye una community manager dedicada. Cada proyecto es liderado por la fundadora de principio a fin.',
    },
  },
  {
    question: {
      en: 'Where is Astratta Agency located?',
      es: '¿Dónde está ubicada Astratta Agency?',
    },
    answer: {
      en: 'Astratta Agency is based in Dallas–Fort Worth, Texas, and works remotely with clients across the region and beyond. Most current clients are DFW-area startups and small businesses in industrial, retail, and service industries, though the studio takes on remote projects nationwide.',
      es: 'Astratta Agency tiene su base en Dallas–Fort Worth, Texas, y trabaja de forma remota con clientes en toda la región y más allá. La mayoría de los clientes actuales son startups y pequeños negocios del área de DFW en industrias industriales, minoristas y de servicios, aunque el estudio también toma proyectos remotos a nivel nacional.',
    },
  },
  {
    question: {
      en: 'What makes Astratta different from other Dallas agencies?',
      es: '¿Qué diferencia a Astratta de otras agencias de Dallas?',
    },
    answer: {
      en: 'Astratta is a boutique, founder-led studio instead of a layered agency — no account managers, no junior staff handing off your project. You work directly with the founder on strategy, design, and build, which means senior-level work at a fraction of typical agency overhead.',
      es: 'Astratta es un estudio boutique liderado por su fundadora, no una agencia con múltiples capas — sin gerentes de cuenta, sin personal junior manejando tu proyecto. Trabajas directamente con la fundadora en estrategia, diseño y desarrollo, lo que significa trabajo de nivel senior a una fracción del costo típico de una agencia.',
    },
  },
  {
    question: {
      en: 'What industries does Astratta work with?',
      es: '¿Con qué industrias trabaja Astratta?',
    },
    answer: {
      en: 'Astratta primarily works with startups and small-to-mid businesses in industrial, retail, service, food and hospitality, and professional-services industries across Dallas–Fort Worth. The common thread is businesses that need a conversion-focused website or marketing system, not just a good-looking one.',
      es: 'Astratta trabaja principalmente con startups y negocios pequeños y medianos en industrias industriales, minoristas, de servicios, alimentos y hospitalidad, y servicios profesionales en todo Dallas–Fort Worth. El hilo conductor son negocios que necesitan un sitio web o sistema de marketing enfocado en conversión, no solo uno que se vea bien.',
    },
  },
  {
    question: {
      en: 'How do I start working with Astratta?',
      es: '¿Cómo empiezo a trabajar con Astratta?',
    },
    answer: {
      en: "Start with the Growth Score — twelve questions, four minutes, free. It tells you which stage your business is in and where your biggest gaps are. If you want the deeper version, the diagnostic goes seven days into your funnel, tracking, local presence and competitors, and hands you the ten fixes that matter most. It's $297, credited in full if we work together.",
      es: 'Empieza con el Growth Score — doce preguntas, cuatro minutos, gratis. Te dice en qué etapa está tu negocio y dónde están tus fugas más grandes. Si quieres la versión profunda, el diagnóstico entra siete días en tu embudo, tu medición, tu presencia local y tu competencia, y te entrega los diez arreglos que más importan. Son $297, acreditables completos si trabajamos juntos.',
    },
  },
  {
    question: {
      en: 'Does Astratta manage social media?',
      es: '¿Astratta gestiona redes sociales?',
    },
    answer: {
      en: 'Yes. Astratta offers social media management led by a dedicated community manager — content, engagement, and lead generation measured by leads and cost per lead, not likes.',
      es: 'Sí. Astratta ofrece gestión de redes sociales liderada por una community manager dedicada — contenido, interacción y generación de leads medidos por leads y costo por lead, no por likes.',
    },
  },
]
