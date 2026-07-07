import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ParticleField } from '@/components/ui/ParticleField'

/** Slow-moving, liquid-edged purple gradient blob with a grain overlay and drifting particles — sits behind the hero copy. */
export function GradientBlob() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])

  return (
    <div ref={ref} className="grain absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="animate-wavy-blob absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 bg-gradient-to-br from-primary to-primary-dark opacity-60 blur-[100px] md:h-[90vh] md:w-[90vh]"
      />
      <motion.div
        style={{ y }}
        className="animate-wavy-blob-slow absolute -bottom-1/3 right-0 h-[50vh] w-[50vh] bg-gradient-to-tr from-primary-dark to-primary opacity-40 blur-[110px]"
      />
      <ParticleField />
      <style>{`
        @keyframes wavy-blob {
          0%   { transform: translate(-50%, 0) scale(1);        border-radius: 42% 58% 65% 35% / 45% 45% 55% 55%; }
          33%  { transform: translate(-46%, 3%) scale(1.06);    border-radius: 60% 40% 35% 65% / 55% 65% 35% 45%; }
          66%  { transform: translate(-53%, -2%) scale(0.97);   border-radius: 35% 65% 55% 45% / 65% 40% 60% 35%; }
          100% { transform: translate(-50%, 0) scale(1);        border-radius: 42% 58% 65% 35% / 45% 45% 55% 55%; }
        }
        @keyframes wavy-blob-slow {
          0%   { transform: translate(0, 0) scale(1);      border-radius: 55% 45% 40% 60% / 40% 55% 45% 60%; }
          50%  { transform: translate(-4%, -4%) scale(1.05); border-radius: 40% 60% 55% 45% / 60% 40% 60% 40%; }
          100% { transform: translate(0, 0) scale(1);      border-radius: 55% 45% 40% 60% / 40% 55% 45% 60%; }
        }
        .animate-wavy-blob { animation: wavy-blob 18s ease-in-out infinite; }
        .animate-wavy-blob-slow { animation: wavy-blob-slow 24s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-wavy-blob, .animate-wavy-blob-slow { animation: none; border-radius: 50%; }
        }
      `}</style>
    </div>
  )
}
