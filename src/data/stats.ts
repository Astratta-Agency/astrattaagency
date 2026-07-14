export type Stat = {
  value: number
  suffix?: string
  label: string
}

/** Confirmed real figures — animated by the Counter component in AboutStats. */
export const STATS: Stat[] = [
  { value: 292, suffix: 'K+', label: 'Organic views generated' },
  { value: 87, suffix: '%', label: 'Avg. load-time improvement' },
  { value: 97, suffix: '%', label: 'Client retention' },
]
