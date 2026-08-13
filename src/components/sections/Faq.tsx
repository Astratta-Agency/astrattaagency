import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Accordion } from '@/components/ui/Accordion'
import { FAQ_ITEMS } from '@/data/faq'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Faq() {
  const { dict, pick } = useLanguage()
  const t = dict.home.faq
  const items = FAQ_ITEMS.map((item) => ({ question: pick(item.question), answer: pick(item.answer) }))

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.eyebrow}</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
              <RevealText text={t.heading} />
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <Accordion items={items} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
