import type { Bilingual, Language } from '@/lib/i18n/types'

export type BlogCategory = 'web-conversion' | 'digital-marketing' | 'design' | 'case-notes'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  publishedAt: string // ISO date, e.g. "2026-07-29"
  readingTime: string
  coverGradient: string
  metaTitle: string
  metaDescription: string
  /** Plain paragraphs for v1 — no MDX tooling in this build yet. Each string renders as one <p>. */
  body: string[]
}

type BlogPostSource = {
  slug: string
  title: Bilingual<string>
  excerpt: Bilingual<string>
  category: BlogCategory
  publishedAt: string
  readingTime: Bilingual<string>
  coverGradient: string
  metaTitle: Bilingual<string>
  metaDescription: Bilingual<string>
  body: Bilingual<string[]>
}

export function resolveBlogPost(source: BlogPostSource, language: Language): BlogPost {
  return {
    slug: source.slug,
    title: source.title[language],
    excerpt: source.excerpt[language],
    category: source.category,
    publishedAt: source.publishedAt,
    readingTime: source.readingTime[language],
    coverGradient: source.coverGradient,
    metaTitle: source.metaTitle[language],
    metaDescription: source.metaDescription[language],
    body: source.body[language],
  }
}

export function resolveBlogPosts(sources: BlogPostSource[], language: Language): BlogPost[] {
  return sources.map((source) => resolveBlogPost(source, language))
}

export const BLOG_CATEGORIES: { value: BlogCategory; label: Bilingual<string> }[] = [
  { value: 'web-conversion', label: { en: 'Web & Conversion', es: 'Web y Conversión' } },
  { value: 'digital-marketing', label: { en: 'Digital Marketing', es: 'Marketing Digital' } },
  { value: 'design', label: { en: 'Design', es: 'Diseño' } },
  { value: 'case-notes', label: { en: 'Case Notes', es: 'Notas de Casos' } },
]

export function categoryLabel(category: BlogCategory, language: Language): string {
  return BLOG_CATEGORIES.find((c) => c.value === category)?.label[language] ?? category
}

