import { clsx } from 'clsx'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

const LANGUAGES: { code: Language; label: string; ariaLabel: string }[] = [
  { code: 'en', label: 'EN', ariaLabel: 'Switch to English' },
  { code: 'es', label: 'ES', ariaLabel: 'Cambiar a español' },
]

export function LanguageSwitch({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className={clsx('inline-flex shrink-0 rounded-full border p-1', dark ? 'border-white/25' : 'border-ink/20')}
    >
      {LANGUAGES.map(({ code, label, ariaLabel }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          aria-label={ariaLabel}
          className={clsx(
            'rounded-full px-3 py-1.5 font-sans text-xs font-bold uppercase transition-colors',
            language === code
              ? 'bg-primary text-white'
              : dark
                ? 'text-white/60 hover:text-white'
                : 'text-ink/50 hover:text-ink/80',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
