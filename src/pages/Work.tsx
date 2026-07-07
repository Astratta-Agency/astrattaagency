import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { CASE_STUDIES } from '@/data/caseStudies'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'

export default function Work() {
  return (
    <>
      <Seo
        title="Our Work — Astratta Agency | Web Design Case Studies, Dallas TX"
        description="Case studies from Astratta Agency: high-converting websites, funnels, and digital marketing for Dallas–Fort Worth startups and small businesses."
        path="/work"
      />

      <section className="bg-white pb-16 pt-40 md:pb-24 md:pt-48">
        <Container>
          <SectionLabel>Our Work</SectionLabel>
          <h1 className="mt-5 max-w-3xl font-sans text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <RevealText text="Real projects, real outcomes." animateOnMount />
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
            {CASE_STUDIES.map((project) => (
              <motion.div key={project.slug} variants={scaleIn}>
                <Link to={`/work/${project.slug}`} data-cursor="View" className="group block">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${project.coverGradient}`}
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
              Want to see your project here next?{' '}
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
