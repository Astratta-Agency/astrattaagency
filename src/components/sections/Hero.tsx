import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { RevealText } from '@/components/ui/RevealText'
import { Marquee } from '@/components/ui/Marquee'
import { EASE } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { CASE_STUDIES } from '@/data/caseStudies'
import amazonsMockup1 from '@/assets/case-studies/hero-marquee/amazons-1.jpg'
import amazonsMockup2 from '@/assets/case-studies/hero-marquee/amazons-2.jpg'
import perreandoMockup1 from '@/assets/case-studies/hero-marquee/perreando-1.jpg'
import perreandoMockup2 from '@/assets/case-studies/hero-marquee/perreando-2.jpg'

const TICKER_ITEMS = ['Web Development', 'Digital Marketing', 'Graphic Design', 'Website Audits']

const PILLS = ['web development', 'digital marketing', 'graphic design']

/** Proof visual in the hero — the flashiest, most citable result on file. */
const PROOF_PROJECT = CASE_STUDIES.find((p) => p.slug === 'perreando-hotdog')

const CLIENT_LOGOS = [
  { name: "Amazon's Flooring", hoverClass: 'hover:text-primary' },
  { name: 'Perreando HotDog', hoverClass: 'hover:text-secondary' },
  { name: 'Eventos Ensueños', hoverClass: 'hover:text-ink' },
]

type MediaCard =
  | { type: 'image'; src: string; alt: string }
  | { type: 'gradient'; label: string; gradient: string }

const MEDIA_COLUMNS: { cards: MediaCard[]; duration: number; reverse: boolean; offset?: string }[] = [
  {
    duration: 25,
    reverse: false,
    cards: [
      { type: 'image', src: amazonsMockup1, alt: "Amazon's Flooring website mockup" },
      { type: 'gradient', label: 'Web Development', gradient: 'from-primary to-primary-dark' },
      { type: 'image', src: perreandoMockup1, alt: 'Perreando HotDog website mockup' },
      { type: 'gradient', label: 'Brand Identity', gradient: 'from-ink to-primary-dark' },
    ],
  },
  {
    duration: 35,
    reverse: true,
    offset: 'mt-12',
    cards: [
      { type: 'gradient', label: 'Digital Marketing', gradient: 'from-secondary to-secondary-dark' },
      { type: 'image', src: amazonsMockup2, alt: "Amazon's Flooring mobile mockup" },
      { type: 'gradient', label: 'SEO & Growth', gradient: 'from-primary-dark to-ink' },
      { type: 'image', src: perreandoMockup2, alt: 'Perreando HotDog mobile mockup' },
    ],
  },
  {
    duration: 28,
    reverse: false,
    cards: [
      { type: 'gradient', label: 'Graphic Design', gradient: 'from-ink to-secondary-dark' },
      { type: 'gradient', label: 'Lead Generation', gradient: 'from-secondary to-primary' },
      { type: 'gradient', label: 'Website Audits', gradient: 'from-primary to-secondary' },
      { type: 'gradient', label: 'Conversion Design', gradient: 'from-primary-dark to-secondary-dark' },
    ],
  },
]

function MediaCardEl({ card }: { card: MediaCard }) {
  if (card.type === 'image') {
    return (
      <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:scale-[1.03]">
        <img
          src={card.src}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'flex aspect-[9/16] w-full items-end overflow-hidden rounded-2xl bg-gradient-to-br p-4 transition-transform duration-300 ease-out hover:scale-[1.03]',
        card.gradient,
      )}
    >
      <span className="font-sans text-sm font-bold leading-tight text-white/90">{card.label}</span>
    </div>
  )
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const riseY = reducedMotion ? 0 : 16

  return (
    <section aria-label="hero" className="relative overflow-hidden bg-neutral pt-24 md:pt-28">
      {/* Ticker bar */}
      <div className="relative z-10 border-y border-ink/10 py-3">
        <Marquee duration={30}>
          {TICKER_ITEMS.map((item) => (
            <span
              key={item}
              className="mx-4 flex shrink-0 items-center gap-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink/70"
            >
              {item}
              <span aria-hidden className="text-secondary">
                •
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main hero grid */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 md:px-10 lg:min-h-svh lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-10 lg:py-0">
        {/* Left column */}
        <div className="relative z-10">
          <h1 className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-ink">
            <RevealText text="Websites that turn traffic into" animateOnMount blur delay={0.1} />{' '}
            <RevealText
              text="clients."
              animateOnMount
              blur
              className="text-primary"
              delay={0.45}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: riseY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="mt-7 flex flex-col items-start gap-2.5"
          >
            {PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-ink/20 px-4 py-1.5 text-sm lowercase text-ink/70"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {PROOF_PROJECT && (
            <motion.div
              initial={{ opacity: 0, y: riseY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.0 }}
              className="mt-6"
            >
              <Link
                to="/work"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-colors duration-200 hover:border-ink/25"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  New project!
                </span>
                <span className="text-sm font-semibold text-ink">{PROOF_PROJECT.title}</span>
                <span
                  aria-hidden
                  className="text-ink/50 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: riseY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.15 }}
            className="mt-6 max-w-[46ch] text-[17px] font-normal leading-relaxed text-[#444]"
          >
            Astratta builds high-converting websites and marketing systems for Dallas–Fort Worth
            businesses — designed to generate leads, not just look good.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: riseY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
            className="mt-9"
          >
            <Link
              to="/audit"
              className="group relative inline-flex min-h-[52px] items-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white active:scale-[0.97]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-0 translate-y-full bg-ink transition-transform duration-300 ease-out group-hover:translate-y-0"
              />
              <span className="relative z-10 block h-6 overflow-hidden">
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                  <span className="flex h-6 items-center whitespace-nowrap">Book a free audit</span>
                  <span aria-hidden className="flex h-6 items-center whitespace-nowrap">
                    Book a free audit
                  </span>
                </span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right column: vertical media marquee (desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
          className="relative hidden h-[75svh] max-h-[760px] min-h-[520px] lg:block"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="grid h-full grid-cols-3 gap-4">
            {MEDIA_COLUMNS.map((col, i) => (
              <Marquee
                key={i}
                orientation="vertical"
                duration={col.duration}
                reverse={col.reverse}
                className={col.offset}
              >
                <div className="flex flex-col gap-4 py-2">
                  {col.cards.map((card, j) => (
                    <MediaCardEl key={j} card={card} />
                  ))}
                </div>
              </Marquee>
            ))}
          </div>
        </motion.div>

        {/* Media row (mobile / tablet) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.35 }}
          className="lg:hidden"
        >
          <Marquee duration={20}>
            <div className="flex gap-4 py-2">
              {MEDIA_COLUMNS.flatMap((col) => col.cards).map((card, j) => (
                <div key={j} className="w-[38vw] max-w-[160px] shrink-0">
                  <MediaCardEl card={card} />
                </div>
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>

      {/* Logo strip */}
      <div className="relative z-10 border-t border-ink/10 py-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="shrink-0 text-sm font-semibold text-ink/60">
            Trusted by DFW startups and small businesses
          </p>
          <div className="w-full overflow-hidden md:max-w-xl">
            <Marquee duration={18}>
              {CLIENT_LOGOS.map((logo) => (
                <span
                  key={logo.name}
                  className={clsx(
                    'mx-8 shrink-0 whitespace-nowrap font-sans text-xl font-extrabold uppercase tracking-tight text-ink/40 opacity-60 grayscale transition-[color,filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0',
                    logo.hoverClass,
                  )}
                >
                  {logo.name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}
