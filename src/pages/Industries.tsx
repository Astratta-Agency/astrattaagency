import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { INDUSTRIES } from '@/data/industries'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** Índice del conector. Copy de docs/CONTENIDO-Web-EN-ES.md §11.1. */
export default function Industries() {
  const { pick, dict } = useLanguage()
  const t = dict.industries

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/industries'])} path="/industries" />

      <section className="relative overflow-hidden bg-white pb-16 pt-40 md:pb-20 md:pt-48">
        <GradientBlob />
        <Container className="relative z-10">
          <h1 className="max-w-4xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-3xl text-lg text-ink/70 md:text-xl"
          >
            {t.subtext}
          </motion.p>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {INDUSTRIES.map((industry) => (
              <motion.div key={industry.slug} variants={scaleIn}>
                <Link
                  to={`/industries/${industry.slug}`}
                  data-cursor="Open"
                  className="group flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink/10 p-8 transition-colors duration-200 hover:border-primary/40 md:p-10"
                >
                  <div>
                    <h2 className="font-sans text-2xl font-extrabold tracking-tight transition-colors duration-200 group-hover:text-primary">
                      {t.names[industry.slug as keyof typeof t.names]}
                    </h2>
                    <p className="mt-4 text-lg text-ink/70">{pick(industry.card)}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-sans text-2xl text-ink/30 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-14 max-w-2xl text-lg text-ink/60"
          >
            {t.closing}
          </motion.p>
        </Container>
      </section>

      <section className="dot-pattern-light relative overflow-hidden bg-ink py-20 text-white md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.cardsEyebrow}</SectionLabel>
            <Link
              to="/diagnostic"
              className="group mt-5 inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-tight sm:text-3xl"
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
