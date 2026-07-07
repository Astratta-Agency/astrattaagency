import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { RevealText } from '@/components/ui/RevealText'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { EASE } from '@/lib/animations'

const TICKER_ITEMS = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'Website Audits',
]

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-white pt-32">
      <GradientBlob />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-10">
        <h1 className="max-w-5xl font-sans text-[13vw] leading-[0.95] tracking-tight sm:text-[10vw] md:text-[7.5vw]">
          <RevealText text="Websites that" animateOnMount className="font-light" delay={0.1} />
          <br />
          <RevealText
            text="actually convert."
            animateOnMount
            className="font-extrabold text-primary"
            delay={0.4}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg text-ink/70 md:text-xl"
        >
          Astratta is a Dallas–Fort Worth studio building high-converting websites, funnels, and
          campaigns for startups and small businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <MagneticButton
            as={Link}
            to="/audit"
            className="rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white shadow-[0_20px_40px_-15px_rgba(81,64,242,0.6)] transition-colors hover:bg-primary-dark"
          >
            Get your free website audit
          </MagneticButton>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-sans text-base font-bold text-ink"
          >
            See our work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-ink/10 bg-white/70 py-5 backdrop-blur-sm">
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
      </div>
    </section>
  )
}
