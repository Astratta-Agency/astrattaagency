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
import missedCallsCover from '@/assets/blog/missed-calls-lost-jobs-dfw-cover.webp'
import missedCallsLeakTracking from '@/assets/blog/missed-calls-lost-jobs-dfw-leak-tracking.webp'
import missedCallsUnifiedInbox from '@/assets/blog/missed-calls-lost-jobs-dfw-unified-inbox.webp'
import googleAdsCover from '@/assets/blog/google-ads-target-overperformance-dallas-cover.webp'
import googleAdsBudgetAudit from '@/assets/blog/google-ads-target-overperformance-dallas-budget-limited-audit.webp'
import googleAdsDeliberateReset from '@/assets/blog/google-ads-target-overperformance-dallas-deliberate-reset.webp'
import medSpaNoShowCover from '@/assets/blog/med-spa-no-show-leads-dallas-cover.webp'
import medSpaNoShowSpeedToLead from '@/assets/blog/med-spa-no-show-leads-dallas-speed-to-lead.webp'
import medSpaNoShowReminderSequence from '@/assets/blog/med-spa-no-show-leads-dallas-reminder-sequence.webp'

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
  {
    slug: { en: 'missed-calls-lost-jobs-dfw', es: 'llamadas-perdidas-trabajos-dfw' },
    title: {
      en: "The missed call that's costing your DFW home improvement business the job",
      es: 'La llamada perdida que le está costando el contrato a tu negocio de remodelación en DFW',
    },
    excerpt: {
      en: 'Every ring that goes to voicemail is a lead about to call your competitor. Here’s the three-step fix DFW home improvement businesses can run this week — no agency required.',
      es: 'Cada timbre que se va al buzón de voz es un lead a punto de llamar a tu competencia. Este es el arreglo de tres pasos que un negocio de remodelación en DFW puede implementar esta semana — sin agencia.',
    },
    category: 'web-conversion',
    publishedAt: '2026-08-20',
    readingTime: { en: '5 min read', es: '5 min de lectura' },
    coverGradient: 'from-secondary/20 to-primary/20',
    coverVariant: 'insight',
    coverImage: missedCallsCover,
    coverAlt: {
      en: 'A rotary phone receiver dangling off the hook above an hourglass with sand draining fast.',
      es: 'Un auricular de teléfono antiguo colgando fuera de la base, sobre un reloj de arena que se vacía rápido.',
    },
    author: 'hisbelis',
    metaTitle: {
      en: 'Missed Calls Cost DFW Contractors Jobs | Astratta',
      es: 'Llamadas Perdidas le Cuestan Contratos en DFW | Astratta',
    },
    metaDescription: {
      en: "Missed calls are costing Dallas–Fort Worth contractors real jobs. Here's the three-step, no-agency fix: track the leak, answer fast, centralize every lead.",
      es: 'Las llamadas perdidas le cuestan contratos a los negocios de Dallas–Fort Worth. El arreglo de tres pasos sin agencia: rastrear, responder rápido y centralizar.',
    },
    body: {
      en: [
        {
          kind: 'paragraph',
          text: 'Every contractor in Dallas–Fort Worth says some version of the same thing: **the day I don’t pick up, that lead calls the next name on the list.** It’s not a complaint about volume — most home improvement businesses in DFW get enough calls. It’s a complaint about what happens in the fifteen minutes after a ring goes unanswered, when a homeowner with a leaking roof or a broken AC unit is already dialing the next number on Google.',
        },
        { kind: 'heading', text: 'What’s actually draining the pipeline' },
        {
          kind: 'paragraph',
          text: 'The instinct is to blame lead quality or the ad budget. The real cause is almost always response time. A prospect who’s already compared two or three companies treats the first business to respond as the most trustworthy one, regardless of price or reviews. **Speed to first contact functions like a tiebreaker for every job that isn’t already decided.** A missed call isn’t a missed opportunity in the abstract — it’s a specific homeowner, standing in their kitchen, about to dial the next number down the list.',
        },
        {
          kind: 'paragraph',
          text: 'Add up where those leads actually go once they escape a phone call, and the pattern repeats across nearly every DFW home services business we’ve looked at: a text left unanswered on a personal cellphone, a Facebook DM read at 9pm after the crew’s already gone home, a voicemail nobody transcribes until the next morning. None of these are dramatic failures. They’re just small gaps, repeated dozens of times a month, that a homeowner mid-emergency isn’t willing to wait through.',
        },
        {
          kind: 'paragraph',
          text: 'There’s also a version of this problem that isn’t about answering at all — it’s about where the answer goes afterward. A prospect gets a callback, gives their address and the type of job, and that information lives in a text thread on someone’s personal phone. Three weeks later, when it’s time to follow up on the estimate, nobody remembers to, because the information never left that one phone.',
        },
        { kind: 'heading', text: '1. Put a number on the leak' },
        {
          kind: 'paragraph',
          text: 'Before you fix anything, measure how much is actually leaking. A dedicated call tracking number — routed through your Google Ads, your Google Business Profile, or your website — tells you exactly how many calls come in, how many get answered live, and what time of day the rest disappear. Most owners guess at this number and guess wrong; the real answer is usually worse during job-site hours, between roughly 8am and 4pm, than anyone expects. **You can’t fix a leak you’ve never quantified.** Tools like CallRail or a dedicated WhatsApp Business line do this without buying a new phone system.',
        },
        { kind: 'heading', text: '2. Answer in under 60 seconds — even when you can’t' },
        {
          kind: 'paragraph',
          text: 'Set up an SMS or WhatsApp auto-response that fires the moment a call goes unanswered: a short message confirming you saw the call and asking what the problem is and where they’re located. **The first 60 seconds after a missed call decide whether that lead is still yours**, because it’s the window where a homeowner is still deciding whether to keep dialing down the list or wait for a callback. It doesn’t replace the callback — it holds the lead in place until someone on the crew can make it.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'You can’t fix a leak you’ve never measured — a tracking number turns guesses into a real percentage.',
          src: missedCallsLeakTracking,
          alt: 'A magnifying glass hovering over a dripping faucet shaped like a phone handset, with drops falling into a bucket marked with a rising number.',
        },
        { kind: 'heading', text: '3. Get every lead into one place' },
        {
          kind: 'paragraph',
          text: 'Migrate the contacts scattered across a personal cellphone, Instagram DMs, and text threads into one centralized CRM — even the free tier of HubSpot, or a shared spreadsheet with reminders, is enough to start. A lead that lives only on one person’s phone disappears the moment that person is busy on a job, out sick, or on vacation, and nobody else even knows it exists. **The system has to survive any single employee, including the owner.**',
        },
        { kind: 'heading', text: 'How you measure it' },
        {
          kind: 'paragraph',
          text: 'Track two numbers, not ten: the percentage of calls answered live, not sent to voicemail, and the cost per estimate booked — not cost per click, and not raw lead count. **A lead that never books a visit is worth nothing, no matter how cheap it was to generate on the ad side.** Both numbers show up directly in the CRM and the call-tracking dashboard once they’re set up; you don’t need a new report or a monthly export, just a five-minute look at the ones you already have, once a week.',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'A lead scattered across three apps and one phone isn’t a system — it’s a bet that nothing goes wrong.',
          src: missedCallsUnifiedInbox,
          alt: 'Several paper airplanes, each labeled by a different channel, converging into a single funnel that feeds one open notebook.',
        },
        { kind: 'heading', text: 'What not to do' },
        {
          kind: 'paragraph',
          text: 'Don’t outsource this to a generic answering service that reads a script with no context on your business — that answers the ring, but it doesn’t solve the trust problem a missed call creates. Don’t let the auto-response replace a real callback within the hour; it’s a bridge to buy time, not the destination. And don’t measure “leads captured” on its own as a sign the system is working: **a captured lead that never turns into a booked appointment is a vanity metric**, and chasing that number alone can make a broken system look healthy on paper.',
        },
        {
          kind: 'quote',
          text: 'The business that answers first isn’t the best contractor in DFW — it’s just the one still in the room when the decision gets made.',
        },
        {
          kind: 'paragraph',
          text: 'None of this requires new hires or a phone system overhaul. A tracking number, an auto-response, and a shared CRM are usually a week of setup, not a quarter. If you run a [home improvement business](/industries/home-improvement) in DFW and aren’t sure whether this is actually where you’re leaking revenue, the free [Growth Score](/growth-score) will tell you in four minutes.',
        },
        {
          kind: 'paragraph',
          text: 'And if your issue isn’t missed calls but a website that gets traffic and never converts, [we’ve covered that gap separately](/blog/traffic-no-leads-dallas) — it’s a different fix, with a different set of steps. Start with the [Diagnostic](/diagnostic) if you want a real person to find exactly where yours is.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'Todo contratista en Dallas–Fort Worth dice alguna versión de lo mismo: **el día que no contesto, ese lead llama al siguiente nombre de la lista.** No es un problema de volumen — la mayoría de los negocios de remodelación en DFW reciben suficientes llamadas. Es un problema de lo que pasa en los quince minutos después de que un timbre no se contesta, cuando un dueño de casa con una gotera en el techo o el aire acondicionado dañado ya está marcando el siguiente número en Google.',
        },
        { kind: 'heading', text: 'Qué está drenando realmente el embudo' },
        {
          kind: 'paragraph',
          text: 'El instinto es culpar a la calidad del lead o al presupuesto de anuncios. La causa real casi siempre es el tiempo de respuesta. Un prospecto que ya comparó dos o tres empresas trata al primer negocio que responde como el más confiable, sin importar precio ni reseñas. **La velocidad de respuesta funciona como el desempate para cualquier trabajo que todavía no está decidido.** Una llamada perdida no es una oportunidad perdida en abstracto — es un dueño de casa específico, parado en su cocina, a punto de marcar el siguiente número de la lista.',
        },
        {
          kind: 'paragraph',
          text: 'Suma a dónde van esos leads una vez que se escapan de una llamada, y el patrón se repite en casi todos los negocios de servicios para el hogar que hemos visto en DFW: un mensaje de texto sin responder en un celular personal, un DM de Facebook que se lee a las 9pm cuando la cuadrilla ya se fue a casa, un buzón de voz que nadie transcribe hasta la mañana siguiente. Ninguna de estas es una falla dramática. Son huecos pequeños, repetidos decenas de veces al mes, que un dueño de casa en medio de una emergencia no está dispuesto a esperar.',
        },
        {
          kind: 'paragraph',
          text: 'Hay también una versión de este problema que no tiene que ver con contestar, sino con a dónde va la respuesta después. Un prospecto recibe una llamada de vuelta, da su dirección y el tipo de trabajo, y esa información queda viviendo en un hilo de texto en el celular de alguien. Tres semanas después, cuando toca dar seguimiento a la cotización, nadie se acuerda, porque la información nunca salió de ese teléfono.',
        },
        { kind: 'heading', text: '1. Ponle un número a la fuga' },
        {
          kind: 'paragraph',
          text: 'Antes de arreglar algo, mide cuánto se está perdiendo de verdad. Un número de rastreo de llamadas dedicado — conectado a tus anuncios de Google, a tu Google Business Profile o a tu página web — te dice exactamente cuántas llamadas entran, cuántas se contestan en vivo y a qué hora del día se pierden las demás. La mayoría de los dueños adivinan este número y adivinan mal; la realidad suele ser peor durante el horario de obra, entre las 8am y las 4pm, de lo que cualquiera espera. **No puedes arreglar una fuga que nunca cuantificaste.** Herramientas como CallRail o una línea dedicada de WhatsApp Business hacen esto sin necesidad de comprar un sistema telefónico nuevo.',
        },
        { kind: 'heading', text: '2. Responde en menos de 60 segundos — incluso cuando no puedes contestar' },
        {
          kind: 'paragraph',
          text: 'Configura una respuesta automática de SMS o WhatsApp que se dispare en el momento en que una llamada se pierde: un mensaje corto confirmando que la viste y preguntando cuál es el problema y en qué zona está. **Los primeros 60 segundos después de una llamada perdida deciden si ese lead sigue siendo tuyo**, porque es la ventana en la que el dueño de casa todavía está decidiendo si sigue marcando la lista o espera tu llamada de vuelta. No reemplaza la llamada real — sostiene al lead en su lugar hasta que alguien de la cuadrilla pueda devolverla.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'No puedes arreglar una fuga que nunca mediste — un número de rastreo convierte las suposiciones en un porcentaje real.',
          src: missedCallsLeakTracking,
          alt: 'Una lupa sobre un grifo con forma de auricular telefónico goteando, con gotas cayendo en un balde marcado con un número que sube.',
        },
        { kind: 'heading', text: '3. Junta cada lead en un solo lugar' },
        {
          kind: 'paragraph',
          text: 'Migra los contactos que hoy viven dispersos — el celular personal, los DMs de Instagram, los hilos de texto — hacia un CRM centralizado, aunque sea la versión gratuita de HubSpot o un Google Sheet compartido con recordatorios; con eso basta para empezar. Un lead que solo vive en el teléfono de una persona desaparece en cuanto esa persona está ocupada en una obra, enferma o de vacaciones, y nadie más siquiera sabe que existió. **El sistema tiene que sobrevivir a cualquier empleado, incluyendo al dueño.**',
        },
        { kind: 'heading', text: 'Cómo se mide' },
        {
          kind: 'paragraph',
          text: 'Rastrea dos números, no diez: el porcentaje de llamadas contestadas en vivo, no las que se van a buzón de voz, y el costo por estimate agendado — no el costo por clic, ni el conteo crudo de leads. **Un lead que nunca agenda una visita no vale nada, sin importar qué tan barato fue atraerlo del lado de los anuncios.** Ambos números se ven directamente en el CRM y en el panel del número de rastreo una vez configurados; no necesitas un reporte nuevo ni una exportación mensual, solo cinco minutos revisando lo que ya tienes, una vez por semana.',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'Un lead disperso en tres apps y un teléfono no es un sistema — es una apuesta a que nada salga mal.',
          src: missedCallsUnifiedInbox,
          alt: 'Varios aviones de papel, cada uno de un canal distinto, convergiendo en un embudo que alimenta un solo cuaderno abierto.',
        },
        { kind: 'heading', text: 'Qué no hacer' },
        {
          kind: 'paragraph',
          text: 'No tercerices esto a un servicio de contestadora genérico que lee un guion sin contexto de tu negocio — eso responde el timbre, pero no resuelve el problema de confianza que crea una llamada perdida. No dejes que la respuesta automática reemplace la llamada real de vuelta dentro de la hora; es un puente para ganar tiempo, no el destino. Y no midas “leads capturados” por sí solo como señal de que el sistema funciona: **un lead capturado que nunca se convierte en cita agendada es una métrica de vanidad**, y perseguir solo ese número puede hacer que un sistema roto se vea saludable en el papel.',
        },
        {
          kind: 'quote',
          text: 'El negocio que responde primero no es el mejor contratista de DFW — es simplemente el que sigue en el cuarto cuando se toma la decisión.',
        },
        {
          kind: 'paragraph',
          text: 'Nada de esto requiere contratar gente nueva ni cambiar de sistema telefónico. Un número de rastreo, una respuesta automática y un CRM compartido suelen tomar una semana de configuración, no un trimestre. Si tienes un [negocio de remodelación](/industries/home-improvement) en DFW y no sabes si esta es realmente tu fuga de ingresos, el [Growth Score](/growth-score) gratis te lo dice en cuatro minutos.',
        },
        {
          kind: 'paragraph',
          text: 'Y si tu problema no son las llamadas perdidas sino un sitio web que recibe tráfico y nunca convierte, [ya escribimos sobre esa fuga por separado](/blog/traffic-no-leads-dallas) — es un arreglo distinto, con pasos distintos. Empieza con el [Diagnóstico](/diagnostic) si quieres que una persona real encuentre exactamente dónde está la tuya.',
        },
      ],
    },
  },
  {
    slug: { en: 'google-ads-target-overperformance-dallas', es: 'fin-sobrerendimiento-google-ads-dallas' },
    title: {
      en: 'Google Ads just removed a hidden discount from your Dallas campaigns',
      es: 'Google le quitó el descuento oculto a tus campañas de anuncios en Dallas',
    },
    excerpt: {
      en: 'Since August 17, Google Ads no longer lets Target CPA and Target ROAS campaigns spend less than the number you set — even when they’d been doing exactly that for months. Here’s what to check in your Dallas account this week.',
      es: 'Desde el 17 de agosto, Google Ads ya no deja que las campañas con CPA o ROAS objetivo gasten menos del número que configuraste — aunque llevaran meses haciendo justo eso. Esto es lo que debes revisar en tu cuenta de Dallas esta semana.',
    },
    category: 'digital-marketing',
    publishedAt: '2026-08-25',
    readingTime: { en: '5 min read', es: '5 min de lectura' },
    coverGradient: 'from-primary/20 to-secondary/20',
    coverVariant: 'insight',
    coverImage: googleAdsCover,
    coverAlt: {
      en: 'A glass tank of water sitting calm below a marked target line, with a valve on the outside just beginning to close as the water level starts rising toward the line.',
      es: 'Un tanque de vidrio con agua tranquila debajo de una línea marcada como objetivo, con una válvula en el costado empezando a cerrarse mientras el nivel del agua sube hacia la línea.',
    },
    author: 'hisbelis',
    metaTitle: {
      en: 'Google Ads Change Hits Dallas Ad Accounts | Astratta',
      es: 'Google Ads Cambió y Afecta a Dallas | Astratta',
    },
    metaDescription: {
      en: "Google changed how Target CPA and ROAS campaigns spend on August 17. Here's what Dallas advertisers should check this week before cost per lead rises.",
      es: 'Google cambió cómo gastan las campañas con CPA y ROAS objetivo el 17 de agosto. Esto es lo que debe revisar tu cuenta de anuncios en Dallas esta semana.',
    },
    body: {
      en: [
        {
          kind: 'paragraph',
          text: 'On August 17, 2026, Google quietly turned off a setting most advertisers didn’t know they had. If your Google Ads account runs Target CPA or Target ROAS bidding — the two most common ways agencies and in-house marketers manage paid search budgets for businesses across Dallas–Fort Worth — Smart Bidding is no longer allowed to spend less than the target you set, even when it easily could.',
        },
        {
          kind: 'paragraph',
          text: 'Before the change, a budget-limited campaign that was quietly beating its target — landing a $5 cost per lead against a $10 target, for example — kept that gap as a kind of free efficiency Google called “target overperformance.” **After August 17, Smart Bidding stops banking that gap and pushes spend toward the number actually sitting in your campaign settings, whether or not anyone has looked at that number in months.**',
        },
        { kind: 'heading', text: 'Why this matters for Dallas–Fort Worth ad accounts' },
        {
          kind: 'paragraph',
          text: 'Almost every med spa, roofer, and law firm running Google Ads in DFW has a CPA or ROAS target that was set once — usually when the campaign launched — and never revisited, because performance looked fine and nobody had a reason to go looking. **That’s exactly the kind of account this change targets: the one that’s been quietly running better than the number written down, for reasons nobody’s checked lately.**',
        },
        {
          kind: 'paragraph',
          text: 'Search ads in DFW are already expensive because so many home services, med spa, and legal accounts compete for the same handful of high-intent keywords. A campaign that’s been landing leads under target for months usually means an agency stopped tightening the account once it “worked,” not that the account was actually optimized. When the algorithm stops covering for that inattention, the account’s real, current cost structure shows up on the bill instead of staying hidden on a dashboard nobody checked.',
        },
        {
          kind: 'paragraph',
          text: 'This isn’t a problem still on the horizon — it already happened over a week ago. If nobody on your team has opened Google Ads since mid-August, whatever drift is occurring has been running for days, not hours. It hits hardest on the accounts spending $1,000 to $3,000 a month with a target an agency configured once and hasn’t actively watched since.',
        },
        { kind: 'heading', text: '1. Find out if you’re even affected' },
        {
          kind: 'paragraph',
          text: 'Open Google Ads, go into each campaign running Target CPA or Target ROAS, and look for the “Limited by budget” status. Only campaigns carrying that label were part of the change — an account with budget headroom to spare, or one running Maximize Conversions with no target at all, isn’t touched by this. The label sits right in the campaign table; add the “Bid strategy status” column if it isn’t showing by default, and sort by it so every budget-limited campaign lands at the top of the list. **Five minutes in the campaign list tells you whether this is your problem or someone else’s.**',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'The “Limited by budget” label separates the accounts this change touches from the ones it doesn’t.',
          src: googleAdsBudgetAudit,
          alt: 'A magnifying glass hovering over a row of gauges on a control panel; one gauge is dusty with a needle that hasn’t moved in a long time, sharply visible under the glass while the others blur.',
        },
        { kind: 'heading', text: '2. Compare the target to what you were actually paying' },
        {
          kind: 'paragraph',
          text: 'Google published a Bid Target Adjustment Tool on July 6 specifically so advertisers could see this gap before the deadline, and it’s still useful after the fact. Pull the actual cost per lead or actual ROAS from the last 30 days and set it next to the target sitting in the campaign. **A target that was set to protect margin months ago isn’t the same number as what a lead actually costs you today.**',
        },
        { kind: 'heading', text: '3. Reset the target on purpose' },
        {
          kind: 'paragraph',
          text: 'If there’s a real gap, don’t just nudge the number down to match recent performance and move on. Decide what a lead is actually worth to your business right now — including the ones that don’t close — and set the target to that figure. For a business booking $600 average jobs at a 25% close rate, a lead is worth roughly $150 before ad spend; the target should sit close to that number, not to whatever an old dashboard happened to be hitting. **A Target CPA is a business decision about margin, not a technical setting an agency configures once and forgets.**',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'Resetting on purpose means picking the number margin actually supports — not whatever the dashboard happened to show.',
          src: googleAdsDeliberateReset,
          alt: 'A hand turning a large dial by hand, moving the needle away from a worn red zone toward a small hand-placed marker further around the dial, with a wrench resting nearby.',
        },
        { kind: 'heading', text: 'What to ignore' },
        {
          kind: 'paragraph',
          text: 'Ignore any advice that says the fix is abandoning Smart Bidding for manual CPC — manual bidding solves a different problem and usually performs worse at the volumes most DFW accounts run. Ignore panic headlines calling this the end of automated bidding, too; Smart Bidding still does the heavy lifting of finding the right auctions, this change only affects how tightly it’s allowed to hold the number you handed it. And ignore the version of this story that turns into “let Google’s AI handle everything,” because that’s the opposite lesson. **The algorithm was never what kept your costs down — a target you set and actually revisit was.** Removing the human check because the AI seems capable is exactly how an account drifts for six months before anyone notices.',
        },
        {
          kind: 'quote',
          text: 'A Target CPA nobody has looked at since it was set isn’t a strategy — it’s a number waiting to get expensive.',
        },
        {
          kind: 'paragraph',
          text: 'None of this requires switching agencies or rebuilding campaigns. It’s a 20-minute audit: check which campaigns are budget-limited, compare target to actual, reset on purpose. If paid ads are one piece of a marketing system nobody’s actively watching week to week, that’s the gap our [ongoing marketing systems](/systems) are built to catch before it costs real budget.',
        },
        {
          kind: 'paragraph',
          text: 'If you’re not sure whether your account was even affected, or nobody’s checking Google Ads changes like this one on a regular basis, the [Diagnostic](/diagnostic) is a week-long, human review of exactly where your marketing is leaking money — drift like this is precisely what it’s built to catch. And if your leak isn’t paid ads but [missed calls turning into missed jobs](/blog/missed-calls-lost-jobs-dfw), that’s a different fix worth reading separately.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'El 17 de agosto de 2026, Google apagó sin hacer ruido una función que la mayoría de los anunciantes ni sabía que tenía. Si tu cuenta de Google Ads corre pujas con CPA objetivo o ROAS objetivo — las dos formas más comunes en que agencias y equipos internos manejan presupuestos de búsqueda pagada en Dallas–Fort Worth — Smart Bidding ya no puede gastar menos del objetivo que configuraste, aunque pudiera hacerlo sin problema.',
        },
        {
          kind: 'paragraph',
          text: 'Antes del cambio, una campaña limitada por presupuesto que rendía mejor que su objetivo — un costo por lead de $5 contra un objetivo de $10, por ejemplo — se quedaba con esa diferencia como una especie de eficiencia gratis que Google llamaba “sobre-rendimiento de objetivo”. **Desde el 17 de agosto, Smart Bidding deja de guardar esa diferencia y empuja el gasto hacia el número que está escrito en la configuración de tu campaña, lo haya revisado alguien en los últimos meses o no.**',
        },
        { kind: 'heading', text: 'Por qué importa para las cuentas de anuncios en Dallas–Fort Worth' },
        {
          kind: 'paragraph',
          text: 'Casi todo med spa, techero y despacho legal que corre Google Ads en DFW tiene un objetivo de CPA o ROAS que se configuró una sola vez — normalmente cuando lanzó la campaña — y nunca se volvió a tocar, porque el rendimiento se veía bien y nadie tenía motivo para revisarlo. **Esa es exactamente la cuenta que este cambio afecta: la que llevaba meses rindiendo mejor que el número anotado, por razones que nadie había revisado.**',
        },
        {
          kind: 'paragraph',
          text: 'Los anuncios de búsqueda en DFW ya son caros porque muchísimas cuentas de servicios para el hogar, med spas y despachos legales compiten por el mismo puñado de palabras clave de alta intención. Una campaña que lleva meses trayendo leads por debajo del objetivo casi siempre significa que la agencia dejó de ajustar la cuenta en cuanto “funcionó”, no que la cuenta estuviera realmente optimizada. Cuando el algoritmo deja de cubrir esa falta de atención, el costo real de la cuenta aparece en la factura en vez de quedarse escondido en un panel que nadie revisaba.',
        },
        {
          kind: 'paragraph',
          text: 'Esto no es un problema que viene — ya pasó hace más de una semana. Si nadie de tu equipo ha abierto Google Ads desde mediados de agosto, lo que sea que esté desviándose lleva días corriendo, no horas. Golpea más fuerte a las cuentas que gastan entre $1,000 y $3,000 al mes con un objetivo que una agencia configuró una vez y no ha vuelto a mirar.',
        },
        { kind: 'heading', text: '1. Averigua si de verdad te afecta' },
        {
          kind: 'paragraph',
          text: 'Entra a Google Ads, revisa cada campaña con CPA objetivo o ROAS objetivo, y busca la etiqueta “Limitada por presupuesto”. Solo las campañas con esa etiqueta forman parte del cambio — una cuenta con margen de presupuesto de sobra, o una que corre Maximizar Conversiones sin objetivo, no se ve tocada por esto. La etiqueta está en la misma tabla de campañas; agrega la columna “Estado de la estrategia de puja” si no aparece por defecto, y ordénala para que cada campaña limitada por presupuesto quede arriba de la lista. **Cinco minutos en la lista de campañas te dicen si este es tu problema o el de alguien más.**',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'La etiqueta “Limitada por presupuesto” separa las cuentas que este cambio toca de las que no.',
          src: googleAdsBudgetAudit,
          alt: 'Una lupa sobre una fila de medidores en un panel de control; uno está cubierto de polvo con una aguja que no se ha movido en mucho tiempo, nítido bajo la lupa mientras los demás se ven borrosos.',
        },
        { kind: 'heading', text: '2. Compara el objetivo con lo que de verdad estabas pagando' },
        {
          kind: 'paragraph',
          text: 'Google publicó una herramienta de ajuste de objetivos de puja el 6 de julio, justo para que los anunciantes vieran esta brecha antes del cambio, y sigue siendo útil ahora que ya pasó. Saca el costo por lead real o el ROAS real de los últimos 30 días y ponlo junto al objetivo que está en la campaña. **Un objetivo que se configuró para proteger el margen hace meses no es el mismo número que lo que un lead te cuesta hoy.**',
        },
        { kind: 'heading', text: '3. Reconfigura el objetivo a propósito' },
        {
          kind: 'paragraph',
          text: 'Si la brecha es real, no bajes el número nada más para que empate con el rendimiento reciente y sigas adelante. Decide cuánto vale de verdad un lead para tu negocio hoy — incluyendo los que no cierran — y pon el objetivo en esa cifra. Para un negocio que agenda trabajos de $600 en promedio con una tasa de cierre del 25%, un lead vale cerca de $150 antes del gasto en anuncios; el objetivo debe estar cerca de ese número, no de lo que un panel viejo estaba marcando. **Un CPA objetivo es una decisión de negocio sobre margen, no una configuración técnica que una agencia deja puesta y olvida.**',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'Reconfigurar a propósito significa elegir el número que el margen realmente soporta — no lo que el panel estaba marcando.',
          src: googleAdsDeliberateReset,
          alt: 'Una mano girando un dial grande, moviendo la aguja lejos de una zona roja desgastada hacia una pequeña marca colocada a mano más adelante en el dial, con una llave de tuercas cerca.',
        },
        { kind: 'heading', text: 'Qué ignorar' },
        {
          kind: 'paragraph',
          text: 'Ignora cualquier consejo que diga que la solución es abandonar Smart Bidding por puja manual — la puja manual resuelve un problema distinto y casi siempre rinde peor en los volúmenes que maneja la mayoría de las cuentas en DFW. Ignora también los titulares alarmistas que llaman a esto el fin de la puja automatizada; Smart Bidding sigue haciendo el trabajo pesado de encontrar las subastas correctas, este cambio solo afecta qué tan estrictamente puede sostener el número que le diste. Y evita la versión de esta historia que termina en “deja que la Inteligencia Artificial de Google se encargue de todo”, porque es la lección contraria. **El algoritmo nunca fue lo que mantenía tus costos bajos — era un objetivo que configuraste y de verdad revisabas.** Quitar la revisión humana porque la Inteligencia Artificial se ve capaz es exactamente cómo una cuenta se desvía durante seis meses sin que nadie se dé cuenta.',
        },
        {
          kind: 'quote',
          text: 'Un CPA objetivo que nadie ha vuelto a mirar desde que se configuró no es una estrategia — es un número esperando volverse caro.',
        },
        {
          kind: 'paragraph',
          text: 'Nada de esto requiere cambiar de agencia ni reconstruir campañas. Es una auditoría de 20 minutos: revisar qué campañas están limitadas por presupuesto, comparar el objetivo contra lo real, reconfigurar a propósito. Si los anuncios pagados son una sola pieza de un sistema de marketing que nadie está vigilando semana a semana, esa es exactamente la brecha que nuestros [sistemas de marketing continuo](/systems) están hechos para atrapar antes de que cueste presupuesto real.',
        },
        {
          kind: 'paragraph',
          text: 'Si no sabes si tu cuenta se vio afectada, o nadie revisa cambios de Google Ads como este de forma regular, el [Diagnóstico](/diagnostic) es una revisión humana de siete días que encuentra exactamente dónde se está fugando tu marketing — un desvío como este es justo lo que está hecho para detectar. Y si tu fuga no son los anuncios pagados sino [las llamadas perdidas que se convierten en trabajos perdidos](/blog/missed-calls-lost-jobs-dfw), ese es un arreglo distinto que vale la pena leer aparte.',
        },
      ],
    },
  },
  {
    slug: { en: 'med-spa-no-show-leads-dallas', es: 'leads-que-no-se-presentan-med-spa-dallas' },
    title: {
      en: 'Your Dallas med spa books leads that never show up — here’s why',
      es: 'Tu med spa en Dallas agenda leads que nunca se presentan — esto es lo que pasa',
    },
    excerpt: {
      en: 'Most med spa leads we’ve reviewed in DFW don’t fail because the ad was wrong — they fail because nobody replied fast enough. Here’s the four-step fix and the one metric that actually tracks it.',
      es: 'La mayoría de los leads de med spa que hemos revisado en DFW no fallan por el anuncio — fallan porque nadie respondió a tiempo. Este es el arreglo de cuatro pasos y la única métrica que de verdad lo mide.',
    },
    category: 'web-conversion',
    publishedAt: '2026-08-27',
    readingTime: { en: '5 min read', es: '5 min de lectura' },
    coverGradient: 'from-primary/20 to-secondary/20',
    coverVariant: 'clarity',
    coverImage: medSpaNoShowCover,
    coverAlt: {
      en: 'An appointment calendar with several confirmed time slots standing empty beside a phone showing an unanswered notification.',
      es: 'Un calendario de citas con varios horarios confirmados vacíos, junto a un teléfono con una notificación sin responder.',
    },
    author: 'hisbelis',
    metaTitle: {
      en: 'Med Spa Leads That No-Show in Dallas | Astratta',
      es: 'Leads de Med Spa que No se Presentan en Dallas | Astratta',
    },
    metaDescription: {
      en: 'Dallas med spas lose consultations to no-shows, not bad leads. The exact fix — reply speed, shorter forms, reminder texts — and how to measure it working.',
      es: 'Los med spas en Dallas pierden consultas por no-shows, no por leads malos. El arreglo: respuesta rápida, formularios cortos y recordatorios, y cómo medirlo.',
    },
    body: {
      en: [
        {
          kind: 'paragraph',
          text: 'We hear this from med spa owners across Dallas–Fort Worth almost word for word: "I get leads, they fill out the form, and half of them never show up to the consultation." The ad spend worked. The form got submitted. Then the appointment slot sits empty at the scheduled time, with no cancellation call and no explanation. That gap between a filled-out form and a person actually sitting in the chair is where a meaningful share of the marketing budget quietly disappears, and it’s rarely the ad campaign’s fault.',
        },
        { kind: 'heading', text: 'It isn’t a lead quality problem' },
        {
          kind: 'paragraph',
          text: 'The instinct is to blame the ad platform or the lead source — maybe the offer wasn’t strong enough, maybe Meta is sending in people who were never going to book. In the med spas we’ve reviewed across the Metroplex, the actual cause is almost always response time. A prospect who fills out a form at 8pm on a Tuesday and gets a reply the next morning has usually already found someone else by breakfast. **The lead didn’t disappear — a faster competitor answered first.** The second, quieter cause is what gets measured. Most practices track how many forms come in each week, not how many of those people actually sit down for the consultation, so the real leak never shows up on a dashboard anyone looks at until the appointment book tells the truth.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'The lead didn’t go cold — the reply just came too late.',
          src: medSpaNoShowSpeedToLead,
          alt: 'A stopwatch racing beside a phone lighting up with a reply notification, illustrating a business responding to a lead within seconds instead of hours.',
        },
        { kind: 'heading', text: '1. Reply inside 60 seconds, every time' },
        {
          kind: 'paragraph',
          text: 'The single highest-leverage fix is speed to first contact. A text or WhatsApp message that goes out within a minute of a form submission — even a short one confirming the request was received and asking for a good callback time — keeps a lead warm long enough for a real conversation to happen later that day. Most booking and CRM tools already support an instant auto-reply; the fix is turning it on and writing three sentences that read like a person, not shopping for new software.',
        },
        { kind: 'heading', text: '2. Cut the form down to three fields' },
        {
          kind: 'paragraph',
          text: 'A long intake form filters out exactly the people who are still deciding, and those undecided leads are the ones worth the most follow-up. Name, phone number, and the treatment they’re asking about is enough to start a conversation. Everything else — medical history, budget range, preferred date — belongs in the confirmation call or the intake paperwork after booking, not before it. **Every extra field on that first form is one more chance for someone to close the tab instead of finishing it.**',
        },
        { kind: 'heading', text: '3. Build a reminder sequence, not one confirmation text' },
        {
          kind: 'paragraph',
          text: 'A single confirmation text sent at the moment of booking is easy to forget by the time the appointment actually arrives, especially for a consultation booked a week or two out. A short sequence — a confirmation right after booking, a reminder 48 hours out, and a same-morning text — catches the person before life gets in the way. Most scheduling platforms, plus a basic SMS tool, can automate this in an afternoon. It doesn’t need a developer or a new system, just someone willing to set it up once.',
        },
        { kind: 'heading', text: '4. Show the booking page real proof, not just a calendar' },
        {
          kind: 'paragraph',
          text: 'A bare calendar widget asks someone to commit before they’ve seen a reason to. A real before/after photo, a two-line client quote, or a short note about what actually happens in the first visit — placed right next to the booking button — gives a hesitant lead the reassurance that gets a form actually finished instead of abandoned halfway through.',
        },
        {
          kind: 'quote',
          text: 'The lead didn’t disappear — a faster competitor answered first.',
        },
        { kind: 'heading', text: 'How to measure whether it’s working' },
        {
          kind: 'paragraph',
          text: 'The metric that matters here is show-up rate — consultations actually attended divided by consultations booked — not the number of forms submitted. Track it alongside cost per booked consultation. Both figures live in whatever booking or CRM software the practice already uses; most scheduling platforms report this once the funnel stages — booked, confirmed, attended, no-show — are actually set up to track it, which many aren’t by default. **A campaign that lowers cost per lead but never moves show-up rate hasn’t fixed anything — it’s just made the same problem cheaper to create.** Pull the number monthly and watch it move as each fix goes live, one at a time, so it’s clear which change actually helped.',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'A reminder sequence beats a single confirmation text — it’s built to survive a busy week.',
          src: medSpaNoShowReminderSequence,
          alt: 'A checklist showing three completed steps — confirmation, 48-hour reminder, and same-day text — leading to a filled appointment slot.',
        },
        { kind: 'heading', text: 'What not to do' },
        {
          kind: 'paragraph',
          text: 'Don’t judge a campaign by form count alone — a form that’s easy to abandon looks identical to a form that converts until someone actually checks the show-up rate behind it. Don’t send one generic reminder and call the sequence finished; a single text a week before an appointment gets lost in everything else competing for attention that week. And don’t assume the ad account is broken before the response-time and reminder pieces are actually fixed first — most of the med spas we’ve looked at in DFW never needed a new campaign, just a faster reply and a follow-up sequence that didn’t stop after one message.',
        },
        {
          kind: 'paragraph',
          text: 'None of this requires hiring anyone. A booking tool that already supports auto-replies, a phone, and an afternoon spent writing four short messages covers most of it. If it’s unclear exactly where the leak is happening in a specific funnel, the [Diagnostic](/diagnostic) is seven days with a real person mapping that, lead by lead, instead of guessing. For a faster first read, the free four-minute [Growth Score](/growth-score) — or the [med spa page](/industries/med-spa) for what tends to show up most in this industry — is a reasonable place to start.',
        },
      ],
      es: [
        {
          kind: 'paragraph',
          text: 'Escuchamos esto de dueños de med spas en todo Dallas–Fort Worth casi con las mismas palabras: "consigo leads, llenan el formulario, y la mitad nunca se presenta a la consulta." La inversión en anuncios funcionó. El formulario se envió. Y luego el horario de la cita se queda vacío, sin llamada de cancelación ni explicación. Esa brecha entre un formulario lleno y una persona sentada en la silla es donde desaparece en silencio buena parte del presupuesto de marketing — y casi nunca es culpa de la campaña.',
        },
        { kind: 'heading', text: 'No es un problema de calidad de los leads' },
        {
          kind: 'paragraph',
          text: 'El instinto es culpar a la plataforma de anuncios o a la fuente del lead — quizás la oferta no fue suficientemente atractiva, quizás Meta está mandando gente que nunca iba a agendar. En los med spas que hemos revisado en el Metroplex, la causa real casi siempre es el tiempo de respuesta. Un prospecto que llena un formulario un martes a las 8pm y recibe respuesta al día siguiente por la mañana ya encontró a alguien más antes del desayuno. **El lead no desapareció — un competidor más rápido respondió primero.** La segunda causa, más silenciosa, es qué se mide. La mayoría de las clínicas rastrea cuántos formularios llegan cada semana, no cuántas de esas personas realmente se sientan en la consulta, así que la fuga real nunca aparece en ningún panel — hasta que la agenda dice la verdad.',
        },
        {
          kind: 'image',
          variant: 'clarity',
          caption: 'El lead no se enfrió — la respuesta simplemente llegó tarde.',
          src: medSpaNoShowSpeedToLead,
          alt: 'Un cronómetro corriendo junto a un teléfono que se ilumina con una notificación de respuesta, mostrando a un negocio respondiendo a un lead en segundos y no en horas.',
        },
        { kind: 'heading', text: '1. Responde en menos de 60 segundos, siempre' },
        {
          kind: 'paragraph',
          text: 'El arreglo con más impacto es la velocidad de la primera respuesta. Un mensaje de texto o WhatsApp que sale en el primer minuto después de enviado el formulario — aunque sea corto, confirmando que la solicitud llegó y preguntando el mejor horario para llamar — mantiene al lead interesado el tiempo suficiente para que ocurra una conversación real más tarde ese mismo día. La mayoría de las herramientas de agenda y CRM ya soportan una respuesta automática instantánea; el arreglo es activarla y escribir tres frases que suenen a una persona, no comprar software nuevo.',
        },
        { kind: 'heading', text: '2. Reduce el formulario a tres campos' },
        {
          kind: 'paragraph',
          text: 'Un formulario largo filtra justo a las personas que todavía están decidiendo, y esos leads indecisos son los que más valen el seguimiento. Nombre, teléfono y el tratamiento que están buscando es suficiente para empezar una conversación. Todo lo demás — historial médico, presupuesto, fecha preferida — pertenece a la llamada de confirmación o al papeleo después de agendar, no antes. **Cada campo extra en ese primer formulario es una oportunidad más para que alguien cierre la pestaña en lugar de terminarlo.**',
        },
        { kind: 'heading', text: '3. Arma una secuencia de recordatorios, no un solo texto de confirmación' },
        {
          kind: 'paragraph',
          text: 'Un solo mensaje de confirmación enviado al momento de agendar es fácil de olvidar para cuando llega la fecha de la cita, sobre todo si la consulta se agendó con una o dos semanas de anticipación. Una secuencia corta — confirmación justo al agendar, recordatorio 48 horas antes, y un texto la misma mañana — atrapa a la persona antes de que la vida se interponga. La mayoría de las plataformas de agenda, más una herramienta básica de SMS, pueden automatizar esto en una tarde. No hace falta un desarrollador ni un sistema nuevo, solo alguien dispuesto a configurarlo una vez.',
        },
        { kind: 'heading', text: '4. Muestra prueba real en la página de agenda, no solo un calendario' },
        {
          kind: 'paragraph',
          text: 'Un calendario vacío le pide a alguien que se comprometa antes de haber visto una razón para hacerlo. Una foto real de antes/después, una cita de dos líneas de una clienta real, o una nota corta sobre qué pasa en la primera visita — puesta justo al lado del botón de agendar — le da a un lead dudoso la tranquilidad que hace que termine el formulario en lugar de abandonarlo a la mitad.',
        },
        {
          kind: 'quote',
          text: 'El lead no desapareció — un competidor más rápido respondió primero.',
        },
        { kind: 'heading', text: 'Cómo se mide si está funcionando' },
        {
          kind: 'paragraph',
          text: 'La métrica que importa aquí es la tasa de asistencia — consultas realmente atendidas dividido entre consultas agendadas — no el número de formularios enviados. Rastréala junto con el costo por consulta agendada. Ambas cifras viven en el software de agenda o CRM que la clínica ya usa; la mayoría de las plataformas reportan esto una vez que las etapas del embudo — agendada, confirmada, atendida, no-show — están realmente configuradas para rastrearlo, y muchas no lo están por defecto. **Una campaña que baja el costo por lead pero nunca mueve la tasa de asistencia no arregló nada — solo hizo el mismo problema más barato de crear.** Revisa el número cada mes y observa cómo se mueve con cada arreglo, uno a la vez, para que quede claro cuál cambio realmente ayudó.',
        },
        {
          kind: 'image',
          variant: 'checklist',
          caption: 'Una secuencia de recordatorios le gana a un solo texto de confirmación — está hecha para sobrevivir una semana ocupada.',
          src: medSpaNoShowReminderSequence,
          alt: 'Una lista de verificación con tres pasos completados — confirmación, recordatorio a las 48 horas y texto el mismo día — que lleva a una cita cumplida.',
        },
        { kind: 'heading', text: 'Qué no hacer' },
        {
          kind: 'paragraph',
          text: 'No juzgues una campaña solo por el número de formularios — un formulario fácil de abandonar se ve idéntico a uno que convierte, hasta que alguien revisa la tasa de asistencia detrás de él. No mandes un solo recordatorio genérico y des la secuencia por terminada; un solo texto una semana antes de la cita se pierde entre todo lo demás que compite por la atención esa semana. Y no asumas que la cuenta de anuncios está rota antes de arreglar primero el tiempo de respuesta y los recordatorios — la mayoría de los med spas que hemos revisado en DFW nunca necesitaron una campaña nueva, solo una respuesta más rápida y una secuencia de seguimiento que no se detuviera después de un solo mensaje.',
        },
        {
          kind: 'paragraph',
          text: 'Nada de esto requiere contratar a nadie. Una herramienta de agenda que ya soporte respuestas automáticas, un teléfono y una tarde para escribir cuatro mensajes cortos cubre casi todo. Si no queda claro exactamente dónde está la fuga en un embudo específico, el [Diagnóstico](/diagnostic) son siete días con una persona real mapeando eso, lead por lead, en lugar de adivinar. Para una primera revisión más rápida, el [Growth Score](/growth-score) gratis de cuatro minutos — o la [página de med spa](/industries/med-spa) para lo que más se repite en este rubro — es un buen punto de partida.',
        },
      ],
    },
  },
]
