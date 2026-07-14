import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Counter } from '@/components/ui/Counter'
import { STATS } from '@/data/stats'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import founderPhotoSm from '@/assets/founder-hisbelis-vargas-sm.webp'

const FOUNDER_ALT = 'Hisbelis Vargas, founder of Astratta Agency, web designer in Dallas–Fort Worth'

/**
 * Authority section: the About claim and the stats that back it up live in
 * one card now (copy on top on mobile, side-by-side on desktop) instead of
 * two independent full-width blocks — the stats read as supporting proof
 * for the claim, not a separate section.
 */
export function AboutStats() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-ink/10 bg-neutral/30 p-8 md:flex-row md:items-center md:gap-12 md:p-12"
        >
          <div className="md:max-w-sm md:shrink-0">
            <motion.div variants={fadeUp}>
              <SectionLabel>About Astratta</SectionLabel>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="shrink-0">
                <img
                  src={founderPhotoSm}
                  alt={FOUNDER_ALT}
                  className="aspect-[4/5] w-24 rounded-2xl object-cover ring-1 ring-ink/10"
                />
                <p className="mt-2 max-w-24 text-[11px] font-bold leading-tight text-ink/50">
                  Hisbelis Vargas — Founder, Astratta Agency
                </p>
              </div>
              <p className="font-sans text-2xl font-light leading-snug tracking-tight md:text-3xl">
                Astratta is a boutique studio — senior-level work, zero agency bloat. You work
                directly with the person building your project.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-primary"
              >
                Learn more about us →
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-8 border-t border-ink/10 pt-8 sm:gap-10 md:flex-1 md:flex-nowrap md:justify-between md:border-l md:border-t-0 md:pl-12 md:pt-0">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="min-w-28">
                <div className="font-sans text-3xl font-extrabold text-primary md:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 max-w-40 text-xs text-ink/60 md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
