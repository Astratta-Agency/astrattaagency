import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Counter } from '@/components/ui/Counter'
import { STATS } from '@/data/stats'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import founderPhoto from '@/assets/founder-hisbelis-vargas.webp'

const FOUNDER_ALT = 'Hisbelis Vargas, founder of Astratta Agency, web designer in Dallas–Fort Worth'

/**
 * Authority section: asymmetric two-column layout — large founder portrait
 * on the left, the About claim, proof stats, and a conversion CTA on the
 * right. Full-width (no floating card) so the copy gets real breathing room
 * instead of being squeezed into a narrow card column.
 */
export function AboutStats() {
  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-start md:gap-16"
        >
          {/* Left column — founder portrait */}
          <motion.div variants={fadeUp}>
            <img
              src={founderPhoto}
              alt={FOUNDER_ALT}
              className="aspect-[4/5] w-full rounded-2xl object-cover md:min-w-[380px]"
            />
            <div className="mt-6">
              <span className="block h-0.5 w-10 bg-secondary" />
              <p className="mt-3 font-sans text-xs font-light uppercase tracking-[0.1em] text-ink/60">
                Hisbelis Vargas — Founder
              </p>
            </div>
          </motion.div>

          {/* Right column — claim, proof, CTA */}
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>About Astratta</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              <RevealText text="A founder-led studio. Zero agency bloat." />
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 max-w-[55ch] font-sans text-lg text-ink/70">
              Astratta is a boutique studio in Dallas–Fort Worth. Founder-led on every project —
              no account managers, no handoffs to juniors. Senior-level strategy and execution at
              a fraction of big-agency overhead.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 divide-x divide-ink/10 sm:max-w-md"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <div className="font-sans text-[32px] font-extrabold text-primary sm:text-[40px]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 font-sans text-xs text-ink/60 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-stretch gap-6 sm:flex-row sm:items-center"
            >
              <Link
                to="/audit"
                className="group relative inline-flex min-h-[52px] items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white active:scale-[0.97]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 translate-y-full bg-ink transition-transform duration-300 ease-out group-hover:translate-y-0"
                />
                <span className="relative z-10 block h-6 overflow-hidden">
                  <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                    <span className="flex h-6 items-center justify-center whitespace-nowrap">
                      Book a free audit
                    </span>
                    <span aria-hidden className="flex h-6 items-center justify-center whitespace-nowrap">
                      Book a free audit
                    </span>
                  </span>
                </span>
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 font-sans text-sm font-bold text-primary"
              >
                More about the studio
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
