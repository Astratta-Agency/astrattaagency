import { useState, type FormEvent } from 'react'
import { FORM_ENDPOINT } from '@/lib/constants'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  submitLabel = 'Send message',
  source,
  dark = false,
  metadata,
}: {
  submitLabel?: string
  /** identifies which page/offer this submission came from (e.g. "audit", "contact") */
  source: string
  dark?: boolean
  /** optional context to attach to the submission (e.g. a quiz-answer summary) */
  metadata?: string
}) {
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

    // Payload shape expected by the `capture-lead` Supabase Edge Function.
    const payload = {
      workspace_slug: 'astratta-agency',
      contact_name: String(data.get('name') ?? ''),
      contact_email: String(data.get('email') ?? ''),
      contact_phone: String(data.get('phone') ?? '') || null,
      website: String(data.get('website') ?? '') || null,
      message: String(data.get('message') ?? ''),
      metadata: metadata || null,
      source_page: source,
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
    return (
      <p className={dark ? 'text-lg text-white' : 'text-lg text-ink'}>
        Thanks — your message is in. We'll be in touch shortly.
      </p>
    )
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
          Name
        </label>
        <input
          id={`${source}-name`}
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-email`} className={labelClass}>
          Email
        </label>
        <input
          id={`${source}-email`}
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-phone`} className={labelClass}>
          Phone <span className="normal-case opacity-60">(optional)</span>
        </label>
        <input
          id={`${source}-phone`}
          name="phone"
          type="tel"
          placeholder="(214) 555-0100"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-website`} className={labelClass}>
          Website URL
        </label>
        <input
          id={`${source}-website`}
          name="website"
          type="text"
          placeholder="yourcompany.com (if you have one)"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${source}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          rows={4}
          required
          placeholder="Tell us about your project or goals"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 self-start rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>

      {status === 'error' && (
        <p className={dark ? 'text-sm text-secondary' : 'text-sm text-secondary'}>
          Something went wrong — email us directly at info@astrattaagency.com.
        </p>
      )}
    </form>
  )
}
