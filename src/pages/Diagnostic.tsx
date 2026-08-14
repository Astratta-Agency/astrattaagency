import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import diagnosticImage from '@/assets/pages/diagnostic.webp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/ui/ContactForm'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * La única puerta de entrada del sitio. Todo CTA del sitio termina aquí.
 * Copy íntegro de docs/CONTENIDO-Web-EN-ES.md §6.
 */
export default function Diagnostic() {
  const { dict } = useLanguage()
  const t = dict.diagnostic

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/diagnostic'])} path="/diagnostic" />

      <PageHero
        heading={t.heading}
        subtext={t.subtext}
        image={diagnosticImage}
        imageAlt={t.imageAlt}
      >
        <a
          href="#start"
          className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t.cta}
        </a>
      </PageHero>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.includedEyebrow}</SectionLabel>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.06)}
            className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.included.map((item, i) => (
              <motion.li key={i} variants={fadeUp} className="flex gap-4 border-t border-ink/10 pt-5">
                <span className="shrink-0 font-sans text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-ink/80">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      <section className="bg-ink py-20 text-white md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-16"
          >
            <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              {t.guaranteeEyebrow}
            </p>
            <p className="font-sans text-2xl font-bold leading-snug sm:text-3xl">{t.guarantee}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.faqEyebrow}</SectionLabel>
          </motion.div>
          <div className="mt-10 max-w-3xl">
            <FaqAccordion items={t.faq.map((f) => ({ question: f.question, answer: f.answer }))} />
          </div>
        </Container>
      </section>

      <section id="start" className="dot-pattern relative overflow-hidden bg-neutral/40 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <SectionLabel>{t.requestEyebrow}</SectionLabel>
              <h2 className="mt-5 font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                <RevealText text={t.cta} />
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <ContactForm submitLabel={t.submitLabel} source="diagnostic-page" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
