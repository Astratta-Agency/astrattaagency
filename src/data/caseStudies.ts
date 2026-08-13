import type { Bilingual, Language } from '@/lib/i18n/types'

import amazonsFlooringWebsite from '@/assets/case-studies/amazons-flooring-website.png'
import perreandoHotdogWebsite from '@/assets/case-studies/perreandohotdog-website.png'
import eventosEnsuenosWebsite from '@/assets/case-studies/eventos-ensuenos-website.png'
import perreandoHotdogSocialMedia from '@/assets/case-studies/perreando-hotdog-social-media.jpg'

import amazonsFlooringHorizontal from '@/assets/case-studies/amazons-flooring/amazons-floorin-horizontal-mockup.jpg'
import amazonsFlooringHorizontal2 from '@/assets/case-studies/amazons-flooring/amazons-floorin-horizontal-mockup-1.jpg'
import amazonsFlooringPortrait from '@/assets/case-studies/amazons-flooring/amazons-floorin-portrait-mockup.jpg'
import amazonsFlooringPortrait2 from '@/assets/case-studies/amazons-flooring/amazons-floorin-portrait-mockup1.jpg'

import perreandoHotdogHorizontal from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-horizontal-mockup.png'
import perreandoHotdogHorizontal2 from '@/assets/case-studies/perreando-hotdog/perreandohotdog-horizontal-mockup-1.png'
import perreandoHotdogPortrait from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-portrait-mockup.png'
import perreandoHotdogPortrait2 from '@/assets/case-studies/perreando-hotdog/perreando-hotdog-portrait-mockup-1.png'

import eventosEnsuenosHorizontal from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-horizontal-mockup.png'
import eventosEnsuenosHorizontal2 from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-horizontal-mockup-1.png'
import eventosEnsuenosPortrait from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-portrait-mockup.png'
import eventosEnsuenosPortrait2 from '@/assets/case-studies/eventos-ensuenos/eventos-ensuenos-portrait-mockup-1.png'

import clover4lifeBanner from '@/assets/case-studies/clover4life/clover4life-banner-mockup.jpg'
import clover4lifeBusinessCard from '@/assets/case-studies/clover4life/clover4life-business-card-mockup.jpg'
import clover4lifeCap from '@/assets/case-studies/clover4life/clover4life-cap-mockup.jpg'
import clover4lifeTote from '@/assets/case-studies/clover4life/clover4life-mockup.jpg'

import amazonsFlooringBrandHero from '@/assets/case-studies/amazons-flooring-branding/amazonsflooring-brand-hero.jpg'
import amazonsFlooringBrandCard from '@/assets/case-studies/amazons-flooring-branding/amazons-flooring-brand-1.jpg'
import amazonsFlooringBrandLogo from '@/assets/case-studies/amazons-flooring-branding/amazonsflooring-brand-2.jpg'
import amazonsFlooringBrandShirts from '@/assets/case-studies/amazons-flooring-branding/amazonsflooring-brand-3.jpg'
import amazonsFlooringBrandCap from '@/assets/case-studies/amazons-flooring-branding/amazonsflooring-brand-4.jpg'

export type CaseStudyStat = {
  value: string
  label: string
}

export type CaseStudyTestimonial = {
  quote: string
  name: string
  role: string
}

export type CaseStudy = {
  slug: string
  title: string
  client: string
  industry: string
  /** primary service line, drives the first tag/badge */
  service: string
  tags: string[]
  date: string
  timeline: string
  technologies: string[]
  summary: string
  challenge: string
  approach: string
  results: string
  stats: CaseStudyStat[]
  testimonial?: CaseStudyTestimonial
  liveUrl?: string
  /** optional per-project breakdown for case studies with multi-platform metrics (e.g. social media campaigns) */
  extraStats?: {
    heading: string
    headline: { value: string; label: string }
    items: { label: string; value: string; change?: string }[]
  }[]
  /** gradient shown behind/instead of `coverImage` — also used as the loading-state background */
  coverGradient: string
  /** real project screenshot; falls back to `coverGradient` alone when absent (e.g. social-media-only engagements with no website to screenshot) */
  coverImage?: string
  /** 4 mockup shots for the bento showcase grid, in slot order: [wide, tall, tall, wide] */
  gallery?: [string, string, string, string]
}

