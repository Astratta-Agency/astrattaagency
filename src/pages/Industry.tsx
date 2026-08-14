import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { IndustryPath } from '@/components/industries/IndustryPath'
import { IndustryProof } from '@/components/industries/IndustryProof'
import { INDUSTRIES, resolveIndustry } from '@/data/industries'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { INDUSTRY_SLUGS, localizedPath } from '@/lib/i18n/routes'

/** Plantilla de 8 bloques (§5). El bloque 6 cambia de modo según haya caso real o no. */
export default function Industry() {
  const { slug } = useParams<{ slug: string }>()
  const { language, dict } = useLanguage()
  const t = dict.industries

  // El slug de la URL viene localizado; se traduce al id canónico inglés.
  const canonicalSlug = Object.entries(INDUSTRY_SLUGS).find(
    ([, value]) => value[language] === slug,
  )?.[0]
  const source = canonicalSlug ? INDUSTRIES.find((i) => i.slug === canonicalSlug) : undefined

  // Alguien llegó con el slug del otro idioma: se redirige al canónico de este.
  if (!source) {
    const crossLanguage = Object.entries(INDUSTRY_SLUGS).find(
      ([, v]) => v.en === slug || v.es === slug,
    )?.[1]
    if (crossLanguage) {
      return (
        <Navigate to={localizedPath('industryDetail', language, { slug: crossLanguage[language] })} replace />
      )
    }
    return <Navigate to={localizedPath('industries', language)} replace />
  }

  const industry = resolveIndustry(source, language)
  const canonicalPath = `/industries/${source.slug}`

  return (
    <>
      {/* La meta se deriva de los datos de la industria — debe coincidir
          exactamente con lo que genera getAllSeoRoutes, o el prerender falla. */}
      <Seo
        title={{ en: `${source.heading.en} | Astratta`, es: `${source.heading.es} | Astratta` }}
        description={source.subtext}
        path={canonicalPath}
      />

      {/* 1 · HERO */}
      <section className="bg-white pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <Breadcrumbs
            items={[
              { label: t.cardsEyebrow, href: '/industries' },
              { label: t.names[source.slug as keyof typeof t.names], href: canonicalPath },
            ]}
          />
          <h1 className="mt-6 max-w-4xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={industry.heading} animateOnMount />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg text-ink/70 md:text-xl"
          >
            {industry.subtext}
          </motion.p>
        </Container>
      </section>

      {/* 2 · LOS TRES NÚMEROS */}
      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.numbersEyebrow}</SectionLabel>
          </motion.div>
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {industry.numbers.map((number, i) => (
              <motion.li key={i} variants={fadeUp} className="border-t border-ink/15 pt-5">
                <span className="font-sans text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-ink/80">{number}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* 3 · LA RUTA */}
      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.pathEyebrow}</SectionLabel>
          </motion.div>
          <div className="max-w-3xl">
            <IndustryPath steps={industry.path} />
          </div>
        </Container>
      </section>

      {/* 4 · QUÉ SE VE DISTINTO */}
      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.differentEyebrow}</SectionLabel>
            <p className="mt-8 max-w-3xl font-sans text-xl font-bold leading-snug text-ink sm:text-2xl">
              {industry.different}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 5 · PUNTO DE EQUILIBRIO */}
      <section className="bg-neutral/40 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.breakevenEyebrow}</SectionLabel>
            <p className="mt-6 max-w-3xl font-sans text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">
              {industry.breakeven}
            </p>
            {industry.note && <p className="mt-6 max-w-2xl text-ink/60">{industry.note}</p>}
          </motion.div>
        </Container>
      </section>

      {/* 6 · CASO DEL RUBRO — modo case o metrics */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <IndustryProof proof={source.proof} />
        </Container>
      </section>

      {/* 7 · FAQ */}
      <section className="py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.faqEyebrow}</SectionLabel>
          </motion.div>
          <div className="mt-10 max-w-3xl">
            <FaqAccordion items={industry.faq} />
          </div>
        </Container>
      </section>

      {/* 8 · CTA */}
      <section className="dot-pattern relative overflow-hidden border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-8"
          >
            <Link
              to="/diagnostic"
              className="group inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              {t.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link to="/industries" className="font-bold text-ink/50 transition-colors hover:text-primary">
              {t.backToIndustries}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
