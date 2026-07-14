import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CounterProps = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}

const VISIBILITY_FALLBACK_MS = 1000

/**
 * Renders the final value immediately — the count-up is progressive
 * enhancement layered on top via IntersectionObserver, never the only path
 * to a correct number. If the observer never fires (missed viewport
 * entry, browser quirk, reduced motion), a 1s fallback timeout still
 * starts it; if even that were skipped, the DOM already shows the real
 * value, not a "0" stuck waiting on JS that didn't run.
 */
export function Counter({ value, suffix = '', prefix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 })

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return

    let triggered = false
    const animate = () => {
      if (triggered) return
      triggered = true
      motionValue.set(0)
      motionValue.set(value)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animate()
      },
      { rootMargin: '-10% 0px' },
    )
    observer.observe(el)
    const fallback = window.setTimeout(animate, VISIBILITY_FALLBACK_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [motionValue, value, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
    })
    return unsubscribe
  }, [spring, prefix, suffix, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
