import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { CASE_STUDIES } from '@/data/caseStudies'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'

export function FeaturedWork() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Featured Work</SectionLabel>
            </motion.div>
            <h2 className="mt-5 max-w-2xl font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <RevealText text="Real projects, real outcomes." />
            </h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 font-sans text-base font-bold text-ink"
            >
              View all work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {CASE_STUDIES.map((project) => (
            <motion.div key={project.slug} variants={scaleIn}>
              <Link
                to={`/work/${project.slug}`}
                data-cursor="View"
                className="group block"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${project.coverGradient}`}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
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
                <h3 className="mt-3 font-sans text-xl font-extrabold tracking-tight">
                  {project.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
