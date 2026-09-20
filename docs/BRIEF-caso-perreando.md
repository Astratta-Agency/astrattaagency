# Brief de implementación — Caso Perreando HotDog

**Repo:** `Astratta-Agency/astrattaagency` · **Ruta objetivo:** `/es/proyectos/perreando-hotdog-social-media`
**Rama a crear:** `feat/caso-perreando-og-bloques` desde `main`

Ejecutar con Claude Code dentro de la carpeta `website`.

---

## Objetivo

La página existe pero está escrita para alguien que ya navega el sitio. Va a empezar a recibir
tráfico frío desde Instagram (automatización de ManyChat con la keyword `CASO`). Dos cambios:
que el link se vea bien cuando se comparte en un DM, y que la página capture en vez de solo
mostrar.

**Dentro de alcance:** imagen Open Graph propia + dos bloques nuevos al final del contenido.
**Fuera de alcance:** no tocar el contenido existente del caso, no tocar otras rutas, no
resolver el renderizado del lado del servidor (va en un PR aparte), no mergear a `main`.

---

## Paso 0 — Descubrimiento (antes de escribir código)

No asumir el stack. Verificar y reportar:

1. Framework y versión exacta (`package.json`). El patrón de meta tags sugiere Next.js App
   Router con i18n, pero confirmarlo.
2. El archivo de la ruta del caso y cómo se define su metadata: ¿`export const metadata`,
   `generateMetadata()`, un helper compartido de SEO, o un CMS/MDX?
3. Dónde viven los tokens de diseño: Tailwind config, CSS variables globales, o styled-components.
   **Usar los tokens que ya existan.** No introducir un sistema paralelo.
4. Si el contenido del caso viene de un archivo de datos o MDX en vez de JSX, los bloques nuevos
   deben seguir ese mismo patrón, no hardcodearse en el componente.
5. Cómo se maneja el bilingüe (`es` / `en`). Si hay archivos de traducción, los textos nuevos van
   ahí, no inline. La versión en inglés puede quedar pendiente — dejarla marcada como TODO.

Reportar los hallazgos antes de continuar.

---

## Tokens de marca

```
Primary   #5140f2
Accent    #ff7503
Neutral   #eaeaea
Tipografía Mulish — 300 / 400 / 600 / 700 / 800
```

Negro: usar negro real o el negro que ya use el sitio. No inventar un `#0d0d12`.
Sentence case en títulos. Sin mayúsculas con tracking. Sin `→` pegado al texto de los botones.

---

## Cambio 1 — Imagen Open Graph

El `og:image` actual de esta ruta es el genérico del sitio (`/og-image.jpg`). Cuando ManyChat
mande el link por DM, la miniatura es lo que decide el clic.

1. Colocar el PNG adjunto en `public/og/og-perreando-hotdog.png` (1200×630).
2. Apuntar la metadata de **esta ruta únicamente** a esa imagen. No tocar el OG global.

Referencia si es Next.js App Router:

```ts
openGraph: {
  images: [{
    url: 'https://astrattaagency.com/og/og-perreando-hotdog.png',
    width: 1200,
    height: 630,
    alt: 'Perreando HotDog: 292K vistas en 90 días con $0 en ads',
  }],
},
twitter: {
  card: 'summary_large_image',
  images: ['https://astrattaagency.com/og/og-perreando-hotdog.png'],
},
```

URL absoluta, no relativa: varios scrapers no resuelven rutas relativas.

3. Actualizar la meta description de la ruta:

> Perreando HotDog pasó de cero presencia online a 292K vistas en 90 días con $0 en ads. El
> proceso completo, los números reales y el checklist de 6 puntos para replicarlo.

---

## Cambio 2 — Bloque "Cómo replicarlo en tu negocio"

Va después de la sección de resultados, antes del footer.

**Título:** Cómo replicarlo en tu negocio

**Entradilla:**
> No hay truco de algoritmo. Hay un sistema. Estos son los seis puntos que auditamos antes de
> publicar el primer video, los mismos que aplicamos en Perreando HotDog. Puedes revisarlos hoy
> mismo sin contratarnos.

**Tratamiento visual.** Seis tarjetas en grid de 2 columnas (1 en móvil). Sin numeración: estos
son criterios de auditoría, no pasos en secuencia. El marcador de cada tarjeta es **su umbral**,
compuesto grande y en color primario, arriba del título. Eso es lo que la gente fotografía y
guarda.

Jerarquía dentro de cada tarjeta: umbral (grande, primary) → título (bold) → explicación (muted).

