import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/data/testimonials'
import { EASE, fadeUp, viewportOnce } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(id)
  }, [reducedMotion])

  const active = TESTIMONIALS[index]

  return (
    <section className="border-t border-ink/10 py-24 md:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-14"
        >
          <SectionLabel>What clients say</SectionLabel>
        </motion.div>

        <div className="relative mx-auto max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-sans text-2xl font-light leading-snug tracking-tight md:text-3xl">
                “{active.quote}”
              </p>
              <p className="mt-8 font-sans text-base font-bold">{active.name}</p>
              <p className="text-sm text-ink/50">{active.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name + i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-primary' : 'w-2 bg-ink/20'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
