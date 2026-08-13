import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { JsonLd } from '@/components/ui/JsonLd'
import { SERVICES } from '@/data/services'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { buildServiceSchema } from '@/lib/schema'
import { SITE } from '@/lib/constants'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Services() {
  const { dict, pick } = useLanguage()
  const t = dict.services

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/services'])} path="/services" />
      <JsonLd
        data={buildServiceSchema({
          name: 'Astratta Agency Services',
          description:
            'Web development, e-commerce, digital marketing, graphic design, and website audits for Dallas–Fort Worth startups and small businesses.',
          url: `https://${SITE.domain}/services`,
        })}
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{t.intro}</p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.slug} variants={scaleIn}>
                <Link
                  to={service.href}
                  className="group relative block overflow-hidden rounded-3xl bg-neutral/40 p-8 transition-colors duration-500 hover:bg-primary md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white/60">
                      {service.number}
                    </span>
                    <span className="rounded-full bg-white px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wide text-ink transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                      {t.priceTeasers[service.slug as keyof typeof t.priceTeasers]}
                    </span>
                  </div>
                  <h2 className="mt-6 font-sans text-2xl font-extrabold tracking-tight text-ink transition-colors duration-500 group-hover:text-white md:text-3xl">
                    {pick(service.title)}
                  </h2>
                  <p className="mt-4 max-w-sm text-base text-ink/60 transition-colors duration-500 group-hover:text-white/80">
                    {pick(service.description)}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-bold text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                    {t.learnMore}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-6 text-sm text-ink/40"
          >
            {t.graphicDesignDisclaimer}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-16 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight">{t.notSureHeading}</h2>
              <p className="mt-2 max-w-md text-ink/60">{t.notSureText}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to="/pricing"
                className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {t.getQuote}
              </Link>
              <Link
                to="/packages"
                className="rounded-full border border-ink/15 px-6 py-3 font-sans text-sm font-bold text-ink transition-colors hover:border-primary hover:text-primary"
              >
                {t.seePackages}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
