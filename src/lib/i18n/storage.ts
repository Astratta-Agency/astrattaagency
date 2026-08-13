import type { Language } from '@/lib/i18n/types'

const STORAGE_KEY = 'astratta-lang'

export function readStoredLanguage(): Language | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'en' || value === 'es' ? value : null
  } catch {
    return null
  }
}

export function writeStoredLanguage(language: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // localStorage unavailable (e.g. private browsing) — language just won't persist.
  }
}

export function detectInitialLanguage(): Language {
  const stored = readStoredLanguage()
  if (stored) return stored

  try {
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
  } catch {
    return 'en'
  }
}
