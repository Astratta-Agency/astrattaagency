import type { Bilingual } from '@/lib/i18n/types'

export type Stat = {
  value: number
  suffix?: string
  label: Bilingual<string>
}

/** Confirmed real figures — animated by the Counter component in AboutStats. */
export const STATS: Stat[] = [
  { value: 292, suffix: 'K+', label: { en: 'Organic views generated', es: 'Vistas orgánicas generadas' } },
  { value: 87, suffix: '%', label: { en: 'Avg. load-time improvement', es: 'Mejora prom. en tiempo de carga' } },
  { value: 97, suffix: '%', label: { en: 'Client retention', es: 'Retención de clientes' } },
]
