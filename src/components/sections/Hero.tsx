import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { RevealText } from '@/components/ui/RevealText'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { EASE } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { CASE_STUDIES } from '@/data/caseStudies'
import perreandoHotdogResponsive from '@/assets/case-studies/perreandohotdog-website-responsive-view.png'

const TICKER_ITEMS = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'Website Audits',
]

/** Proof visual in the hero's right column — the flashiest, most citable result on file. */
const PROOF_PROJECT = CASE_STUDIES.find((p) => p.slug === 'perreando-hotdog')

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
  visual: 1.3,
  ticker: 1.5,
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const riseY = reducedMotion ? 0 : 20

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-white pt-32">
      <GradientBlob />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-10">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[1fr_300px] lg:gap-12 xl:gap-16">
          <div>
            <h1 className="max-w-5xl font-sans text-[13vw] leading-[0.95] tracking-tight sm:text-[10vw] md:text-[7.5vw] lg:text-[6.5vw]">
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
              Astratta is a Dallas–Fort Worth studio building high-converting websites, funnels,
              and campaigns for startups and small businesses.
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
                <span className="transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {PROOF_PROJECT && (
            <motion.div
              initial={{ opacity: 0, y: riseY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: CASCADE.visual }}
              className="hidden lg:block"
            >
              <Link
                to={`/work/${PROOF_PROJECT.slug}`}
                data-cursor="View"
                className="group relative mx-auto block w-[280px]"
              >
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className={`relative aspect-[9/16] w-full -rotate-3 overflow-hidden rounded-[2.5rem] border-4 border-white bg-gradient-to-br shadow-2xl shadow-ink/20 transition-transform duration-300 ease-out group-hover:-rotate-1 ${PROOF_PROJECT.coverGradient}`}
                >
                  <img
                    src={perreandoHotdogResponsive}
                    alt={`${PROOF_PROJECT.title} mobile website screenshot`}
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>

                <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rotate-2 whitespace-nowrap rounded-full bg-secondary px-5 py-2.5 text-center shadow-lg shadow-secondary/40">
                  <p className="font-sans text-sm font-extrabold leading-tight text-white">
                    292K+ views in 90 days
                  </p>
                  <p className="font-sans text-xs font-semibold leading-tight text-white/85">
                    $0 ad spend
                  </p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
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
