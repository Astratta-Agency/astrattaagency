import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Small dot + trailing ring cursor. Reads `data-cursor` on the hovered element
 * to grow the ring and optionally show a label (e.g. "View" on work cards).
 * Disabled entirely on touch devices and when reduced motion is requested.
 */
export function Cursor() {
  const isTouch = useIsTouchDevice()
  const reducedMotion = usePrefersReducedMotion()
  const disabled = isTouch || reducedMotion

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 })
  const ringY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 })

  const [label, setLabel] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (disabled) return

    document.documentElement.classList.add('custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null
        const target = document.elementFromPoint(e.clientX, e.clientY)
        const cursorTarget = target?.closest<HTMLElement>('[data-cursor]')
        setActive(!!cursorTarget)
        setLabel(cursorTarget?.getAttribute('data-cursor') || null)
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [disabled, x, y])

  if (disabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border bg-transparent ${active ? 'mix-blend-normal' : 'mix-blend-difference'}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: active ? 72 : 32,
          height: active ? 72 : 32,
          backgroundColor: active ? '#5140f2' : 'rgba(0,0,0,0)',
          borderColor: active ? 'rgba(81,64,242,0)' : 'rgba(255,255,255,0.9)',
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-bold uppercase tracking-wide text-white"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
