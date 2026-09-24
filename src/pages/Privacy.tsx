import { LegalPage } from '@/components/sections/LegalPage'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Privacy() {
  const { dict } = useLanguage()
  return <LegalPage copy={dict.privacy} path="/privacy-policy" />
}
