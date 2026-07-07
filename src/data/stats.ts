export type Stat = {
  value: number
  suffix?: string
  label: string
}

/**
 * PLACEHOLDER VALUES — do not treat as real. Replace with actual figures
 * before launch (see working-method rule: never invent stats, client
 * names, or prices). Values are set to 0 so nothing false ships by accident.
 */
export const STATS: Stat[] = [
  { value: 0, suffix: '+', label: 'Projects launched' },
  { value: 0, suffix: '%', label: 'Avg. load-time improvement' },
  { value: 0, suffix: '%', label: 'Client retention' },
]
