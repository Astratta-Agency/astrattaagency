import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SITE } from '@/lib/constants'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/**
 * Página legal: texto largo para leer, no para escanear. Sin animaciones de
 * scroll por sección — solo el hero entra, el resto aparece ya en su sitio.
 */
export default function Privacy() {
  const { dict } = useLanguage()
  const t = dict.privacy

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/privacy-policy'])} path="/privacy-policy" />

      <section className="bg-white pb-12 pt-40 md:pb-16 md:pt-48">
        <Container>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl"
          >
            {t.heading}
          </motion.h1>
          <p className="mt-6 font-sans text-sm font-bold uppercase tracking-wide text-ink/40">
            {t.lastUpdatedLabel}: {t.lastUpdated}
          </p>
          <p className="mt-8 max-w-2xl text-lg text-ink/70">{t.intro}</p>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-16 md:py-20">
        <Container>
          <div className="flex max-w-2xl flex-col gap-12">
            {t.sections.map((section, index) => (
              <article key={section.heading}>
                <h2 className="font-sans text-2xl font-bold tracking-tight text-ink">
                  <span className="mr-3 text-primary">{String(index + 1).padStart(2, '0')}</span>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-ink/70">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-ink/70 marker:text-primary">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            <article className="border-t border-ink/10 pt-12">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-ink">{t.contactHeading}</h2>
              <p className="mt-4 leading-relaxed text-ink/70">{t.contactText}</p>
              <p className="mt-3 leading-relaxed text-ink/70">
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-bold text-ink transition-colors hover:text-primary"
                >
                  {SITE.email}
                </a>
                <br />
                {SITE.name} · {SITE.location}
              </p>
            </article>
          </div>
        </Container>
      </section>
    </>
  )
}
