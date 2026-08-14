import { motion } from 'framer-motion'
import { Link } from '@/components/ui/Link'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Counter } from '@/components/ui/Counter'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { TESTIMONIALS } from '@/data/testimonials'
import { ABOUT_FAQ_ITEMS } from '@/data/faq'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { buildFaqSchema, buildOrganizationSchema, buildPersonSchema } from '@/lib/schema'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import founderPhoto from '@/assets/founder-hisbelis-vargas.webp'
import resultsIllustration from '@/assets/illustrations/results-hero.webp'

const FOUNDER_ALT = 'Hisbelis Vargas, founder of Astratta Agency, web designer in Dallas–Fort Worth'

/** Structural fields (photo vs. initials) paired by index with `dict.about.team`'s translated name/role/description. */
const TEAM_MEDIA = [{ photo: founderPhoto }, { initials: 'CM' }] as const

export default function About() {
  const { dict, pick } = useLanguage()
  const t = dict.about
  const georgeLopez = TESTIMONIALS.find((testimonial) => testimonial.name === 'George Lopez')
  const faqItems = ABOUT_FAQ_ITEMS.map((item) => ({ question: pick(item.question), answer: pick(item.answer) }))
  const team = t.team.map((member, i) => ({ ...member, ...TEAM_MEDIA[i] }))

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/about'])} path="/about" />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildPersonSchema()} />
      <JsonLd data={buildFaqSchema(faqItems)} />

      {/* SECTION 1 — Hero */}
      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <div className="order-2 lg:order-1">
              <SectionLabel>{t.eyebrow}</SectionLabel>
              <h1 className="mt-5 font-sans text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                <RevealText text={t.heroHeadline1} animateOnMount />
                <br />
                <RevealText text={t.heroHeadline2} animateOnMount delay={0.15} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-6 max-w-[55ch] font-sans text-lg text-ink/70"
              >
                {t.heroBody}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <img
                src={founderPhoto}
                alt={FOUNDER_ALT}
                className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-ink/10"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — Founder story */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.founderEyebrow}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {t.founderHeading}
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div variants={fadeUp} className="flex max-w-[55ch] flex-col gap-6 font-sans text-lg text-ink/70">
                <p>{t.founderP1}</p>
                <p>{t.founderP2}</p>
              </motion.div>

              <motion.blockquote
                variants={fadeUp}
                className="border-l-2 border-secondary pl-6 font-sans text-2xl font-light italic leading-snug text-ink md:text-3xl"
              >
                {t.founderQuote}
              </motion.blockquote>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 3 — The team */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.teamEyebrow}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {t.teamHeading}
            </motion.h2>

            <motion.div
              variants={staggerContainer(0.1)}
              className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="rounded-3xl border border-ink/10 bg-white p-8"
                >
                  {'photo' in member ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-sans text-lg font-extrabold text-primary">
                      {member.initials}
                    </span>
                  )}
                  <h3 className="mt-5 font-sans text-xl font-extrabold tracking-tight text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm font-bold text-ink/50">{member.role}</p>
                  <p className="mt-4 text-base text-ink/60">{member.description}</p>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                className="flex flex-col justify-center rounded-3xl border border-secondary/30 bg-white p-8"
              >
                <span className="h-0.5 w-8 bg-secondary" />
                <p className="mt-5 font-sans text-base text-ink/60">{t.teamGrowingNote}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 4 — Operating principles */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.principlesEyebrow}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {t.principlesHeading}
            </motion.h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="mt-12"
          >
            {t.principles.map((point, i) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-start gap-6 border-b border-ink/10 py-6 first:border-t md:gap-10 md:py-8"
              >
                <span className="font-sans text-sm font-bold text-ink/40 md:text-base">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-sans text-xl text-ink/80 sm:text-2xl md:text-3xl">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* SECTION 5 — Results */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.resultsEyebrow}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                {t.resultsHeading}
              </motion.h2>

              <div className="mt-12 grid grid-cols-3 divide-x divide-ink/10 sm:max-w-xl">
                {t.resultsStats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp} className="px-4 first:pl-0 sm:px-6">
                    <div className="font-sans text-[32px] font-extrabold text-primary sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 font-sans text-xs text-ink/60 sm:text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {georgeLopez && (
                <motion.div variants={fadeUp} className="mt-16 max-w-2xl border-t border-ink/10 pt-12">
                  <p className="font-sans text-2xl font-light leading-snug tracking-tight md:text-3xl">
                    “{pick(georgeLopez.quote)}”
                  </p>
                  <p className="mt-6 font-sans text-base font-bold">{georgeLopez.name}</p>
                  <p className="text-sm text-ink/50">{pick(georgeLopez.role)}</p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-md"
            >
              <img
                src={resultsIllustration}
                alt="Illustration of an analytics dashboard with a rising bar chart and progress indicators"
                className="w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 6 — Who we're for */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.h2
              variants={fadeUp}
              className="max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {t.whoHeading}
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:divide-x sm:divide-ink/10">
              <motion.div variants={fadeUp}>
                <h3 className="font-sans text-lg font-bold text-ink">{t.goodFitHeading}</h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {t.goodFit.map((item) => (
                    <li key={item} className="flex gap-3 font-sans text-base text-ink/70">
                      <span aria-hidden className="text-primary">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="sm:pl-12">
                <h3 className="font-sans text-lg font-bold text-ink/50">{t.notFitHeading}</h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {t.notFit.map((item) => (
                    <li key={item} className="flex gap-3 font-sans text-base text-ink/50">
                      <span aria-hidden>−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="border-t border-ink/10 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.faqEyebrow}</SectionLabel>
              </motion.div>
              <h2 className="mt-5 font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
                <RevealText text={t.faqHeading} />
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <Accordion items={faqItems} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 8 — Closing CTA */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="flex flex-col items-start gap-8"
          >
            <motion.h2
              variants={fadeUp}
              className="max-w-2xl font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              <RevealText text={t.ctaHeading1} />{' '}
              <RevealText text={t.ctaHeading2} className="text-secondary" />
            </motion.h2>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              <Link
                to="/diagnostic"
                className="group relative inline-flex min-h-[52px] items-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white active:scale-[0.97]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 translate-y-full bg-white/10 transition-transform duration-300 ease-out group-hover:translate-y-0"
                />
                <span className="relative z-10 block h-6 overflow-hidden">
                  <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                    <span className="flex h-6 items-center whitespace-nowrap">{t.ctaAudit}</span>
                    <span aria-hidden className="flex h-6 items-center whitespace-nowrap">
                      {t.ctaAudit}
                    </span>
                  </span>
                </span>
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 font-sans text-base font-bold text-white/70 hover:text-white"
              >
                {t.ctaContact}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 font-sans text-sm text-white/40">
              {t.lastUpdatedLabel} {t.lastUpdatedValue}
            </motion.p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
