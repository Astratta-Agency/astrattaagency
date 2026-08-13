import type { Bilingual } from '@/lib/i18n/types'

export type ProcessStep = {
  number: string
  title: Bilingual<string>
  description: Bilingual<string>
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '/01',
    title: { en: 'Diagnose', es: 'Diagnóstico' },
    description: {
      en: 'We audit your current site and strategy — traffic, conversion points, and what a visitor actually experiences before they leave.',
      es: 'Auditamos tu sitio y estrategia actuales — tráfico, puntos de conversión y lo que realmente experimenta un visitante antes de irse.',
    },
  },
  {
    number: '/02',
    title: { en: 'Design', es: 'Diseño' },
    description: {
      en: 'Conversion-first UX: every layout, headline, and CTA placement is a decision, not a default.',
      es: 'UX enfocada en conversión: cada diseño, titular y ubicación de llamada a la acción es una decisión, no algo por defecto.',
    },
  },
  {
    number: '/03',
    title: { en: 'Build', es: 'Desarrollo' },
    description: {
      en: 'Fast, SEO-ready code — no bloated page builders slowing down your load time.',
      es: 'Código rápido y listo para SEO — sin constructores de páginas pesados que ralenticen tu tiempo de carga.',
    },
  },
  {
    number: '/04',
    title: { en: 'Launch & Grow', es: 'Lanzamiento y Crecimiento' },
    description: {
      en: 'We measure what happens after launch, then iterate and scale what works.',
      es: 'Medimos lo que pasa después del lanzamiento, luego iteramos y escalamos lo que funciona.',
    },
  },
]
