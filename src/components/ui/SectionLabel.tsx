import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary">
      <span className="h-px w-6 bg-secondary" />
      {children}
    </span>
  )
}
