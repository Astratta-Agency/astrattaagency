import type { Bilingual, Language } from '@/lib/i18n/types'
import type { BlogIllustrationVariant } from '@/components/ui/BlogIllustration'
import trafficNoLeadsCover from '@/assets/blog/traffic-no-leads-cover.webp'
import trafficNoLeadsClarity from '@/assets/blog/traffic-no-leads-clarity.webp'
import trafficNoLeadsProof from '@/assets/blog/traffic-no-leads-proof.webp'
import localSeoCover from '@/assets/blog/local-seo-cover.webp'
import localSeoProfile from '@/assets/blog/local-seo-profile.webp'
import localSeoReviews from '@/assets/blog/local-seo-reviews.webp'

export type BlogCategory = 'web-conversion' | 'digital-marketing' | 'design' | 'case-notes'

/**
 * Body block model. `text` on paragraph/heading/quote may contain `**bold**`
 * markup — BlogPost.tsx renders it as inline emphasis. Bold spans always wrap
 * an exact substring of the original prose, so the rendered copy in either
 * language never changes, only its styling.
 */
export type BlogBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'quote'; text: string }
  /**
   * `src` (a bundler-imported asset) wins when present; otherwise the
   * `variant` vector illustration renders, so posts work before real
   * photography exists. `alt` is required alongside `src` for accessibility —
   * the illustrations are decorative and stay aria-hidden.
   */
  | { kind: 'image'; variant: BlogIllustrationVariant; caption: string; src?: string; alt?: string }

/**
 * Bylines are shared, not repeated per post. Add a key here and reference it
 * by id from a post's `author` field.
 */
export const AUTHORS = {
  hisbelis: {
    name: 'Hisbelis Vargas',
    role: { en: 'Founder · Astratta Agency', es: 'Astratta Agency' } satisfies Bilingual<string>,
  },
} as const

export type AuthorId = keyof typeof AUTHORS

export type ResolvedAuthor = { name: string; role: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  publishedAt: string // ISO date, e.g. "2026-07-29"
  readingTime: string
  coverGradient: string
  coverVariant: BlogIllustrationVariant
  coverImage?: string
  coverAlt?: string
  author: ResolvedAuthor
  metaTitle: string
  metaDescription: string
  body: BlogBlock[]
}

export type BlogPostSource = {
  slug: Bilingual<string>
  title: Bilingual<string>
  excerpt: Bilingual<string>
  category: BlogCategory
  publishedAt: string
  readingTime: Bilingual<string>
  coverGradient: string
  coverVariant: BlogIllustrationVariant
  /** Real cover art; falls back to the `coverVariant` illustration when absent. */
  coverImage?: string
  coverAlt?: Bilingual<string>
  author: AuthorId
  metaTitle: Bilingual<string>
  metaDescription: Bilingual<string>
  body: Bilingual<BlogBlock[]>
}

