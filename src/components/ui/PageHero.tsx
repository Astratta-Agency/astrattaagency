import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { RevealText } from '@/components/ui/RevealText'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { EASE } from '@/lib/animations'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type PageHeroProps = {
  heading: string
  subtext: string
  image: string
  imageAlt: string
  /** CTA(s) bajo el subtítulo. */
  children?: ReactNode
}

/**
 * Hero compartido por las páginas de producto.
 *
 * Existe porque las cuatro tenían el mismo hero de una columna alineado a la
 * izquierda dentro de un contenedor de 1400px, lo que dejaba la mitad derecha
 * vacía en todas. Aquí la ilustración ocupa ese espacio y el copy conserva una
 * medida de línea legible en vez de estirarse.
 */
export function PageHero({ heading, subtext, image, imageAlt, children }: PageHeroProps) {
  const reducedMotion = usePrefersReducedMotion()

  const rise = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
  })

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-40 md:pb-20 md:pt-48">
      <GradientBlob />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:gap-16">
          <div>
            <h1 className="font-sans text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
              <RevealText text={heading} animateOnMount />
            </h1>
            <motion.p
              variants={rise(0.5)}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-xl text-lg text-ink/70 md:text-xl"
            >
              {subtext}
            </motion.p>
            {children && (
              <motion.div variants={rise(0.65)} initial="hidden" animate="show" className="mt-10">
                {children}
              </motion.div>
            )}
          </div>

          <motion.img
            src={image}
            alt={imageAlt}
            width={1000}
            height={750}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="w-full max-w-md rounded-3xl justify-self-center lg:max-w-none lg:justify-self-end"
          />
        </div>
      </Container>
    </section>
  )
}
