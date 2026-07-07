import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Particle = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
  color: string
  opacity: number
}

const COLORS = [
  'rgba(81, 64, 242, 0.5)', // primary
  'rgba(81, 64, 242, 0.28)',
  'rgba(255, 117, 3, 0.35)', // secondary, used sparingly
  'rgba(14, 14, 18, 0.18)',
]

const PARTICLE_COUNT = 46

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2.2,
    speed: 0.15 + Math.random() * 0.35,
    drift: 8 + Math.random() * 18,
    phase: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.4 + Math.random() * 0.6,
  }
}

/**
 * Ambient floating particles drifting upward on a gentle sine wave, with a
 * soft parallax response to the cursor. Decorative only — draws a single
 * static frame instead of looping when reduced motion is preferred.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 }

    function resize() {
      if (!canvas || !ctx || !container) return
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height))
    }

    function drawStatic() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      parallax.targetX = relX * -12
      parallax.targetY = relY * -12
    }

    resize()

    if (reducedMotion) {
      drawStatic()
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }

    let rafId: number
    let time = 0
    let hidden = document.hidden

    function tick() {
      if (!ctx || hidden) {
        rafId = requestAnimationFrame(tick)
        return
      }
      time += 1

      parallax.x += (parallax.targetX - parallax.x) * 0.04
      parallax.y += (parallax.targetY - parallax.y) * 0.04

      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.speed
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        const wobble = Math.sin(time * 0.01 + p.phase) * p.drift * 0.02
        const drawX = p.x + wobble + parallax.x
        const drawY = p.y + parallax.y

        ctx.beginPath()
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(tick)
    }

    function onVisibilityChange() {
      hidden = document.hidden
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}
