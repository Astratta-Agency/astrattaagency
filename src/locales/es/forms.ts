import type { forms as en } from '@/locales/en/forms'

export const forms: typeof en = {
  newsletter: {
    subscribeLabel: 'Suscribirme',
    sending: 'Enviando…',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@empresa.com',
    interestsLabel: '¿Qué te interesa más?',
    optional: '(opcional)',
    interests: {
      'web-development': 'Desarrollo Web',
      'digital-marketing': 'Marketing Digital',
      'graphic-design': 'Diseño Gráfico',
    },
    success: 'Listo — revisa tu correo para la próxima novedad.',
    errorCompact: 'Algo salió mal — intenta de nuevo.',
    errorFull: 'Algo salió mal — escríbenos directamente a info@astrattaagency.com.',
  },
  contact: {
    fullName: 'Nombre completo',
    fullNamePlaceholder: 'Tu nombre completo',
    email: 'Correo electrónico',
    emailPlaceholder: 'tu@empresa.com',
    phone: 'Teléfono',
    phonePlaceholder: '(214) 555-0100',
    company: 'Empresa',
    companyPlaceholder: 'Nombre de tu empresa',
    websiteUrl: 'Sitio web',
    optional: '(opcional)',
    websitePlaceholder: 'tuempresa.com (si tienes uno)',
    message: 'Mensaje',
    messagePlaceholder: 'Cuéntanos sobre tu proyecto u objetivos',
    submitLabel: 'Enviar mensaje',
    sending: 'Enviando…',
    success: 'Gracias — recibimos tu mensaje. Te contactaremos pronto.',
    error: 'Algo salió mal — escríbenos directamente a info@astrattaagency.com.',
  },
}