/**
 * Raw bilingual source shapes — mirrors the `PricingTierSource`/`resolveServicePage`
 * pattern in `data/pricing.ts`. `title`/`client` stay plain strings (client/product
 * names — proper nouns, never translated); everything else translatable is
 * `Bilingual<T>`. `resolveCaseStudy()` picks the current language and returns the
 * plain-string `CaseStudy` shape every consumer (ProofSnapshot, ProofGallery,
 * Work.tsx, FeaturedWork.tsx, CaseStudy.tsx) already expects unchanged.
 */
type CaseStudyStatSource = { value: Bilingual<string>; label: Bilingual<string> }
type CaseStudyTestimonialSource = { quote: Bilingual<string>; name: string; role: Bilingual<string> }

type CaseStudySource = {
  slug: string
  title: string
  client: string
  industry: Bilingual<string>
  service: Bilingual<string>
  tags: Bilingual<string[]>
  date: string
  timeline: Bilingual<string>
  technologies: Bilingual<string[]>
  summary: Bilingual<string>
  challenge: Bilingual<string>
  approach: Bilingual<string>
  results: Bilingual<string>
  stats: CaseStudyStatSource[]
  testimonial?: CaseStudyTestimonialSource
  liveUrl?: string
  extraStats?: {
    heading: string
    headline: { value: string; label: Bilingual<string> }
    items: { label: Bilingual<string>; value: string; change?: string }[]
  }[]
  coverGradient: string
  coverImage?: string
  gallery?: [string, string, string, string]
}

export function resolveCaseStudy(source: CaseStudySource, language: Language): CaseStudy {
  return {
    slug: source.slug,
    title: source.title,
    client: source.client,
    industry: source.industry[language],
    service: source.service[language],
    tags: source.tags[language],
    date: source.date,
    timeline: source.timeline[language],
    technologies: source.technologies[language],
    summary: source.summary[language],
    challenge: source.challenge[language],
    approach: source.approach[language],
    results: source.results[language],
    stats: source.stats.map((stat) => ({ value: stat.value[language], label: stat.label[language] })),
    testimonial: source.testimonial && {
      quote: source.testimonial.quote[language],
      name: source.testimonial.name,
      role: source.testimonial.role[language],
    },
    liveUrl: source.liveUrl,
    extraStats: source.extraStats?.map((platform) => ({
      heading: platform.heading,
      headline: { value: platform.headline.value, label: platform.headline.label[language] },
      items: platform.items.map((item) => ({
        label: item.label[language],
        value: item.value,
        change: item.change,
      })),
    })),
    coverGradient: source.coverGradient,
    coverImage: source.coverImage,
    gallery: source.gallery,
  }
}

export function resolveCaseStudies(sources: CaseStudySource[], language: Language): CaseStudy[] {
  return sources.map((source) => resolveCaseStudy(source, language))
}

/**
 * Real projects, extracted from the current live site's portfolio pages.
 * `date` is currently set to '2025' as a reasonable placeholder — the source
 * site didn't expose exact month/year per project; update to the real
 * launch month if known.
 */
