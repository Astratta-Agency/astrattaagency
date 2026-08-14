import type { howItWorks as en } from '@/locales/en/howItWorks'

export const howItWorks: typeof en = {
  // Copy de docs/CONTENIDO-Web-EN-ES.md §2. El español se usa tal cual.
  heading: 'Un sistema. No un menú de servicios.',
  imageAlt: 'Tres bloques que ascienden como escalones, unidos por una cinta continua.',
  subtext:
    'La mayoría de las agencias te entregan una lista de precios y te dejan adivinar. Nosotros empezamos con un diagnóstico, construimos la base y después encendemos el motor. Cada paso se gana el siguiente.',
  cta: 'Empieza con un diagnóstico — $297',

  whyEyebrow: 'Por qué cambiamos',
  why: [
    'Antes vendíamos los servicios por separado. Fue un error.',
    'Un plan de redes. Un plan de anuncios. Una página web. Parecía flexible. En realidad le estábamos pidiendo a dueños de negocio que se autodiagnosticaran.',
    'Y pasaba siempre lo mismo. Alguien contrataba anuncios, pero su web no convertía. Alguien contrataba contenido, y los mensajes se quedaban veinte horas sin respuesta. Cada pieza funcionaba. El conjunto no.',
    'Ahora hacemos una sola cosa: sistemas completos. Contenido que alimenta las campañas. Campañas que llevan a páginas que convierten. Páginas conectadas a un seguimiento que responde en menos de un minuto.',
    'Lo único que cambia entre un cliente y otro es el tamaño del sistema. Y eso lo define un diagnóstico, no un menú.',
  ],

  notEyebrow: 'Límites',
  notTitle: 'Lo que no hacemos.',
  notItems: [
    'No vendemos canales por separado. Anuncios sin una página que convierta es dinero quemado.',
    'No reportamos alcance ni impresiones. Reportamos leads, citas y costo de adquisición.',
    'No prometemos ventas en 30 días. El marketing necesita tiempo para dar datos confiables, y quien te diga lo contrario te está vendiendo algo.',
    'No tocamos tu presupuesto de anuncios. Va directo de ti a las plataformas, desde una cuenta a tu nombre.',
    'No trabajamos con tu competencia directa. Máximo tres clientes por industria y sub-mercado.',
  ],

  stepsEyebrow: 'Los tres pasos',
  steps: [
    {
      number: '/01',
      title: 'Diagnóstico',
      duration: '7 días',
      body: 'Auditamos tu sitio, tu embudo, tu medición, tu presencia local y tu competencia. Te entregamos los diez arreglos que importan, ordenados por retorno, más un plan de 7 y 30 días. $297, acreditables completos si trabajamos juntos.',
    },
    {
      number: '/02',
      title: 'Base',
      duration: 'de 10 días a 6 semanas',
      body: 'Construimos lo que indicó el diagnóstico. Sitio, marca, medición, captura. Todo medible desde el lanzamiento, no adivinado después.',
    },
    {
      number: '/03',
      title: 'Motor',
      duration: 'continuo',
      body: 'Contenido, anuncios y automatización funcionando juntos cada mes. Ves los números en vivo, no en un PDF mensual.',
    },
  ],
}
