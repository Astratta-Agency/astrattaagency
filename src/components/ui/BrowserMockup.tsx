import type { ReactNode } from 'react'
import { clsx } from 'clsx'

type BrowserMockupProps = {
  children: ReactNode
  /** shown in the fake address bar, e.g. "clientdomain.com" */
  url?: string
  className?: string
  /** fills the parent's height (flex-1) instead of enforcing a fixed 16:10 aspect ratio */
  fill?: boolean
}

/** Browser-chrome frame used to present a project screenshot full-bleed inside the card. */
export function BrowserMockup({ children, url, className, fill = false }: BrowserMockupProps) {
  return (
    <div
      className={clsx(
        'flex overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-ink/20',
        fill ? 'h-full flex-col' : 'flex-col',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-4 border-b border-white/10 bg-ink px-5 py-3.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        {url && (
          <div className="flex-1 truncate rounded-full bg-white/10 px-4 py-1 text-center font-sans text-xs text-white/40">
            {url}
          </div>
        )}
      </div>
      <div
        className={clsx('relative w-full overflow-hidden', fill ? 'min-h-0 flex-1' : 'aspect-[16/10]')}
      >
        {children}
      </div>
    </div>
  )
}
