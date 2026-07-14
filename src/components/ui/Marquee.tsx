import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** seconds for one full loop */
  duration?: number
  reverse?: boolean
  orientation?: 'horizontal' | 'vertical'
}

/** Infinite CSS-transform marquee. Pauses on hover, respects prefers-reduced-motion via CSS. */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
  orientation = 'horizontal',
}: MarqueeProps) {
  const vertical = orientation === 'vertical'
  const animationName = vertical ? 'marquee-vertical' : 'marquee-horizontal'

  return (
    <div
      className={clsx(
        'group relative flex overflow-hidden no-scrollbar',
        vertical ? 'h-full flex-col' : 'flex-row',
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={clsx(
            'flex shrink-0 [animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:animate-none',
            vertical ? 'flex-col items-stretch' : 'flex-row items-center',
          )}
          style={{
            animation: `${animationName} ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee-horizontal {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  )
}