export const CASE_STUDIES: CaseStudySource[] = [
  {
    slug: 'amazons-flooring',
    title: "Amazon's Flooring",
    client: "Amazon's Flooring",
    industry: { en: 'Flooring / Home Services', es: 'Pisos / Servicios para el Hogar' },
    service: { en: 'Web Development', es: 'Desarrollo Web' },
    tags: { en: ['Web Development'], es: ['Desarrollo Web'] },
    date: '2025',
    timeline: { en: '3 weeks', es: '3 semanas' },
    technologies: {
      en: ['React', 'Tailwind CSS', 'Mobile-First Design', 'SEO Optimization'],
      es: ['React', 'Tailwind CSS', 'Diseño Mobile-First', 'Optimización SEO'],
    },
    summary: {
      en: 'A trusted Dallas flooring company went from zero digital presence to a website built to generate quote requests.',
      es: 'Una reconocida empresa de pisos de Dallas pasó de cero presencia digital a un sitio web construido para generar solicitudes de cotización.',
    },
    challenge: {
      en: "Amazon's Flooring came to Astratta with no website and no digital foundation. They needed more than something 'nice-looking' — they needed a site that would build instant trust with local Dallas customers, clearly explain their flooring services, and turn visitors into real quote requests. No structure, no funnel, no credibility online.",
      es: "Amazon's Flooring llegó a Astratta sin sitio web y sin ninguna base digital. Necesitaban algo más que un sitio que se viera bien — necesitaban un sitio que generara confianza instantánea con clientes locales de Dallas, explicara claramente sus servicios de pisos, y convirtiera visitantes en solicitudes de cotización reales. Sin estructura, sin embudo, sin credibilidad online.",
    },
    approach: {
      en: 'Astratta designed and developed a high-conversion website from scratch, focused on performance and lead generation: a modern, mobile-first design built for local service businesses, clear service pages that explain flooring options without confusion, strategic calls-to-action to drive quote requests, clean UI, fast loading speeds, and SEO-ready structure. Every section was built with one goal: convert traffic into leads.',
      es: 'Astratta diseñó y desarrolló un sitio web de alta conversión desde cero, enfocado en rendimiento y generación de leads: un diseño moderno, mobile-first, construido para negocios de servicios locales, páginas de servicio claras que explican las opciones de pisos sin confusión, llamadas a la acción estratégicas para impulsar solicitudes de cotización, interfaz limpia, tiempos de carga rápidos y estructura lista para SEO. Cada sección se construyó con un objetivo: convertir tráfico en leads.',
    },
    results: {
      en: "Amazon's Flooring now has a professional online presence that instantly elevates their brand credibility, with easier customer inquiries through a clear, simple contact flow and a scalable foundation ready for SEO, ads, and local growth. The website now works as a sales tool — not just an online placeholder.",
      es: "Amazon's Flooring ahora tiene una presencia online profesional que eleva instantáneamente la credibilidad de su marca, con consultas de clientes más sencillas gracias a un flujo de contacto claro y simple, y una base escalable lista para SEO, anuncios y crecimiento local. El sitio web ahora funciona como una herramienta de ventas — no solo un marcador de posición online.",
    },
    stats: [
      { value: { en: '3 weeks', es: '3 semanas' }, label: { en: 'Timeline', es: 'Cronología' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Mobile-First', es: 'Mobile-First' } },
      { value: { en: 'Fast', es: 'Rápida' }, label: { en: 'Page Speed', es: 'Velocidad de Carga' } },
      { value: { en: 'Yes', es: 'Sí' }, label: { en: 'SEO Ready', es: 'Listo para SEO' } },
    ],
    testimonial: {
      quote: {
        en: 'Working with Astratta was a game-changer. They understood exactly what our startup needed and delivered a website that truly represents our brand. Highly recommend!',
        es: 'Trabajar con Astratta fue un antes y un después. Entendieron exactamente lo que nuestra startup necesitaba y entregaron un sitio web que realmente representa nuestra marca. ¡Muy recomendados!',
      },
      name: 'George Lopez',
      role: { en: "Founder, Amazon's Flooring", es: "Fundador, Amazon's Flooring" },
    },
    coverGradient: 'from-primary to-primary-dark',
    coverImage: amazonsFlooringWebsite,
    gallery: [
      amazonsFlooringHorizontal,
      amazonsFlooringPortrait,
      amazonsFlooringPortrait2,
      amazonsFlooringHorizontal2,
    ],
  },
  {
    slug: 'perreando-hotdog',
    title: 'Perreando HotDog',
    client: 'Perreando HotDog',
    industry: { en: 'Food & Beverage (Hospitality)', es: 'Alimentos y Bebidas (Hostelería)' },
    service: { en: 'Web Development', es: 'Desarrollo Web' },
    tags: { en: ['Web Development'], es: ['Desarrollo Web'] },
    date: '2025',
    timeline: { en: '1 week', es: '1 semana' },
    technologies: {
      en: ['React', 'Tailwind CSS', 'Mobile-First Design', 'SEO Optimization'],
      es: ['React', 'Tailwind CSS', 'Diseño Mobile-First', 'Optimización SEO'],
    },
    summary: {
      en: 'A Venezuelan street-food truck needed a digital home with real brand personality — delivered in one week.',
      es: 'Un food truck de comida callejera venezolana necesitaba un hogar digital con personalidad de marca real — entregado en una semana.',
    },
    challenge: {
      en: "Perreando HotDog is a Venezuelan-style hot dog brand operating as a food truck in Dallas. The challenge wasn't just selling food — it was standing out in a crowded late-night food scene and building a loyal community beyond walk-up customers. They needed a clear digital home for the brand, strong brand personality reflecting their fun Venezuelan identity, and a way to promote hours, location changes, catering, and specials without confusion.",
      es: 'Perreando HotDog es una marca de perros calientes al estilo venezolano que opera como food truck en Dallas. El reto no era solo vender comida — era destacar en una escena de comida nocturna saturada y construir una comunidad leal más allá de los clientes ocasionales. Necesitaban un hogar digital claro para la marca, una personalidad de marca fuerte que reflejara su divertida identidad venezolana, y una forma de promover horarios, cambios de ubicación, catering y promociones sin confusión.',
    },
    approach: {
      en: 'Astratta built a bold, high-energy website that matches the Perreando personality: mobile-first design optimized for late-night, on-the-go users, clear visibility for menu, schedule, location, and catering services, strategic CTAs for catering inquiries and customer engagement, and brand storytelling that connects emotionally with the Venezuelan community.',
      es: 'Astratta construyó un sitio web audaz y lleno de energía que combina con la personalidad de Perreando: diseño mobile-first optimizado para usuarios nocturnos y en movimiento, visibilidad clara del menú, horario, ubicación y servicios de catering, CTAs estratégicos para consultas de catering e interacción con clientes, y narrativa de marca que conecta emocionalmente con la comunidad venezolana.',
    },
    results: {
      en: 'Perreando HotDog evolved from "just a food truck" into a memorable local brand with a clear digital identity that supports growth, community, and sales.',
      es: 'Perreando HotDog evolucionó de "solo un food truck" a una marca local memorable con una identidad digital clara que apoya el crecimiento, la comunidad y las ventas.',
    },
    stats: [
      { value: { en: '1 week', es: '1 semana' }, label: { en: 'Timeline', es: 'Cronología' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Mobile-First', es: 'Mobile-First' } },
      { value: { en: 'Fast', es: 'Rápida' }, label: { en: 'Page Speed', es: 'Velocidad de Carga' } },
      { value: { en: 'Yes', es: 'Sí' }, label: { en: 'SEO Ready', es: 'Listo para SEO' } },
    ],
    testimonial: {
      quote: {
        en: "100% recommended. The best agency. If you really want to boost your brand, don't hesitate to call them.",
        es: '100% recomendado. La mejor agencia. Si de verdad quieres impulsar tu marca, no dudes en llamarlos.',
      },
      name: 'Maria Espina',
      role: { en: 'CEO & Founder, Perreando HotDog', es: 'CEO y Fundadora, Perreando HotDog' },
    },
    coverGradient: 'from-secondary to-primary',
    coverImage: perreandoHotdogWebsite,
    gallery: [
      perreandoHotdogHorizontal,
      perreandoHotdogPortrait,
      perreandoHotdogPortrait2,
      perreandoHotdogHorizontal2,
    ],
  },
  {
    slug: 'perreando-hotdog-social-media',
    title: 'Perreando HotDog — Social Media',
    client: 'Perreando HotDog',
    industry: { en: 'Food & Restaurant', es: 'Alimentos y Restaurantes' },
    service: { en: 'Social Media Management', es: 'Gestión de Redes Sociales' },
    tags: { en: ['Social Media Management'], es: ['Gestión de Redes Sociales'] },
    date: '2025',
    timeline: { en: '90 days (ongoing)', es: '90 días (en curso)' },
    technologies: {
      en: ['TikTok', 'Instagram', 'Facebook', 'Content Strategy', 'Video Production'],
      es: ['TikTok', 'Instagram', 'Facebook', 'Estrategia de Contenido', 'Producción de Video'],
    },
    summary: {
      en: 'Zero online presence to 292K+ views across TikTok, Instagram, and Facebook in 90 days — with $0 ad spend.',
      es: 'De cero presencia online a más de 292K vistas en TikTok, Instagram y Facebook en 90 días — con $0 de inversión publicitaria.',
    },
    challenge: {
      en: 'Perreando HotDog had zero social media presence and no content strategy. As a food truck in the competitive Dallas late-night food scene, they were invisible online. The challenge: build brand awareness from scratch, create engaging content that resonated with the local community, and drive real foot traffic to the truck — all without a significant advertising budget.',
      es: 'Perreando HotDog no tenía presencia en redes sociales ni estrategia de contenido. Como food truck en la competitiva escena de comida nocturna de Dallas, eran invisibles online. El reto: construir reconocimiento de marca desde cero, crear contenido atractivo que resonara con la comunidad local, y generar tráfico real hacia el camión — todo sin un presupuesto publicitario significativo.',
    },
    approach: {
      en: 'Astratta developed a comprehensive social media strategy across TikTok, Instagram, and Facebook — high-energy, culturally relevant video content showcasing the food preparation process, the vibrant Venezuelan identity, and the late-night experience. Each platform received tailored content optimized for its algorithm and audience behavior, focused on organic reach, community engagement, and authentic storytelling that turned viewers into customers.',
      es: 'Astratta desarrolló una estrategia integral de redes sociales en TikTok, Instagram y Facebook — contenido de video lleno de energía y culturalmente relevante que mostraba el proceso de preparación de la comida, la vibrante identidad venezolana y la experiencia nocturna. Cada plataforma recibió contenido adaptado y optimizado para su algoritmo y comportamiento de audiencia, enfocado en alcance orgánico, interacción con la comunidad y narrativa auténtica que convirtió espectadores en clientes.',
    },
    results: {
      en: 'In under 90 days, Perreando HotDog went from zero online presence to a recognized local brand on social media. One video hit 35K+ views in under 24 hours, 100% organically. Customers started visiting the food truck saying they\'d seen them on TikTok — proof that authentic, well-crafted content can outperform paid advertising.',
      es: 'En menos de 90 días, Perreando HotDog pasó de cero presencia online a una marca local reconocida en redes sociales. Un video alcanzó más de 35K vistas en menos de 24 horas, 100% orgánicamente. Los clientes empezaron a visitar el food truck diciendo que los habían visto en TikTok — prueba de que el contenido auténtico y bien elaborado puede superar a la publicidad pagada.',
    },
    stats: [
      { value: { en: '292K', es: '292K' }, label: { en: 'Total Views', es: 'Vistas Totales' } },
      { value: { en: '25K+', es: '25K+' }, label: { en: 'Unique Reach', es: 'Alcance Único' } },
      { value: { en: '+459%', es: '+459%' }, label: { en: 'Shares Growth', es: 'Crecimiento de Compartidos' } },
      { value: { en: '$0', es: '$0' }, label: { en: 'Ad Spend', es: 'Inversión en Anuncios' } },
    ],
    extraStats: [
      {
        heading: 'TikTok',
        headline: {
          value: '187K',
          label: { en: 'Video Views (last 90 days)', es: 'Vistas de Video (últimos 90 días)' },
        },
        items: [
          { label: { en: 'Profile Views', es: 'Vistas de Perfil' }, value: '7,300', change: '+128.9%' },
          { label: { en: 'Shares', es: 'Compartidos' }, value: '1,200', change: '+459%' },
          { label: { en: 'Likes', es: 'Me Gusta' }, value: '4,600', change: '+186%' },
          { label: { en: 'Comments', es: 'Comentarios' }, value: '350', change: '+220%' },
        ],
      },
      {
        heading: 'Instagram',
        headline: {
          value: '91.1K',
          label: { en: 'Impressions (last 90 days)', es: 'Impresiones (últimos 90 días)' },
        },
        items: [
          { label: { en: 'Accounts Reached', es: 'Cuentas Alcanzadas' }, value: '17,100', change: '+68%' },
          { label: { en: 'Organic Reach', es: 'Alcance Orgánico' }, value: '97%' },
          { label: { en: 'Interactions', es: 'Interacciones' }, value: '1,700', change: '+40.9%' },
          { label: { en: 'Followers Growth', es: 'Crecimiento de Seguidores' }, value: '+320' },
        ],
      },
      {
        heading: 'Facebook',
        headline: {
          value: '13.8K',
          label: { en: 'Content Reach (last 90 days)', es: 'Alcance de Contenido (últimos 90 días)' },
        },
        items: [
          { label: { en: 'Unique Viewers', es: 'Espectadores Únicos' }, value: '8,099', change: '+30.5%' },
          { label: { en: '3-sec Video Plays', es: 'Reproducciones de Video (3 seg)' }, value: '2,200', change: '+215%' },
          { label: { en: 'Reactions', es: 'Reacciones' }, value: '680', change: '+45%' },
          { label: { en: 'Page Visits', es: 'Visitas a la Página' }, value: '1,100', change: '+85%' },
        ],
      },
    ],
    testimonial: {
      quote: {
        en: "Before working with Astratta, nobody knew us in Dallas. In less than 3 months, people came to the restaurant telling us they'd seen us on TikTok. That's priceless.",
        es: 'Antes de trabajar con Astratta, nadie nos conocía en Dallas. En menos de 3 meses, la gente llegaba al restaurante diciéndonos que nos habían visto en TikTok. Eso no tiene precio.',
      },
      name: 'Maria Espina',
      role: { en: 'CEO & Founder, Perreando HotDog', es: 'CEO y Fundadora, Perreando HotDog' },
    },
    coverGradient: 'from-ink to-secondary',
    coverImage: perreandoHotdogSocialMedia,
  },
  {
    slug: 'eventos-ensuenos',
    title: 'Eventos Ensueños Panama',
    client: 'Eventos Ensueños Panama',
    industry: { en: 'Events & Experiences', es: 'Eventos y Experiencias' },
    service: { en: 'Web Development', es: 'Desarrollo Web' },
    tags: { en: ['Web Development'], es: ['Desarrollo Web'] },
    date: '2025',
    timeline: { en: '4 weeks', es: '4 semanas' },
    technologies: {
      en: ['Hostinger', 'Tailwind CSS', 'Contentful CMS'],
      es: ['Hostinger', 'Tailwind CSS', 'Contentful CMS'],
    },
    summary: {
      en: 'A Panama-based event planning company turned a static portfolio site into an active lead-generation channel.',
      es: 'Una empresa de planeación de eventos con sede en Panamá convirtió un sitio de portafolio estático en un canal activo de generación de leads.',
    },
    challenge: {
      en: 'The existing website lacked a clear structure and strategic focus. Its content was visually appealing but failed to guide users toward action or communicate the full value of the services offered. Search engine visibility was limited due to weak SEO foundations, and high-intent visitors planning weddings or events were not being effectively captured — the site functioned more as a static portfolio than as a lead-generation platform.',
      es: 'El sitio web existente carecía de una estructura clara y enfoque estratégico. Su contenido era visualmente atractivo pero no lograba guiar a los usuarios hacia la acción ni comunicar el valor completo de los servicios ofrecidos. La visibilidad en buscadores era limitada debido a bases de SEO débiles, y los visitantes de alta intención que planeaban bodas o eventos no estaban siendo capturados efectivamente — el sitio funcionaba más como un portafolio estático que como una plataforma de generación de leads.',
    },
    approach: {
      en: 'Astratta redesigned the website with a conversion-first and SEO-driven approach. The information architecture was rebuilt to prioritize high-value services and user intent, content was rewritten to emphasize outcomes and emotional connection, SEO best practices were implemented across the site, and clear calls-to-action were integrated to guide visitors toward inquiries and consultations.',
      es: 'Astratta rediseñó el sitio web con un enfoque orientado a la conversión y al SEO. La arquitectura de información se reconstruyó para priorizar los servicios de alto valor y la intención del usuario, el contenido se reescribió para enfatizar resultados y conexión emocional, se implementaron las mejores prácticas de SEO en todo el sitio, y se integraron llamadas a la acción claras para guiar a los visitantes hacia consultas y solicitudes.',
    },
    results: {
      en: 'Following launch, Eventos Ensueños achieved a stronger, more professional digital presence. The website became easier to find through search, engagement on service pages increased, and inquiries improved in quality — the platform now operates as an active sales and lead-generation channel rather than a passive online brochure.',
      es: 'Tras el lanzamiento, Eventos Ensueños logró una presencia digital más sólida y profesional. El sitio web se volvió más fácil de encontrar en buscadores, la interacción en las páginas de servicio aumentó, y las consultas mejoraron en calidad — la plataforma ahora opera como un canal activo de ventas y generación de leads en lugar de un folleto online pasivo.',
    },
    stats: [
      { value: { en: '5x', es: '5x' }, label: { en: 'Time on Site', es: 'Tiempo en el Sitio' } },
      { value: { en: '+80%', es: '+80%' }, label: { en: 'Quote Requests', es: 'Solicitudes de Cotización' } },
      { value: { en: '+300%', es: '+300%' }, label: { en: 'Portfolio Views', es: 'Vistas del Portafolio' } },
      { value: { en: '+180%', es: '+180%' }, label: { en: 'Social Followers', es: 'Seguidores en Redes' } },
    ],
    testimonial: {
      quote: {
        en: 'I am so happy I chose Astratta as my web developer — usually you find people who only "do the work," but it\'s rare to find an agency that loves what they do and gives you advice about your niche. I felt they knew more about my business than I expected, and that matters when an agency truly reflects your brand: the details, the passion, the quality in every click. Thank you!',
        es: 'Estoy muy feliz de haber elegido a Astratta como mi desarrolladora web — usualmente encuentras gente que solo "hace el trabajo", pero es raro encontrar una agencia que ama lo que hace y te da consejos sobre tu nicho. Sentí que conocían mi negocio mejor de lo que esperaba, y eso importa cuando una agencia realmente refleja tu marca: los detalles, la pasión, la calidad en cada clic. ¡Gracias!',
      },
      name: 'Victoria Jimenez',
      role: { en: 'Owner, Eventos Ensueños', es: 'Propietaria, Eventos Ensueños' },
    },
    coverGradient: 'from-primary-dark to-ink',
    coverImage: eventosEnsuenosWebsite,
    gallery: [
      eventosEnsuenosHorizontal,
      eventosEnsuenosPortrait,
      eventosEnsuenosPortrait2,
      eventosEnsuenosHorizontal2,
    ],
  },
  {
    slug: 'clover4life',
    title: 'Clover4Life Insurance',
    client: 'Clover4Life Insurance',
    industry: { en: 'Insurance / Financial Services', es: 'Seguros / Servicios Financieros' },
    service: { en: 'Graphic Design', es: 'Diseño Gráfico' },
    tags: { en: ['Graphic Design'], es: ['Diseño Gráfico'] },
    date: '2025',
    timeline: { en: '2 weeks', es: '2 semanas' },
    technologies: {
      en: ['Logo Design', 'Brand Identity', 'Typography', 'Print Design'],
      es: ['Diseño de Logo', 'Identidad de Marca', 'Tipografía', 'Diseño para Impresión'],
    },
    summary: {
      en: 'A Dallas–Fort Worth insurance agent needed a brand that reads as trustworthy on a business card and a trade-show banner alike.',
      es: 'Una agente de seguros de Dallas–Fort Worth necesitaba una marca que se percibiera confiable tanto en una tarjeta de presentación como en una lona de feria comercial.',
    },
    challenge: {
      en: 'Selene Espina was building an independent insurance practice serving the DFW-area Latino community, but had no visual identity — no logo, no colors, no consistent look across the business cards and in-person materials she needed for client meetings and community events. Everything had to work bilingually and hold up printed at business-card size and banner size alike.',
      es: 'Selene Espina estaba construyendo una práctica de seguros independiente que atiende a la comunidad latina del área de DFW, pero no tenía identidad visual — sin logo, sin colores, sin una apariencia consistente en las tarjetas de presentación y materiales presenciales que necesitaba para reuniones con clientes y eventos comunitarios. Todo tenía que funcionar de forma bilingüe y sostenerse impreso tanto en tamaño de tarjeta como en tamaño de lona.',
    },
    approach: {
      en: "Astratta designed a full identity system starting from a mark: a four-leaf clover built from overlapping hearts, pairing the 'luck' of Clover4Life's name with the care at the center of an insurance relationship. A green-to-navy gradient palette carried that same trust-and-growth feel across every touchpoint, paired with an elegant serif for names and headlines against a clean sans for body copy. The system was then applied consistently across a double-sided business card and a retractable banner stand for in-person consultations.",
      es: "Astratta diseñó un sistema de identidad completo a partir de un símbolo: un trébol de cuatro hojas formado por corazones superpuestos, combinando la 'suerte' del nombre Clover4Life con el cuidado que está en el centro de una relación de seguros. Una paleta en degradado de verde a azul marino llevó esa misma sensación de confianza y crecimiento a cada punto de contacto, combinada con una elegante serif para nombres y titulares junto a una sans limpia para el cuerpo de texto. El sistema se aplicó luego de forma consistente en una tarjeta de presentación de doble cara y un banner retráctil para consultas presenciales.",
    },
    results: {
      en: 'Clover4Life launched with a cohesive, print-ready identity — logo, palette, and typography applied consistently from the business card Selene hands out to the banner she sets up at events, giving the practice a professional, trustworthy presence from day one.',
      es: 'Clover4Life se lanzó con una identidad cohesiva y lista para imprimir — logo, paleta y tipografía aplicados consistentemente desde la tarjeta de presentación que Selene entrega hasta el banner que instala en eventos, dando a la práctica una presencia profesional y confiable desde el primer día.',
    },
    stats: [
      { value: { en: '5', es: '5' }, label: { en: 'Brand Deliverables', es: 'Entregables de Marca' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Print-Ready Files', es: 'Archivos Listos para Imprimir' } },
      { value: { en: '3', es: '3' }, label: { en: 'Core Palette Colors', es: 'Colores de Paleta Principal' } },
      { value: { en: 'EN/ES', es: 'EN/ES' }, label: { en: 'Bilingual Ready', es: 'Listo Bilingüe' } },
    ],
    coverGradient: 'from-secondary-dark to-ink',
    coverImage: clover4lifeBanner,
    gallery: [clover4lifeBusinessCard, clover4lifeTote, clover4lifeCap, clover4lifeBanner],
  },
  {
    slug: 'amazons-flooring-branding',
    title: "Amazon's Flooring — Brand Identity",
    client: "Amazon's Flooring",
    industry: { en: 'Flooring / Home Services', es: 'Pisos / Servicios para el Hogar' },
    service: { en: 'Graphic Design', es: 'Diseño Gráfico' },
    tags: { en: ['Graphic Design'], es: ['Diseño Gráfico'] },
    date: '2025',
    timeline: { en: '2 weeks', es: '2 semanas' },
    technologies: {
      en: ['Logo Design', 'Brand Identity', 'Typography', 'Print & Apparel Design'],
      es: ['Diseño de Logo', 'Identidad de Marca', 'Tipografía', 'Diseño para Impresión y Ropa'],
    },
    summary: {
      en: 'A Dallas flooring company needed a visual identity as sharp as the website Astratta had already built them.',
      es: 'Una empresa de pisos de Dallas necesitaba una identidad visual tan sólida como el sitio web que Astratta ya les había construido.',
    },
    challenge: {
      en: "Amazon's Flooring had a new website but no matching visual identity — no logo, no defined color system, nothing to put on a business card, a work shirt, or a job-site sign. The brand needed to read as an established, professional flooring company at a glance, both online and in person with customers and crews.",
      es: "Amazon's Flooring tenía un sitio web nuevo pero ninguna identidad visual que combinara — sin logo, sin sistema de color definido, nada para poner en una tarjeta de presentación, una camisa de trabajo o un letrero de obra. La marca necesitaba percibirse como una empresa de pisos establecida y profesional a primera vista, tanto online como en persona con clientes y equipos de trabajo.",
    },
    approach: {
      en: "Astratta designed a wordmark built around a custom 'AF' monogram — angled bars that double as footsteps, a direct nod to flooring installed underfoot — in a blue-to-green gradient that carries the same trust-and-growth feel as the website. That mark was paired with the tagline 'Where Every Step Counts' and rolled out consistently across a business card and branded apparel (t-shirts and caps), so the crew and the company look consistent everywhere the brand shows up.",
      es: "Astratta diseñó un logotipo construido alrededor de un monograma personalizado 'AF' — barras en ángulo que también representan pasos, una referencia directa a los pisos instalados bajo los pies — en un degradado de azul a verde que lleva la misma sensación de confianza y crecimiento que el sitio web. Ese símbolo se combinó con el eslogan 'Where Every Step Counts' y se aplicó consistentemente en una tarjeta de presentación y ropa de marca (camisetas y gorras), para que el equipo y la empresa se vean consistentes en cada lugar donde aparece la marca.",
    },
    results: {
      en: "Amazon's Flooring now has a complete, print-ready identity system that matches the professionalism of their website — one consistent logo, color palette, and tagline applied across business cards and branded apparel, from the job site to the front door.",
      es: "Amazon's Flooring ahora tiene un sistema de identidad completo y listo para imprimir que combina con el profesionalismo de su sitio web — un logo, paleta de color y eslogan consistentes aplicados en tarjetas de presentación y ropa de marca, desde la obra hasta la puerta principal.",
    },
    stats: [
      { value: { en: '5', es: '5' }, label: { en: 'Brand Deliverables', es: 'Entregables de Marca' } },
      { value: { en: '100%', es: '100%' }, label: { en: 'Print-Ready Files', es: 'Archivos Listos para Imprimir' } },
      { value: { en: '2', es: '2' }, label: { en: 'Core Brand Colors', es: 'Colores de Marca Principal' } },
      { value: { en: '2 weeks', es: '2 semanas' }, label: { en: 'Timeline', es: 'Cronología' } },
    ],
    coverGradient: 'from-ink to-primary',
    coverImage: amazonsFlooringBrandHero,
    gallery: [
      amazonsFlooringBrandCard,
      amazonsFlooringBrandLogo,
      amazonsFlooringBrandCap,
      amazonsFlooringBrandShirts,
    ],
  },
]
