import { motion } from 'framer-motion'
import type { MatrixRow, SystemLevel } from '@/data/systems'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

type SystemsMatrixProps = {
  levels: SystemLevel[]
  rows: MatrixRow[]
}

/**
 * Matriz comparativa de los 4 niveles del Motor.
 *
 * Cinco columnas no caben en móvil, así que la tabla scrollea dentro de su
 * propio contenedor — la página nunca scrollea en horizontal. La columna de
 * etiquetas queda fija (sticky) para no perder la referencia al desplazarse.
 */
export function SystemsMatrix({ levels, rows }: SystemsMatrixProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(0.04)}
      className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0"
    >
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-ink/15">
            <th scope="col" className="sticky left-0 z-10 bg-white py-5 pr-4" />
            {levels.map((level) => (
              <th key={level.slug} scope="col" className="px-4 py-5 align-bottom">
                <span className="block font-sans text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  {level.name}
                </span>
                <span className="mt-1 block font-sans text-2xl font-extrabold tracking-tight text-ink">
                  {level.price}
                  <span className="text-base font-bold text-ink/40">{level.cadence}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <motion.tr key={row.label} variants={fadeUp} className="border-b border-ink/10">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white py-4 pr-4 font-sans text-sm font-bold text-ink/70"
              >
                {row.label}
              </th>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className={`px-4 py-4 text-sm ${cell === '—' ? 'text-ink/25' : 'text-ink/80'}`}
                >
                  {cell === '✓' ? (
                    <span className="text-primary" aria-label="Included">
                      ✓
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
