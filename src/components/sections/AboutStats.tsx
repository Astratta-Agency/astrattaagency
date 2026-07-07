import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Counter } from '@/components/ui/Counter'
import { STATS } from '@/data/stats'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export function AboutStats() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>About Astratta</SectionLabel>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg font-sans text-2xl font-light leading-snug tracking-tight md:text-3xl"
            >
              Astratta is a boutique studio — senior-level work, zero agency bloat. You work
              directly with the person building your project.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:gap-6"
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="font-sans text-5xl font-extrabold text-primary md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-ink/60 md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
