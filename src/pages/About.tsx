import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Counter } from '@/components/ui/Counter'
import { STATS } from '@/data/stats'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO } from '@/lib/seo-data'
import founderPhoto from '@/assets/founder-hisbelis-vargas.webp'

const FOUNDER_ALT = 'Hisbelis Vargas, founder of Astratta Agency, web designer in Dallas–Fort Worth'

export default function About() {
  return (
    <>
      <Seo {...STATIC_SEO['/about']} path="/about" />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>About Astratta</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text="Agency-level quality, small-business-friendly prices." animateOnMount />
          </h1>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:items-start md:gap-14"
          >
            <motion.div variants={fadeUp} className="mx-auto w-full max-w-[280px] md:mx-0">
              <img
                src={founderPhoto}
                alt={FOUNDER_ALT}
                className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-ink/10"
              />
              <p className="mt-3 font-sans text-sm font-bold text-ink/60">
                Hisbelis Vargas — Founder, Astratta Agency
              </p>
            </motion.div>

            <div className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xl font-light leading-relaxed text-ink/80 md:text-2xl">
                Astratta is a boutique studio — senior-level work, zero agency bloat. You work
                directly with the person building your project, not an account manager relaying
                requests to someone else.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-ink/60">
                We're based in Dallas–Fort Worth, TX, and remote-first — built for startups and
                small/mid businesses across industrial, retail, and service industries who need
                conversion-focused websites and marketing without paying big-agency overhead.
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="border-y border-ink/10 py-16 md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-10 sm:grid-cols-3"
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
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-xl"
          >
            <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              How we work with you
            </h2>
            <p className="mt-5 text-ink/60">
              Every engagement starts with a free website audit so we're solving the right
              problem — not just redesigning for the sake of it. From there, you get a direct
              line to whoever is building your project, start to finish.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 font-sans text-base font-bold text-primary"
              >
                Get your free website audit →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-sans text-base font-bold text-ink/60 hover:text-primary"
              >
                Prefer to talk it through? Contact us →
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
