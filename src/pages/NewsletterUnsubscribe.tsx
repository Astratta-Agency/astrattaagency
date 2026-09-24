import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { Container } from '@/components/ui/Container'
import { UNSUBSCRIBE_ENDPOINT } from '@/lib/constants'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Destino del enlace de baja de los correos del newsletter. La baja se
 * confirma con un clic en vez de dispararse al abrir la página: los escáneres
 * de enlaces de los clientes de correo abren cada URL y darían de baja a gente
 * que nunca lo pidió. Noindex y fuera del sitemap (no está en STATIC_SEO).
 */
export default function NewsletterUnsubscribe() {
  const { dict } = useLanguage()
  const t = dict.newsletterUnsubscribe
  const [params] = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<Status>(token ? 'idle' : 'error')

  const handleConfirm = async () => {
    if (!token || !UNSUBSCRIBE_ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(UNSUBSCRIBE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo
        title={{ en: t.metaTitle, es: t.metaTitle }}
        description={{ en: t.heading, es: t.heading }}
        path="/newsletter/unsubscribe"
        noindex
      />
      <Container className="flex min-h-svh flex-col items-center justify-center py-32 text-center">
        {status === 'success' ? (
          <p className="max-w-xl font-sans text-2xl font-bold text-ink">{t.success}</p>
        ) : (
          <>
            <h1 className="max-w-2xl font-sans text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {t.heading}
            </h1>
            {status !== 'error' && (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={status === 'submitting'}
                className="mt-10 rounded-full bg-primary px-8 py-4 font-sans text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {status === 'submitting' ? dict.forms.newsletter.sending : t.confirm}
              </button>
            )}
            {status === 'error' && (
              <p className="mt-8 text-sm text-secondary">{dict.forms.newsletter.errorFull}</p>
            )}
          </>
        )}
      </Container>
    </>
  )
}
