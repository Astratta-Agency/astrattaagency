import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const PAIN_POINTS = [
  "You've got traffic, but nobody's leaving their info or buying.",
  "Your site looks like it's from 2015 — or loads so slow people leave before they see it.",
  "You post on social, but it's not producing a single qualified lead.",
  "You switch up your marketing every month because the last thing 'didn't work.'",
]

/**
 * Sits directly after the hero: names the visitor's problem before the
 * services section pitches the fix. Same numbered-row treatment used
 * elsewhere on the page (see Process), just without the link affordance —
 * these are statements, not destinations.
 */
export function PainPoints() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Sound familiar?</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text="Most businesses don't have an effort problem. They have a system problem." />
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-16 md:mt-20"
        >
          {PAIN_POINTS.map((point, i) => (
            <motion.li
              key={point}
              variants={fadeUp}
              className="flex items-start gap-6 border-b border-ink/10 py-6 first:border-t md:gap-10 md:py-8"
            >
              <span className="font-sans text-sm font-bold text-ink/40 md:text-base">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-sans text-xl text-ink/80 sm:text-2xl md:text-3xl">
                {point}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-14 flex flex-col items-start justify-between gap-6 md:mt-16 md:flex-row md:items-center"
        >
          <p className="max-w-xl font-sans text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            This doesn't get fixed with more ads. It gets fixed with a system that converts.
          </p>
          <motion.span
            aria-hidden="true"
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="shrink-0 font-sans text-3xl text-primary md:text-4xl"
          >
            ↓
          </motion.span>
        </motion.div>
      </Container>
    </section>
  )
}
