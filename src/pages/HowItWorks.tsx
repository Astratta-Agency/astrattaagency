import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import howItWorksImage from '@/assets/pages/how-it-works.webp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/components/ui/Link'
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

      <PageHero
        heading={t.heading}
        subtext={t.subtext}
        image={howItWorksImage}
        imageAlt={t.imageAlt}
      >
        <Link
          to="/diagnostic"
          className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t.cta}
        </Link>
      </PageHero>

      {/* Por qué cambiamos — la pieza de confianza: admitir el error abre la historia. */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.09)}
            className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,40%)_minmax(0,1fr)] lg:gap-20"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary"
              >
                {t.whyEyebrow}
              </motion.p>
              {/* La admisión de apertura es el momento de confianza de la página:
                  se queda sola, a tamaño de display, en su propia columna. */}
              <motion.p
                variants={fadeUp}
                className="mt-6 font-sans text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
              >
                {t.why[0]}
              </motion.p>
            </div>

            <div className="flex flex-col gap-6 lg:pt-14">
              {t.why.slice(1).map((paragraph, i) => (
                <motion.p key={i} variants={fadeUp} className="text-lg leading-relaxed text-white/70">
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel as="h2">{t.stepsEyebrow}</SectionLabel>
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
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,34%)_minmax(0,1fr)] lg:gap-20">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <SectionLabel>{t.notEyebrow}</SectionLabel>
              <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.notTitle}
              </h2>
            </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="flex flex-col"
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
          </div>
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
