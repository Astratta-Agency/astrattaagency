import type { Bilingual, Language } from '@/lib/i18n/types'
import type { BlogIllustrationVariant } from '@/components/ui/BlogIllustration'
import trafficNoLeadsCover from '@/assets/blog/traffic-no-leads-cover.webp'
import trafficNoLeadsClarity from '@/assets/blog/traffic-no-leads-clarity.webp'
import trafficNoLeadsProof from '@/assets/blog/traffic-no-leads-proof.webp'
import localSeoCover from '@/assets/blog/local-seo-cover.webp'
import localSeoProfile from '@/assets/blog/local-seo-profile.webp'
import localSeoReviews from '@/assets/blog/local-seo-reviews.webp'
import aiLocalPickCover from '@/assets/blog/ai-one-recommendation-dallas-cover.webp'
import aiLocalPickStorefront from '@/assets/blog/ai-one-recommendation-dallas-one-glowing-storefront.webp'
import aiLocalPickBeacon from '@/assets/blog/ai-one-recommendation-dallas-profile-lighthouse-beacon.webp'

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
  {
    slug: { en: 'ai-one-recommendation-dallas', es: 'ia-una-sola-recomendacion-dallas' },
    title: {
      en: 'AI now recommends one local business in Dallas — is it yours?',
      es: 'La IA ya recomienda un solo negocio en Dallas — ¿eres tú?',
    },
    excerpt: {
      en: 'AI assistants now pick one local business to recommend, not ten. Here’s what to check this week so a Dallas–Fort Worth customer’s AI answer is you, not a competitor.',
      es: 'Los asistentes de IA ya eligen un solo negocio local para recomendar, no diez. Esto es lo que debes revisar esta semana para que esa respuesta sea tu negocio y no el de la competencia.',
    },
    category: 'digital-marketing',
    publishedAt: '2026-08-18',
    readingTime: { en: '5 min read', es: '5 min de lectura' },
    coverGradient: 'from-primary/20 to-secondary/20',
    coverVariant: 'insight',
    coverImage: aiLocalPickCover,
    coverAlt: {
      en: 'A single spotlight beam cutting across a city grid of identical grey buildings, illuminating just one of them while a small AI chat icon floats above.',
      es: 'Un solo haz de luz que atraviesa una cuadrícula de edificios grises idénticos, iluminando solo uno, con un pequeño ícono de chat de IA flotando arriba.',
    },
    author: 'hisbelis',
    metaTitle: {
      en: 'AI Now Recommends One Local Business in Dallas | Astratta',
      es: 'La IA ya elige un solo negocio local en Dallas | Astratta',
    },
    metaDescription: {
      en: 'AI assistants like ChatGPT and Google now name one local business per search instead of listing ten. What Dallas–Fort Worth businesses should check this week.',
      es: 'Los asistentes de IA ya recomiendan un solo negocio local por búsqueda, no diez opciones. Qué debe revisar tu negocio en Dallas-Fort Worth esta semana.',
    },
    body: {
      en: [
        {
          kind: 'paragraph',
          text: 'Search engines just changed who gets recommended to your next customer, and the shift is expensive to ignore if you run a business in Dallas–Fort Worth. Over the past few weeks, AI assistants — Google’s AI Overviews, ChatGPT, and similar tools — have moved from listing ten businesses for a local search to naming one. Search Engine Journal is calling the shift “Local 5.0”: the point where an AI reads a business’s reviews, its Google Business Profile, and its website, then **tells the person which business to call, instead of handing them a page of links to compare on their own**.',
        },
        {
          kind: 'paragraph',
          text: 'This isn’t a future feature. It’s already live in the tools DFW customers use today when they type “best [service] near me” into their phone. The AI doesn’t rank ten options for someone to click through one by one — it picks one and states it as settled fact. Brand mentions, and how confidently an AI can describe what a business actually does, have quietly become as important as ranking position. **For a growing share of local searches, there’s no results page to rank in — there’s just the AI’s one answer.**',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'The AI already compares every option in private — the customer only ever sees the one it picked.',
          src: aiLocalPickStorefront,
          alt: 'One glowing storefront icon standing out in a row of identical grey storefronts, with a beam of light from a chat bubble pointing at it.',
        },
        { kind: 'heading', text: 'Why this matters for service businesses in DFW' },
        {
          kind: 'paragraph',
          text: 'For a med spa, a roofer, or a restaurant competing across the Metroplex, this changes the actual mechanics of getting found. A customer used to see a business next to nine competitors and choose based on price, distance, or a photo that caught their eye. Now the AI runs that comparison privately, before the customer ever sees a list, and hands them one name — confident, final, no runner-up mentioned. If the AI has enough clear, consistent information to make that call, that one name is the business. If it doesn’t — if the profile is thin, the reviews are generic, or the site never answers the specific question a customer actually asked — the AI will still answer confidently. It will just recommend whoever it understood better, even when that competitor is objectively worse. **The businesses that lose the most here are the ones whose actual information online is thin, outdated, or inconsistent — which has nothing to do with how much they spend on marketing.** Here’s what to check this week, in order.',
        },
        { kind: 'heading', text: '1. Answer the specific question, not the keyword' },
        {
          kind: 'paragraph',
          text: 'Most local pages are still written for keywords — “best roofer in Plano” — instead of the actual question a customer types into an AI chat, something closer to “who fixes hail damage on a metal roof near Plano without a six-week wait.” **AI assistants reward specificity they can quote directly, not a page built around a search term.** Go through the service pages and the FAQ and rewrite the vaguest answers as direct, complete sentences a chatbot could lift word for word — because that is exactly what it will do if it’s made easy.',
        },
        { kind: 'heading', text: '2. Make the Google Business Profile answer for you' },
        {
          kind: 'paragraph',
          text: 'Google’s AI pulls heavily from the Business Profile: the Q&A section, the services list, the attributes, and the text of the reviews themselves. A profile with the right category, real answers to the questions customers actually ask, and recent reviews that mention specifics — not just “great service!” — gives the AI something concrete to summarize. **An empty Q&A section is a gap the AI fills with a competitor’s answer, not a neutral blank space.**',
        },
        {
          kind: 'image',
          variant: 'gbp',
          caption: 'A complete, accurate profile is the one signal an AI can navigate by with confidence.',
          src: aiLocalPickBeacon,
          alt: 'A business profile card glowing like a lighthouse beacon on a dark coastline, guiding a small AI-shaped figure through fog past dim, unlit competitor cards.',
        },
        { kind: 'heading', text: '3. Fix the facts that change the most first' },
        {
          kind: 'paragraph',
          text: 'Hours, service area, and phone number sound too basic to matter, but they’re exactly what an AI checks first to decide whether an answer is safe to give confidently. A profile that still lists last year’s hours or a service area that hasn’t been updated since a business expanded to a new suburb reads as unreliable, and **an AI that can’t verify the basics won’t risk naming that business at all, however good the actual service is.**',
        },
        { kind: 'heading', text: '4. Check what AI already says about the business' },
        {
          kind: 'paragraph',
          text: 'Before changing anything, ask ChatGPT and Google’s AI Overview the exact question customers ask — “best med spa in Dallas for laser treatments,” “roofer near Frisco open Saturdays.” Read what comes back. If the business isn’t named, or the description is wrong or years out of date, that is the real starting list, not a hypothetical one. **A business can’t fix a description it has never read.** If it’s unclear where the gaps actually are beyond that, the free four-minute [Growth Score](/growth-score) turns the guessing into an actual list of what to fix first.',
        },
        {
          kind: 'quote',
          text: 'For a growing share of local searches, there’s no results page to rank in — there’s just the AI’s one answer.',
        },
        { kind: 'heading', text: 'What to ignore' },
        {
          kind: 'paragraph',
          text: 'Ignore anyone selling “AI SEO” as a one-time trick — stuffing keywords into an FAQ won’t fool a system built specifically to detect that kind of padding. Ignore the temptation to rewrite the entire site this week; the actual fix is targeted — profile, reviews, specific answers — not a redesign. And ignore vanity metrics some tools promise to track, like a raw count of “AI mentions”: a mention that repeats the wrong phone number or an outdated address does more damage than no mention at all. **Accuracy beats volume every time an AI is the one repeating what it found**, and no dashboard fixes that for a business that hasn’t checked its own facts.',
        },
        {
          kind: 'paragraph',
          text: 'None of this replaces a site that already converts once a customer lands on it — that’s a separate problem with a separate fix. But if the AI answering for a business today is confident, current, and correct, **that’s one less way DFW customers quietly go to a competitor before they ever see a webpage.** Start with the [Diagnostic](/diagnostic) — seven days, a real person reviewing what’s actually there, and a prioritized list of what to fix first.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'Los buscadores acaban de cambiar a quién le recomiendan a tu próximo cliente, y ese cambio sale caro si lo ignoras y tienes un negocio en Dallas-Fort Worth. En las últimas semanas, los asistentes de Inteligencia Artificial — los AI Overviews de Google, ChatGPT y herramientas similares — dejaron de mostrar diez negocios para una búsqueda local y empezaron a nombrar solo uno. Search Engine Journal le puso nombre a esto: "Local 5.0", el punto donde la IA lee las reseñas de un negocio, su Perfil de Negocio en Google y su sitio web, y **directamente le dice a la persona a cuál negocio llamar, en lugar de entregarle una página de enlaces para que compare por su cuenta**.',
        },
        {
          kind: 'paragraph',
          text: 'Esto no es una función del futuro. Ya está activa en las herramientas que usan los clientes de DFW hoy mismo cuando escriben "mejor [servicio] cerca de mí" en el celular. La IA no ordena diez opciones para que alguien las revise una por una — elige una y la presenta como un hecho resuelto. Que la Inteligencia Artificial mencione tu marca, y qué tan bien puede describir lo que realmente haces, se volvió tan importante como tu posición en Google. **En una parte cada vez más grande de las búsquedas locales ya no hay una lista de resultados para posicionarse — solo hay una respuesta.**',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'La IA ya comparó todas las opciones en privado — el cliente solo ve la que eligió.',
          src: aiLocalPickStorefront,
          alt: 'Un ícono de fachada iluminado que destaca entre una fila de fachadas grises idénticas, con un haz de luz desde una burbuja de chat que apunta hacia él.',
        },
        { kind: 'heading', text: 'Por qué importa para los negocios de servicio en DFW' },
        {
          kind: 'paragraph',
          text: 'Para un med spa, un techador o un restaurante que compite en todo el Metroplex, esto cambia la mecánica real de cómo te encuentran. Antes, un cliente veía tu negocio junto a nueve competidores y elegía por precio, cercanía o una foto que le llamó la atención. Ahora la IA hace esa comparación en privado, antes de que el cliente vea ninguna lista, y le entrega un solo nombre — seguro, definitivo, sin mencionar a un segundo lugar. Si la IA tiene información clara y consistente para tomar esa decisión, ese nombre es tu negocio. Si no la tiene — si el perfil está incompleto, las reseñas son genéricas o el sitio nunca responde la pregunta específica que hizo el cliente — la IA de todos modos va a responder con seguridad. Simplemente va a recomendar a quien mejor entendió, aunque ese competidor sea objetivamente peor. **Los negocios que más pierden aquí no son los que tienen menos presupuesto de marketing — son los que tienen su información real en internet incompleta, desactualizada o inconsistente, y eso no depende de cuánto gastan.** Esto es lo que debes revisar esta semana, en orden.',
        },
        { kind: 'heading', text: '1. Responde la pregunta específica, no la palabra clave' },
        {
          kind: 'paragraph',
          text: 'La mayoría de las páginas de servicio siguen escritas para palabras clave — "mejor techador en Plano" — en lugar de la pregunta real que un cliente le escribe a una IA, algo más parecido a "quién arregla daño de granizo en un techo de metal cerca de Plano sin seis semanas de espera". **La IA premia la especificidad que puede citar directamente, no una página armada alrededor de un término de búsqueda.** Revisa tus páginas de servicio y tu FAQ, y reescribe las respuestas más vagas como oraciones directas y completas que un chatbot pueda tomar tal cual — porque eso es exactamente lo que va a hacer si se lo pones fácil.',
        },
        { kind: 'heading', text: '2. Haz que tu Perfil de Negocio en Google responda por ti' },
        {
          kind: 'paragraph',
          text: 'La IA de Google se apoya mucho en el Perfil de Negocio: la sección de preguntas y respuestas, la lista de servicios, los atributos y el texto mismo de las reseñas. Un perfil con la categoría correcta, respuestas reales a lo que los clientes realmente preguntan, y reseñas recientes que mencionan detalles — no solo "¡excelente servicio!" — le da a la IA algo concreto para resumir. **Una sección de preguntas y respuestas vacía es un hueco que la IA llena con la respuesta de un competidor, no un espacio neutral.**',
        },
        {
          kind: 'image',
          variant: 'gbp',
          caption: 'Un perfil completo y exacto es la única señal por la que una IA puede navegar con confianza.',
          src: aiLocalPickBeacon,
          alt: 'Una tarjeta de perfil de negocio que brilla como un faro en una costa oscura, guiando una pequeña figura con forma de IA entre la niebla, más allá de tarjetas de competidores apagadas.',
        },
        { kind: 'heading', text: '3. Arregla primero los datos que más cambian' },
        {
          kind: 'paragraph',
          text: 'Horario, zona de cobertura y teléfono suenan demasiado básicos como para importar, pero son justo lo primero que revisa una IA para decidir si puede dar una respuesta con confianza. Un perfil que todavía muestra el horario del año pasado, o una zona de cobertura que no se actualizó desde que el negocio creció a una nueva zona del área, se lee como poco confiable, y **una IA que no puede verificar lo básico prefiere no arriesgarse a nombrar ese negocio, sin importar qué tan bueno sea el servicio real.**',
        },
        { kind: 'heading', text: '4. Revisa qué dice la IA de tu negocio ahora mismo' },
        {
          kind: 'paragraph',
          text: 'Antes de cambiar nada, pregúntale a ChatGPT y al AI Overview de Google exactamente lo que preguntan tus clientes — "mejor med spa en Dallas para tratamientos láser", "techador cerca de Frisco que trabaje los sábados". Lee lo que responde. Si tu negocio no aparece, o la descripción está mal o lleva años sin actualizarse, esa es tu lista de pendientes real, no una hipotética. **No puedes arreglar una descripción que nunca leíste.** Si después de esto no queda claro dónde están los huecos, el [Growth Score](/growth-score) gratis de cuatro minutos convierte esa duda en una lista concreta de qué arreglar primero.',
        },
        {
          kind: 'quote',
          text: 'En una parte cada vez más grande de las búsquedas locales ya no hay una lista de resultados para posicionarse — solo hay una respuesta.',
        },
        { kind: 'heading', text: 'Qué ignorar' },
        {
          kind: 'paragraph',
          text: 'Ignora a quien te venda "SEO para IA" como truco de una sola vez — rellenar un FAQ de palabras clave no engaña a un sistema diseñado justo para detectar ese relleno. Ignora la tentación de reescribir todo el sitio esta semana; el arreglo real es puntual — perfil, reseñas, respuestas específicas — no un rediseño completo. Y ignora las métricas de vanidad que algunas herramientas prometen medir, como un conteo crudo de "menciones de IA": una mención que repite el teléfono equivocado o una dirección vieja hace más daño que ninguna mención. **La exactitud gana siempre que es una IA la que repite lo que encontró**, y ningún panel de control arregla eso si el negocio nunca revisó sus propios datos.',
        },
        {
          kind: 'paragraph',
          text: 'Nada de esto reemplaza un sitio que ya convierte una vez que el cliente llega — ese es otro problema con otro arreglo. Pero si la IA que responde por tu negocio hoy es segura, actual y correcta, **esa es una forma menos de que un cliente en DFW se vaya en silencio con la competencia antes de siquiera ver tu página.** Empieza con el [Diagnóstico](/diagnostic) — siete días, una persona real revisando lo que realmente existe, y una lista priorizada de qué arreglar primero.',
        },
      ],
    },
  },
]
