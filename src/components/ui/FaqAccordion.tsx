import { Accordion } from '@/components/ui/Accordion'
import type { FaqItem } from '@/data/pricing'

/** Thin wrapper around `Accordion` typed for `FaqItem[]` — same shape, kept separate for a clearer name on service/pricing pages. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return <Accordion items={items} />
}