export const BLOG_POSTS: BlogPostSource[] = [
  {
    slug: 'traffic-no-leads-dallas',
    title: {
      en: 'Your Dallas business gets traffic but no leads — here’s why',
      es: 'Tu negocio en Dallas recibe tráfico pero no leads — aquí está el porqué',
    },
    excerpt: {
      en: 'Visitors aren’t the problem. Most Dallas–Fort Worth sites we audit get real traffic and still convert under 1%. The gap is almost always one of three things.',
      es: 'Los visitantes no son el problema. La mayoría de los sitios de Dallas–Fort Worth que auditamos reciben tráfico real y aun así convierten menos del 1%. La brecha casi siempre es una de tres cosas.',
    },
    category: 'web-conversion',
    publishedAt: '2026-07-22',
    readingTime: { en: '5 min read', es: '5 min de lectura' },
    coverGradient: 'from-primary/20 to-secondary/20',
    metaTitle: {
      en: 'Traffic but No Leads? 3 Reasons Your Dallas Site Isn’t Converting | Astratta',
      es: '¿Tráfico pero Sin Leads? 3 Razones por las que tu Sitio en Dallas no Convierte | Astratta',
    },
    metaDescription: {
      en: 'Most Dallas–Fort Worth websites we audit get real traffic and still convert under 1%. Here are the three most common reasons why, and how to fix each one.',
      es: 'La mayoría de los sitios web de Dallas–Fort Worth que auditamos reciben tráfico real y aun así convierten menos del 1%. Aquí están las tres razones más comunes, y cómo arreglar cada una.',
    },
    body: {
      en: [
        'We hear the same sentence in almost every discovery call: "we get visitors, they just don’t do anything." It’s rarely a traffic problem. When we audit a Dallas–Fort Worth site with decent traffic and a conversion rate under 1%, the cause is almost always one of three things — and none of them require more ad spend to fix.',
        'The first is a homepage that explains the company instead of the offer. "Family-owned since 2004" and "quality you can trust" tell a visitor nothing about what happens if they click the button. The homepage has about five seconds to answer one question: what do I get, and what do I do next? If a stranger can’t answer that from the hero section alone, everything below it is wasted.',
        'The second is a single, generic call to action doing three jobs at once. "Contact us" is being asked to serve the visitor who’s ready to buy today, the one who wants a quote first, and the one who’s still comparing options — and it serves none of them well. Every stage of intent needs its own next step: a fast quote path for the ready buyer, a lower-commitment option (a free audit, a downloadable guide) for the visitor still deciding.',
        'The third, and the one we see most in industrial and service businesses around DFW, is proof that’s generic or missing entirely. "10+ years of experience" is a claim. A before/after, a number tied to a real project, or a two-line quote from an actual client is proof. Visitors don’t act on claims from a stranger — they act on evidence that people like them got a result.',
        'None of these are redesign-scale problems. They’re usually fixable in the existing layout: rewrite the hero to lead with the outcome, split the CTA by intent, and swap vague trust language for one real number or quote per section. We cover exactly this in a free website audit — a prioritized list of what’s costing you leads today, not a 40-page report you’ll never open.',
      ],
      es: [
        'Escuchamos la misma frase en casi todas las llamadas iniciales: "tenemos visitantes, simplemente no hacen nada." Rara vez es un problema de tráfico. Cuando auditamos un sitio de Dallas–Fort Worth con tráfico decente y una tasa de conversión menor al 1%, la causa casi siempre es una de tres cosas — y ninguna requiere más inversión publicitaria para arreglarse.',
        'La primera es una página de inicio que explica la empresa en lugar de la oferta. "Familiar desde 2004" y "calidad en la que puedes confiar" no le dicen nada al visitante sobre qué pasa si hace clic en el botón. La página de inicio tiene unos cinco segundos para responder una pregunta: ¿qué obtengo, y qué hago después? Si un desconocido no puede responder eso solo con la sección principal, todo lo que sigue se desperdicia.',
        'La segunda es una sola llamada a la acción genérica haciendo tres trabajos a la vez. "Contáctanos" tiene que servir al visitante que está listo para comprar hoy, al que quiere una cotización primero, y al que todavía está comparando opciones — y no sirve bien a ninguno de los tres. Cada etapa de intención necesita su propio siguiente paso: una ruta rápida de cotización para el comprador listo, una opción de menor compromiso (una auditoría gratuita, una guía descargable) para el visitante que todavía está decidiendo.',
        'La tercera, y la que más vemos en negocios industriales y de servicios en DFW, es prueba genérica o completamente ausente. "Más de 10 años de experiencia" es una afirmación. Un antes/después, un número ligado a un proyecto real, o una cita de dos líneas de un cliente real es prueba. Los visitantes no actúan por afirmaciones de un desconocido — actúan por evidencia de que gente como ellos obtuvo un resultado.',
        'Ninguno de estos son problemas a escala de rediseño. Usualmente se pueden arreglar en el diseño existente: reescribir la sección principal para liderar con el resultado, dividir el CTA por intención, y cambiar el lenguaje de confianza vago por un número o cita real por sección. Cubrimos exactamente esto en una auditoría gratuita de sitio web — una lista priorizada de qué te está costando leads hoy, no un reporte de 40 páginas que nunca abrirás.',
      ],
    },
  },
  {
    slug: 'local-seo-checklist-dfw',
    title: {
      en: 'The local SEO checklist we run before touching a single ad dollar',
      es: 'El checklist de SEO local que revisamos antes de tocar un solo dólar en anuncios',
    },
    excerpt: {
      en: 'Before we ever recommend paid ads to a Dallas–Fort Worth client, we check these six things. Most businesses are leaving free, high-intent traffic on the table.',
      es: 'Antes de recomendar anuncios pagados a un cliente de Dallas–Fort Worth, revisamos estas seis cosas. La mayoría de los negocios están dejando pasar tráfico gratuito y de alta intención.',
    },
    category: 'digital-marketing',
    publishedAt: '2026-07-15',
    readingTime: { en: '6 min read', es: '6 min de lectura' },
    coverGradient: 'from-secondary/20 to-primary/20',
    metaTitle: {
      en: 'Local SEO Checklist for Dallas–Fort Worth Businesses | Astratta Agency',
      es: 'Checklist de SEO Local para Negocios de Dallas–Fort Worth | Astratta Agency',
    },
    metaDescription: {
      en: 'Before recommending paid ads, we run this six-point local SEO checklist for every Dallas–Fort Worth client. Most are leaving free, high-intent traffic on the table.',
      es: 'Antes de recomendar anuncios pagados, revisamos este checklist de SEO local de seis puntos con cada cliente de Dallas–Fort Worth. La mayoría deja pasar tráfico gratuito y de alta intención.',
    },
    body: {
      en: [
        'Paid ads are the fastest way to spend money before you’ve fixed the things that make ads work. Before we ever turn on a campaign for a Dallas–Fort Worth client, we run through six checks — most of which cost nothing and take an afternoon.',
        'First: is the Google Business Profile actually complete? Not just claimed — complete. Correct category, service area set to the real coverage zone (not just "Dallas"), hours that match reality, and at least five recent photos. An incomplete profile is invisible in the map pack, which is where most "near me" searches convert.',
        'Second: is NAP (name, address, phone) identical everywhere — website footer, Google profile, Yelp, Facebook, industry directories? Inconsistent formatting ("St." vs "Street", different phone formats) quietly tells Google these might be different businesses, which weakens local rankings more than most owners realize.',
        'Third: does the site have a page for each service area, not just one generic "our services" page? A roofer serving Dallas, Plano, and Frisco needs distinct, genuinely useful pages for each — not the same content with the city name swapped, which Google discounts.',
        'Fourth: reviews. Not just count — recency and response rate. A profile with 40 reviews from 2022 reads worse to both Google and buyers than one with 15 reviews from the last three months, all with owner responses. We tell every client: ask for a review at the moment of highest satisfaction, not in a bulk email six months later.',
        'Fifth and sixth are technical: page speed on mobile (most DFW searches are on a phone, in a parking lot, comparing three competitors) and a working schema markup for LocalBusiness so Google can actually parse what you do and where. Skip these and you’re paying for ads to send traffic to a page that was already losing the organic race.',
        'Fix these six first. They’re free, they compound, and they make every dollar you eventually put into ads work harder because the foundation underneath it isn’t broken.',
      ],
      es: [
        'Los anuncios pagados son la forma más rápida de gastar dinero antes de haber arreglado las cosas que hacen que los anuncios funcionen. Antes de activar una campaña para un cliente de Dallas–Fort Worth, revisamos seis puntos — la mayoría no cuestan nada y toman una tarde.',
        'Primero: ¿el Google Business Profile está realmente completo? No solo reclamado — completo. Categoría correcta, área de servicio configurada a la zona de cobertura real (no solo "Dallas"), horarios que coinciden con la realidad, y al menos cinco fotos recientes. Un perfil incompleto es invisible en el mapa de resultados, que es donde convierte la mayoría de las búsquedas "cerca de mí".',
        'Segundo: ¿el NAP (nombre, dirección, teléfono) es idéntico en todas partes — pie de página del sitio, perfil de Google, Yelp, Facebook, directorios de la industria? El formato inconsistente ("Calle" vs "Cll.", diferentes formatos de teléfono) le dice silenciosamente a Google que podrían ser negocios diferentes, lo cual debilita el posicionamiento local más de lo que la mayoría de los dueños se dan cuenta.',
        '¿Tercero: el sitio tiene una página para cada área de servicio, no solo una página genérica de "nuestros servicios"? Un techador que atiende Dallas, Plano y Frisco necesita páginas distintas y genuinamente útiles para cada una — no el mismo contenido con el nombre de la ciudad cambiado, que Google penaliza.',
        'Cuarto: reseñas. No solo la cantidad — la frecuencia y la tasa de respuesta. Un perfil con 40 reseñas de 2022 se ve peor tanto para Google como para los compradores que uno con 15 reseñas de los últimos tres meses, todas con respuestas del dueño. Le decimos a cada cliente: pide una reseña en el momento de mayor satisfacción, no en un correo masivo seis meses después.',
        'Quinto y sexto son técnicos: velocidad de la página en móvil (la mayoría de las búsquedas en DFW son desde un teléfono, en un estacionamiento, comparando tres competidores) y un marcado schema funcional para LocalBusiness para que Google pueda realmente entender qué haces y dónde. Sáltate estos y estarás pagando anuncios para enviar tráfico a una página que ya estaba perdiendo la carrera orgánica.',
        'Arregla estos seis primero. Son gratis, se acumulan, y hacen que cada dólar que eventualmente pongas en anuncios rinda más porque la base debajo no está rota.',
      ],
    },
  },
]
