import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './index.css'
import App from './App.tsx'
import { captureAttribution } from '@/lib/attribution'

// Antes del primer render: la URL de aterrizaje aún trae los ?utm_*.
captureAttribution()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
