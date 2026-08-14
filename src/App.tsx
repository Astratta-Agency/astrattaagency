import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
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
import Services from '@/pages/Services'
import WebDevelopment from '@/pages/WebDevelopment'
import Ecommerce from '@/pages/Ecommerce'
import DigitalMarketing from '@/pages/DigitalMarketing'
import SocialMedia from '@/pages/SocialMedia'
import PaidAds from '@/pages/PaidAds'
import LeadGeneration from '@/pages/LeadGeneration'
import GraphicDesign from '@/pages/GraphicDesign'
import Pricing from '@/pages/Pricing'
import Packages from '@/pages/Packages'
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
  { id: 'services', element: <Services /> },
  { id: 'pricing', element: <Pricing /> },
  { id: 'packages', element: <Packages /> },
  { id: 'contact', element: <Contact /> },
  { id: 'about', element: <About /> },
]

/** Keyed by the canonical English slug — the same key SERVICE_SLUGS uses. */
const SERVICE_ROUTES: { slug: string; element: ReactElement }[] = [
  { slug: 'web-development', element: <WebDevelopment /> },
  { slug: 'ecommerce', element: <Ecommerce /> },
  { slug: 'digital-marketing', element: <DigitalMarketing /> },
  { slug: 'social-media', element: <SocialMedia /> },
  { slug: 'paid-ads', element: <PaidAds /> },
  { slug: 'lead-generation', element: <LeadGeneration /> },
  { slug: 'graphic-design', element: <GraphicDesign /> },
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
          // Unknown service slugs fall back to the index rather than 404.
          <Route
            key={`${language}:service:fallback`}
            path={routePattern('serviceDetail', language)}
            element={<Navigate to={localizedPath('services', language)} replace />}
          />,
        ])}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
