import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CounterProps = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}

/** Animates from 0 to `value` once it scrolls into view. */
export function Counter({ value, suffix = '', prefix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reducedMotion = usePrefersReducedMotion()

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    if (reducedMotion) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`
      return
    }
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`
    })
    return unsubscribe
  }, [spring, prefix, suffix, value, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
