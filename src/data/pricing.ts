import type { Bilingual, Language } from '@/lib/i18n/types'

export type PricingTier = {
  slug: string
  name: string
  price: string // e.g. "$2,000" or "From $8,500"
  cadence?: string // e.g. "one-time", "one-time + $100/mo", "$450/mo"
  recommended?: boolean
  bestFor: string
  features: string[]
  notIncluded?: string[]
}

export type AddOn = {
  name: string
  price: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type Frustration = {
  text: string
}

export type ProcessStep = {
  number: string // "/01", "/02", etc.
  title: string
  description: string
}

export type ProofBlock = {
  /** slug into CASE_STUDIES — pulls real stats, testimonial, and images from there. Required when real proof exists. */
  caseStudySlug?: string
  /** used ONLY when no dedicated case study exists yet (Paid Ads, Lead Generation) — an honest, non-fabricated substitute, e.g. process/guarantee-based proof instead of a stats block. Never a placeholder stat. */
  fallbackNote?: string
}

export type ServicePage = {
  slug: string
  parentSlug?: string // for sub-pages nested under a hub, e.g. "digital-marketing"
  number: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string // 40-60 word direct-answer opening paragraph, definition-first
  /** Optional: the pages kept alive under §12 ("CONSERVAR") sell nothing themselves — they point at /foundation or /systems, so they carry no tiers, add-ons or pricing FAQ of their own. */
  tiers?: PricingTier[]
  addOns?: AddOn[]
  faqs?: FaqItem[]
  painHeadline?: string // pain-first H1, replaces the current feature-first h1 on the page (keep `h1` field itself untouched — it's used elsewhere/SEO; this is a new display-only override)
  frustrations?: Frustration[]
  processSteps?: ProcessStep[]
  proof?: ProofBlock
  benefits?: string[] // outcome-oriented, distinct from tier `features` (which are feature checklists)
}

/**
 * Raw bilingual source shapes — every translatable field is `Bilingual<T>`.
 * `resolveServicePage()` below picks the current language and returns the
 * plain-string `ServicePage` shape above, which every page component and
 * shared UI component (PricingTable, FaqAccordion, etc.) already expects
 * unchanged.
 */
export type PricingTierSource = {
  slug: string
  name: Bilingual<string>
  price: string
  cadence?: Bilingual<string>
  recommended?: boolean
  bestFor: Bilingual<string>
  features: Bilingual<string[]>
  notIncluded?: Bilingual<string[]>
}

type AddOnSource = {
  name: Bilingual<string>
  price: string
}

type FaqItemSource = {
  question: Bilingual<string>
  answer: Bilingual<string>
}

type FrustrationSource = {
  text: Bilingual<string>
}

type ProcessStepSource = {
  number: string
  title: Bilingual<string>
  description: Bilingual<string>
}

type ProofBlockSource = {
  caseStudySlug?: string
  fallbackNote?: Bilingual<string>
}

type ServicePageSource = {
  slug: string
  parentSlug?: string
  number: string
  title: Bilingual<string>
  metaTitle: Bilingual<string>
  metaDescription: Bilingual<string>
  h1: Bilingual<string>
  intro: Bilingual<string>
  tiers?: PricingTierSource[]
  addOns?: AddOnSource[]
  faqs?: FaqItemSource[]
  painHeadline?: Bilingual<string>
  frustrations?: FrustrationSource[]
  processSteps?: ProcessStepSource[]
  proof?: ProofBlockSource
  benefits?: Bilingual<string[]>
}

export function resolveTier(tier: PricingTierSource, language: Language): PricingTier {
  return {
    slug: tier.slug,
    name: tier.name[language],
    price: tier.price,
    cadence: tier.cadence?.[language],
    recommended: tier.recommended,
    bestFor: tier.bestFor[language],
    features: tier.features[language],
    notIncluded: tier.notIncluded?.[language],
  }
}

/** Resolves a raw bilingual `ServicePageSource` into the plain-string `ServicePage` shape for the current language. */
export function resolveServicePage(source: ServicePageSource, language: Language): ServicePage {
  return {
    slug: source.slug,
    parentSlug: source.parentSlug,
    number: source.number,
    title: source.title[language],
    metaTitle: source.metaTitle[language],
    metaDescription: source.metaDescription[language],
    h1: source.h1[language],
    intro: source.intro[language],
    painHeadline: source.painHeadline?.[language],
    tiers: source.tiers?.map((tier) => resolveTier(tier, language)),
    addOns: source.addOns?.map((addOn) => ({ name: addOn.name[language], price: addOn.price })),
    faqs: source.faqs?.map((faq) => ({ question: faq.question[language], answer: faq.answer[language] })),
    frustrations: source.frustrations?.map((f) => ({ text: f.text[language] })),
    processSteps: source.processSteps?.map((step) => ({
      number: step.number,
      title: step.title[language],
      description: step.description[language],
    })),
    proof: source.proof && {
      caseStudySlug: source.proof.caseStudySlug,
      fallbackNote: source.proof.fallbackNote?.[language],
    },
    benefits: source.benefits?.[language],
  }
}

export const WEB_DEVELOPMENT_PAGE: ServicePageSource = {
  slug: 'web-development',
  number: '/01',
  title: { en: 'Web Development', es: 'Desarrollo Web' },
  metaTitle: {
    en: 'Web Development for Dallas Businesses | Astratta',
    es: 'Desarrollo Web para Negocios de Dallas | Astratta',
  },
  metaDescription: {
    en: 'Landing pages, multi-page websites and SEO builds for Dallas–Fort Worth businesses. See current levels and flat pricing on our Foundation page.',
    es: 'Landing pages, sitios multi-página y desarrollo con SEO para negocios de Dallas–Fort Worth. Ve los niveles y precios cerrados en nuestra página Base.',
  },
  h1: {
    en: 'Web development pricing, no guessing games.',
    es: 'Precios de desarrollo web, sin adivinar.',
  },
  intro: {
    en: "We've consolidated web development into a single product: Foundation. Three flat-priced levels — from a single conversion landing page to a full multi-page site with local SEO — built together with tracking, brand and lead capture from day one.",
    es: 'Consolidamos el desarrollo web en un solo producto: Base. Tres niveles de precio cerrado — desde una landing page de conversión hasta un sitio completo multi-página con SEO local — construidos junto con medición, marca y captura desde el día uno.',
  },
  painHeadline: {
    en: "Your site gets traffic. It just doesn't turn into leads.",
    es: 'Tu sitio recibe tráfico. Simplemente no se convierte en leads.',
  },
  frustrations: [
    {
      text: {
        en: 'Visitors land, scroll, and leave — no clear next step anywhere on the page.',
        es: 'Los visitantes llegan, hacen scroll y se van — sin un siguiente paso claro en ningún lugar de la página.',
      },
    },
    {
      text: {
        en: 'Your current site takes 6+ seconds to load on mobile, and most people never wait that long.',
        es: 'Tu sitio actual tarda más de 6 segundos en cargar en móvil, y la mayoría de la gente nunca espera tanto.',
      },
    },
    {
      text: {
        en: "You're not sure what your own homepage is supposed to convince someone to do.",
        es: 'No estás seguro de qué se supone que tu propia página de inicio debería convencer a alguien de hacer.',
      },
    },
    {
      text: {
        en: 'Every page looks like a template because it is one — nothing about it says "this is a real Dallas business."',
        es: 'Cada página parece una plantilla porque lo es — nada en ella dice "este es un negocio real de Dallas."',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Audit & strategy', es: 'Auditoría y estrategia' },
      description: {
        en: 'We map your current funnel (or lack of one), your competitors, and exactly what a visitor needs to see to take action.',
        es: 'Mapeamos tu embudo actual (o la falta de uno), tu competencia, y exactamente qué necesita ver un visitante para actuar.',
      },
    },
    {
      number: '/02',
      title: { en: 'Copy before design', es: 'Copy antes que diseño' },
      description: {
        en: 'We write the conversion path first — headline, value prop, CTA sequence — so design has something worth designing around.',
        es: 'Escribimos primero la ruta de conversión — titular, propuesta de valor, secuencia de CTA — para que el diseño tenga algo valioso alrededor de qué diseñar.',
      },
    },
    {
      number: '/03',
      title: { en: 'Build & instrument', es: 'Desarrollo e instrumentación' },
      description: {
        en: 'Mobile-first build with Meta Pixel, GA4, and UTMs wired in from day one — so results are measurable from launch, not guessed at later.',
        es: 'Desarrollo mobile-first con Meta Pixel, GA4 y UTMs integrados desde el día uno — para que los resultados sean medibles desde el lanzamiento, no adivinados después.',
      },
    },
    {
      number: '/04',
      title: { en: 'Launch & iterate', es: 'Lanzamiento e iteración' },
      description: {
        en: 'You get 2 rounds of revisions built in, plus post-launch support to adjust based on real visitor behavior.',
        es: 'Obtienes 2 rondas de revisiones incluidas, más soporte post-lanzamiento para ajustar según el comportamiento real de los visitantes.',
      },
    },
  ],
  proof: {
    caseStudySlug: 'eventos-ensuenos',
  },
  benefits: {
    en: [
      'A site that explains what you do in the first 5 seconds, not the third scroll.',
      "Mobile-first build — most of your traffic is on a phone, so that's what we design for first.",
      "Analytics wired in from launch — you'll know what's working within weeks, not guess for months.",
      'A structure built to add SEO, ads, or e-commerce later without a rebuild.',
    ],
    es: [
      'Un sitio que explica qué haces en los primeros 5 segundos, no en el tercer scroll.',
      'Desarrollo mobile-first — la mayoría de tu tráfico está en un teléfono, así que eso es lo primero que diseñamos.',
      'Analítica integrada desde el lanzamiento — sabrás qué está funcionando en semanas, no adivinarás durante meses.',
      'Una estructura construida para agregar SEO, anuncios o e-commerce después sin reconstruir.',
    ],
  },
}

export const ECOMMERCE_PAGE: ServicePageSource = {
  slug: 'ecommerce',
  number: '/01a',
  title: { en: 'E-commerce', es: 'E-commerce' },
  metaTitle: {
    en: 'E-Commerce Website Development — Dallas | Astratta',
    es: 'Desarrollo de Tiendas en Línea — Dallas | Astratta',
  },
  metaDescription: {
    en: 'Online stores built to convert for Dallas–Fort Worth businesses. E-commerce builds start at $2,500 as an add-on to Foundation.',
    es: 'Tiendas en línea hechas para convertir, para negocios de Dallas–Fort Worth. Las tiendas empiezan en $2,500 como add-on de Base.',
  },
  h1: {
    en: "E-commerce that's built to sell, not just to exist.",
    es: 'E-commerce construido para vender, no solo para existir.',
  },
  intro: {
    en: 'E-commerce builds start at $2,500 as an add-on to Foundation — full storefront, product catalog and checkout, with the same tracking and conversion focus as every Foundation project.',
    es: 'Las tiendas en línea empiezan en $2,500 como add-on de Base — tienda completa, catálogo de productos y checkout, con el mismo enfoque de medición y conversión que cualquier proyecto de Base.',
  },
  painHeadline: {
    en: "Your products are ready. Your store isn't selling them.",
    es: 'Tus productos están listos. Tu tienda no los está vendiendo.',
  },
  frustrations: [
    {
      text: {
        en: "You're taking orders through Instagram DMs and losing track of who paid and who didn't.",
        es: 'Estás tomando pedidos por DMs de Instagram y perdiendo la cuenta de quién pagó y quién no.',
      },
    },
    {
      text: {
        en: 'Your current store looks fine on desktop and falls apart on the phone, where most of your buyers actually are.',
        es: 'Tu tienda actual se ve bien en computadora y se desarma en el teléfono, donde realmente está la mayoría de tus compradores.',
      },
    },
    {
      text: {
        en: 'Checkout has so much friction that people add to cart and never finish.',
        es: 'El checkout tiene tanta fricción que la gente agrega al carrito y nunca termina.',
      },
    },
    {
      text: {
        en: "You migrated platforms once and lost search rankings for months — you're not doing that again without a plan.",
        es: 'Migraste de plataforma una vez y perdiste posicionamiento en búsquedas por meses — no vas a hacer eso de nuevo sin un plan.',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Store audit', es: 'Auditoría de tienda' },
      description: {
        en: 'We review your current catalog, checkout flow, and (if migrating) exactly what needs to move without breaking SEO.',
        es: 'Revisamos tu catálogo actual, flujo de checkout y (si migras) exactamente qué necesita moverse sin romper el SEO.',
      },
    },
    {
      number: '/02',
      title: { en: 'Build on Shopify', es: 'Construcción en Shopify' },
      description: {
        en: 'Theme, product pages, payments, tax, and shipping configured for Texas from day one — not left for you to figure out post-launch.',
        es: 'Tema, páginas de producto, pagos, impuestos y envíos configurados para Texas desde el día uno — no algo que tengas que resolver después del lanzamiento.',
      },
    },
    {
      number: '/03',
      title: { en: 'Connect the channels', es: 'Conexión de canales' },
      description: {
        en: "Meta Pixel, GA4 e-commerce events, and — depending on tier — Instagram Shopping and Google Merchant Center, so the store isn't an island.",
        es: 'Meta Pixel, eventos de e-commerce de GA4, y — según el plan — Instagram Shopping y Google Merchant Center, para que la tienda no sea una isla.',
      },
    },
    {
      number: '/04',
      title: { en: 'Train & hand off', es: 'Capacitación y entrega' },
      description: {
        en: "You get a recorded training video and documentation, so adding products or running a sale doesn't require calling us every time.",
        es: 'Recibes un video de capacitación grabado y documentación, para que agregar productos o hacer una promoción no requiera llamarnos cada vez.',
      },
    },
  ],
  benefits: {
    en: [
      'Payments, tax, and shipping configured correctly for Texas from launch — no post-launch scramble.',
      'Mobile-first checkout — friction removed where most of your buyers actually are.',
      "Migration with 301 redirects when moving platforms, so you don't lose existing search rankings.",
      'Real e-commerce analytics from day one (cart, checkout, purchase funnel) — not just page views.',
    ],
    es: [
      'Pagos, impuestos y envíos configurados correctamente para Texas desde el lanzamiento — sin apuros después.',
      'Checkout mobile-first — fricción eliminada donde realmente están la mayoría de tus compradores.',
      'Migración con redirecciones 301 al cambiar de plataforma, para que no pierdas tu posicionamiento actual.',
      'Analítica real de e-commerce desde el día uno (carrito, checkout, embudo de compra) — no solo vistas de página.',
    ],
  },
}

/**
 * Standalone Paid Ads service (per-channel management fee + client-paid ad
 * spend). Distinct from the cheaper "Ads Scaling" tiers bundled inside the
 * Lead Generation System page — those are subsidized by the $1,200/mo Lead
 * Gen retainer, so don't merge the two pricing tables.
 */

/**
 * Astratta's core offer. Structurally different from the other service
 * pages: one core system (tiers[0], rendered full-width/hero) plus two
 * optional add-ons (tiers[1..2], rendered smaller/secondary) rather than
 * parallel comparison tiers. The separate "Ads Scaling" 3-row mini-table
 * lives as page-local data in LeadGeneration.tsx, not here, since it's a
 * one-off shape (fee/budget/creatives/targeting/result columns) that doesn't
 * fit PricingTier and isn't reused anywhere else.
 */

/**
 * Pricing validated against 2026 market comparables (Penji, Design Pickle,
 * boutique branding agencies) and Astratta's other service-page tiers.
 * Confirmed by Hisbelis — safe to treat as launch-ready.
 */

/**
 * Populated per-page as each service page is built (see working-method rule:
 * never invent prices — tiers/add-ons must come from the client before a
 * page ships).
 */
export const SERVICE_PAGES: ServicePageSource[] = [
  WEB_DEVELOPMENT_PAGE,
  ECOMMERCE_PAGE,
]

export function getServicePage(slug: string): ServicePageSource | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug)
}

export function getChildServicePages(parentSlug: string): ServicePageSource[] {
  return SERVICE_PAGES.filter((page) => page.parentSlug === parentSlug)
}
