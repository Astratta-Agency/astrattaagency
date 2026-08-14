import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Link } from '@/components/ui/Link'
import { SITE, SOCIALS } from '@/lib/constants'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * Simplificada según §11.5. Fuera del nav principal, accesible desde el footer.
 * Sin formulario: el sitio ya tiene dos entradas mejores (Growth Score y
 * diagnóstico) y un tercer formulario solo reparte la intención.
 */
export default function Contact() {
  const { dict } = useLanguage()
  const t = dict.contact

  const details = [
    { label: t.emailLabel, value: SITE.email, href: `mailto:${SITE.email}` },
    { label: t.locationLabel, value: t.location },
    { label: t.founderLabel, value: t.founderNote },
  ]

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/contact'])} path="/contact" />

      <section className="bg-white pb-16 pt-40 md:pb-20 md:pt-48">
        <Container>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg text-ink/70"
          >
            {t.subtext}
          </motion.p>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-16 md:py-20">
        <Container>
          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {details.map((detail) => (
              <motion.div key={detail.label} variants={fadeUp}>
                <dt className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
                  {detail.label}
                </dt>
                <dd className="mt-3 text-lg text-ink/80">
                  {detail.href ? (
                    <a href={detail.href} className="font-bold text-ink transition-colors hover:text-primary">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-6"
          >
            <span className="font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
              {t.followLabel}
            </span>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ink/70 transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="dot-pattern-light relative overflow-hidden bg-ink py-20 text-white md:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="text-lg text-white/70">{t.closingText}</p>
            <Link
              to="/growth-score"
              className="mt-8 inline-flex items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97]"
            >
              {t.closingCta}
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
