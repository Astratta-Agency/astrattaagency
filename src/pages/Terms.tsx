import { LegalPage } from '@/components/sections/LegalPage'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Terms() {
  const { dict } = useLanguage()
  return <LegalPage copy={dict.terms} path="/terms" />
}
