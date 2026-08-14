import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type IndustryPathProps = {
  steps: { month: string; text: string; price: string }[]
}

/**
 * "La ruta" — timeline con inversión por etapa.
 *
 * No reusa ServiceProcess porque ProcessStep no lleva precio, y el precio es
 * justamente el punto: el cliente ve el camino completo y lo que cuesta cada
 * escalón antes de decidir.
 */
export function IndustryPath({ steps }: IndustryPathProps) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(0.1)}
      className="relative mt-10"
    >
      {/* Línea continua que une las etapas; decorativa. */}
      <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/15 sm:left-2" />

      {steps.map((step, i) => (
        <motion.li key={i} variants={fadeUp} className="relative flex gap-6 pb-10 pl-8 last:pb-0 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white"
          />
          <div className="flex-1">
            <p className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-primary">
              {step.month}
            </p>
            <p className="mt-2 text-lg text-ink/80">{step.text}</p>
          </div>
          <p className="shrink-0 self-start font-sans text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            {step.price}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  )
}
