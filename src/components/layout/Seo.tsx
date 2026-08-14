import { useEffect } from 'react'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translatePath } from '@/lib/i18n/routes'
import type { Bilingual, Language } from '@/lib/i18n/types'

/**
 * Either a bilingual pair (static SEO copy, resolved here) or a plain string
 * that the caller already resolved for the active language — content pages
 * pass the latter, since their whole record is resolved in one go upstream.
 */
type SeoText = string | Bilingual<string>

type SeoProps = {
  title: SeoText
  description: SeoText
  /**
   * The canonical **English** path, e.g. "/services/web-development". The
   * localized path, canonical URL, and both hreflang alternates are derived
   * from it — callers never write "/es/..." by hand.
   */
  path: string
}

const OG_LOCALES: Record<Language, string> = { en: 'en_US', es: 'es_ES' }

function resolve(text: SeoText, language: Language): string {
  return typeof text === 'string' ? text : text[language]
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page title, description, OG/Twitter tags, canonical, and hreflang for a
 * client-rendered SPA. The canonical always points at the *current* language's
 * URL, and the three alternates (en / es / x-default) are reciprocal, which is
 * what lets both language versions be indexed independently.
 */
export function Seo({ title, description, path }: SeoProps) {
  const { language } = useLanguage()

  useEffect(() => {
    const origin = `https://${SITE.domain}`
    const alternates: Record<Language, string> = {
      en: `${origin}${translatePath(path, 'en')}`,
      es: `${origin}${translatePath(path, 'es')}`,
    }
    const url = alternates[language]

    const resolvedTitle = resolve(title, language)
    const resolvedDescription = resolve(description, language)

    document.documentElement.lang = language
    document.title = resolvedTitle

    setMeta('name', 'description', resolvedDescription)
    setMeta('property', 'og:title', resolvedTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', `${origin}/og-image.jpg`)
    setMeta('property', 'og:locale', OG_LOCALES[language])
    setMeta('property', 'og:locale:alternate', OG_LOCALES[language === 'en' ? 'es' : 'en'])
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', resolvedTitle)
    setMeta('name', 'twitter:description', resolvedDescription)

    setLink('canonical', url)
    setLink('alternate', alternates.en, 'en')
    setLink('alternate', alternates.es, 'es')
    setLink('alternate', alternates.en, 'x-default')
  }, [title, description, path, language])

  return null
}
