import type { AddOn } from '@/data/pricing'

/** Simple name/price list for optional add-ons, shown at the bottom of a pricing page. */
export function AddOnsList({ items }: { items: AddOn[] }) {
  return (
    <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {items.map((item) => (
        <li key={item.name} className="flex items-center justify-between gap-6 py-5">
          <span className="font-sans text-base text-ink/80 md:text-lg">{item.name}</span>
          <span className="shrink-0 font-sans text-base font-bold text-ink md:text-lg">
            {item.price}
          </span>
        </li>
      ))}
    </ul>
  )
}
