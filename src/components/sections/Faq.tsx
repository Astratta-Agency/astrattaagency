import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Accordion } from '@/components/ui/Accordion'
import { FAQ_ITEMS } from '@/data/faq'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export function Faq() {
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
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
              <RevealText text="Questions, answered." />
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <Accordion items={FAQ_ITEMS} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
