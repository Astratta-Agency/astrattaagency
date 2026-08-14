import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translatePath } from '@/lib/i18n/routes'

/**
 * Share targets for an article.
 *
 * `path` is the canonical **English** path (same contract as <Seo> and <Link>);
 * the shared URL is resolved to the reader's current language so a Spanish
 * reader never shares the English version by accident.
 */
type ShareRowProps = {
  path: string
  title: string
  /** `bar` is the condensed variant used inside the sticky header. */
  variant?: 'inline' | 'bar'
}

const ICON = 'h-[18px] w-[18px]'

/* Brand glyphs are drawn inline — no icon dependency, and they inherit currentColor. */
const IconWhatsApp = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 15.71a8.2 8.2 0 0 1-5.8 2.41h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.19 8.19 0 0 1 8.23 8.24c0 2.2-.86 4.27-2.42 5.82Z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.4-11.75V21.5h5.15v-6.5c0-1.72.33-3.38 2.45-3.38 2.1 0 2.12 1.96 2.12 3.49v6.39h5.15v-7.42c0-4.470-2.42-6.55-5.65-6.55a4.88 4.88 0 0 0-4.4 2.42h-.07V9.75H9.8Z" />
  </svg>
)

const IconFacebook = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z" />
  </svg>
)

const IconX = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.53 3h3.05l-6.66 7.61L21.75 21h-6.13l-4.8-6.28L5.32 21H2.27l7.12-8.14L2.25 3h6.29l4.34 5.74L17.53 3Zm-1.07 16.17h1.69L7.62 4.74H5.81l10.65 14.43Z" />
  </svg>
)

const IconCopy = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const IconCheck = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m20 6-11 11-5-5" />
  </svg>
)

export function ShareRow({ path, title, variant = 'inline' }: ShareRowProps) {
  const { language, dict } = useLanguage()
  const t = dict.blog.post
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current) }, [])

  const url = `https://${SITE.domain}${translatePath(path, language)}`

  const targets = [
    { key: 'whatsapp', label: t.shareOn.whatsapp, icon: <IconWhatsApp />, href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { key: 'linkedin', label: t.shareOn.linkedin, icon: <IconLinkedIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { key: 'facebook', label: t.shareOn.facebook, icon: <IconFacebook />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { key: 'x', label: t.shareOn.x, icon: <IconX />, href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      return // clipboard blocked (insecure context / denied) — leave the label unchanged
    }
    setCopied(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 2000)
  }

  const buttonBase =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-[transform,color,border-color,background-color] duration-150 ease-out hover:border-ink/25 hover:text-ink active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

  return (
    <div className={variant === 'bar' ? 'flex items-center gap-1.5' : 'flex flex-wrap items-center gap-2'}>
      {variant === 'inline' && (
        <span className="mr-1 font-sans text-sm font-bold text-ink/40">{t.share}</span>
      )}

      {targets.map((target) => (
        <a
          key={target.key}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={target.label}
          title={target.label}
          className={buttonBase}
        >
          {target.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? t.copied : t.copyLink}
        title={copied ? t.copied : t.copyLink}
        className={`${buttonBase} ${copied ? 'border-primary/30 text-primary' : ''}`}
      >
        {/* Crossfade + blur bridges the two glyphs so the swap reads as one object, not two. */}
        <span className="grid place-items-center [grid-template-areas:'icon']">
          <span
            className="transition-[opacity,filter] duration-200 ease-out [grid-area:icon]"
            style={{ opacity: copied ? 0 : 1, filter: copied ? 'blur(2px)' : 'none' }}
          >
            <IconCopy />
          </span>
          <span
            className="transition-[opacity,filter] duration-200 ease-out [grid-area:icon]"
            style={{ opacity: copied ? 1 : 0, filter: copied ? 'none' : 'blur(2px)' }}
          >
            <IconCheck />
          </span>
        </span>
      </button>

      {/* Announced to screen readers without stealing focus. */}
      <span aria-live="polite" className="sr-only">
        {copied ? t.copied : ''}
      </span>
    </div>
  )
}
