import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const LenisContext = createContext<Lenis | null>(null)

/** Access the shared Lenis instance so components can drive scroll (e.g. scrollTo) without fighting it. */
export function useLenis() {
  return useContext(LenisContext)
}

/** Wires up Lenis smooth scrolling for the whole app. No-op when reduced motion is requested. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) return

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    setLenis(instance)

    let rafId: number
    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
