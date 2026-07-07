import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

/**
 * Tracks scroll direction and whether the page has scrolled past `threshold`.
 * Used by the nav to hide-on-scroll-down / show-on-scroll-up and go solid on scroll.
 */
export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    let ticking = false

    const update = () => {
      const y = window.scrollY
      const diff = y - lastY.current

      if (Math.abs(diff) > threshold) {
        setDirection(diff > 0 ? 'down' : 'up')
        lastY.current = y
      }

      setScrolled(y > 24)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, scrolled }
}
