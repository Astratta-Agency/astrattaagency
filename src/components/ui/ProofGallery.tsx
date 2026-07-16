import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CASE_STUDIES } from '@/data/caseStudies'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type ProofGalleryProps = {
  caseStudySlug: string
  title?: string
}

const DEFAULT_TITLE = 'More work like this.'

/** Lightweight secondary case-study teaser — 2-3 real gallery images linking to the full case study. */
export function ProofGallery({ caseStudySlug, title = DEFAULT_TITLE }: ProofGalleryProps) {
  const caseStudy = CASE_STUDIES.find((c) => c.slug === caseStudySlug)
  if (!caseStudy?.gallery) return null

  const images = caseStudy.gallery.slice(0, 3)

  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>More Work</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-2xl font-sans text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {title}
          </motion.h2>

          <motion.div
            variants={staggerContainer(0.08)}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {images.map((src, i) => (
              <motion.div key={src} variants={fadeUp}>
                <Link
                  to={`/work/${caseStudySlug}`}
                  className="group block overflow-hidden rounded-2xl"
                >
                  <img
                    src={src}
                    alt={`${caseStudy.title} deliverable ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <Link
              to={`/work/${caseStudySlug}`}
              className="group inline-flex items-center gap-2 font-sans text-base font-bold text-primary"
            >
              See the {caseStudy.title} case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
