import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** seconds for one full loop */
  duration?: number
  reverse?: boolean
}

/** Infinite CSS-transform marquee. Pauses on hover, respects prefers-reduced-motion via CSS. */
export function Marquee({ children, className, duration = 28, reverse = false }: MarqueeProps) {
  return (
    <div className={clsx('group relative flex overflow-hidden no-scrollbar', className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center [animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
