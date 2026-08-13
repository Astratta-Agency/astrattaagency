import { useEffect } from 'react'
import { SITE } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Bilingual, Language } from '@/lib/i18n/types'

/**
 * Pages migrate their SEO copy to `Bilingual<string>` one at a time (see the
 * i18n rollout plan) — until a given page's source data is converted, it
 * still passes a plain string, which is shown in both languages.
 */
type SeoText = string | Bilingual<string>

type SeoProps = {
  title: SeoText
  description: SeoText
  /** path only, e.g. "/services" — combined with SITE.domain for canonical/OG url */
  path: string
}

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

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Per-page document title, meta description, and OG/canonical tags for a client-rendered SPA. */
export function Seo({ title, description, path }: SeoProps) {
  const { language } = useLanguage()

  useEffect(() => {
    const url = `https://${SITE.domain}${path}`
    const resolvedTitle = resolve(title, language)
    const resolvedDescription = resolve(description, language)

    document.documentElement.lang = language
    document.title = resolvedTitle

    setMeta('name', 'description', resolvedDescription)
    setMeta('property', 'og:title', resolvedTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', `https://${SITE.domain}/og-image.jpg`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', resolvedTitle)
    setMeta('name', 'twitter:description', resolvedDescription)

    setCanonical(url)
  }, [title, description, path, language])

  return null
}
