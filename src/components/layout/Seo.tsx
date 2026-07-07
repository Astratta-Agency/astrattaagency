import { useEffect } from 'react'
import { SITE } from '@/lib/constants'

type SeoProps = {
  title: string
  description: string
  /** path only, e.g. "/services" — combined with SITE.domain for canonical/OG url */
  path: string
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
  useEffect(() => {
    const url = `https://${SITE.domain}${path}`
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', `https://${SITE.domain}/og-image.jpg`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    setCanonical(url)
  }, [title, description, path])

  return null
}
