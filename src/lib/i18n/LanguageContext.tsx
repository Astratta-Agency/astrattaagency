import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Bilingual, Language } from '@/lib/i18n/types'
import { detectInitialLanguage, writeStoredLanguage } from '@/lib/i18n/storage'
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage())

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (next: Language) => {
    setLanguageState(next)
    writeStoredLanguage(next)
  }

  const value: LanguageContextValue = {
    language,
    setLanguage,
    dict: dictionaries[language],
    pick: (bilingual) => bilingual[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
