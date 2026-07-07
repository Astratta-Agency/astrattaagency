import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/ui/ContactForm'
import { fadeUp, viewportOnce } from '@/lib/animations'

export function FinalCta() {
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
            <RevealText text="Let's find out why your site isn't converting." />
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <ContactForm submitLabel="Request my audit" source="home-final-cta" dark />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
