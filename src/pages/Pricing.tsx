import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PageHero } from '@/components/ui/PageHero'
import { Link } from '@/components/ui/Link'
import pricingImage from '@/assets/pages/pricing.webp'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * Transparencia, no catálogo (§10). Antes vivía aquí el quiz de cotización;
 * ese motor se retiró y su función la cumple ahora el Growth Score.
 */
export default function Pricing() {
  const { dict } = useLanguage()
  const t = dict.pricing

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/pricing'])} path="/pricing" />

      <PageHero heading={t.heading} subtext={t.subtext} image={pricingImage} imageAlt={t.imageAlt} />

      <section className="border-t border-ink/10 py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel as="h2">{t.rangesEyebrow}</SectionLabel>
          </motion.div>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mt-10"
          >
            {t.ranges.map((range) => (
              <motion.div
                key={range.name}
                variants={fadeUp}
                className="grid grid-cols-1 gap-2 border-b border-ink/10 py-6 first:border-t sm:grid-cols-[minmax(0,220px)_minmax(0,240px)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
              >
                <dt className="font-sans text-xl font-extrabold tracking-tight">{range.name}</dt>
                <dd className="font-sans text-xl font-extrabold tracking-tight text-primary">
                  {range.price}
                </dd>
                <dd className="text-ink/60">{range.note}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </Container>
      </section>

      <section className="bg-ink py-20 text-white md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,34%)_minmax(0,1fr)] lg:gap-20">
            <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
              <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                {t.movesEyebrow}
              </p>
            </motion.div>

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="flex flex-col gap-6"
            >
              {t.moves.map((move, i) => (
                <motion.li key={i} variants={fadeUp} className="flex gap-5">
                  <span className="shrink-0 font-sans font-bold text-secondary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg leading-relaxed text-white/75">{move}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
            <SectionLabel>{t.notChargedEyebrow}</SectionLabel>
          </motion.div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mt-8 grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2"
          >
            {t.notCharged.map((item, i) => (
              <motion.li key={i} variants={fadeUp} className="flex gap-4 border-t border-ink/10 pt-4">
                <span aria-hidden="true" className="shrink-0 font-sans font-bold text-secondary">
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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="text-lg text-ink/70">{t.ctaText}</p>
            <Link
              to="/growth-score"
              className="mt-8 inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97]"
            >
              {t.ctaLink}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
