import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Bilingual, Language } from '@/lib/i18n/types'
import { writeStoredLanguage } from '@/lib/i18n/storage'
import { languageFromPath, translatePath } from '@/lib/i18n/routes'
import { en } from '@/locales/en/index'
import { es } from '@/locales/es/index'
import type { Dictionary } from '@/locales/en/index'

const dictionaries: Record<Language, Dictionary> = { en, es }

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  dict: Dictionary
  pick: <T>(bilingual: Bilingual<T>) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * The URL is the source of truth for language: `/es/...` is Spanish, anything
 * else is English. Switching languages is therefore a navigation, not a state
 * change — which is what makes both versions independently crawlable.
 *
 * Must be rendered inside the router so it can read the current location.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const language = languageFromPath(pathname)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback(
    (next: Language) => {
      // localStorage no longer decides the language — it only records the
      // preference so a later visit to the bare root can honour it.
      writeStoredLanguage(next)
      if (next !== language) navigate(translatePath(pathname, next))
    },
    [language, navigate, pathname],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dict: dictionaries[language],
      pick: (bilingual) => bilingual[language],
    }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
