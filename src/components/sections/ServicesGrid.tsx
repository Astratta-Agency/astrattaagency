import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { SERVICES } from '@/data/services'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'

export function ServicesGrid() {
  return (
    <section className="bg-neutral/40 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mb-16 max-w-3xl md:mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Our Services</SectionLabel>
          </motion.div>
          <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text="Built to convert, not just to look good." />
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.slug} variants={scaleIn}>
              <Link
                to={service.href}
                className="group relative block overflow-hidden rounded-3xl bg-white p-8 transition-colors duration-500 hover:bg-primary md:p-10"
              >
                <span className="font-sans text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white/60">
                  {service.number}
                </span>
                <h3 className="mt-4 font-sans text-2xl font-extrabold tracking-tight text-ink transition-colors duration-500 group-hover:text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-sm text-base text-ink/60 transition-colors duration-500 group-hover:text-white/80">
                  {service.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-bold text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
