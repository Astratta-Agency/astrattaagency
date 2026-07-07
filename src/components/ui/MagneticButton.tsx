import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { clsx } from 'clsx'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type MagneticButtonProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  strength?: number
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

/** Wraps a button/link and subtly pulls it toward the cursor on hover. */
export function MagneticButton<T extends ElementType = 'button'>({
  as,
  children,
  className,
  strength = 0.3,
  ...props
}: MagneticButtonProps<T>) {
  const isTouch = useIsTouchDevice()
  const reducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const disabled = isTouch || reducedMotion
  const Tag = as ?? 'button'

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={disabled ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag className={clsx('inline-block', className)} {...(props as Record<string, unknown>)}>
        {children}
      </Tag>
    </motion.div>
  )
}
