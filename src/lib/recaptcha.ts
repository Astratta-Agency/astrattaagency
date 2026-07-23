import { RECAPTCHA_SITE_KEY } from '@/lib/constants'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

let loadPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Returns a reCAPTCHA v3 token for the given action, or null if
 * VITE_RECAPTCHA_SITE_KEY isn't configured (forms degrade gracefully —
 * the backend only enforces the token when its own secret is set).
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) return null

  try {
    await loadScript()
    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action })
          .then(resolve)
          .catch(reject)
      })
    })
  } catch {
    return null
  }
}
