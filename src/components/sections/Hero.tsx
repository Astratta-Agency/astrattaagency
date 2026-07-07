import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { RevealText } from '@/components/ui/RevealText'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { EASE } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const TICKER_ITEMS = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'Website Audits',
]

/**
 * One cascading load sequence, slow and deliberate (this is the hero — the
 * one moment on the site that earns a marketing-grade duration instead of a
 * snappy UI timing). Each beat starts just before the previous one settles.
 */
const CASCADE = {
  line1: 0.1,
  line2: 0.5,
  subline: 1.0,
  cta: 1.15,
  ticker: 1.35,
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const riseY = reducedMotion ? 0 : 20

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-white pt-32">
      <GradientBlob />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-10">
        <h1 className="max-w-5xl font-sans text-[13vw] leading-[0.95] tracking-tight sm:text-[10vw] md:text-[7.5vw]">
          <RevealText
            text="Websites that"
            animateOnMount
            blur
            className="font-light"
            delay={CASCADE.line1}
          />
          <br />
          <RevealText
            text="actually convert."
            animateOnMount
            blur
            className="font-extrabold text-primary"
            delay={CASCADE.line2}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: riseY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: CASCADE.subline }}
          className="mt-8 max-w-xl text-lg text-ink/70 md:text-xl"
        >
          Astratta is a Dallas–Fort Worth studio building high-converting websites, funnels, and
          campaigns for startups and small businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: riseY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: CASCADE.cta }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <MagneticButton
            as={Link}
            to="/audit"
            className="rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white shadow-[0_20px_40px_-15px_rgba(81,64,242,0.6)] transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97]"
          >
            Get your free website audit
          </MagneticButton>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-sans text-base font-bold text-ink transition-transform duration-150 active:scale-[0.97]"
          >
            See our work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: CASCADE.ticker }}
        className="relative z-10 border-t border-ink/10 bg-white/70 py-5 backdrop-blur-sm"
      >
        <Marquee duration={22}>
          {TICKER_ITEMS.map((item) => (
            <span
              key={item}
              className="mx-4 shrink-0 font-sans text-lg font-bold uppercase tracking-wide text-ink/80 md:text-2xl"
            >
              {item} <span className="text-secondary">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}
