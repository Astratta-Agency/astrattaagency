import { Link } from '@/components/ui/Link'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { CASE_STUDIES, resolveCaseStudies } from '@/data/caseStudies'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { STATIC_SEO, toSeoProps } from '@/lib/seo-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Work() {
  const { dict, language } = useLanguage()
  const t = dict.work
  const caseStudies = resolveCaseStudies(CASE_STUDIES, language)

  return (
    <>
      <Seo {...toSeoProps(STATIC_SEO['/work'])} path="/work" />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>{t.eyebrow}</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text={t.heading} animateOnMount />
          </h1>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-10 md:grid-cols-2"
          >
            {caseStudies.map((project) => (
              <motion.div key={project.slug} variants={scaleIn}>
                <Link to={`/work/${project.slug}`} data-cursor="View" className="group block">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${project.coverGradient}`}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                      {project.coverImage && (
                        <img
                          src={project.coverImage}
                          alt={`${project.title} website screenshot`}
                          className="h-full w-full object-cover object-top"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-md text-ink/60">{project.summary}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-20 max-w-2xl border-t border-ink/10 pt-10"
          >
            <p className="text-ink/60">
              {t.ctaText}{' '}
              <Link to="/diagnostic" className="group font-bold text-primary">
                {t.ctaLink}{' '}
                <span className="inline-block transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-secondary">
                  →
                </span>
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
