import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { CASE_STUDIES } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { CASE_STUDY_SEO_DESCRIPTIONS } from '@/lib/seo-data'

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = CASE_STUDIES.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  return (
    <>
      <Seo
        title={`${project.title} — Astratta Agency Case Study`}
        description={CASE_STUDY_SEO_DESCRIPTIONS[project.slug] ?? project.summary}
        path={`/work/${project.slug}`}
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/work" className="font-sans text-sm font-bold text-ink/50 hover:text-primary">
              ← All work
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-bold text-primary hover:text-primary-dark"
              >
                Visit live site →
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 font-sans text-sm text-ink/50">{project.industry}</p>

          <h1 className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={project.title} animateOnMount />
          </h1>
        </Container>
      </section>

      <div className={`aspect-[16/7] w-full overflow-hidden bg-gradient-to-br ${project.coverGradient}`}>
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={`${project.title} website screenshot`}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {project.stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="font-sans text-3xl font-extrabold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-1 font-sans text-xs font-bold uppercase tracking-wide text-ink/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-12 md:grid-cols-3"
          >
            {[
              { title: 'Challenge', copy: project.challenge },
              { title: 'Approach', copy: project.approach },
              { title: 'Results', copy: project.results },
            ].map((block) => (
              <motion.div key={block.title} variants={fadeUp}>
                <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-primary">
                  {block.title}
                </h2>
                <p className="mt-4 text-lg text-ink/70">{block.copy}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.06)}
            className="mt-14 flex flex-wrap gap-2 border-t border-ink/10 pt-10"
          >
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeUp}
                className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/50"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </Container>
      </section>

      {project.gallery && (
        <section className="pb-16 md:pb-20">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[320px] lg:auto-rows-[400px]"
            >
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  variants={fadeUp}
                  className={`overflow-hidden rounded-3xl bg-neutral/40 ${
                    i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} mockup ${i + 1}`}
                    className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${
                      i === 0 || i === 3 ? 'aspect-video md:aspect-auto' : 'aspect-[4/5] md:aspect-auto'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {project.extraStats && (
        <section className="bg-neutral/40 py-24 md:py-32">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mb-12 max-w-2xl"
            >
              <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
                Platform breakdown.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {project.extraStats.map((platform) => (
                <motion.div
                  key={platform.heading}
                  variants={fadeUp}
                  className="rounded-3xl border border-ink/10 bg-white p-8"
                >
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {platform.heading}
                  </span>
                  <div className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-ink">
                    {platform.headline.value}
                  </div>
                  <p className="mt-1 text-sm text-ink/50">{platform.headline.label}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
                    {platform.items.map((item) => (
                      <div key={item.label}>
                        <p className="text-xs uppercase tracking-wide text-ink/40">{item.label}</p>
                        <p className="mt-1 font-sans text-lg font-extrabold text-ink">
                          {item.value}
                          {item.change && (
                            <span
                              className={`ml-2 text-sm font-bold ${
                                item.change.startsWith('+') ? 'text-primary' : 'text-ink/40'
                              }`}
                            >
                              {item.change}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {project.testimonial && (
        <section className="py-24 md:py-32">
          <Container>
            <motion.blockquote
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mx-auto max-w-3xl"
            >
              <span className="font-sans text-6xl font-extrabold leading-none text-primary/20">
                “
              </span>
              <p className="-mt-6 font-sans text-2xl font-light leading-snug tracking-tight text-ink md:text-3xl">
                {project.testimonial.quote}
              </p>
              <cite className="mt-8 block not-italic">
                <span className="font-sans text-base font-bold text-ink">
                  {project.testimonial.name}
                </span>
                <span className="ml-2 text-sm text-ink/50">{project.testimonial.role}</span>
              </cite>
            </motion.blockquote>
          </Container>
        </section>
      )}

      <section className="pb-24 md:pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="border-t border-ink/10 pt-10"
          >
            <p className="text-ink/60">
              Want outcomes like this?{' '}
              <Link to="/audit" className="group font-bold text-primary">
                Get a free website audit{' '}
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
