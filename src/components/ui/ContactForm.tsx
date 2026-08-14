import { useState, type FormEvent } from 'react'
import { FORM_ENDPOINT } from '@/lib/constants'
import { getRecaptchaToken } from '@/lib/recaptcha'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  submitLabel,
  source,
  dark = false,
  metadata,
  onSubmitted,
}: {
  submitLabel?: string
  /** identifies which page/offer this submission came from (e.g. "audit", "contact") */
  source: string
  dark?: boolean
  /** optional context to attach to the submission (e.g. a quiz-answer summary) */
  metadata?: string
  /**
   * Called once the submission succeeds. Lets a caller take over the screen —
   * the Growth Score swaps the form for the result instead of showing the
   * generic success line.
   */
  onSubmitted?: () => void
}) {
  const { dict } = useLanguage()
  const t = dict.forms.contact
  const resolvedSubmitLabel = submitLabel ?? t.submitLabel
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!FORM_ENDPOINT) {
      console.warn(
        'VITE_FORM_ENDPOINT is not set — point it at the capture-lead endpoint before launch.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const recaptchaToken = await getRecaptchaToken(source)

    // Payload shape expected by the `capture-lead` Supabase Edge Function.
    const payload = {
      workspace_slug: 'astratta-agency',
      contact_name: String(data.get('name') ?? ''),
      contact_email: String(data.get('email') ?? ''),
      contact_phone: String(data.get('phone') ?? '') || null,
      company_name: String(data.get('company') ?? '') || null,
      website: String(data.get('website') ?? '') || null,
      message: String(data.get('message') ?? ''),
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
      if (res.ok) {
        setStatus('success')
        onSubmitted?.()
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = dark
    ? 'w-full border-b border-white/25 bg-transparent py-4 font-sans text-lg text-white placeholder:text-white/40 focus:border-secondary focus:outline-none'
    : 'w-full border-b border-ink/20 bg-transparent py-4 font-sans text-lg text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none'

  const labelClass = dark
    ? 'font-sans text-sm font-bold uppercase tracking-wide text-white/40'
    : 'font-sans text-sm font-bold uppercase tracking-wide text-ink/40'

  if (status === 'success') {
    return <p className={dark ? 'text-lg text-white' : 'text-lg text-ink'}>{t.success}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot anti-spam: hidden from humans; bots that fill it are silently dropped. */}
      <input
        type="text"
        name="company_role"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-name`} className={labelClass}>
          {t.fullName}
        </label>
        <input
          id={`${source}-name`}
          name="name"
          type="text"
          required
          placeholder={t.fullNamePlaceholder}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-email`} className={labelClass}>
          {t.email}
        </label>
        <input
          id={`${source}-email`}
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-phone`} className={labelClass}>
          {t.phone}
        </label>
        <input
          id={`${source}-phone`}
          name="phone"
          type="tel"
          required
          placeholder={t.phonePlaceholder}
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-company`} className={labelClass}>
          {t.company}
        </label>
        <input
          id={`${source}-company`}
          name="company"
          type="text"
          required
          placeholder={t.companyPlaceholder}
          autoComplete="organization"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-website`} className={labelClass}>
          {t.websiteUrl} <span className="normal-case opacity-60">{t.optional}</span>
        </label>
        <input
          id={`${source}-website`}
          name="website"
          type="text"
          placeholder={t.websitePlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-message`} className={labelClass}>
          {t.message}
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={4}
          required
          placeholder={t.messagePlaceholder}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 self-start rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === 'submitting' ? t.sending : resolvedSubmitLabel}
      </button>

      {status === 'error' && (
        <p className={dark ? 'text-sm text-secondary' : 'text-sm text-secondary'}>{t.error}</p>
      )}
    </form>
  )
}
