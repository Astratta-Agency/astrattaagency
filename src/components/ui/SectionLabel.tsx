import type { ElementType, ReactNode } from 'react'

/**
 * Eyebrow de sección. `as` permite renderizarlo como encabezado real cuando la
 * sección contiene h3 — sin él la página salta de h1 a h3 y rompe la jerarquía
 * para lectores de pantalla. El aspecto no cambia.
 */
export function SectionLabel({ children, as: Tag = 'span' }: { children: ReactNode; as?: ElementType }) {
  return (
    <Tag className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary">
      <span className="h-px w-6 bg-secondary" />
      {children}
    </Tag>
  )
}
