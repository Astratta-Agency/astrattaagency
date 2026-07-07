import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { CASE_STUDIES } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = CASE_STUDIES.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  return (
    <>
      <Seo
        title={`${project.title} — Astratta Agency Case Study`}
        description={project.summary}
        path={`/work/${project.slug}`}
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <Link to="/work" className="font-sans text-sm font-bold text-ink/50 hover:text-primary">
            ← All work
          </Link>
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
          <h1 className="mt-5 max-w-3xl font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <RevealText text={project.title} animateOnMount />
          </h1>
        </Container>
      </section>

      <div className={`aspect-[16/7] w-full bg-gradient-to-br ${project.coverGradient}`} />

      <section className="py-24 md:py-32">
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
            variants={fadeUp}
            className="mt-24 border-t border-ink/10 pt-10"
          >
            <p className="text-ink/60">
              Want outcomes like this?{' '}
              <Link to="/audit" className="font-bold text-primary">
                Get a free website audit →
              </Link>
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
