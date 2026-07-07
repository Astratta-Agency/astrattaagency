import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/** Slow-moving purple gradient blob with a grain overlay — sits behind the hero copy. */
export function GradientBlob() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])

  return (
    <div ref={ref} className="grain absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 animate-blob rounded-full bg-gradient-to-br from-primary to-primary-dark opacity-60 blur-[100px] md:h-[90vh] md:w-[90vh]"
      />
      <motion.div
        style={{ y }}
        className="absolute -bottom-1/3 right-0 h-[50vh] w-[50vh] animate-blob-slow rounded-full bg-gradient-to-tr from-primary-dark to-primary opacity-40 blur-[110px]"
      />
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-45%, 4%) scale(1.08); }
        }
        @keyframes blob-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, -5%) scale(1.05); }
        }
        .animate-blob { animation: blob 16s ease-in-out infinite; }
        .animate-blob-slow { animation: blob-slow 22s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-blob-slow { animation: none; }
        }
      `}</style>
    </div>
  )
}
