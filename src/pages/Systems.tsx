import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import systemsImage from '@/assets/pages/systems.webp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/components/ui/Link'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { SystemsMatrix } from '@/components/ui/SystemsMatrix'
import {
  resolveInsideBlocks,
  resolveMatrix,
  resolveSystemLevels,
  resolveSystemsFaq,
} from '@/data/systems'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/** Fase 2 de la arquitectura: EL MOTOR. Copy de docs/CONTENIDO-Web-EN-ES.md §4. */
export default function Systems() {
  const { language, dict } = useLanguage()
  const t = dict.systems

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/systems'])} path="/systems" />

      <PageHero
        heading={t.heading}
        subtext={t.subtext}
        image={systemsImage}
        imageAlt={t.imageAlt}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/diagnostic"
            className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t.ctaPrimary}
          </Link>
          <a
            href="#levels"
            className="group inline-flex items-center gap-2 rounded-full px-2 py-2 font-sans text-base font-bold text-ink/70 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t.ctaSecondary}
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel as="h2">{t.insideEyebrow}</SectionLabel>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2"
          >
            {resolveInsideBlocks(language).map((block, i) => (
              <motion.div key={block.title} variants={fadeUp} className="border-t border-ink/10 pt-6">
                <span className="font-sans text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                  {block.title}
                </h2>
                <p className="mt-3 text-ink/70">{block.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="levels" className="scroll-mt-32 border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.matrixEyebrow}</SectionLabel>
          </motion.div>

          <div className="mt-10">
            <SystemsMatrix levels={resolveSystemLevels(language)} rows={resolveMatrix(language)} />
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-10 max-w-2xl text-ink/60"
          >
            {t.matrixNote}
          </motion.p>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.faqEyebrow}</SectionLabel>
          </motion.div>
          <div className="mt-10 max-w-3xl">
            <FaqAccordion items={resolveSystemsFaq(language)} />
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
              {t.ctaPrimary}
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
