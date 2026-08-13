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
  tiers: PricingTier[]
  addOns?: AddOn[]
  faqs: FaqItem[]
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
  tiers: PricingTierSource[]
  addOns?: AddOnSource[]
  faqs: FaqItemSource[]
  painHeadline?: Bilingual<string>
  frustrations?: FrustrationSource[]
  processSteps?: ProcessStepSource[]
  proof?: ProofBlockSource
  benefits?: Bilingual<string[]>
}

function resolveTier(tier: PricingTierSource, language: Language): PricingTier {
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
    tiers: source.tiers.map((tier) => resolveTier(tier, language)),
    addOns: source.addOns?.map((addOn) => ({ name: addOn.name[language], price: addOn.price })),
    faqs: source.faqs.map((faq) => ({ question: faq.question[language], answer: faq.answer[language] })),
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
    en: 'Web Development Pricing — Landing Pages & Websites in Dallas, TX | Astratta',
    es: 'Precios de Desarrollo Web — Landing Pages y Sitios Web en Dallas, TX | Astratta',
  },
  metaDescription: {
    en: "Landing pages from $800, business websites from $2,000, and full SEO-ready sites from $3,500 — transparent pricing for Dallas–Fort Worth businesses. See what's included in each tier.",
    es: 'Landing pages desde $800, sitios web de negocios desde $2,000, y sitios completos listos para SEO desde $3,500 — precios transparentes para negocios de Dallas–Fort Worth. Mira qué incluye cada plan.',
  },
  h1: {
    en: 'Web development pricing, no guessing games.',
    es: 'Precios de desarrollo web, sin adivinar.',
  },
  intro: {
    en: "Astratta builds four types of web projects for Dallas businesses: single-page landing sites, multi-page business websites, SEO-optimized sites, and multi-step conversion funnels. Prices below are flat and public — pick the tier that matches your goal, or request a free audit first if you're not sure which one fits.",
    es: 'Astratta construye cuatro tipos de proyectos web para negocios de Dallas: sitios de una sola página, sitios web de negocio multi-página, sitios optimizados para SEO, y embudos de conversión multi-paso. Los precios de abajo son fijos y públicos — elige el plan que se ajuste a tu objetivo, o solicita una auditoría gratuita primero si no estás seguro cuál te conviene.',
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
  tiers: [
    {
      slug: 'landing-essentials',
      name: { en: 'Landing Essentials', es: 'Landing Essentials' },
      price: '$800',
      cadence: { en: 'one-time', es: 'pago único' },
      bestFor: {
        en: 'Startups that need a fast page to run ads to.',
        es: 'Startups que necesitan una página rápida para enviar tráfico de anuncios.',
      },
      features: {
        en: [
          'One landing page (Lovable.dev-built): hero + value prop + benefits + CTA',
          'Conversion-focused copywriting (H1 + subheadline + buttons)',
          'Lead capture form (name, email, phone)',
          'Mobile-responsive',
          'Meta Pixel installed',
          'Google Analytics 4 setup',
          '2 rounds of revisions',
          'Hosted on Vercel or similar',
        ],
        es: [
          'Una landing page (construida en Lovable.dev): hero + propuesta de valor + beneficios + CTA',
          'Copywriting enfocado en conversión (H1 + subtítulo + botones)',
          'Formulario de captura de leads (nombre, email, teléfono)',
          'Diseño responsivo para móvil',
          'Meta Pixel instalado',
          'Configuración de Google Analytics 4',
          '2 rondas de revisiones',
          'Alojado en Vercel o similar',
        ],
      },
      notIncluded: {
        en: ['Domain registration', 'Advanced SEO', 'Ads management', 'Complex integrations'],
        es: ['Registro de dominio', 'SEO avanzado', 'Gestión de anuncios', 'Integraciones complejas'],
      },
    },
    {
      slug: 'website-core',
      name: { en: 'Website Core', es: 'Website Core' },
      price: '$2,000',
      cadence: { en: 'one-time + $100/mo maintenance', es: 'pago único + $100/mes de mantenimiento' },
      recommended: true,
      bestFor: {
        en: 'SMBs that need a professional multi-page site.',
        es: 'Pymes que necesitan un sitio profesional multi-página.',
      },
      features: {
        en: [
          '5-7 pages (home, services, about, contact, blog base, FAQ)',
          'Per-page copywriting',
          'Branding applied (logo, colors, typography)',
          'Responsive design',
          'Meta Pixel + GA4 + UTMs',
          'Contact form',
          'Google Business Profile integration',
          '2 months of post-launch support (bugs, minor changes)',
        ],
        es: [
          '5-7 páginas (inicio, servicios, nosotros, contacto, base de blog, FAQ)',
          'Copywriting por página',
          'Marca aplicada (logo, colores, tipografía)',
          'Diseño responsivo',
          'Meta Pixel + GA4 + UTMs',
          'Formulario de contacto',
          'Integración con Google Business Profile',
          '2 meses de soporte post-lanzamiento (bugs, cambios menores)',
        ],
      },
      notIncluded: {
        en: ['Strategic SEO', 'Blog content', 'Ads'],
        es: ['SEO estratégico', 'Contenido de blog', 'Anuncios'],
      },
    },
    {
      slug: 'website-seo-foundation',
      name: { en: 'Website + SEO Foundation', es: 'Website + Fundamento SEO' },
      price: '$3,500',
      cadence: { en: 'one-time + $200/mo (blog + optimization)', es: 'pago único + $200/mes (blog + optimización)' },
      bestFor: {
        en: 'Businesses that want to actually show up in Google.',
        es: 'Negocios que realmente quieren aparecer en Google.',
      },
      features: {
        en: [
          'Everything in Website Core',
          'Keyword research (20 terms)',
          'On-page SEO (meta tags, H1-H3 structure, speed)',
          '10 optimized blog posts (1/week for 2 months)',
          'Internal linking strategy',
          'Schema markup (local business)',
          'Google Search Console + Ahrefs setup',
          'Monthly ranking report',
        ],
        es: [
          'Todo lo de Website Core',
          'Investigación de palabras clave (20 términos)',
          'SEO on-page (meta tags, estructura H1-H3, velocidad)',
          '10 artículos de blog optimizados (1/semana por 2 meses)',
          'Estrategia de enlaces internos',
          'Marcado schema (negocio local)',
          'Configuración de Google Search Console + Ahrefs',
          'Reporte mensual de posicionamiento',
        ],
      },
      notIncluded: {
        en: ['Paid ads', 'Aggressive link building'],
        es: ['Anuncios pagados', 'Link building agresivo'],
      },
    },
    {
      slug: 'conversion-funnel',
      name: { en: 'Conversion Funnel (3-5 steps)', es: 'Embudo de Conversión (3-5 pasos)' },
      price: '$2,500',
      cadence: { en: 'setup + $300/mo (management + optimization)', es: 'configuración + $300/mes (gestión + optimización)' },
      bestFor: {
        en: 'Coaches, consultants, and SaaS companies that sell services, not products.',
        es: 'Coaches, consultores y empresas de SaaS que venden servicios, no productos.',
      },
      features: {
        en: [
          'Landing page (step 1)',
          'Lead magnet (PDF/checklist)',
          'Thank-you page + automated email',
          '5-7 email nurture sequence',
          'CRM setup',
          'Form analytics (abandonment, conversion)',
          'Funnel conversion report (visitors → leads → MQLs)',
          '3 monthly optimizations',
        ],
        es: [
          'Landing page (paso 1)',
          'Lead magnet (PDF/checklist)',
          'Página de agradecimiento + email automatizado',
          'Secuencia de nutrición de 5-7 emails',
          'Configuración de CRM',
          'Analítica de formularios (abandono, conversión)',
          'Reporte de conversión del embudo (visitantes → leads → MQLs)',
          '3 optimizaciones mensuales',
        ],
      },
      notIncluded: {
        en: ['Ad spend (compatible with Meta Ads add-on)'],
        es: ['Inversión publicitaria (compatible con el complemento de Meta Ads)'],
      },
    },
  ],
  addOns: [
    { name: { en: 'Extra page', es: 'Página extra' }, price: '$400' },
    { name: { en: 'CRM integration (Notion/Zapier)', es: 'Integración de CRM (Notion/Zapier)' }, price: '$250' },
    {
      name: { en: 'Advanced multi-step/conditional form', es: 'Formulario avanzado multi-paso/condicional' },
      price: '$300',
    },
    { name: { en: 'SEO audit of an existing site', es: 'Auditoría SEO de un sitio existente' }, price: '$400' },
    { name: { en: 'Extra optimized blog post', es: 'Artículo de blog optimizado extra' }, price: '$150/unit' },
  ],
  faqs: [
    {
      question: {
        en: 'How much does a website cost in Dallas?',
        es: '¿Cuánto cuesta un sitio web en Dallas?',
      },
      answer: {
        en: "Astratta's web projects range from $800 for a single landing page to $3,500+ for a full multi-page site with SEO. Most Dallas–Fort Worth small businesses land in the $2,000-$3,500 range for a professional site with ongoing support. Final pricing depends on page count and features — request a free audit for an exact quote.",
        es: 'Los proyectos web de Astratta van desde $800 por una landing page individual hasta $3,500+ por un sitio multi-página completo con SEO. La mayoría de los pequeños negocios de Dallas–Fort Worth caen en el rango de $2,000-$3,500 por un sitio profesional con soporte continuo. El precio final depende del número de páginas y funciones — solicita una auditoría gratuita para una cotización exacta.',
      },
    },
    {
      question: {
        en: "What's the difference between a landing page and a website?",
        es: '¿Cuál es la diferencia entre una landing page y un sitio web?',
      },
      answer: {
        en: 'A landing page is a single page built around one action — usually to support an ad campaign. A website (Website Core and up) has multiple pages — home, services, about, contact — and works as your permanent online presence, not just a campaign tool.',
        es: 'Una landing page es una sola página construida alrededor de una acción — usualmente para apoyar una campaña de anuncios. Un sitio web (Website Core en adelante) tiene varias páginas — inicio, servicios, nosotros, contacto — y funciona como tu presencia online permanente, no solo una herramienta de campaña.',
      },
    },
    {
      question: {
        en: 'Do I need SEO if I already have a website?',
        es: '¿Necesito SEO si ya tengo un sitio web?',
      },
      answer: {
        en: "If your current site isn't showing up in Google search results, yes. The Website + SEO Foundation tier adds keyword research, on-page optimization, and blog content designed to rank — most clients see initial ranking movement within 60-90 days.",
        es: 'Si tu sitio actual no aparece en los resultados de búsqueda de Google, sí. El plan Website + Fundamento SEO agrega investigación de palabras clave, optimización on-page y contenido de blog diseñado para posicionar — la mayoría de los clientes ven movimiento inicial en su posicionamiento dentro de 60-90 días.',
      },
    },
    {
      question: {
        en: 'Can I upgrade from a landing page to a full website later?',
        es: '¿Puedo pasar de una landing page a un sitio web completo después?',
      },
      answer: {
        en: 'Yes. Many clients start with Landing Essentials to launch fast, then upgrade to Website Core or SEO Foundation once the offer is validated. We credit relevant work from the landing page toward the upgrade.',
        es: 'Sí. Muchos clientes empiezan con Landing Essentials para lanzar rápido, y luego suben a Website Core o Fundamento SEO una vez que la oferta se valida. Acreditamos el trabajo relevante de la landing page hacia la actualización.',
      },
    },
    {
      question: {
        en: "What's not included in these prices?",
        es: '¿Qué no está incluido en estos precios?',
      },
      answer: {
        en: "Domain registration, ad spend, and complex third-party integrations are billed separately in all tiers — see the 'not included' list on each plan. Add-ons like extra pages or CRM integration are priced individually above.",
        es: 'El registro de dominio, la inversión publicitaria y las integraciones complejas con terceros se facturan por separado en todos los planes — mira la lista de "no incluido" en cada plan. Los complementos como páginas extra o integración de CRM tienen precio individual arriba.',
      },
    },
  ],
}

