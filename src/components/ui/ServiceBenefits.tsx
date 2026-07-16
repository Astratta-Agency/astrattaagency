import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type ServiceBenefitsProps = {
  benefits: string[]
  title?: string
}

const DEFAULT_TITLE = 'What you actually get.'

/** Outcome-oriented benefit list — lighter version of the About page's numbered PRINCIPLES pattern. */
export function ServiceBenefits({ benefits, title = DEFAULT_TITLE }: ServiceBenefitsProps) {
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
            <SectionLabel>Benefits</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            <RevealText text={title} />
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2"
        >
          {benefits.map((benefit, i) => (
            <motion.li
              key={benefit}
              variants={fadeUp}
              className="flex items-start gap-4 border-b border-ink/10 py-5"
            >
              <span className="font-sans text-sm font-bold text-ink/40">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-sans text-lg text-ink/80 sm:text-xl">{benefit}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