| Umbral | Título | Explicación |
|---|---|---|
| `3 semanas` | Un formato, no cinco | La mayoría publica en seis formatos a la vez y no aprende nada de ninguno. Se elige uno, se sostiene tres semanas y recién ahí se diversifica. |
| `Segundo 0` | El producto primero | En comida no se construye tensión: el producto aparece en el primer frame. Intro, logo o saludo en los primeros dos segundos es audiencia perdida. |
| `50%` | Retención antes que nada | Si menos de la mitad pasa del tercer segundo, el problema es el hook. No el algoritmo, no la hora de publicación, no el hashtag. |
| `90 días` | Cadencia que aguante | Diez videos en una semana y después silencio mata más cuentas que publicar poco. Se define la frecuencia sostenible en tu peor semana, no en la mejor. |
| `$0` | Cero ads hasta tener señal | Pagar por distribuir contenido que no retiene solo compra el mismo fracaso más rápido. Primero un video prueba que funciona orgánico, después se amplifica. |
| `1 tap` | Un destino claro | 292K vistas no sirven si el perfil no dice dónde estás, cuándo abres y cómo se ordena. El tráfico sin destino es vanidad. |

El punto de los `$0` es el más valioso del bloque: una agencia recomendando **no** pagar ads
compra más credibilidad que cualquier testimonial. No suavizarlo.

---

## Cambio 3 — Captura de correo y CTA

Va inmediatamente después del bloque anterior, con fondo distinto para separarlo del contenido
editorial. Dos columnas en desktop, apiladas en móvil.

**Columna izquierda**

Título: Los seis puntos, en una hoja

> Te mandamos el checklist completo en PDF, con el criterio exacto para marcar cada punto como
> aprobado o no, y el próximo caso de estudio cuando salga. Un caso al mes. Sin secuencias de
> doce correos.

**Columna derecha — tarjeta**

- Encabezado: Checklist de 6 puntos
- Subtítulo: PDF de una página, imprimible
- Campo de email, label "Tu correo", placeholder `nombre@tunegocio.com`
- Botón primario: **Enviármelo**
- Estado de éxito: "Listo. Revisa tu correo." — en la voz del sitio, sin disculpas ni signos de
  exclamación
- Estado de error: decir qué pasó y cómo arreglarlo. Nunca "algo salió mal"
- Separador, y debajo: "¿Prefieres que lo revisemos juntos?" + botón secundario **Agendar
  diagnóstico de 20 min**

**CTA fijo en móvil.** Barra inferior con el link al diagnóstico, visible solo bajo 860px. La
mayoría no llega al final del scroll. Respetar el safe area inferior con
`env(safe-area-inset-bottom)`.

---

## Decisiones pendientes — dejar como TODO visible

Estas dos no están resueltas. Implementar con placeholder y un comentario `TODO` que salte a la
vista en el diff:

1. **Destino del email.** No hay servicio confirmado (ConvertKit, Mailchimp, Brevo, endpoint
   propio). Dejar el handler aislado en una función para que enchufarlo después sea un solo
   cambio.
2. **Link del diagnóstico.** Pendiente confirmar si apunta al Calendly de discovery existente.
   Cuando se conecte, añadirle `?utm_source=ig&utm_medium=manychat&utm_campaign=reel292k` para
   poder separar en el reporte las llamadas que vienen del reel.

Sin estas dos resueltas el PR sirve para revisar el diseño, **no para mergear**.

---

## Entrega

```bash
git checkout -b feat/caso-perreando-og-bloques main
# cambios
git commit -m "feat(caso): OG propia + bloques de método y captura en Perreando HotDog"
git push -u origin feat/caso-perreando-og-bloques
```

Vercel genera el preview automáticamente al detectar la rama. Abrir PR contra `main` **sin
mergear**. No commitear a `main` bajo ninguna circunstancia.

---

## Criterios de aceptación

- [ ] El preview de Vercel levanta sin errores de build
- [ ] La OG se resuelve: pasar la URL del preview por el debugger de Sharing de Meta y el
      validador de LinkedIn. Al publicar en producción, forzar el refresco de caché o Instagram
      seguirá sirviendo la imagen vieja varios días
- [ ] Los dos bloques se ven correctos en 375px, 768px y 1440px
- [ ] Modo claro y oscuro, si el sitio lo soporta
- [ ] El CTA fijo no tapa contenido ni se monta sobre la barra del sistema en iOS
- [ ] Foco de teclado visible en el input y en ambos botones; el input tiene label asociado
- [ ] Contraste AA en el texto sobre el fondo de la sección de captura
- [ ] El contenido existente del caso quedó intacto — verificar en el diff
- [ ] Sin dependencias nuevas
- [ ] `prefers-reduced-motion` respetado si se añadió cualquier transición