export const ECOMMERCE_PAGE: ServicePageSource = {
  slug: 'ecommerce',
  number: '/01a',
  title: { en: 'E-commerce', es: 'E-commerce' },
  metaTitle: {
    en: 'Shopify E-commerce Website Pricing — Dallas, TX | Astratta Agency',
    es: 'Precios de Tienda E-commerce Shopify — Dallas, TX | Astratta Agency',
  },
  metaDescription: {
    en: 'E-commerce stores from $2,800 for boutiques up to fully migrated, CRO-optimized stores for established retailers. Shopify builds with payments, shipping, email flows, and social selling built in.',
    es: 'Tiendas de e-commerce desde $2,800 para boutiques hasta tiendas completamente migradas y optimizadas para conversión para minoristas establecidos. Tiendas Shopify con pagos, envíos, flujos de email y venta social incluidos.',
  },
  h1: {
    en: "E-commerce that's built to sell, not just to exist.",
    es: 'E-commerce construido para vender, no solo para existir.',
  },
  intro: {
    en: 'Astratta builds Shopify-based online stores for Dallas-area retailers and product businesses — from a 25-product boutique launch to a full migration and CRO program for stores doing $10k+/month. Every tier includes payments, tax setup, and shipping configured for Texas from day one.',
    es: 'Astratta construye tiendas online basadas en Shopify para minoristas y negocios de productos del área de Dallas — desde el lanzamiento de una boutique de 25 productos hasta un programa completo de migración y optimización de conversión para tiendas que facturan $10,000+/mes. Cada plan incluye pagos, configuración de impuestos y envíos configurados para Texas desde el día uno.',
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
  tiers: [
    {
      slug: 'ecommerce-starter',
      name: { en: 'E-commerce Starter', es: 'E-commerce Starter' },
      price: '$2,800',
      cadence: { en: 'one-time + $150/mo', es: 'pago único + $150/mes' },
      bestFor: {
        en: 'Local boutiques and retailers selling only through Instagram/WhatsApp today, up to 25 products.',
        es: 'Boutiques y minoristas locales que hoy solo venden por Instagram/WhatsApp, hasta 25 productos.',
      },
      features: {
        en: [
          'Full Shopify setup (premium theme adapted to your branding)',
          'Up to 25 products loaded (conversion copy + optimized photos, client provides photos)',
          'Home, collections, product, cart, checkout, and policy pages',
          '1 payment gateway (Shopify Payments/Stripe) + Texas tax configuration',
          'Shipping setup (zones, rates, local pickup)',
          'Mobile-responsive + speed-optimized',
          'Meta Pixel + GA4 with e-commerce events',
          'Order confirmation + basic abandoned cart email',
          '1-hour training + recorded video',
          '2 post-launch revisions',
        ],
        es: [
          'Configuración completa de Shopify (tema premium adaptado a tu marca)',
          'Hasta 25 productos cargados (copy de conversión + fotos optimizadas, el cliente provee las fotos)',
          'Páginas de inicio, colecciones, producto, carrito, checkout y políticas',
          '1 pasarela de pago (Shopify Payments/Stripe) + configuración de impuestos de Texas',
          'Configuración de envíos (zonas, tarifas, recogida local)',
          'Responsivo para móvil + optimizado en velocidad',
          'Meta Pixel + GA4 con eventos de e-commerce',
          'Confirmación de pedido + email básico de carrito abandonado',
          '1 hora de capacitación + video grabado',
          '2 revisiones post-lanzamiento',
        ],
      },
      notIncluded: {
        en: ['Strategic SEO', 'Ads', 'Migrations', 'Product photography', 'Advanced email flows'],
        es: ['SEO estratégico', 'Anuncios', 'Migraciones', 'Fotografía de producto', 'Flujos de email avanzados'],
      },
    },
    {
      slug: 'ecommerce-growth',
      name: { en: 'E-commerce Growth', es: 'E-commerce Growth' },
      price: '$5,000',
      cadence: { en: 'one-time + $300/mo', es: 'pago único + $300/mes' },
      recommended: true,
      bestFor: {
        en: 'DFW retailers with 26-150 products who want the store to be a serious sales channel.',
        es: 'Minoristas de DFW con 26-150 productos que quieren que la tienda sea un canal de ventas serio.',
      },
      features: {
        en: [
          'Everything in Starter',
          'Up to 150 products with variants (size, color, bundles)',
          'Fully custom theme design (not a generic template)',
          'On-page SEO (20 keywords, meta tags, optimized collections, Product schema, Search Console)',
          'Email flows (welcome 3-email series + abandoned cart 3-email + post-purchase 2-email)',
          'Reviews app + cart/checkout upsells and cross-sells',
          'Multiple payment gateways (Stripe + PayPal + Shop Pay)',
          'Social selling (Instagram Shopping, Facebook Shop, Google Merchant Center)',
          'Conversion dashboard (visits → cart → checkout → purchase)',
          '2-hour training + operations documentation',
          '1 month of post-launch support',
        ],
        es: [
          'Todo lo de Starter',
          'Hasta 150 productos con variantes (talla, color, combos)',
          'Diseño de tema completamente personalizado (no una plantilla genérica)',
          'SEO on-page (20 palabras clave, meta tags, colecciones optimizadas, schema de producto, Search Console)',
          'Flujos de email (bienvenida de 3 emails + carrito abandonado de 3 emails + post-compra de 2 emails)',
          'App de reseñas + upsells y cross-sells en carrito/checkout',
          'Múltiples pasarelas de pago (Stripe + PayPal + Shop Pay)',
          'Venta social (Instagram Shopping, Facebook Shop, Google Merchant Center)',
          'Panel de conversión (visitas → carrito → checkout → compra)',
          '2 horas de capacitación + documentación operativa',
          '1 mes de soporte post-lanzamiento',
        ],
      },
      notIncluded: {
        en: ['Ads management (compatible with Ads + Retargeting add-on)', 'Blog content', 'ERP/POS integrations'],
        es: [
          'Gestión de anuncios (compatible con el complemento de Anuncios + Retargeting)',
          'Contenido de blog',
          'Integraciones ERP/POS',
        ],
      },
    },
    {
      slug: 'ecommerce-pro',
      name: { en: 'E-commerce Pro', es: 'E-commerce Pro' },
      price: 'From $8,500',
      cadence: { en: 'one-time + $500/mo', es: 'pago único + $500/mes' },
      bestFor: {
        en: 'Stores with 150+ products, $10k+/month revenue, or migrating from WooCommerce/Wix/Square. Final price set after a paid audit ($400, credited to the project).',
        es: 'Tiendas con 150+ productos, $10,000+/mes en ingresos, o migrando desde WooCommerce/Wix/Square. Precio final definido tras una auditoría pagada ($400, acreditados al proyecto).',
      },
      features: {
        en: [
          'Everything in Growth',
          'Unlimited catalog + full migration (products, customers, orders) with 301 redirects (zero SEO loss)',
          'Advanced navigation (filters, predictive search, automated collections)',
          'Full CRO program (A/B testing on PDP/checkout, heatmaps, ongoing speed optimization)',
          'Automations (n8n): inventory alerts, CRM/Notion sync, operational notifications',
          'Full email marketing (5 flows + 2 monthly campaigns)',
          'Subscriptions or B2B/wholesale portal (if applicable)',
          'Blog base + 4 initial SEO posts',
          'Weekly executive report + monthly 1-hour strategy call',
          'Direct WhatsApp access (24h response)',
        ],
        es: [
          'Todo lo de Growth',
          'Catálogo ilimitado + migración completa (productos, clientes, pedidos) con redirecciones 301 (sin pérdida de SEO)',
          'Navegación avanzada (filtros, búsqueda predictiva, colecciones automatizadas)',
          'Programa completo de CRO (pruebas A/B en producto/checkout, mapas de calor, optimización de velocidad continua)',
          'Automatizaciones (n8n): alertas de inventario, sincronización con CRM/Notion, notificaciones operativas',
          'Marketing por email completo (5 flujos + 2 campañas mensuales)',
          'Suscripciones o portal B2B/mayorista (si aplica)',
          'Base de blog + 4 artículos SEO iniciales',
          'Reporte ejecutivo semanal + llamada de estrategia mensual de 1 hora',
          'Acceso directo por WhatsApp (respuesta en 24h)',
        ],
      },
      notIncluded: {
        en: ['Ad spend budget', 'Product photography'],
        es: ['Presupuesto de inversión publicitaria', 'Fotografía de producto'],
      },
    },
  ],
  addOns: [
    { name: { en: 'Extra block of 25 products (upload + copy)', es: 'Bloque extra de 25 productos (carga + copy)' }, price: '$150' },
    { name: { en: 'Standalone migration (no rebuild)', es: 'Migración independiente (sin reconstrucción)' }, price: 'From $800' },
    { name: { en: 'POS/ERP integration (Square, QuickBooks)', es: 'Integración POS/ERP (Square, QuickBooks)' }, price: 'From $400' },
    { name: { en: 'Additional email flow', es: 'Flujo de email adicional' }, price: '$150' },
    { name: { en: 'Product photography session (2h)', es: 'Sesión de fotografía de producto (2h)' }, price: '$250' },
    { name: { en: 'Campaign/promo landing page', es: 'Landing page de campaña/promoción' }, price: '$400' },
    { name: { en: 'Existing e-commerce audit (CRO + SEO + speed)', es: 'Auditoría de e-commerce existente (CRO + SEO + velocidad)' }, price: '$400' },
  ],
  faqs: [
    {
      question: {
        en: 'How much does a Shopify store cost in Dallas?',
        es: '¿Cuánto cuesta una tienda Shopify en Dallas?',
      },
      answer: {
        en: "Astratta's Shopify builds start at $2,800 one-time plus $150/month for a 25-product boutique launch, and scale to $5,000+ for stores with SEO and email automation, or $8,500+ for full migrations and CRO programs. Monthly plans cover updates, new products, and reporting.",
        es: 'Las tiendas Shopify de Astratta empiezan en $2,800 único pago más $150/mes para el lanzamiento de una boutique de 25 productos, y escalan a $5,000+ para tiendas con SEO y automatización de email, o $8,500+ para migraciones completas y programas de CRO. Los planes mensuales cubren actualizaciones, nuevos productos y reportes.',
      },
    },
    {
      question: {
        en: 'Do you migrate stores from WooCommerce, Wix, or Square?',
        es: '¿Migran tiendas desde WooCommerce, Wix o Square?',
      },
      answer: {
        en: 'Yes — full migrations (products, customers, order history) with 301 redirects to protect existing SEO rankings are included in the E-commerce Pro tier. We run a paid audit first ($400, credited to your project) to scope the migration accurately before quoting a final price.',
        es: 'Sí — migraciones completas (productos, clientes, historial de pedidos) con redirecciones 301 para proteger tu posicionamiento SEO actual están incluidas en el plan E-commerce Pro. Primero hacemos una auditoría pagada ($400, acreditados a tu proyecto) para dimensionar la migración con precisión antes de cotizar un precio final.',
      },
    },
    {
      question: {
        en: "What's included in the monthly e-commerce maintenance fee?",
        es: '¿Qué incluye la cuota mensual de mantenimiento de e-commerce?',
      },
      answer: {
        en: 'Monthly plans include software updates, bug fixes, new product uploads (5-15/month depending on tier), and a sales/conversion report. Growth and Pro tiers add CRO testing, email flow optimization, and priority support.',
        es: 'Los planes mensuales incluyen actualizaciones de software, corrección de errores, carga de nuevos productos (5-15/mes según el plan) y un reporte de ventas/conversión. Los planes Growth y Pro agregan pruebas de CRO, optimización de flujos de email y soporte prioritario.',
      },
    },
    {
      question: {
        en: 'Can I sell on Instagram and Facebook too?',
        es: '¿También puedo vender en Instagram y Facebook?',
      },
      answer: {
        en: 'Yes — E-commerce Growth and Pro tiers include Instagram Shopping, Facebook Shop, and Google Merchant Center setup, so your Shopify catalog syncs to social and free Google Shopping listings.',
        es: 'Sí — los planes E-commerce Growth y Pro incluyen configuración de Instagram Shopping, Facebook Shop y Google Merchant Center, para que tu catálogo de Shopify se sincronice con redes sociales y listados gratuitos de Google Shopping.',
      },
    },
    {
      question: {
        en: 'Do you handle product photography?',
        es: '¿Se encargan de la fotografía de producto?',
      },
      answer: {
        en: "Photography isn't included in any tier by default — clients provide product photos, or add a 2-hour photography session for $250. This keeps the base price accessible while giving you the option to add it.",
        es: 'La fotografía no está incluida por defecto en ningún plan — los clientes proveen las fotos de producto, o agregan una sesión de fotografía de 2 horas por $250. Esto mantiene el precio base accesible mientras te da la opción de agregarla.',
      },
    },
  ],
}

export const SOCIAL_MEDIA_PAGE: ServicePageSource = {
  slug: 'social-media',
  parentSlug: 'digital-marketing',
  number: '/02a',
  title: { en: 'Social Media', es: 'Redes Sociales' },
  metaTitle: {
    en: 'Social Media Management Pricing — Dallas, TX | Astratta Agency',
    es: 'Precios de Gestión de Redes Sociales — Dallas, TX | Astratta Agency',
  },
  metaDescription: {
    en: 'Instagram, Facebook, and TikTok management from $450/month for Dallas businesses — posts, reels, stories, and monthly reporting. Add a lead magnet funnel to any plan.',
    es: 'Gestión de Instagram, Facebook y TikTok desde $450/mes para negocios de Dallas — publicaciones, reels, historias y reportes mensuales. Agrega un embudo de lead magnet a cualquier plan.',
  },
  h1: {
    en: 'Social media that builds an audience worth selling to.',
    es: 'Redes sociales que construyen una audiencia que vale la pena venderle.',
  },
  intro: {
    en: 'Astratta manages Instagram, Facebook, and TikTok for Dallas–Fort Worth businesses across four tiers — from a lightweight presence plan to a full authority program with community management and weekly executive reporting. Every plan includes a monthly content calendar and real metrics, not just post counts.',
    es: 'Astratta gestiona Instagram, Facebook y TikTok para negocios de Dallas–Fort Worth en cuatro planes — desde un plan de presencia ligera hasta un programa completo de autoridad con gestión de comunidad y reportes ejecutivos semanales. Cada plan incluye un calendario de contenido mensual y métricas reales, no solo conteo de publicaciones.',
  },
  painHeadline: {
    en: "You're posting every week. Nothing is happening because of it.",
    es: 'Publicas cada semana. No está pasando nada por eso.',
  },
  frustrations: [
    {
      text: {
        en: 'You post consistently and your follower count barely moves.',
        es: 'Publicas constantemente y tu número de seguidores apenas se mueve.',
      },
    },
    {
      text: {
        en: "You can't tell if any of it is actually bringing in customers, or just... existing.",
        es: 'No puedes saber si algo de esto realmente está trayendo clientes, o solo... existe.',
      },
    },
    {
      text: {
        en: "Every post takes an hour to plan, shoot, and edit — time you don't have to spend guessing.",
        es: 'Cada publicación toma una hora para planear, grabar y editar — tiempo que no tienes para pasar adivinando.',
      },
    },
    {
      text: {
        en: 'You\'re on Instagram because you\'re "supposed to be," not because you have a plan for it.',
        es: 'Estás en Instagram porque "se supone que debes estar," no porque tengas un plan para eso.',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Audience & pillar strategy', es: 'Estrategia de audiencia y pilares' },
      description: {
        en: "We define who you're actually talking to and 3-4 content pillars, so every post has a job instead of being filler.",
        es: 'Definimos con quién realmente estás hablando y 3-4 pilares de contenido, para que cada publicación tenga un propósito en lugar de ser relleno.',
      },
    },
    {
      number: '/02',
      title: { en: 'Film & produce', es: 'Filmación y producción' },
      description: {
        en: "On-site filming sessions turn into posts, stories, and reels — produced for how each platform's algorithm actually behaves.",
        es: 'Las sesiones de filmación en sitio se convierten en publicaciones, historias y reels — producidos según cómo realmente se comporta el algoritmo de cada plataforma.',
      },
    },
    {
      number: '/03',
      title: { en: 'Publish & engage', es: 'Publicación e interacción' },
      description: {
        en: "Consistent posting cadence plus daily community management on the tiers that include it — comments and DMs don't sit unanswered.",
        es: 'Ritmo de publicación constante más gestión diaria de comunidad en los planes que la incluyen — los comentarios y DMs no quedan sin responder.',
      },
    },
    {
      number: '/04',
      title: { en: 'Report on what matters', es: 'Reporte de lo que importa' },
      description: {
        en: 'Monthly reports track reach, engagement, and traffic — not just a vanity follower count.',
        es: 'Los reportes mensuales rastrean alcance, interacción y tráfico — no solo un conteo vanidoso de seguidores.',
      },
    },
  ],
  proof: {
    caseStudySlug: 'perreando-hotdog-social-media',
  },
  benefits: {
    en: [
      "A documented content strategy, not a guess about what to post this week.",
      'Real metrics reporting (reach, engagement, traffic) — not just "posts published."',
      "Platform-specific content — what works on TikTok isn't copy-pasted onto LinkedIn.",
      "A lead magnet + automation option on Growth tier and up, so social can generate leads without ad spend.",
    ],
    es: [
      'Una estrategia de contenido documentada, no una suposición de qué publicar esta semana.',
      'Reportes de métricas reales (alcance, interacción, tráfico) — no solo "publicaciones hechas."',
      'Contenido específico por plataforma — lo que funciona en TikTok no se copia y pega en LinkedIn.',
      'Opción de lead magnet + automatización en el plan Growth en adelante, para que las redes puedan generar leads sin inversión publicitaria.',
    ],
  },
  tiers: [
    {
      slug: 'social-presence',
      name: { en: 'Social Presence', es: 'Social Presence' },
      price: '$450',
      cadence: { en: 'per month', es: 'por mes' },
      bestFor: {
        en: 'Businesses that want a consistent presence without urgency around leads.',
        es: 'Negocios que quieren una presencia constante sin urgencia por leads.',
      },
      features: {
        en: [
          'Instagram + Facebook',
          '8 posts/month (carousel + static)',
          '5 stories/week',
          '2 reels/month (creative direction + editing)',
          'Documented monthly content strategy',
          'Bio/hashtag/CTA optimization',
          '1 strategy session/month (30 min)',
          'Monthly metrics report (reach, engagement, traffic)',
          '2 hours of on-site filming/month',
        ],
        es: [
          'Instagram + Facebook',
          '8 publicaciones/mes (carrusel + estática)',
          '5 historias/semana',
          '2 reels/mes (dirección creativa + edición)',
          'Estrategia de contenido mensual documentada',
          'Optimización de bio/hashtags/CTA',
          '1 sesión de estrategia/mes (30 min)',
          'Reporte mensual de métricas (alcance, interacción, tráfico)',
          '2 horas de filmación en sitio/mes',
        ],
      },
      notIncluded: {
        en: ['Lead magnet', 'Ads', 'Email nurture'],
        es: ['Lead magnet', 'Anuncios', 'Nutrición por email'],
      },
    },
    {
      slug: 'social-growth',
      name: { en: 'Social Growth', es: 'Social Growth' },
      price: '$750',
      cadence: { en: 'per month', es: 'por mes' },
      recommended: true,
      bestFor: {
        en: 'Restaurants, salons, and retailers that want leads without running ads.',
        es: 'Restaurantes, salones y minoristas que quieren leads sin correr anuncios.',
      },
      features: {
        en: [
          'Instagram + Facebook + TikTok',
          '12 posts/month',
          'Daily stories',
          '4 reels/month',
          '4 hours of on-site filming/month',
          '1 monthly lead magnet (PDF/checklist/template)',
          'ManyChat setup (comment → automatic download)',
          '3-email welcome sequence via automation',
          'Daily community management (comments + DMs)',
          'Advanced report with recommendations',
          '1 strategy call/month (45 min)',
        ],
        es: [
          'Instagram + Facebook + TikTok',
          '12 publicaciones/mes',
          'Historias diarias',
          '4 reels/mes',
          '4 horas de filmación en sitio/mes',
          '1 lead magnet mensual (PDF/checklist/plantilla)',
          'Configuración de ManyChat (comentario → descarga automática)',
          'Secuencia de bienvenida de 3 emails vía automatización',
          'Gestión diaria de comunidad (comentarios + DMs)',
          'Reporte avanzado con recomendaciones',
          '1 llamada de estrategia/mes (45 min)',
        ],
      },
      notIncluded: {
        en: ['Ads', 'Landing page', 'Full CRM'],
        es: ['Anuncios', 'Landing page', 'CRM completo'],
      },
    },
    {
      slug: 'social-authority',
      name: { en: 'Social Authority', es: 'Social Authority' },
      price: '$1,200',
      cadence: { en: 'per month', es: 'por mes' },
      bestFor: {
        en: 'Businesses that want to dominate their niche organically, without ad spend.',
        es: 'Negocios que quieren dominar su nicho orgánicamente, sin inversión publicitaria.',
      },
      features: {
        en: [
          'Instagram + Facebook + TikTok',
          '16 posts/month (multi-pillar)',
          'Daily stories',
          '6 reels/TikToks per month',
          '4 hours of on-site filming/month',
          'LinkedIn strategy (3-5 posts/week if applicable)',
          'Complete Google Business Profile + reviews management',
          'Monthly engagement campaign (contest/survey)',
          'Daily community management',
          'Weekly executive report',
          'Direct WhatsApp access (24h response)',
          '1 strategy call/month (1 hour)',
        ],
        es: [
          'Instagram + Facebook + TikTok',
          '16 publicaciones/mes (multi-pilar)',
          'Historias diarias',
          '6 reels/TikToks por mes',
          '4 horas de filmación en sitio/mes',
          'Estrategia de LinkedIn (3-5 publicaciones/semana si aplica)',
          'Google Business Profile completo + gestión de reseñas',
          'Campaña de interacción mensual (concurso/encuesta)',
          'Gestión diaria de comunidad',
          'Reporte ejecutivo semanal',
          'Acceso directo por WhatsApp (respuesta en 24h)',
          '1 llamada de estrategia/mes (1 hora)',
        ],
      },
      notIncluded: {
        en: ['Paid traffic', 'Optimized landing page', 'Full CRM'],
        es: ['Tráfico pagado', 'Landing page optimizada', 'CRM completo'],
      },
    },
    {
      slug: 'social-lead-magnet-deluxe',
      name: { en: 'Social + Lead Magnet Deluxe', es: 'Social + Lead Magnet Deluxe' },
      price: '$750',
      cadence: { en: 'per month', es: 'por mes' },
      bestFor: {
        en: 'Coaches, consultants, and SMBs that want leads without paid ads.',
        es: 'Coaches, consultores y pymes que quieren leads sin anuncios pagados.',
      },
      features: {
        en: [
          'Everything in Social Growth',
          'Premium lead magnet (Notion template, ebook, or checklist)',
          'Full ManyChat + n8n integration',
          '7-day nurture email sequence (automated)',
          'Simple lead-magnet landing page (built in Lovable)',
          'Conversion dashboard (comment → captured email)',
          'Weekly copy optimization',
        ],
        es: [
          'Todo lo de Social Growth',
          'Lead magnet premium (plantilla de Notion, ebook o checklist)',
          'Integración completa de ManyChat + n8n',
          'Secuencia de nutrición por email de 7 días (automatizada)',
          'Landing page simple de lead magnet (construida en Lovable)',
          'Panel de conversión (comentario → email capturado)',
          'Optimización semanal de copy',
        ],
      },
      notIncluded: {
        en: ['Paid ads'],
        es: ['Anuncios pagados'],
      },
    },
  ],
  addOns: [
    { name: { en: 'Extra filming session (2h)', es: 'Sesión de filmación extra (2h)' }, price: '$100' },
    { name: { en: 'Extra edited reel', es: 'Reel editado extra' }, price: '$55' },
    { name: { en: 'Comment/DM management (no plan)', es: 'Gestión de comentarios/DMs (sin plan)' }, price: '$60/mo' },
    { name: { en: 'Strategic consulting (1h)', es: 'Consultoría estratégica (1h)' }, price: '$150' },
  ],
  faqs: [
    {
      question: {
        en: 'How much does social media management cost in Dallas?',
        es: '¿Cuánto cuesta la gestión de redes sociales en Dallas?',
      },
      answer: {
        en: "Astratta's social media plans range from $450/month for a presence-only plan up to $1,200/month for a full multi-platform authority program with daily community management and weekly reporting. Most Dallas SMBs that want leads (not just presence) choose the $750/month Social Growth or Lead Magnet Deluxe tiers.",
        es: 'Los planes de redes sociales de Astratta van desde $450/mes por un plan de solo presencia hasta $1,200/mes por un programa completo de autoridad multi-plataforma con gestión diaria de comunidad y reportes semanales. La mayoría de las pymes de Dallas que quieren leads (no solo presencia) eligen los planes de $750/mes Social Growth o Lead Magnet Deluxe.',
      },
    },
    {
      question: {
        en: 'Can I get leads from social media without running ads?',
        es: '¿Puedo obtener leads de redes sociales sin correr anuncios?',
      },
      answer: {
        en: 'Yes — the Social Growth and Social + Lead Magnet Deluxe tiers are built specifically for this: a monthly lead magnet plus ManyChat automation captures leads directly from comments and DMs, no ad budget required.',
        es: 'Sí — los planes Social Growth y Social + Lead Magnet Deluxe están construidos específicamente para esto: un lead magnet mensual más automatización de ManyChat captura leads directamente de comentarios y DMs, sin necesidad de presupuesto publicitario.',
      },
    },
    {
      question: {
        en: 'What platforms do you manage?',
        es: '¿Qué plataformas gestionan?',
      },
      answer: {
        en: 'Instagram and Facebook are included in every tier. TikTok is added starting at the Social Growth tier. LinkedIn is available in the Social Authority tier for B2B and professional-services businesses.',
        es: 'Instagram y Facebook están incluidos en todos los planes. TikTok se agrega desde el plan Social Growth. LinkedIn está disponible en el plan Social Authority para negocios B2B y de servicios profesionales.',
      },
    },
    {
      question: {
        en: 'How many posts do I get per month?',
        es: '¿Cuántas publicaciones recibo por mes?',
      },
      answer: {
        en: 'Post volume scales by tier: 8/month (Social Presence), 12/month (Social Growth or Lead Magnet Deluxe), or 16/month (Social Authority), plus stories and reels/TikToks on top of the post count.',
        es: 'El volumen de publicaciones escala por plan: 8/mes (Social Presence), 12/mes (Social Growth o Lead Magnet Deluxe), o 16/mes (Social Authority), más historias y reels/TikToks adicionales al conteo de publicaciones.',
      },
    },
  ],
}

/**
 * Standalone Paid Ads service (per-channel management fee + client-paid ad
 * spend). Distinct from the cheaper "Ads Scaling" tiers bundled inside the
 * Lead Generation System page — those are subsidized by the $1,200/mo Lead
 * Gen retainer, so don't merge the two pricing tables.
 */
export const PAID_ADS_PAGE: ServicePageSource = {
  slug: 'paid-ads',
  parentSlug: 'digital-marketing',
  number: '/02b',
  title: { en: 'Paid Ads', es: 'Anuncios Pagados' },
  metaTitle: {
    en: 'Paid Ads Management Pricing — Meta & Google Ads in Dallas, TX | Astratta',
    es: 'Precios de Gestión de Anuncios Pagados — Meta y Google Ads en Dallas, TX | Astratta',
  },
  metaDescription: {
    en: 'Meta and Google Ads management from $200/month plus ad spend for Dallas–Fort Worth businesses — prospecting, retargeting, and full-funnel campaigns with weekly reporting.',
    es: 'Gestión de Meta y Google Ads desde $200/mes más inversión publicitaria para negocios de Dallas–Fort Worth — campañas de prospección, retargeting y embudo completo con reportes semanales.',
  },
  h1: {
    en: "Ad spend that's accountable to a cost-per-lead number.",
    es: 'Inversión publicitaria responsable ante un número de costo por lead.',
  },
  intro: {
    en: 'Astratta manages Meta and Google ad campaigns for Dallas businesses across four tiers — from cold-traffic prospecting to a full awareness-to-conversion funnel. Every plan separates our management fee from your ad budget, and reports against click-through rate, cost-per-click, and conversions weekly or bi-weekly.',
    es: 'Astratta gestiona campañas de anuncios de Meta y Google para negocios de Dallas en cuatro planes — desde prospección de tráfico frío hasta un embudo completo de visibilidad a conversión. Cada plan separa nuestra cuota de gestión de tu presupuesto publicitario, y reporta contra tasa de clics, costo por clic y conversiones semanal o quincenalmente.',
  },
  painHeadline: {
    en: "You're spending on ads. You couldn't tell me your cost per lead if I asked.",
    es: 'Estás gastando en anuncios. No podrías decirme tu costo por lead si te preguntara.',
  },
  frustrations: [
    {
      text: {
        en: "Your ad account shows spend and reach, but nobody can tell you what it actually cost to get one real lead.",
        es: 'Tu cuenta de anuncios muestra gasto y alcance, pero nadie puede decirte cuánto costó realmente conseguir un lead real.',
      },
    },
    {
      text: {
        en: "Campaigns launched months ago are still running unchanged because nobody's optimizing them.",
        es: 'Campañas lanzadas hace meses siguen corriendo sin cambios porque nadie las está optimizando.',
      },
    },
    {
      text: {
        en: "You're running ads to a page that wasn't built to convert, so the budget is doing twice the work it should.",
        es: 'Estás corriendo anuncios hacia una página que no fue construida para convertir, así que el presupuesto está haciendo el doble de trabajo del que debería.',
      },
    },
    {
      text: {
        en: "Every report you get is impressions and reach — numbers that don't tell you if it's working.",
        es: 'Cada reporte que recibes es de impresiones y alcance — números que no te dicen si está funcionando.',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Audit the funnel', es: 'Auditoría del embudo' },
      description: {
        en: "Before spending a dollar, we check whether your landing page can actually convert the traffic we're about to send it.",
        es: 'Antes de gastar un dólar, revisamos si tu landing page realmente puede convertir el tráfico que estamos por enviarle.',
      },
    },
    {
      number: '/02',
      title: { en: 'Launch & segment', es: 'Lanzamiento y segmentación' },
      description: {
        en: 'Campaigns built around your real audience — DFW-specific targeting, not broad "everyone" spend.',
        es: 'Campañas construidas alrededor de tu audiencia real — segmentación específica de DFW, no gasto amplio "para todos."',
      },
    },
    {
      number: '/03',
      title: { en: 'Test & optimize', es: 'Prueba y optimización' },
      description: {
        en: 'Creative and copy A/B testing on a real cadence (weekly to daily depending on tier), not "set it and check next month."',
        es: 'Pruebas A/B de creativos y copy con un ritmo real (semanal a diario según el plan), no "configúralo y revisa el próximo mes."',
      },
    },
    {
      number: '/04',
      title: { en: 'Report against cost per lead', es: 'Reporte contra costo por lead' },
      description: {
        en: 'Every report ties spend to CTR, CPC, and conversions — the numbers that tell you if the budget is working.',
        es: 'Cada reporte conecta el gasto con CTR, CPC y conversiones — los números que te dicen si el presupuesto está funcionando.',
      },
    },
  ],
  benefits: {
    en: [
      "Management fee and ad spend shown separately — you always know what you're paying us vs. paying Meta/Google.",
      'DFW-specific audience segmentation from tier 1, not generic broad targeting.',
      'Reporting tied to cost per lead, not just impressions and reach.',
      "A funnel check before launch — we'll tell you if your landing page needs work before we send it traffic.",
    ],
    es: [
      'Cuota de gestión e inversión publicitaria mostradas por separado — siempre sabes qué nos pagas a nosotros vs. qué le pagas a Meta/Google.',
      'Segmentación de audiencia específica de DFW desde el plan 1, no segmentación amplia genérica.',
      'Reportes conectados al costo por lead, no solo impresiones y alcance.',
      'Una revisión del embudo antes del lanzamiento — te diremos si tu landing page necesita trabajo antes de enviarle tráfico.',
    ],
  },
  tiers: [
    {
      slug: 'ads-prospecting',
      name: { en: 'Ads Prospecting', es: 'Ads Prospecting' },
      price: '$200/mo fee',
      cadence: { en: '+ $150-200/mo ad spend (recommended)', es: '+ $150-200/mes de inversión publicitaria (recomendado)' },
      bestFor: {
        en: 'Businesses that want fast traffic.',
        es: 'Negocios que quieren tráfico rápido.',
      },
      features: {
        en: [
          '1 Meta Ads campaign (Facebook + Instagram)',
          'Basic DFW segmentation (age, interests, behaviors)',
          '2 creatives/month (design + copy)',
          'Bi-weekly report (CTR, CPC, conversions)',
          'Monthly optimization (audience adjustment, copy testing)',
        ],
        es: [
          '1 campaña de Meta Ads (Facebook + Instagram)',
          'Segmentación básica de DFW (edad, intereses, comportamientos)',
          '2 creativos/mes (diseño + copy)',
          'Reporte quincenal (CTR, CPC, conversiones)',
          'Optimización mensual (ajuste de audiencia, pruebas de copy)',
        ],
      },
      notIncluded: {
        en: ['Landing page', 'Lead magnet', 'Nurture sequence'],
        es: ['Landing page', 'Lead magnet', 'Secuencia de nutrición'],
      },
    },
    {
      slug: 'ads-retargeting-warm',
      name: { en: 'Ads + Retargeting (Warm)', es: 'Ads + Retargeting (Cálido)' },
      price: '$350/mo fee',
      cadence: { en: '+ $250-350/mo ad spend (recommended)', es: '+ $250-350/mes de inversión publicitaria (recomendado)' },
      recommended: true,
      bestFor: {
        en: 'E-commerce and service businesses with urgency to convert.',
        es: 'Negocios de e-commerce y servicios con urgencia por convertir.',
      },
      features: {
        en: [
          '1 prospecting (cold) campaign + 1 retargeting (warm) campaign',
          '4 creatives/month',
          'Advanced segmentation (custom audiences, basic lookalike)',
          'Weekly report (funnel: impression → click → conversion)',
          'Creative A/B testing',
          'Optimization 2x/week',
        ],
        es: [
          '1 campaña de prospección (fría) + 1 campaña de retargeting (cálida)',
          '4 creativos/mes',
          'Segmentación avanzada (audiencias personalizadas, lookalike básico)',
          'Reporte semanal (embudo: impresión → clic → conversión)',
          'Pruebas A/B de creativos',
          'Optimización 2x/semana',
        ],
      },
      notIncluded: {
        en: ['Landing page', 'Lead magnet'],
        es: ['Landing page', 'Lead magnet'],
      },
    },
    {
      slug: 'ads-authority',
      name: { en: 'Ads Authority (Full Stack)', es: 'Ads Authority (Stack Completo)' },
      price: '$600/mo fee',
      cadence: { en: '+ $400-600/mo ad spend (recommended)', es: '+ $400-600/mes de inversión publicitaria (recomendado)' },
      bestFor: {
        en: 'Events, retail, and SaaS businesses with budget to scale.',
        es: 'Negocios de eventos, retail y SaaS con presupuesto para escalar.',
      },
      features: {
        en: [
          '3-4 simultaneous campaigns (top-of-funnel awareness + mid-funnel consideration + bottom-of-funnel retargeting)',
          '6 creatives/month',
          'Lookalike audiences',
          'Weekly executive report',
          'Daily optimization (bid, audience, placement)',
          'Advanced A/B testing (creative + copy + audience)',
          'Full remarketing (pixel + audience)',
        ],
        es: [
          '3-4 campañas simultáneas (visibilidad de tope de embudo + consideración de medio embudo + retargeting de fondo de embudo)',
          '6 creativos/mes',
          'Audiencias lookalike',
          'Reporte ejecutivo semanal',
          'Optimización diaria (puja, audiencia, ubicación)',
          'Pruebas A/B avanzadas (creativo + copy + audiencia)',
          'Remarketing completo (pixel + audiencia)',
        ],
      },
    },
    {
      slug: 'google-ads',
      name: { en: 'Google Ads (Search + Display)', es: 'Google Ads (Búsqueda + Display)' },
      price: '$300/mo fee',
      cadence: { en: '+ $200-400/mo ad spend (recommended)', es: '+ $200-400/mes de inversión publicitaria (recomendado)' },
      bestFor: {
        en: 'B2B, legal, real estate, and professional services.',
        es: 'B2B, legal, bienes raíces y servicios profesionales.',
      },
      features: {
        en: [
          'Search campaigns targeting relevant keywords',
          'Display/remarketing visual ads',
          '10 ad variations (headlines + descriptions)',
          'Weekly report (impressions, CTR, conversions, ROAS)',
          'Bid + keyword optimization',
          'Landing page optimization feedback',
        ],
        es: [
          'Campañas de búsqueda dirigidas a palabras clave relevantes',
          'Anuncios visuales de display/remarketing',
          '10 variaciones de anuncio (titulares + descripciones)',
          'Reporte semanal (impresiones, CTR, conversiones, ROAS)',
          'Optimización de puja + palabras clave',
          'Retroalimentación de optimización de landing page',
        ],
      },
      notIncluded: {
        en: ['Landing page build'],
        es: ['Construcción de landing page'],
      },
    },
  ],
  addOns: [
    { name: { en: 'Extra creative (design + copy)', es: 'Creativo extra (diseño + copy)' }, price: '$80/unit' },
    { name: { en: 'New campaign launch', es: 'Lanzamiento de nueva campaña' }, price: '$150' },
    { name: { en: 'Advanced retargeting strategy', es: 'Estrategia avanzada de retargeting' }, price: '$200' },
    { name: { en: 'Pixel setup + tracking audit', es: 'Configuración de pixel + auditoría de tracking' }, price: '$150' },
    { name: { en: 'Landing page optimization for ads', es: 'Optimización de landing page para anuncios' }, price: '$300' },
  ],
  faqs: [
    {
      question: {
        en: 'How much does Meta or Google Ads management cost in Dallas?',
        es: '¿Cuánto cuesta la gestión de Meta o Google Ads en Dallas?',
      },
      answer: {
        en: "Astratta's ad management fees range from $200/month (Ads Prospecting) to $600/month (Ads Authority), separate from your actual ad spend budget. Most Dallas SMBs start at $350/month (Ads + Retargeting) with a $250-350/month ad budget for a combined cold-and-warm-audience strategy.",
        es: 'Las cuotas de gestión de anuncios de Astratta van desde $200/mes (Ads Prospecting) hasta $600/mes (Ads Authority), separadas de tu presupuesto real de inversión publicitaria. La mayoría de las pymes de Dallas empiezan en $350/mes (Ads + Retargeting) con un presupuesto de $250-350/mes para una estrategia combinada de audiencia fría y cálida.',
      },
    },
    {
      question: {
        en: "What's the minimum ad budget I need?",
        es: '¿Cuál es el presupuesto publicitario mínimo que necesito?',
      },
      answer: {
        en: 'Recommended minimum ad spend starts at $150-200/month for the Prospecting tier and scales with each tier — this is separate from our management fee and is paid directly to Meta or Google, not to Astratta.',
        es: 'La inversión publicitaria mínima recomendada empieza en $150-200/mes para el plan Prospecting y escala con cada plan — esto es separado de nuestra cuota de gestión y se paga directamente a Meta o Google, no a Astratta.',
      },
    },
    {
      question: {
        en: 'Do you need a landing page before running ads for me?',
        es: '¿Necesitan una landing page antes de correr anuncios para mí?',
      },
      answer: {
        en: "Yes, for best results — ads without a dedicated landing page convert at a much lower rate. If you don't have one, we can build one starting at $800 (see Web Development), or combine both into the Lead Generation System.",
        es: 'Sí, para mejores resultados — los anuncios sin una landing page dedicada convierten a una tasa mucho más baja. Si no tienes una, podemos construir una desde $800 (ver Desarrollo Web), o combinar ambos en el Sistema de Generación de Leads.',
      },
    },
    {
      question: {
        en: 'How is this different from the Lead Generation System?',
        es: '¿En qué se diferencia esto del Sistema de Generación de Leads?',
      },
      answer: {
        en: 'Paid Ads is campaign management only — you bring the landing page and handle lead follow-up yourself. The Lead Generation System bundles ads with the landing page, lead magnet, social warm-up, and CRM follow-up into one $1,200/month program.',
        es: 'Anuncios Pagados es solo gestión de campañas — tú traes la landing page y manejas el seguimiento de leads tú mismo. El Sistema de Generación de Leads combina anuncios con la landing page, lead magnet, calentamiento en redes y seguimiento por CRM en un solo programa de $1,200/mes.',
      },
    },
  ],
}

/**
 * Astratta's core offer. Structurally different from the other service
 * pages: one core system (tiers[0], rendered full-width/hero) plus two
 * optional add-ons (tiers[1..2], rendered smaller/secondary) rather than
 * parallel comparison tiers. The separate "Ads Scaling" 3-row mini-table
 * lives as page-local data in LeadGeneration.tsx, not here, since it's a
 * one-off shape (fee/budget/creatives/targeting/result columns) that doesn't
 * fit PricingTier and isn't reused anywhere else.
 */
export const LEAD_GENERATION_PAGE: ServicePageSource = {
  slug: 'lead-generation',
  parentSlug: 'digital-marketing',
  number: '/02c',
  title: { en: 'Lead Generation System', es: 'Sistema de Generación de Leads' },
  metaTitle: {
    en: 'Lead Generation System Pricing — Dallas, TX | Astratta Agency',
    es: 'Precios del Sistema de Generación de Leads — Dallas, TX | Astratta Agency',
  },
  metaDescription: {
    en: 'A complete lead generation system for Dallas startups and SMBs — landing page, ads, social warm-up, and lead magnet working together. From $1,200/month, minimum 15 qualified leads guaranteed by month 3.',
    es: 'Un sistema completo de generación de leads para startups y pymes de Dallas — landing page, anuncios, calentamiento en redes y lead magnet trabajando juntos. Desde $1,200/mes, mínimo 15 leads calificados garantizados para el mes 3.',
  },
  h1: {
    en: 'One system, built to deliver a number of leads — not just traffic.',
    es: 'Un solo sistema, construido para entregar un número de leads — no solo tráfico.',
  },
  intro: {
    en: "The Lead Generation System is Astratta's core offer for Dallas businesses that need a predictable number of qualified leads per month. It combines a landing page, paid ads, social warm-up, and a lead magnet into one managed program — with a guaranteed minimum of 15 qualified leads and a cost-per-lead under $80 by month 3.",
    es: 'El Sistema de Generación de Leads es la oferta principal de Astratta para negocios de Dallas que necesitan un número predecible de leads calificados por mes. Combina una landing page, anuncios pagados, calentamiento en redes y un lead magnet en un solo programa gestionado — con un mínimo garantizado de 15 leads calificados y un costo por lead menor a $80 para el mes 3.',
  },
  painHeadline: {
    en: "You don't need more traffic. You need a number of leads you can count on.",
    es: 'No necesitas más tráfico. Necesitas un número de leads con el que puedas contar.',
  },
  frustrations: [
    {
      text: {
        en: 'Some months you get 20 leads, some months you get 3, and you can never predict which.',
        es: 'Algunos meses tienes 20 leads, otros meses tienes 3, y nunca puedes predecir cuál será.',
      },
    },
    {
      text: {
        en: "Your marketing is split across a freelancer for ads, a friend for social, and nobody owning the whole funnel.",
        es: 'Tu marketing está dividido entre un freelancer para anuncios, un amigo para redes, y nadie es dueño de todo el embudo.',
      },
    },
    {
      text: {
        en: 'Every "marketing win" is a vague reach number — not a lead count, not a cost per lead.',
        es: 'Cada "victoria de marketing" es un número de alcance vago — no un conteo de leads, no un costo por lead.',
      },
    },
    {
      text: {
        en: "You've tried running ads to a page that was never built to capture a lead in the first place.",
        es: 'Ya intentaste correr anuncios hacia una página que nunca fue construida para capturar un lead.',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Diagnostic audit', es: 'Auditoría diagnóstica' },
      description: {
        en: 'A 2-hour session on your current website, social, positioning, and conversion flow — so the system is built around actual gaps, not guesses.',
        es: 'Una sesión de 2 horas sobre tu sitio web actual, redes, posicionamiento y flujo de conversión — para que el sistema se construya alrededor de brechas reales, no suposiciones.',
      },
    },
    {
      number: '/02',
      title: { en: 'Build the funnel', es: 'Construcción del embudo' },
      description: {
        en: "Landing page, lead magnet, and ManyChat automation built and connected as one system, not separate pieces.",
        es: 'Landing page, lead magnet y automatización de ManyChat construidos y conectados como un solo sistema, no piezas separadas.',
      },
    },
    {
      number: '/03',
      title: { en: 'Warm up & run ads', es: 'Calentamiento y anuncios' },
      description: {
        en: "Social presence warms up cold traffic while retargeting ads bring back visitors who didn't convert the first time.",
        es: 'La presencia en redes calienta el tráfico frío mientras los anuncios de retargeting traen de vuelta a los visitantes que no convirtieron la primera vez.',
      },
    },
    {
      number: '/04',
      title: { en: 'Report weekly, hit the number', es: 'Reporte semanal, alcanzar el número' },
      description: {
        en: 'Weekly reporting on leads generated, cost per lead, and form conversion — with a guaranteed minimum of 15 qualified leads/month and under $80 cost per lead by month 3.',
        es: 'Reporte semanal de leads generados, costo por lead y conversión de formulario — con un mínimo garantizado de 15 leads calificados/mes y un costo por lead menor a $80 para el mes 3.',
      },
    },
  ],
  proof: {
    caseStudySlug: 'eventos-ensuenos',
    fallbackNote: {
      en: "This shows results from Astratta's web development work with Eventos Ensueños (+80% quote requests after a conversion-focused rebuild) — directionally the closest proof we have for lead volume, though that engagement was a website project, not the bundled Lead Generation System. The System adds paid ads, social warm-up, and a lead magnet on top of a conversion-built landing page, with its own guaranteed minimum of 15 qualified leads/month by month 3.",
      es: 'Esto muestra resultados del trabajo de desarrollo web de Astratta con Eventos Ensueños (+80% en solicitudes de cotización tras una reconstrucción enfocada en conversión) — direccionalmente la prueba más cercana que tenemos para volumen de leads, aunque ese proyecto fue de sitio web, no el Sistema de Generación de Leads combinado. El Sistema agrega anuncios pagados, calentamiento en redes y un lead magnet sobre una landing page construida para convertir, con su propio mínimo garantizado de 15 leads calificados/mes para el mes 3.',
    },
  },
  benefits: {
    en: [
      "One system, one report — not three vendors you have to compare against each other.",
      'A guaranteed minimum: 15 qualified leads/month and under $80 cost per lead by month 3.',
      'Landing page, ads, social warm-up, and lead magnet built to work together, not bolted on separately.',
      'Add the Sales Accelerator anytime to move from "leads delivered" to "leads closed."',
    ],
    es: [
      'Un solo sistema, un solo reporte — no tres proveedores que tienes que comparar entre sí.',
      'Un mínimo garantizado: 15 leads calificados/mes y un costo por lead menor a $80 para el mes 3.',
      'Landing page, anuncios, calentamiento en redes y lead magnet construidos para trabajar juntos, no añadidos por separado.',
      'Agrega el Acelerador de Ventas en cualquier momento para pasar de "leads entregados" a "leads cerrados."',
    ],
  },
  tiers: [
    {
      slug: 'lead-generation-core',
      name: { en: 'Lead Generation System', es: 'Sistema de Generación de Leads' },
      price: '$1,200',
      cadence: { en: '/mo — 6-month minimum commitment', es: '/mes — compromiso mínimo de 6 meses' },
      recommended: true,
      bestFor: {
        en: 'Businesses that need a predictable number of qualified leads per month, not just more traffic.',
        es: 'Negocios que necesitan un número predecible de leads calificados por mes, no solo más tráfico.',
      },
      features: {
        en: [
          'Diagnostic audit (1 session, 2 hours): current website, social, positioning, and conversion flow',
          'Landing page/funnel (Lovable.dev): hero → clear value prop → CTA → lead form',
          'Social media presence (IG + FB): 8 posts/month + 2 reels (audience warm-up)',
          'Lead magnet + ManyChat automation: comment → download → email nurture',
          'Retargeting ads (Meta): $150/month minimum budget → prospecting + warm audience',
          'Weekly report: leads generated, cost per lead, form conversion rate',
        ],
        es: [
          'Auditoría diagnóstica (1 sesión, 2 horas): sitio web actual, redes, posicionamiento y flujo de conversión',
          'Landing page/embudo (Lovable.dev): hero → propuesta de valor clara → CTA → formulario de lead',
          'Presencia en redes sociales (IG + FB): 8 publicaciones/mes + 2 reels (calentamiento de audiencia)',
          'Lead magnet + automatización de ManyChat: comentario → descarga → nutrición por email',
          'Anuncios de retargeting (Meta): presupuesto mínimo de $150/mes → prospección + audiencia cálida',
          'Reporte semanal: leads generados, costo por lead, tasa de conversión de formulario',
        ],
      },
    },
    {
      slug: 'sales-accelerator',
      name: { en: 'Sales Accelerator', es: 'Acelerador de Ventas' },
      price: '+$400',
      cadence: { en: '/mo — add-on, Lead Generation System clients only', es: '/mes — complemento, solo para clientes del Sistema de Generación de Leads' },
      bestFor: {
        en: 'Result: 20-30% close rate on delivered leads (KPI target).',
        es: 'Resultado: 20-30% de tasa de cierre en leads entregados (meta de KPI).',
      },
      features: {
        en: [
          '5-7 email automated nurture sequence (via Notion/n8n)',
          'WhatsApp funnel (for local SMB clients)',
          'CRM setup in Notion (contacts, proposals, follow-up automation)',
          'Weekly consultative follow-up call to help close warm leads',
          'Closing-focused ad copy for warm/retargeted leads',
          'Conversion monitoring (lead → deal)',
          'Copy optimization by closing angle',
        ],
        es: [
          'Secuencia automatizada de nutrición de 5-7 emails (vía Notion/n8n)',
          'Embudo de WhatsApp (para clientes de pymes locales)',
          'Configuración de CRM en Notion (contactos, propuestas, automatización de seguimiento)',
          'Llamada consultiva semanal de seguimiento para ayudar a cerrar leads cálidos',
          'Copy de anuncios enfocado en cierre para leads cálidos/de retargeting',
          'Monitoreo de conversión (lead → negocio cerrado)',
          'Optimización de copy por ángulo de cierre',
        ],
      },
    },
    {
      slug: 'brand-authority-system',
      name: { en: 'Brand Authority System', es: 'Sistema de Autoridad de Marca' },
      price: '+$300',
      cadence: { en: '/mo — parallel track, not a requirement', es: '/mes — vía paralela, no un requisito' },
      bestFor: {
        en: 'Clients who want long-term market positioning alongside lead flow.',
        es: 'Clientes que quieren posicionamiento de mercado a largo plazo junto al flujo de leads.',
      },
      features: {
        en: [
          'Educational content (LinkedIn + TikTok), 3x/week',
          'Content pillars: education + case studies + tips',
          'Complete Google Business Profile (local SEO)',
          'Integrated referral strategy (client becomes a lead source)',
        ],
        es: [
          'Contenido educativo (LinkedIn + TikTok), 3x/semana',
          'Pilares de contenido: educación + casos de éxito + consejos',
          'Google Business Profile completo (SEO local)',
          'Estrategia de referidos integrada (el cliente se convierte en fuente de leads)',
        ],
      },
    },
  ],
  faqs: [
    {
      question: {
        en: 'What results are guaranteed with the Lead Generation System?',
        es: '¿Qué resultados están garantizados con el Sistema de Generación de Leads?',
      },
      answer: {
        en: 'Astratta guarantees a minimum of 15 qualified leads per month and a cost per lead under $80 by month 3 of the program — this requires the 6-month minimum commitment since paid campaigns and audience data need time to optimize.',
        es: 'Astratta garantiza un mínimo de 15 leads calificados por mes y un costo por lead menor a $80 para el mes 3 del programa — esto requiere el compromiso mínimo de 6 meses ya que las campañas pagadas y los datos de audiencia necesitan tiempo para optimizarse.',
      },
    },
    {
      question: {
        en: 'What happens if I want to close leads faster?',
        es: '¿Qué pasa si quiero cerrar leads más rápido?',
      },
      answer: {
        en: "Add the Sales Accelerator (+$400/month) — it adds a 5-7 email nurture sequence, a CRM setup in Notion, and a weekly consultative call focused specifically on converting warm leads into closed deals, targeting a 20-30% close rate.",
        es: 'Agrega el Acelerador de Ventas (+$400/mes) — agrega una secuencia de nutrición de 5-7 emails, una configuración de CRM en Notion, y una llamada consultiva semanal enfocada específicamente en convertir leads cálidos en negocios cerrados, con una meta de 20-30% de tasa de cierre.',
      },
    },
    {
      question: {
        en: 'Do I need Brand Authority if I already have Lead Generation?',
        es: '¿Necesito Autoridad de Marca si ya tengo Generación de Leads?',
      },
      answer: {
        en: 'No — Brand Authority is a parallel track for long-term positioning (educational content, referral strategy), not a requirement. Clients focused purely on immediate lead volume can run Lead Generation System alone.',
        es: 'No — Autoridad de Marca es una vía paralela para posicionamiento a largo plazo (contenido educativo, estrategia de referidos), no un requisito. Los clientes enfocados puramente en volumen inmediato de leads pueden correr el Sistema de Generación de Leads solo.',
      },
    },
    {
      question: {
        en: 'Can I increase my ad budget without changing plans?',
        es: '¿Puedo aumentar mi presupuesto publicitario sin cambiar de plan?',
      },
      answer: {
        en: 'Yes — the Ads Scaling add-on lets Lead Generation System clients step up from the included $150/month ad budget to $200, $400, or $600+/month tiers as lead volume needs grow, at lower management fees than our standalone Paid Ads service.',
        es: 'Sí — el complemento de Escalamiento de Anuncios permite a los clientes del Sistema de Generación de Leads subir del presupuesto incluido de $150/mes a niveles de $200, $400 o $600+/mes conforme crecen las necesidades de volumen de leads, con cuotas de gestión más bajas que nuestro servicio independiente de Anuncios Pagados.',
      },
    },
  ],
}

/**
 * Pricing validated against 2026 market comparables (Penji, Design Pickle,
 * boutique branding agencies) and Astratta's other service-page tiers.
 * Confirmed by Hisbelis — safe to treat as launch-ready.
 */
export const GRAPHIC_DESIGN_PAGE: ServicePageSource = {
  slug: 'graphic-design',
  number: '/03',
  title: { en: 'Graphic Design', es: 'Diseño Gráfico' },
  metaTitle: {
    en: 'Graphic Design & Brand Identity Pricing — Dallas, TX | Astratta Agency',
    es: 'Precios de Diseño Gráfico e Identidad de Marca — Dallas, TX | Astratta Agency',
  },
  metaDescription: {
    en: 'Logo design, brand identity systems, and ongoing design support for Dallas–Fort Worth small businesses — from a starter logo package to a full monthly design retainer.',
    es: 'Diseño de logo, sistemas de identidad de marca y soporte de diseño continuo para pequeños negocios de Dallas–Fort Worth — desde un paquete inicial de logo hasta una retención mensual de diseño completa.',
  },
  h1: {
    en: 'A visual identity that looks like the market leader, not the newest business on the block.',
    es: 'Una identidad visual que se ve como el líder del mercado, no como el negocio más nuevo de la cuadra.',
  },
  intro: {
    en: "Astratta designs logos, brand systems, and marketing collateral for Dallas businesses across four tiers — from a starter logo package to an ongoing monthly design retainer. Every project includes a usable style guide, not just files, so your team can stay consistent without calling us for every social post.",
    es: 'Astratta diseña logos, sistemas de marca y material de marketing para negocios de Dallas en cuatro planes — desde un paquete inicial de logo hasta una retención mensual de diseño continua. Cada proyecto incluye una guía de estilo utilizable, no solo archivos, para que tu equipo se mantenga consistente sin llamarnos por cada publicación en redes.',
  },
  painHeadline: {
    en: 'Your logo was made in an hour. It shows.',
    es: 'Tu logo se hizo en una hora. Se nota.',
  },
  frustrations: [
    {
      text: {
        en: "Your logo looks fine on a screen and falls apart the moment it's printed on a shirt, banner, or sign.",
        es: 'Tu logo se ve bien en una pantalla y se desarma en el momento en que se imprime en una camisa, lona o letrero.',
      },
    },
    {
      text: {
        en: 'Every piece of marketing material looks like it came from a different company — no consistent colors, no consistent fonts.',
        es: 'Cada pieza de material de marketing parece que viene de una empresa diferente — sin colores consistentes, sin fuentes consistentes.',
      },
    },
    {
      text: {
        en: "You don't have source files, so every small change means paying someone to recreate the whole thing.",
        es: 'No tienes los archivos fuente, así que cada cambio pequeño significa pagarle a alguien para recrear todo de nuevo.',
      },
    },
    {
      text: {
        en: 'You look like a startup that\'s "still figuring it out," even though you\'ve been in business for years.',
        es: 'Te ves como una startup que "todavía lo está descubriendo," aunque llevas años en el negocio.',
      },
    },
  ],
  processSteps: [
    {
      number: '/01',
      title: { en: 'Discovery', es: 'Descubrimiento' },
      description: {
        en: 'We start from what the mark needs to mean — not just what looks nice — so the concept has a reason behind it.',
        es: 'Empezamos desde lo que la marca necesita significar — no solo lo que se ve bonito — para que el concepto tenga una razón detrás.',
      },
    },
    {
      number: '/02',
      title: { en: 'Concept & refine', es: 'Concepto y refinamiento' },
      description: {
        en: 'Multiple logo concepts, narrowed through revision rounds until one direction is clearly right.',
        es: 'Múltiples conceptos de logo, reducidos a través de rondas de revisión hasta que una dirección sea claramente la correcta.',
      },
    },
    {
      number: '/03',
      title: { en: 'Build the system', es: 'Construcción del sistema' },
      description: {
        en: 'Color palette, typography, and usage guidelines — so the identity holds up consistently, not just on the one file we designed it in.',
        es: 'Paleta de colores, tipografía y lineamientos de uso — para que la identidad se mantenga consistente, no solo en el archivo donde la diseñamos.',
      },
    },
    {
      number: '/04',
      title: { en: 'Apply it everywhere', es: 'Aplicación en todas partes' },
      description: {
        en: "The system gets applied across real touchpoints — business cards, apparel, signage — so it's tested against reality, not just a mockup.",
        es: 'El sistema se aplica en puntos de contacto reales — tarjetas de presentación, ropa, señalización — para que se pruebe contra la realidad, no solo un mockup.',
      },
    },
  ],
  proof: {
    caseStudySlug: 'amazons-flooring-branding',
  },
  benefits: {
    en: [
      'Source files (Figma/Adobe) delivered — no calling us every time you need a small edit.',
      'A system that holds up printed at business-card size and banner size alike.',
      'Guidelines your team can actually use, not just a logo file and good luck.',
      'Consistency across every touchpoint — business card, apparel, signage, social — from one system.',
    ],
    es: [
      'Archivos fuente (Figma/Adobe) entregados — sin llamarnos cada vez que necesitas un pequeño ajuste.',
      'Un sistema que se sostiene impreso tanto en tamaño de tarjeta de presentación como en tamaño de lona.',
      'Lineamientos que tu equipo realmente puede usar, no solo un archivo de logo y buena suerte.',
      'Consistencia en cada punto de contacto — tarjeta, ropa, señalización, redes — desde un solo sistema.',
    ],
  },
  tiers: [
    {
      slug: 'brand-starter',
      name: { en: 'Brand Starter', es: 'Brand Starter' },
      price: '$750',
      cadence: { en: 'one-time', es: 'pago único' },
      bestFor: {
        en: 'New businesses that need a professional logo and basic guidelines fast.',
        es: 'Negocios nuevos que necesitan un logo profesional y lineamientos básicos rápido.',
      },
      features: {
        en: [
          'Logo design (2-3 concepts, 2 revision rounds)',
          'Color palette + typography selection',
          'Mini brand guide (1-page PDF)',
          'Social media profile kit (avatar + cover images)',
          'Business card template',
        ],
        es: [
          'Diseño de logo (2-3 conceptos, 2 rondas de revisión)',
          'Selección de paleta de colores + tipografía',
          'Mini guía de marca (PDF de 1 página)',
          'Kit de perfil para redes sociales (avatar + imágenes de portada)',
          'Plantilla de tarjeta de presentación',
        ],
      },
    },
    {
      slug: 'brand-identity-system',
      name: { en: 'Brand Identity System', es: 'Sistema de Identidad de Marca' },
      price: '$1,500',
      cadence: { en: 'one-time', es: 'pago único' },
      recommended: true,
      bestFor: {
        en: 'Businesses ready for a complete, consistent identity across every touchpoint.',
        es: 'Negocios listos para una identidad completa y consistente en cada punto de contacto.',
      },
      features: {
        en: [
          'Everything in Brand Starter',
          'Full brand guideline document (logo usage, color, typography, imagery style)',
          'Marketing collateral templates (social posts, flyer, presentation deck)',
          'Email signature + letterhead',
          '3 rounds of revisions',
          'Source files (Figma/Adobe) delivered',
        ],
        es: [
          'Todo lo de Brand Starter',
          'Documento completo de lineamientos de marca (uso del logo, color, tipografía, estilo de imágenes)',
          'Plantillas de material de marketing (publicaciones en redes, folleto, presentación)',
          'Firma de email + membrete',
          '3 rondas de revisiones',
          'Archivos fuente (Figma/Adobe) entregados',
        ],
      },
    },
    {
      slug: 'brand-collateral-retainer',
      name: { en: 'Brand + Collateral Retainer', es: 'Retención de Marca + Material' },
      price: '$450',
      cadence: { en: 'per month', es: 'por mes' },
      bestFor: {
        en: 'Businesses that need ongoing design support without hiring in-house.',
        es: 'Negocios que necesitan soporte de diseño continuo sin contratar internamente.',
      },
      features: {
        en: [
          'Everything in Brand Identity System (as onboarding)',
          'Up to 5 design requests/month (social graphics, one-pagers, ad creative, signage)',
          '48-hour standard turnaround',
          'Design system maintained and updated as you grow',
        ],
        es: [
          'Todo lo de Sistema de Identidad de Marca (como incorporación)',
          'Hasta 5 solicitudes de diseño/mes (gráficos para redes, one-pagers, creativos de anuncios, señalización)',
          'Entrega estándar de 48 horas',
          'Sistema de diseño mantenido y actualizado conforme creces',
        ],
      },
    },
    {
      slug: 'brand-growth-retainer',
      name: { en: 'Brand Growth Retainer', es: 'Retención de Crecimiento de Marca' },
      price: '$750',
      cadence: { en: 'per month', es: 'por mes' },
      bestFor: {
        en: 'Businesses running multiple active campaigns that need higher volume and faster turnaround.',
        es: 'Negocios corriendo múltiples campañas activas que necesitan mayor volumen y entrega más rápida.',
      },
      features: {
        en: [
          'Everything in Brand + Collateral Retainer',
          'Up to 12 design requests/month',
          '24-hour rush turnaround (vs. 48-hour standard)',
          'Priority WhatsApp/Slack access',
          'Quarterly brand system review + refresh recommendations',
        ],
        es: [
          'Todo lo de Retención de Marca + Material',
          'Hasta 12 solicitudes de diseño/mes',
          'Entrega urgente de 24 horas (vs. 48 horas estándar)',
          'Acceso prioritario por WhatsApp/Slack',
          'Revisión trimestral del sistema de marca + recomendaciones de renovación',
        ],
      },
    },
  ],
  addOns: [
    { name: { en: 'Extra logo concept round', es: 'Ronda extra de conceptos de logo' }, price: '$150' },
    { name: { en: 'Print-ready packaging/signage design', es: 'Diseño de empaque/señalización listo para imprimir' }, price: 'From $300' },
    { name: { en: 'Pitch deck design (up to 15 slides)', es: 'Diseño de presentación (hasta 15 diapositivas)' }, price: '$500' },
  ],
  faqs: [
    {
      question: {
        en: 'Do I own the source files for my logo?',
        es: '¿Soy dueño de los archivos fuente de mi logo?',
      },
      answer: {
        en: 'Yes — source files (Figma or Adobe) are delivered with the Brand Identity System tier and above. The Brand Starter tier includes final exported files (PNG, SVG, PDF) but not editable source files unless added.',
        es: 'Sí — los archivos fuente (Figma o Adobe) se entregan con el plan Sistema de Identidad de Marca en adelante. El plan Brand Starter incluye archivos finales exportados (PNG, SVG, PDF) pero no archivos fuente editables a menos que se agreguen.',
      },
    },
    {
      question: {
        en: 'How is this different from a freelance logo designer?',
        es: '¿En qué se diferencia esto de un diseñador de logos freelance?',
      },
      answer: {
        en: 'A freelancer typically delivers a logo file. Astratta delivers a usable system — guidelines, templates, and color/type rules — so your team (or future designers) can stay consistent without re-briefing every project from scratch.',
        es: 'Un freelancer típicamente entrega un archivo de logo. Astratta entrega un sistema utilizable — lineamientos, plantillas y reglas de color/tipografía — para que tu equipo (o futuros diseñadores) se mantengan consistentes sin tener que explicar cada proyecto desde cero.',
      },
    },
    {
      question: {
        en: 'Can I combine graphic design with a new website?',
        es: '¿Puedo combinar diseño gráfico con un sitio web nuevo?',
      },
      answer: {
        en: 'Yes — branding is often built alongside a Web Development project so the site launches with a finished identity. Ask about bundling during your audit or initial consultation.',
        es: 'Sí — la marca a menudo se construye junto a un proyecto de Desarrollo Web para que el sitio se lance con una identidad terminada. Pregunta sobre combinar servicios durante tu auditoría o consulta inicial.',
      },
    },
    {
      question: {
        en: 'Why pay a retainer instead of hiring an in-house designer?',
        es: '¿Por qué pagar una retención en lugar de contratar un diseñador interno?',
      },
      answer: {
        en: "A full-time junior designer in Dallas costs $3,500-$4,500/month in salary alone, before benefits or software. Astratta's retainer gives you consistent, on-brand design for a fraction of that cost, with no hiring process or ramp-up time.",
        es: 'Un diseñador junior de tiempo completo en Dallas cuesta $3,500-$4,500/mes solo en salario, antes de beneficios o software. La retención de Astratta te da diseño consistente y alineado a tu marca por una fracción de ese costo, sin proceso de contratación ni tiempo de adaptación.',
      },
    },
  ],
}

/**
 * Populated per-page as each service page is built (see working-method rule:
 * never invent prices — tiers/add-ons must come from the client before a
 * page ships).
 */
export const SERVICE_PAGES: ServicePageSource[] = [
  WEB_DEVELOPMENT_PAGE,
  ECOMMERCE_PAGE,
  SOCIAL_MEDIA_PAGE,
  PAID_ADS_PAGE,
  LEAD_GENERATION_PAGE,
  GRAPHIC_DESIGN_PAGE,
]

export function getServicePage(slug: string): ServicePageSource | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug)
}

export function getChildServicePages(parentSlug: string): ServicePageSource[] {
  return SERVICE_PAGES.filter((page) => page.parentSlug === parentSlug)
}
