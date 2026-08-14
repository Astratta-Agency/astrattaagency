/**
 * Proceso de entrega de un proyecto Foundation. Vivía en el home, pero un
 * proceso de entrega pertenece a la página del producto que se entrega.
 */
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROCESS_STEPS } from '@/data/process'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Process() {
  const { dict, pick } = useLanguage()
  const t = dict.foundation

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
            <SectionLabel as="h2">{t.processEyebrow}</SectionLabel>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="border-t border-white/15 pt-6"
            >
              <span className="font-sans text-sm font-bold text-secondary">{step.number}</span>
              <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                {pick(step.title)}
              </h3>
              <p className="mt-3 text-white/60">{pick(step.description)}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
