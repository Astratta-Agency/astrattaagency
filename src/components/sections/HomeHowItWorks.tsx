import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * Reemplaza el bloque "OUR SERVICES" del home (§8). Los tres pasos salen del
 * mismo namespace que /how-it-works, así que el home y la página no pueden
 * contradecirse.
 */
export function HomeHowItWorks() {
  const { dict } = useLanguage()
  const t = dict.home.howItWorksBlock
  const steps = dict.howItWorks.steps

  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel as="h2">{t.eyebrow}</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <RevealText text={t.heading} />
          </h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.li key={step.number} variants={fadeUp} className="border-t border-ink/15 pt-6">
              <span className="font-sans text-sm font-bold text-primary">{step.number}</span>
              <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">{step.title}</h3>
              <p className="mt-1 font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                {step.duration}
              </p>
              <p className="mt-4 text-ink/70">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-12"
        >
          <Link to="/how-it-works" className="group inline-flex items-center gap-2 font-bold text-primary">
            {t.link}
            <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
