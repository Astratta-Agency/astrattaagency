import { useState, type FormEvent } from 'react'
import { NEWSLETTER_ENDPOINT } from '@/lib/constants'
import { getRecaptchaToken } from '@/lib/recaptcha'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterForm({
  submitLabel,
  source,
  dark = false,
  compact = false,
}: {
  submitLabel?: string
  /** identifies which placement this signup came from (e.g. "blog-inline", "blog-footer", "site-footer") */
  source: string
  dark?: boolean
  /** single-row layout for inline/footer placements; the full stacked form is used on the blog index */
  compact?: boolean
}) {
  const { dict } = useLanguage()
  const t = dict.forms.newsletter
  const resolvedSubmitLabel = submitLabel ?? t.subscribeLabel
  const INTERESTS = [
    { value: 'web-development', label: t.interests['web-development'] },
    { value: 'digital-marketing', label: t.interests['digital-marketing'] },
    { value: 'graphic-design', label: t.interests['graphic-design'] },
  ] as const
  const [status, setStatus] = useState<Status>('idle')
  const [interest, setInterest] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!NEWSLETTER_ENDPOINT) {
      console.warn(
        'VITE_NEWSLETTER_ENDPOINT is not set — point it at the subscribe-newsletter endpoint before launch.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    const recaptchaToken = await getRecaptchaToken(source)

    // Payload shape expected by the `subscribe-newsletter` Supabase Edge Function.
    const payload = {
      workspace_slug: 'astratta-agency',
      email: String(data.get('email') ?? ''),
      interest_tag: interest,
      source_page: source,
      recaptcha_token: recaptchaToken,
      honeypot: String(data.get('company_role') ?? ''),
    }

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        setInterest(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={dark ? 'font-sans text-base text-white' : 'font-sans text-base text-ink'}>
        {t.success}
      </p>
    )
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
        {/* Honeypot anti-spam: hidden from humans; bots that fill it are silently dropped. */}
        <input
          type="text"
          name="company_role"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <label htmlFor={`${source}-email`} className="sr-only">
          {t.emailLabel}
        </label>
        <input
          id={`${source}-email`}
          name="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          className={
            dark
              ? 'w-full flex-1 rounded-full border border-white/25 bg-transparent px-5 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none'
              : 'w-full flex-1 rounded-full border border-ink/20 bg-transparent px-5 py-3 font-sans text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none'
          }
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="shrink-0 rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {status === 'submitting' ? t.sending : resolvedSubmitLabel}
        </button>
        {status === 'error' && (
          <p className="font-sans text-xs text-secondary sm:basis-full">{t.errorCompact}</p>
        )}
      </form>
    )
  }

  const inputClass = dark
    ? 'w-full border-b border-white/25 bg-transparent py-3 font-sans text-base text-white placeholder:text-white/40 focus:border-secondary focus:outline-none'
    : 'w-full border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none'

  const labelClass = dark
    ? 'font-sans text-xs font-bold uppercase tracking-wide text-white/40'
    : 'font-sans text-xs font-bold uppercase tracking-wide text-ink/40'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        type="text"
        name="company_role"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-email`} className={labelClass}>
          {t.emailLabel}
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
        <span className={labelClass}>
          {t.interestsLabel} <span className="normal-case opacity-60">{t.optional}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setInterest((current) => (current === opt.value ? null : opt.value))}
              className={`rounded-full border px-4 py-2 font-sans text-sm font-bold transition-colors ${
                interest === opt.value
                  ? 'border-primary bg-primary text-white'
                  : dark
                    ? 'border-white/25 text-white/70 hover:border-white/50'
                    : 'border-ink/20 text-ink/60 hover:border-ink/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 self-start rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === 'submitting' ? t.sending : resolvedSubmitLabel}
      </button>

      {status === 'error' && <p className="text-sm text-secondary">{t.errorFull}</p>}
    </form>
  )
}
