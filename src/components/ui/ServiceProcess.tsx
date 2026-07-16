import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import type { ProcessStep } from '@/data/pricing'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type ServiceProcessProps = {
  steps: ProcessStep[]
  title?: string
  intro?: string
}

const DEFAULT_TITLE = 'How we do it.'

/** Reuses the homepage Process section's visual pattern; column count adapts to 3 vs 4 steps. */
export function ServiceProcess({ steps, title = DEFAULT_TITLE, intro }: ServiceProcessProps) {
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mb-16 max-w-2xl md:mb-24"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Process</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={title} />
          </h2>
          {intro && (
            <motion.p variants={fadeUp} className="mt-6 max-w-[55ch] text-white/60">
              {intro}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className={clsx(
            'grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-6',
            steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
          )}
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUp} className="border-t border-white/15 pt-6">
              <span className="font-sans text-sm font-bold text-secondary">{step.number}</span>
              <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
