import { useState, type FormEvent } from 'react'
import { FORM_ENDPOINT } from '@/lib/constants'
import { getRecaptchaToken } from '@/lib/recaptcha'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Status = 'idle' | 'submitting' | 'error'

/**
 * Captura corta: nombre, email, teléfono y negocio (§9.1) — nada más.
 *
 * No reusa ContactForm a propósito: aquel pide siete campos e impone un
 * mensaje obligatorio, lo que en la pantalla previa al resultado es fricción
 * pura. Alguien que acaba de responder doce preguntas quiere su puntaje, no
 * redactar un mensaje.
 *
 * Mismo endpoint, mismo honeypot y misma verificación que ContactForm.
 */
export function LeadCaptureForm({
  submitLabel,
  source,
  metadata,
  onSubmitted,
}: {
  submitLabel: string
  source: string
  /** Contexto que viaja con el lead — aquí, el resumen de respuestas. */
  metadata?: string
  onSubmitted: () => void
}) {
  const { dict } = useLanguage()
  const t = dict.growthScore
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Sin endpoint configurado el lead no se puede guardar, pero retener el
    // resultado castigaría al usuario por un fallo nuestro: se muestra igual.
    if (!FORM_ENDPOINT) {
      console.warn('VITE_FORM_ENDPOINT is not set — the lead was not captured.')
      onSubmitted()
      return
    }

    setStatus('submitting')
    const recaptchaToken = await getRecaptchaToken(source)

    const payload = {
      workspace_slug: 'astratta-agency',
      contact_name: String(data.get('name') ?? ''),
      contact_email: String(data.get('email') ?? ''),
      contact_phone: String(data.get('phone') ?? '') || null,
      company_name: String(data.get('company') ?? '') || null,
      website: null,
      message: '',
      metadata: metadata || null,
      source_page: source,
      recaptcha_token: recaptchaToken,
      honeypot: String(data.get('company_role') ?? ''),
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('rejected')
      onSubmitted()
    } catch {
      // El puntaje ya está calculado en el cliente. Si la captura falla, se
      // entrega igual: perder el lead es nuestro problema, no del usuario.
      setStatus('error')
      onSubmitted()
    }
  }

  const inputClass =
    'w-full border-b border-ink/20 bg-transparent py-4 font-sans text-lg text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none'
  const labelClass = 'font-sans text-sm font-bold uppercase tracking-wide text-ink/40'

  const FIELDS = [
    { name: 'name', label: t.fields.firstName, type: 'text', autoComplete: 'given-name' },
    { name: 'email', label: t.fields.email, type: 'email', autoComplete: 'email' },
    { name: 'phone', label: t.fields.phone, type: 'tel', autoComplete: 'tel' },
    { name: 'company', label: t.fields.business, type: 'text', autoComplete: 'organization' },
  ] as const

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot: invisible para humanos; los bots que lo rellenan se descartan. */}
      <input
        type="text"
        name="company_role"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className="flex flex-col gap-1">
            <span className={labelClass}>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              required
              autoComplete={field.autoComplete}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex w-fit items-center rounded-full bg-primary px-7 py-4 font-sans text-base font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-primary-dark active:scale-[0.97] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {submitLabel}
      </button>
    </form>
  )
}
