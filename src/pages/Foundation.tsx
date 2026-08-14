import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import foundationImage from '@/assets/pages/foundation.webp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/components/ui/Link'
import { PricingTable } from '@/components/ui/PricingTable'
import { AddOnsList } from '@/components/ui/AddOnsList'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { Process } from '@/components/sections/Process'
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

      <PageHero heading={t.heading} subtext={t.subtext} image={foundationImage} imageAlt={t.imageAlt} />

      <section className="py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel as="h2">{t.tiersEyebrow}</SectionLabel>
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

      <Process />

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