export function resolveBlogPost(source: BlogPostSource, language: Language): BlogPost {
  return {
    slug: source.slug[language],
    title: source.title[language],
    excerpt: source.excerpt[language],
    category: source.category,
    publishedAt: source.publishedAt,
    readingTime: source.readingTime[language],
    coverGradient: source.coverGradient,
    coverVariant: source.coverVariant,
    coverImage: source.coverImage,
    coverAlt: source.coverAlt?.[language],
    author: { name: AUTHORS[source.author].name, role: AUTHORS[source.author].role[language] },
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
    slug: { en: 'traffic-no-leads-dallas', es: 'trafico-sin-leads-dallas' },
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
    coverVariant: 'insight',
    coverImage: trafficNoLeadsCover,
    coverAlt: {
      en: 'Visitor dots streaming into a browser window, with only a few passing through into a nearly empty funnel below.',
      es: 'Puntos de visitantes entrando a una ventana de navegador; solo unos pocos pasan a un embudo casi vacío debajo.',
    },
    author: 'hisbelis',
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
        {
          kind: 'paragraph',
          text: 'We hear the same sentence in almost every discovery call: "we get visitors, they just don’t do anything." **It’s rarely a traffic problem.** When we audit a Dallas–Fort Worth site with decent traffic and a conversion rate under 1%, the cause is almost always one of three things — and none of them require more ad spend to fix.',
        },
        { kind: 'heading', text: '1. The homepage explains the company, not the offer' },
        {
          kind: 'paragraph',
          text: 'The first is a homepage that explains the company instead of the offer. "Family-owned since 2004" and "quality you can trust" tell a visitor nothing about what happens if they click the button. **The homepage has about five seconds to answer one question: what do I get, and what do I do next?** If a stranger can’t answer that from the hero section alone, everything below it is wasted.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'A homepage has about five seconds to answer: what do I get, and what do I do next?',
          src: trafficNoLeadsClarity,
          alt: 'A browser window showing one headline, one supporting line and a single orange call-to-action button, beside a stopwatch.',
        },
        { kind: 'heading', text: '2. One generic CTA is doing three jobs' },
        {
          kind: 'paragraph',
          text: 'The second is a single, generic call to action doing three jobs at once. "Contact us" is being asked to serve the visitor who’s ready to buy today, the one who wants a quote first, and the one who’s still comparing options — and it serves none of them well. **Every stage of intent needs its own next step**: a fast quote path for the ready buyer, a lower-commitment option (a free audit, a downloadable guide) for the visitor still deciding.',
        },
        { kind: 'heading', text: '3. The proof is generic — or missing entirely' },
        {
          kind: 'paragraph',
          text: 'The third, and the one we see most in industrial and service businesses around DFW, is proof that’s generic or missing entirely. "10+ years of experience" is a claim. A before/after, a number tied to a real project, or a two-line quote from an actual client is proof. **Visitors don’t act on claims from a stranger — they act on evidence that people like them got a result.**',
        },
        {
          kind: 'quote',
          text: 'Visitors don’t act on claims from a stranger — they act on evidence that people like them got a result.',
        },
        {
          kind: 'image',
          variant: 'proof',
          caption: 'A before/after or a real client quote does more work than any trust badge.',
          src: trafficNoLeadsProof,
          alt: 'A customer testimonial card next to a rising bar chart, with generic trust badges tipped over beside them.',
        },
        {
          kind: 'paragraph',
          text: 'None of these are redesign-scale problems. They’re usually fixable in the existing layout: rewrite the hero to lead with the outcome, split the CTA by intent, and swap vague trust language for one real number or quote per section. [Take the free Growth Score](/growth-score) — twelve questions that tell you which stage your business is in and where the biggest gaps are, not a 40-page report you’ll never open.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'Escuchamos la misma frase en casi todas las llamadas iniciales: "tenemos visitantes, simplemente no hacen nada." **Rara vez es un problema de tráfico.** Cuando auditamos un sitio de Dallas–Fort Worth con tráfico decente y una tasa de conversión menor al 1%, la causa casi siempre es una de tres cosas — y ninguna requiere más inversión publicitaria para arreglarse.',
        },
        { kind: 'heading', text: '1. La página de inicio explica la empresa, no la oferta' },
        {
          kind: 'paragraph',
          text: 'La primera es una página de inicio que explica la empresa en lugar de la oferta. "Familiar desde 2004" y "calidad en la que puedes confiar" no le dicen nada al visitante sobre qué pasa si hace clic en el botón. **La página de inicio tiene unos cinco segundos para responder una pregunta: ¿qué obtengo, y qué hago después?** Si un desconocido no puede responder eso solo con la sección principal, todo lo que sigue se desperdicia.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'La página de inicio tiene unos cinco segundos para responder: ¿qué obtengo, y qué hago después?',
          src: trafficNoLeadsClarity,
          alt: 'Una ventana de navegador con un titular, una línea de apoyo y un solo botón naranja de llamada a la acción, junto a un cronómetro.',
        },
        { kind: 'heading', text: '2. Un solo CTA genérico haciendo tres trabajos' },
        {
          kind: 'paragraph',
          text: 'La segunda es una sola llamada a la acción genérica haciendo tres trabajos a la vez. "Contáctanos" tiene que servir al visitante que está listo para comprar hoy, al que quiere una cotización primero, y al que todavía está comparando opciones — y no sirve bien a ninguno de los tres. **Cada etapa de intención necesita su propio siguiente paso**: una ruta rápida de cotización para el comprador listo, una opción de menor compromiso (una auditoría gratuita, una guía descargable) para el visitante que todavía está decidiendo.',
        },
        { kind: 'heading', text: '3. La prueba es genérica — o no existe' },
        {
          kind: 'paragraph',
          text: 'La tercera, y la que más vemos en negocios industriales y de servicios en DFW, es prueba genérica o completamente ausente. "Más de 10 años de experiencia" es una afirmación. Un antes/después, un número ligado a un proyecto real, o una cita de dos líneas de un cliente real es prueba. **Los visitantes no actúan por afirmaciones de un desconocido — actúan por evidencia de que gente como ellos obtuvo un resultado.**',
        },
        {
          kind: 'quote',
          text: 'Los visitantes no actúan por afirmaciones de un desconocido — actúan por evidencia de que gente como ellos obtuvo un resultado.',
        },
        {
          kind: 'image',
          variant: 'proof',
          caption: 'Un antes/después o la cita real de un cliente pesa más que cualquier sello de confianza.',
          src: trafficNoLeadsProof,
          alt: 'Una tarjeta de testimonio junto a un gráfico de barras ascendente, con sellos de confianza genéricos volcados al lado.',
        },
        {
          kind: 'paragraph',
          text: 'Ninguno de estos son problemas a escala de rediseño. Usualmente se pueden arreglar en el diseño existente: reescribir la sección principal para liderar con el resultado, dividir el CTA por intención, y cambiar el lenguaje de confianza vago por un número o cita real por sección. [Haz el Growth Score gratis](/growth-score) — doce preguntas que te dicen en qué etapa está tu negocio y dónde están las fugas más grandes, no un reporte de 40 páginas que nunca abrirás.',
        },
      ],
    },
  },
  {
    slug: { en: 'local-seo-checklist-dfw', es: 'checklist-seo-local-dfw' },
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
    coverVariant: 'checklist',
    coverImage: localSeoCover,
    coverAlt: {
      en: 'A map pin standing on a street grid beside a checklist card with three orange check marks.',
      es: 'Un marcador de mapa sobre una cuadrícula de calles junto a una tarjeta de lista con tres marcas naranjas.',
    },
    author: 'hisbelis',
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
        {
          kind: 'paragraph',
          text: 'Paid ads are the fastest way to spend money before you’ve fixed the things that make ads work. Before we ever turn on a campaign for a Dallas–Fort Worth client, we run through **six checks** — most of which cost nothing and take an afternoon.',
        },
        { kind: 'heading', text: '1. Is the Google Business Profile actually complete?' },
        {
          kind: 'paragraph',
          text: 'First: is the Google Business Profile actually complete? Not just claimed — complete. Correct category, service area set to the real coverage zone (not just "Dallas"), hours that match reality, and at least five recent photos. **An incomplete profile is invisible in the map pack**, which is where most "near me" searches convert.',
        },
        {
          kind: 'image',
          variant: 'gbp',
          caption: 'An incomplete profile is invisible in the map pack — where most "near me" searches convert.',
          src: localSeoProfile,
          alt: 'Three stacked map listings: the two complete ones carry an orange check badge, the incomplete one below is greyed out and empty.',
        },
        { kind: 'heading', text: '2. Is your NAP identical everywhere?' },
        {
          kind: 'paragraph',
          text: 'Second: is NAP (name, address, phone) identical everywhere — website footer, Google profile, Yelp, Facebook, industry directories? Inconsistent formatting ("St." vs "Street", different phone formats) quietly tells Google these might be different businesses, which **weakens local rankings more than most owners realize**.',
        },
        { kind: 'heading', text: '3. Does every service area have its own page?' },
        {
          kind: 'paragraph',
          text: 'Third: does the site have a page for each service area, not just one generic "our services" page? A roofer serving Dallas, Plano, and Frisco needs distinct, genuinely useful pages for each — not the same content with the city name swapped, **which Google discounts**.',
        },
        { kind: 'heading', text: '4. Are reviews recent, not just numerous?' },
        {
          kind: 'paragraph',
          text: 'Fourth: reviews. Not just count — recency and response rate. A profile with 40 reviews from 2022 reads worse to both Google and buyers than one with 15 reviews from the last three months, all with owner responses. We tell every client: **ask for a review at the moment of highest satisfaction**, not in a bulk email six months later.',
        },
        {
          kind: 'quote',
          text: 'Ask for a review at the moment of highest satisfaction, not in a bulk email six months later.',
        },
        {
          kind: 'image',
          variant: 'reviews',
          caption: 'Recency and response rate matter more to buyers than raw review count.',
          src: localSeoReviews,
          alt: 'Two review cards, the front one with five orange stars and an owner reply bubble, next to a clock.',
        },
        { kind: 'heading', text: '5–6. Page speed and schema markup' },
        {
          kind: 'paragraph',
          text: 'Fifth and sixth are technical: page speed on mobile (most DFW searches are on a phone, in a parking lot, comparing three competitors) and a working schema markup for LocalBusiness so Google can actually parse what you do and where. Skip these and you’re paying for ads to send traffic to a page that **was already losing the organic race**.',
        },
        {
          kind: 'paragraph',
          text: 'Fix these six first. They’re free, they compound, and they make every dollar you eventually put into ads work harder because **the foundation underneath it isn’t broken**.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'Los anuncios pagados son la forma más rápida de gastar dinero antes de haber arreglado las cosas que hacen que los anuncios funcionen. Antes de activar una campaña para un cliente de Dallas–Fort Worth, revisamos **seis puntos** — la mayoría no cuestan nada y toman una tarde.',
        },
        { kind: 'heading', text: '1. ¿El Google Business Profile está realmente completo?' },
        {
          kind: 'paragraph',
          text: 'Primero: ¿el Google Business Profile está realmente completo? No solo reclamado — completo. Categoría correcta, área de servicio configurada a la zona de cobertura real (no solo "Dallas"), horarios que coinciden con la realidad, y al menos cinco fotos recientes. **Un perfil incompleto es invisible en el mapa de resultados**, que es donde convierte la mayoría de las búsquedas "cerca de mí".',
        },
        {
          kind: 'image',
          variant: 'gbp',
          caption: 'Un perfil incompleto es invisible en el mapa de resultados — donde convierte la mayoría de las búsquedas "cerca de mí".',
          src: localSeoProfile,
          alt: 'Tres fichas de mapa apiladas: las dos completas llevan una insignia naranja; la incompleta, abajo, aparece en gris y vacía.',
        },
        { kind: 'heading', text: '2. ¿Tu NAP es idéntico en todas partes?' },
        {
          kind: 'paragraph',
          text: 'Segundo: ¿el NAP (nombre, dirección, teléfono) es idéntico en todas partes — pie de página del sitio, perfil de Google, Yelp, Facebook, directorios de la industria? El formato inconsistente ("Calle" vs "Cll.", diferentes formatos de teléfono) le dice silenciosamente a Google que podrían ser negocios diferentes, lo cual **debilita el posicionamiento local más de lo que la mayoría de los dueños se dan cuenta**.',
        },
        { kind: 'heading', text: '3. ¿Cada área de servicio tiene su propia página?' },
        {
          kind: 'paragraph',
          text: '¿Tercero: el sitio tiene una página para cada área de servicio, no solo una página genérica de "nuestros servicios"? Un techador que atiende Dallas, Plano y Frisco necesita páginas distintas y genuinamente útiles para cada una — no el mismo contenido con el nombre de la ciudad cambiado, **que Google penaliza**.',
        },
        { kind: 'heading', text: '4. ¿Las reseñas son recientes, no solo numerosas?' },
        {
          kind: 'paragraph',
          text: 'Cuarto: reseñas. No solo la cantidad — la frecuencia y la tasa de respuesta. Un perfil con 40 reseñas de 2022 se ve peor tanto para Google como para los compradores que uno con 15 reseñas de los últimos tres meses, todas con respuestas del dueño. Le decimos a cada cliente: **pide una reseña en el momento de mayor satisfacción**, no en un correo masivo seis meses después.',
        },
        {
          kind: 'quote',
          text: 'Pide una reseña en el momento de mayor satisfacción, no en un correo masivo seis meses después.',
        },
        {
          kind: 'image',
          variant: 'reviews',
          caption: 'La frecuencia y la tasa de respuesta importan más a los compradores que la cantidad de reseñas.',
          src: localSeoReviews,
          alt: 'Dos tarjetas de reseña; la del frente con cinco estrellas naranjas y una burbuja de respuesta, junto a un reloj.',
        },
        { kind: 'heading', text: '5–6. Velocidad de página y schema markup' },
        {
          kind: 'paragraph',
          text: 'Quinto y sexto son técnicos: velocidad de la página en móvil (la mayoría de las búsquedas en DFW son desde un teléfono, en un estacionamiento, comparando tres competidores) y un marcado schema funcional para LocalBusiness para que Google pueda realmente entender qué haces y dónde. Sáltate estos y estarás pagando anuncios para enviar tráfico a una página que **ya estaba perdiendo la carrera orgánica**.',
        },
        {
          kind: 'paragraph',
          text: 'Arregla estos seis primero. Son gratis, se acumulan, y hacen que cada dólar que eventualmente pongas en anuncios rinda más porque **la base debajo no está rota**.',
        },
      ],
    },
  },
]
