import { useEffect, useState } from 'react'

function getIsTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

/** Coarse-pointer / no-hover devices — used to disable custom cursor & magnetic buttons. */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(getIsTouchDevice)

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)')
    const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  return isTouch
}
