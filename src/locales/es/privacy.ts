import type { privacy as en } from '@/locales/en/privacy'

export const privacy: typeof en = {
  eyebrow: 'Legal',
  heading: 'Política de Privacidad',
  lastUpdatedLabel: 'Última actualización',
  lastUpdated: '24 de septiembre de 2026',
  intro:
    'Esta política explica qué información recoge Astratta Agency ("Astratta", "nosotros") cuando visitas astrattaagency.com, para qué la usamos y qué opciones tienes. Somos un estudio pequeño, dirigido por su fundadora, con base en Dallas–Fort Worth, Texas. Si algo no queda claro, pregúntanos.',
  sections: [
    {
      heading: 'Qué información recogemos',
      paragraphs: [
        'La que tú nos das. Cuando llenas un formulario en este sitio — el Growth Score, la solicitud del diagnóstico o la suscripción al newsletter — guardamos lo que escribes. Según el formulario, eso puede incluir tu nombre, email, teléfono, nombre del negocio, sitio web, tu mensaje y tus respuestas a las preguntas del Growth Score.',
        'La que se recoge sola. Mientras navegas, las herramientas de abajo recogen cierta información técnica:',
      ],
      list: [
        'Google Analytics 4 — las páginas que visitas, cuánto tiempo te quedas, el dispositivo y navegador que usas, tu ubicación aproximada (ciudad o país) y cómo llegaste al sitio. Para esto usa cookies.',
        'Google reCAPTCHA v3 — se activa al enviar un formulario para distinguir personas de bots. Recoge información de hardware y software y la envía a Google, bajo su Política de Privacidad y sus Términos de Servicio.',
        'Preferencia de idioma — el sitio recuerda si elegiste inglés o español en el almacenamiento local de tu navegador. Se queda en tu dispositivo y nunca nos llega.',
      ],
    },
    {
      heading: 'Para qué la usamos',
      paragraphs: ['Usamos tu información solo para:'],
      list: [
        'Responderte y darle seguimiento a lo que nos pediste.',
        'Entregarte lo que solicitaste — tu resultado del Growth Score, tu diagnóstico o una propuesta.',
        'Enviarte el newsletter, solo si te suscribiste.',
        'Entender cómo se usa el sitio para mejorarlo.',
        'Proteger el sitio y sus formularios del spam y el abuso.',
      ],
    },
    {
      heading: 'Con quién la compartimos',
      paragraphs: [
        'No vendemos tu información personal. Solo la compartimos con los proveedores que hacen funcionar este sitio, y solo lo que necesitan para hacer su trabajo:',
      ],
      list: [
        'Vercel — aloja el sitio web.',
        'Supabase — guarda la información que envías en nuestros formularios.',
        'Resend — envía nuestros correos, incluido el newsletter y los avisos de los formularios que envías.',
        'Stripe — procesa los pagos del Diagnóstico. Los datos de tu tarjeta van directo a Stripe; nosotros nunca los vemos ni los guardamos.',
        'Google — provee Google Analytics y reCAPTCHA.',
      ],
    },
    {
      heading: 'Obligaciones legales',
      paragraphs: [
        'Podemos revelar información si la ley lo exige, o si es necesario para proteger nuestros derechos, a nuestros clientes o la seguridad de otras personas.',
      ],
    },
    {
      heading: 'WhatsApp y redes sociales',
      paragraphs: [
        'El botón de WhatsApp y los enlaces a Instagram, Facebook y LinkedIn te llevan a plataformas que no controlamos. Lo que compartas ahí se rige por la política de privacidad de cada plataforma.',
      ],
    },
    {
      heading: 'Cookies y tus opciones',
      paragraphs: [
        'Puedes bloquear o borrar las cookies desde la configuración de tu navegador; el sitio sigue funcionando igual. También puedes impedir que Google Analytics recoja tus datos con el complemento de exclusión de Google (tools.google.com/dlpage/gaoptout).',
        'Cada email del newsletter trae un enlace para darte de baja, y puedes hacerlo cuando quieras.',
      ],
    },
    {
      heading: 'Cuánto tiempo la guardamos',
      paragraphs: [
        'Guardamos la información que nos envías mientras la necesitemos para responderte y, si trabajamos juntos, mientras dure esa relación. Puedes pedirnos que la borremos en cualquier momento.',
      ],
    },
    {
      heading: 'Tus derechos',
      paragraphs: [
        'Puedes pedirnos qué información tenemos sobre ti, pedirnos que la corrijamos o que la borremos. Escríbenos al email de abajo y nos encargamos.',
      ],
    },
    {
      heading: 'Seguridad',
      paragraphs: [
        'Todo el sitio funciona sobre HTTPS y tomamos medidas razonables para proteger tu información. Ningún sistema conectado a internet es 100% seguro, pero tratamos tus datos como si fueran nuestros.',
      ],
    },
    {
      heading: 'Menores de edad',
      paragraphs: [
        'Este sitio está pensado para negocios y no está dirigido a menores de 13 años. No recogemos a sabiendas información de menores.',
      ],
    },
    {
      heading: 'Cambios a esta política',
      paragraphs: [
        'Si cambiamos la forma en que manejamos tu información, actualizaremos esta página y la fecha de arriba.',
      ],
    },
  ],
  contactHeading: 'Preguntas',
  contactText: 'Cualquier pregunta sobre esta política o sobre tus datos, escríbenos a:',
}
