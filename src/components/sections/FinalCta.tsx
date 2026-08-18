import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/ui/ContactForm'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { buildLanguageNote } from '@/lib/leadSummary'

export function FinalCta() {
  const { dict, language } = useLanguage()
  const t = dict.home.finalCta

  return (
    <section id="contact" className="dot-pattern-light relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <RevealText text={t.heading1} />{' '}
            <RevealText text={t.heading2} className="text-secondary" />
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <ContactForm
              submitLabel={t.submitLabel}
              source="home-final-cta"
              metadata={buildLanguageNote(language)}
              dark
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
