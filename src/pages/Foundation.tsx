import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { PricingTable } from '@/components/ui/PricingTable'
import { AddOnsList } from '@/components/ui/AddOnsList'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { resolveFoundationAddOns, resolveFoundationTiers } from '@/data/foundation'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** Fase 1 de la arquitectura: LA BASE. Copy de docs/CONTENIDO-Web-EN-ES.md §3. */
export default function Foundation() {
  const { language, dict } = useLanguage()
  const t = dict.foundation

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/foundation'])} path="/foundation" />

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
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.tiersEyebrow}</SectionLabel>
          </motion.div>
          <div className="mt-10">
            <PricingTable tiers={resolveFoundationTiers(language)} />
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mx-auto mt-14 max-w-2xl text-center text-lg text-ink/60"
          >
            {t.note}
          </motion.p>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.addOnsEyebrow}</SectionLabel>
            <div className="mt-8 max-w-2xl">
              <AddOnsList items={resolveFoundationAddOns(language)} />
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.faqEyebrow}</SectionLabel>
          </motion.div>
          <div className="mt-10 max-w-3xl">
            <FaqAccordion items={t.faq} />
          </div>
        </Container>
      </section>

      <section className="dot-pattern-light relative overflow-hidden bg-ink py-20 text-white md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <Link
              to="/diagnostic"
              className="group inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              {t.ctaLink}
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
