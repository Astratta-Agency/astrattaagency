import type { Bilingual } from '@/lib/i18n/types'

export const AUDIT_CHECKLIST: { title: Bilingual<string>; description: Bilingual<string> }[] = [
  {
    title: { en: 'Performance', es: 'Rendimiento' },
    description: {
      en: 'Load time, Core Web Vitals, and what slow pages are costing you in lost visitors.',
      es: 'Tiempo de carga, Core Web Vitals, y cuánto te están costando las páginas lentas en visitantes perdidos.',
    },
  },
  {
    title: { en: 'Mobile experience', es: 'Experiencia móvil' },
    description: {
      en: 'How your site actually behaves on a phone — where most of your traffic comes from.',
      es: 'Cómo se comporta realmente tu sitio en un teléfono — de donde viene la mayoría de tu tráfico.',
    },
  },
  {
    title: { en: 'Messaging clarity', es: 'Claridad del mensaje' },
    description: {
      en: 'Whether a first-time visitor understands what you do and why to choose you in 5 seconds.',
      es: 'Si un visitante nuevo entiende qué haces y por qué elegirte en 5 segundos.',
    },
  },
  {
    title: { en: 'Conversion paths', es: 'Rutas de conversión' },
    description: {
      en: 'Where visitors are supposed to take action — and where they get stuck or drop off.',
      es: 'Dónde se supone que los visitantes deben actuar — y dónde se atascan o abandonan.',
    },
  },
  {
    title: { en: 'SEO fundamentals', es: 'Fundamentos de SEO' },
    description: {
      en: 'Technical and on-page basics that determine whether you show up in local search at all.',
      es: 'Fundamentos técnicos y de contenido que determinan si apareces en las búsquedas locales.',
    },
  },
  {
    title: { en: 'Prioritized action plan', es: 'Plan de acción priorizado' },
    description: {
      en: "What's broken, what it's costing you, and the order to fix it in — no vague advice.",
      es: 'Qué está fallando, cuánto te está costando y el orden para corregirlo — sin consejos vagos.',
    },
  },
]

export const AUDIT_STEPS: { number: string; title: Bilingual<string>; description: Bilingual<string> }[] = [
  {
    number: '/01',
    title: { en: 'Request your audit', es: 'Solicita tu auditoría' },
    description: {
      en: 'Tell us about your site and goals using the form below — takes under two minutes.',
      es: 'Cuéntanos sobre tu sitio y objetivos usando el formulario de abajo — toma menos de dos minutos.',
    },
  },
  {
    number: '/02',
    title: { en: 'We review', es: 'Revisamos' },
    description: {
      en: 'We go through performance, UX, messaging, and SEO fundamentals against what converts.',
      es: 'Revisamos rendimiento, UX, mensaje y fundamentos de SEO contra lo que realmente convierte.',
    },
  },
  {
    number: '/03',
    title: { en: 'You get the plan', es: 'Recibes el plan' },
    description: {
      en: "A prioritized, plain-English action plan — what's broken, what it costs you, and how to fix it.",
      es: 'Un plan de acción priorizado y en lenguaje claro — qué está fallando, cuánto te cuesta y cómo arreglarlo.',
    },
  },
]
