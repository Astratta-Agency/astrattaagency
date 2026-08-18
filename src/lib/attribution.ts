/**
 * Atribución de campaña para los leads que van al CRM.
 *
 * La Edge Function `capture-lead` acepta los cinco `utm_*` y los usa para
 * clasificar el lead (`deriveSource`): `google_ads`, `meta_ads` o `website`.
 * Sin ellos todo lead pagado entra como orgánico y la inversión en anuncios
 * queda sin atribuir.
 *
 * Se capturan **al cargar la app**, no al enviar el formulario: alguien que
 * aterriza en `/?utm_source=facebook` y navega a `/growth-score` ya perdió el
 * query string para cuando llena el formulario. Persisten en `sessionStorage`
 * para sobrevivir esa navegación sin seguir a la persona entre sesiones.
 */

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>

const STORAGE_KEY = 'astratta:attribution'
/** Tope defensivo: la función rechaza cualquier utm de más de 255 caracteres. */
const MAX_LEN = 255

function readStorage(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    // Modo privado de Safari y navegadores con storage bloqueado.
    return {}
  }
}

function fromCurrentUrl(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const found: Attribution = {}
  for (const key of KEYS) {
    const value = params.get(key)?.trim()
    if (value) found[key] = value.slice(0, MAX_LEN)
  }
  return found
}

/**
 * Captura los UTM de la URL actual si los hay. Una visita nueva con campaña
 * pisa la anterior; una sin campaña conserva la que ya estaba, para que
 * navegar dentro del sitio no borre el origen.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  const fresh = fromCurrentUrl()
  if (Object.keys(fresh).length === 0) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  } catch {
    /* storage no disponible — el lead se envía igual, sin atribución */
  }
}

/** Los UTM a adjuntar al lead. Vacío si la visita no vino de una campaña. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  return { ...readStorage(), ...fromCurrentUrl() }
}
