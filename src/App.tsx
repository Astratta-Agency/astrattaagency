import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import type { Bilingual } from '@/lib/i18n/types'
import { Layout } from '@/components/layout/Layout'
import { RootLanguageRedirect } from '@/components/layout/RootLanguageRedirect'
import { LANGUAGES, SERVICE_SLUGS, localizedPath, routePattern, type RouteId } from '@/lib/i18n/routes'
import Home from '@/pages/Home'
import Diagnostic from '@/pages/Diagnostic'
import Foundation from '@/pages/Foundation'
import Systems from '@/pages/Systems'
import HowItWorks from '@/pages/HowItWorks'
import GrowthScore from '@/pages/GrowthScore'
import Industries from '@/pages/Industries'
import Industry from '@/pages/Industry'
import Work from '@/pages/Work'
import CaseStudy from '@/pages/CaseStudy'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import WebDevelopment from '@/pages/WebDevelopment'
import Ecommerce from '@/pages/Ecommerce'
import DigitalMarketing from '@/pages/DigitalMarketing'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

/**
 * Every page is registered once here and emitted per language by the loop
 * below, so an English route and its Spanish counterpart can never drift.
 * Paths themselves live in src/lib/i18n/routes.ts.
 */
const PAGE_ROUTES: { id: RouteId; element: ReactElement }[] = [
  { id: 'home', element: <Home /> },
  { id: 'diagnostic', element: <Diagnostic /> },
  { id: 'foundation', element: <Foundation /> },
  { id: 'systems', element: <Systems /> },
  { id: 'howItWorks', element: <HowItWorks /> },
  { id: 'growthScore', element: <GrowthScore /> },
  { id: 'industries', element: <Industries /> },
  { id: 'industryDetail', element: <Industry /> },
  { id: 'work', element: <Work /> },
  { id: 'workDetail', element: <CaseStudy /> },
  { id: 'blog', element: <Blog /> },
  { id: 'blogDetail', element: <BlogPost /> },
  { id: 'pricing', element: <Pricing /> },
  { id: 'contact', element: <Contact /> },
  { id: 'about', element: <About /> },
]

/** Keyed by the canonical English slug — the same key SERVICE_SLUGS uses. */
const SERVICE_ROUTES: { slug: string; element: ReactElement }[] = [
  { slug: 'web-development', element: <WebDevelopment /> },
  { slug: 'ecommerce', element: <Ecommerce /> },
  { slug: 'digital-marketing', element: <DigitalMarketing /> },
]

/**
 * Slugs retirados por §12 y su destino — el gemelo client-side de los 301 de
 * vercel.json. No están en SERVICE_SLUGS porque ya no son páginas.
 */
const RETIRED_SERVICE_ROUTES: { slug: Bilingual<string>; to: RouteId }[] = [
  { slug: { en: 'social-media', es: 'redes-sociales' }, to: 'systems' },
  { slug: { en: 'paid-ads', es: 'publicidad-pagada' }, to: 'systems' },
  { slug: { en: 'lead-generation', es: 'generacion-de-leads' }, to: 'systems' },
  { slug: { en: 'graphic-design', es: 'diseno-grafico' }, to: 'foundation' },
]

export default function App() {
  return (
    <Layout>
      <RootLanguageRedirect />
      <Routes>
        {LANGUAGES.flatMap((language) => [
          ...PAGE_ROUTES.map((route) => (
            <Route
              key={`${language}:${route.id}`}
              path={routePattern(route.id, language)}
              element={route.element}
            />
          )),
          ...SERVICE_ROUTES.map((route) => (
            <Route
              key={`${language}:service:${route.slug}`}
              path={localizedPath('serviceDetail', language, { slug: SERVICE_SLUGS[route.slug][language] })}
              element={route.element}
            />
          )),
          // Las 4 páginas commodity retiradas (§12) tienen su 301 en
          // vercel.json. Ese redirect solo dispara en peticiones reales, no en
          // navegación client-side, así que se replica aquí para que la misma
          // URL nunca dé dos respuestas distintas.
          ...RETIRED_SERVICE_ROUTES.map(({ slug, to }) => (
            <Route
              key={`${language}:service:retired:${slug[language]}`}
              path={localizedPath('serviceDetail', language, { slug: slug[language] })}
              element={<Navigate to={localizedPath(to, language)} replace />}
            />
          )),
          // El índice /services ya no existe: cualquier otro slug de servicio
          // cae en how-it-works, su reemplazo narrativo.
          <Route
            key={`${language}:service:fallback`}
            path={routePattern('serviceDetail', language)}
            element={<Navigate to={localizedPath('howItWorks', language)} replace />}
          />,
        ])}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
