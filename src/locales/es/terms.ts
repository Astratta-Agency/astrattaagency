import type { terms as en } from '@/locales/en/terms'

export const terms: typeof en = {
  eyebrow: 'Legal',
  heading: 'Términos y Condiciones',
  lastUpdatedLabel: 'Última actualización',
  lastUpdated: '24 de septiembre de 2026',
  intro:
    'Estos términos regulan el uso de astrattaagency.com y la compra del Diagnóstico. Al usar el sitio o comprar el Diagnóstico, los aceptas. Si no estás de acuerdo, te pedimos que no uses el sitio.',
  sections: [
    {
      heading: 'Quiénes somos',
      paragraphs: [
        'Astratta Agency ("Astratta", "nosotros") es un estudio de diseño web y marketing digital con base en Dallas–Fort Worth, Texas.',
      ],
    },
    {
      heading: 'Uso del sitio',
      paragraphs: ['Puedes usar este sitio libremente, siempre que no lo uses para:'],
      list: [
        'Nada ilegal.',
        'Intentar romperlo, saturarlo o entrar a partes que no son públicas.',
        'Enviar spam o información falsa a través de nuestros formularios.',
        'Hacerte pasar por otra persona.',
      ],
    },
    {
      heading: 'Nuestro contenido',
      paragraphs: [
        'Los textos, el diseño, los gráficos, el logo, los artículos y los casos de éxito de este sitio son de Astratta, o de nuestros clientes, que nos permiten mostrar su trabajo. Puedes compartir enlaces y citar fragmentos cortos dándonos el crédito. Para copiar o republicar cualquier otra cosa necesitas nuestro permiso por escrito.',
      ],
    },
    {
      heading: 'El Growth Score',
      paragraphs: [
        'El Growth Score es gratis y automático. Su resultado es una estimación basada solo en tus respuestas — sirve como guía, pero no es asesoría profesional ni garantiza ningún resultado.',
      ],
    },
    {
      heading: 'El Diagnóstico',
      paragraphs: [
        'El Diagnóstico cuesta $297 USD, en un pago único y por adelantado a través de Stripe. El trabajo empieza cuando se confirma el pago.',
      ],
      list: [
        'Si cancelas antes de que empecemos, te devolvemos los $297 completos.',
        'Una vez empezado el trabajo, el pago no se devuelve — salvo por nuestra garantía.',
        'Garantía: si no encontramos al menos tres fugas cuantificables, te devolvemos los $297 completos.',
        'Crédito: si contratas nuestros servicios dentro de los 90 días siguientes a la entrega de tu Diagnóstico, los $297 se acreditan completos a ese trabajo.',
      ],
    },
    {
      heading: 'Base y sistemas de crecimiento',
      paragraphs: [
        'Los proyectos de Base y los sistemas mensuales de crecimiento (START, BUILD, ENGINE y SCALE) se rigen por un contrato escrito que se firma con cada cliente. Ese contrato fija el alcance, el precio, el plazo mínimo, los pagos y la cancelación. Los precios de este sitio son de referencia; si algo de aquí contradice tu contrato, manda el contrato.',
      ],
    },
    {
      heading: 'Sin resultados garantizados',
      paragraphs: [
        'No prometemos ventas, posiciones en Google ni leads concretos. Los resultados dependen de factores que no controlamos — tu mercado, tu presupuesto, tu competencia y cómo se ejecutan las recomendaciones.',
      ],
    },
    {
      heading: 'Enlaces y servicios de terceros',
      paragraphs: [
        'El sitio enlaza a servicios que no controlamos, como WhatsApp, Instagram, Facebook, LinkedIn y Stripe. Su uso se rige por sus propios términos y no somos responsables de ellos.',
      ],
    },
    {
      heading: 'Límite de responsabilidad',
      paragraphs: [
        'El sitio se ofrece "tal cual". En la medida en que la ley lo permita, Astratta no responde por daños indirectos o consecuentes derivados del uso del sitio o del Diagnóstico, y nuestra responsabilidad total se limita a lo que nos pagaste por el Diagnóstico.',
      ],
    },
    {
      heading: 'Ley aplicable',
      paragraphs: [
        'Estos términos se rigen por las leyes del Estado de Texas. Cualquier disputa se resolverá en los tribunales de Texas.',
      ],
    },
    {
      heading: 'Tu privacidad',
      paragraphs: ['Cómo recogemos y usamos tu información está explicado en nuestra Política de Privacidad.'],
      link: { label: 'Leer la Política de Privacidad', to: '/privacy-policy' },
    },
    {
      heading: 'Cambios a estos términos',
      paragraphs: [
        'Si cambiamos estos términos, actualizaremos esta página y la fecha de arriba. Cada compra se rige por los términos vigentes el día en que se hizo.',
      ],
    },
  ],
  contactHeading: 'Preguntas',
  contactText: 'Cualquier pregunta sobre estos términos, escríbenos a:',
}
