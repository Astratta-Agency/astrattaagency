import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** La historia completa: Diagnóstico → Base → Motor. Copy de docs/CONTENIDO-Web-EN-ES.md §2. */
export default function HowItWorks() {
  const { dict } = useLanguage()
  const t = dict.howItWorks

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/how-it-works'])} path="/how-it-works" />

      <section className="relative overflow-hidden bg-white pb-20 pt-40 md:pb-24 md:pt-48">
        <GradientBlob />
        <Container className="relative z-10">
          <h1 className="max-w-4xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg text-ink/70 md:text-xl"
          >
            {t.subtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10"
          >
            <Link
              to="/diagnostic"
              className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              {t.cta}
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Por qué cambiamos — la pieza de confianza: admitir el error abre la historia. */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              {t.whyEyebrow}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.09)}
            className="mt-10 flex max-w-2xl flex-col gap-6"
          >
            {t.why.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={
                  i === 0
                    ? 'font-sans text-2xl font-bold leading-snug sm:text-3xl'
                    : 'text-lg leading-relaxed text-white/70'
                }
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.stepsEyebrow}</SectionLabel>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10"
          >
            {t.steps.map((step) => (
              <motion.li key={step.number} variants={fadeUp} className="border-t border-ink/15 pt-6">
                <span className="font-sans text-sm font-bold text-primary">{step.number}</span>
                <h2 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-1 font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                  {step.duration}
                </p>
                <p className="mt-4 text-ink/70">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* Lo que no hacemos — los límites son parte de la oferta, no letra pequeña. */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.notEyebrow}</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.notTitle}
            </h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mt-10 flex max-w-3xl flex-col"
          >
            {t.notItems.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex gap-5 border-b border-ink/10 py-5 first:border-t"
              >
                <span aria-hidden="true" className="mt-1 shrink-0 font-sans font-bold text-secondary">
                  ✕
                </span>
                <span className="text-ink/75">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      <section className="dot-pattern-light relative overflow-hidden bg-neutral/40 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <Link
              to="/diagnostic"
              className="group inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              {t.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
