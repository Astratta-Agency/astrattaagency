import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import type { PricingTier } from '@/data/pricing'

const GRID_COLS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

/** Responsive comparison table: side-by-side columns on desktop, stacked cards on mobile. */
export function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  const gridColsClass = GRID_COLS[tiers.length] ?? 'md:grid-cols-3'

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(0.1)}
      className={clsx('grid grid-cols-1 items-start gap-6', gridColsClass)}
    >
      {tiers.map((tier) => (
        <motion.div
          key={tier.slug}
          variants={fadeUp}
          className={clsx(
            'relative flex h-full flex-col rounded-3xl p-8',
            tier.recommended
              ? 'z-10 border border-transparent bg-white shadow-2xl shadow-primary/20 md:-my-4 md:scale-105'
              : 'border border-ink/10 bg-white',
          )}
        >
          {tier.recommended && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-white">
              ⭐ Most popular in Dallas
            </span>
          )}

          <h3 className="font-sans text-xl font-extrabold tracking-tight">{tier.name}</h3>

          <div className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-ink">
            {tier.price}
          </div>
          {tier.cadence && <p className="mt-1 text-sm text-ink/50">{tier.cadence}</p>}

          <p className="mt-4 text-sm text-ink/70">{tier.bestFor}</p>

          <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-ink/10 pt-6">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-ink/80">
                <span className="mt-0.5 shrink-0 text-primary">✦</span>
                {feature}
              </li>
            ))}
            {tier.notIncluded?.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-ink/35 line-through">
                <span className="mt-0.5 shrink-0">—</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* TODO: point to /pricing once the quote page exists; /audit is the current highest-intent CTA */}
          <MagneticButton
            as={Link}
            to="/audit"
            className={clsx(
              'mt-8 rounded-full px-6 py-3 text-center font-sans text-sm font-bold transition-colors',
              tier.recommended
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-ink text-white hover:bg-primary',
            )}
          >
            Get this plan →
          </MagneticButton>
        </motion.div>
      ))}
    </motion.div>
  )
}
