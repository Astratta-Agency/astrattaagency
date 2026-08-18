# CLAUDE.md — Astratta Agency

Reglas operativas para cualquier sesión de Claude Code en este repo.

---

## REGLAS NO NEGOCIABLES

### 1. El copy no se inventa
Todo el texto visible del sitio sale de **`docs/CONTENIDO-Web-EN-ES.md`**.

**NUNCA** inventes copy, precios ni claims. Si falta un bloque, **pregunta** — no lo rellenes con texto plausible. Un placeholder inventado que llega a producción es peor que una página incompleta.

La arquitectura de producto vive en `docs/Astratta-Arquitectura-Completa-de-Servicios.md`. Es contexto estratégico; el copy manda desde el doc de contenido.

### 2. EN y ES siempre juntos
Todo cambio se hace en **inglés y español a la vez**. Una página sin su versión en español está **incompleta** y no se da por terminada.

El sistema ya lo fuerza: `src/locales/es/*.ts` está tipado como `typeof en`, así que una clave que falte en ES es **error de compilación** (`tsc -b` corre antes del build). No lo desactives.

### 3. El español NO es traducción
Usa la versión ES del documento **tal cual está escrita**. Es otro registro, no una traducción literal del inglés. No "mejores" el español para acercarlo al inglés.

### 4. Precios vigentes (fuente única)

| Producto | Precio | Recurrencia |
|---|---|---|
| Diagnostic / Diagnóstico | **$297** | Única (acreditable) |
| Foundation Lite | **$1,200** | Única |
| Foundation | **$3,500** | Única |
| Foundation Pro | **$6,500** | Única |
| START | **$697** | Mensual · mín. 3 meses |
| BUILD | **$1,800** | Mensual · mín. 3 meses |
| ENGINE | **$2,500** | Mensual · mín. 6 meses |
| SCALE | **$4,500** | Mensual · mín. 12 meses |

Setup del Motor: START $500 · BUILD $1,200 · ENGINE $1,500 · SCALE $2,500 — **incluido gratis** con Foundation + Motor mínimo 6 meses.

### 5. Precios ELIMINADOS — no deben aparecer en ningún lado

`$800` (Landing Essentials) · `$2,000` (Website Core) · `$2,500` de Conversion Funnel · `$450` (Social Media) · `$200/mo` (Paid Ads) · `$1,200/mo` (Lead Gen System) · `$100/mo` (mantenimiento)

⚠️ **Cuidado con los falsos positivos.** Algunas de esas cifras siguen siendo válidas en otro contexto y **no** deben borrarse:
- `$1,200` es válido como **Foundation Lite** y como setup de BUILD — lo eliminado es `$1,200/mo` de Lead Gen.
- `$2,500` es válido como **ENGINE $2,500/mo**, como setup de SCALE y como `E-commerce desde $2,500` — lo eliminado es el Conversion Funnel de $2,500.
- `$200`/`$800` aparecen dentro de rangos legítimos (presupuesto de anuncios `$800–1,500`).

Verifica el contexto antes de borrar. Nunca hagas un find-and-replace ciego sobre cifras.

### 6. Growth Score ≠ Diagnostic
Son **productos distintos**:
- **Growth Score** — gratis, 12 preguntas, 4 minutos, automático. Vive en `/growth-score`.
- **Diagnostic / Diagnóstico** — **$297**, 7 días, humano, entregable real. Vive en `/diagnostic`.

**Nunca** uses "diagnostic" / "diagnóstico" para referirte al quiz gratis. Nunca uses "audit" / "auditoría gratis" para nada.

### 7. Ninguna URL se borra sin 301
El sitio tiene rankings reales (`web development pricing Dallas`, `how much does a website cost in Dallas`). Toda URL que desaparezca necesita **redirect 301**.

Los redirects van en `vercel.json` (hoy solo tiene `headers` — hay que añadir el bloque `redirects`). Un redirect solo en cliente no transfiere autoridad SEO.

### 8. Un solo CTA final en todo el sitio
**`/diagnostic`**. Nada de "free audit" / "auditoría gratuita" en ningún lugar.

Excepción única y explícita: `/pricing` y el resultado del Growth Score pueden enlazar a `/growth-score` como paso intermedio, y el resultado del Growth Score enruta por revenue (>$80K → llamada; $30–80K → `/diagnostic`; <$30K → `/systems`).

### 9. Nunca se fabrica un caso de éxito
El bloque "Caso del rubro" de las páginas de industria tiene **dos modos**, y la elección no es estética — es de honestidad:

| Industria | Modo | Contenido |
|---|---|---|
| Home Improvement | `case` | `amazons-flooring` + testimonio de George Lopez |
| Restaurants | `case` | `perreando-hotdog-social-media` — 292K vistas, 90 días, $0 en ads |
| Med Spa | `metrics` | "Lo que medimos" — los 5 KPIs del rubro (§11.2) |
| Real Estate | `metrics` | "Lo que medimos" + la nota honesta de los 90 días |

El modo `metrics` lista **cinco** KPIs y cierra con una línea propia por industria (§11.2):
- Med Spa — EN: `If your current agency isn't reporting these five, ask them why.` · ES: `Si tu agencia actual no te reporta estos cinco, pregúntale por qué.`
- Real Estate — cierra distinto, con la nota honesta: `We won't promise closings in 90 days…`

⚠️ No confundir con **"Los tres números de tu negocio"**, que es el bloque 2 de la misma página (§5) y sí son tres. `metrics` es el bloque 6 y son cinco.

Cumple la función de credibilidad **sin fabricar nada**. Cuando una industria tenga números reales (p. ej. 180 Grados), se cambia `mode` de `metrics` a `case` y ya. **Nunca** inventes un caso para llenar el bloque.

### 10. Al redirigir, el SEO se migra antes
Antes de mandar una URL a un 301, **migra su texto SEO a una sección de la página destino**. Las keywords sobreviven en una página relevante; la URL commodity desaparece.

Aplica a `/services/social-media`, `/services/paid-ads` y `/services/lead-generation` → destino `/systems`. Son las páginas commodity de las que el negocio se está alejando: mantenerlas vivas contradiría el reposicionamiento entero.

`/services/web-development` y `/services/digital-marketing` **sí se conservan vivas** (rankean para términos de alta intención), reescritas para apuntar a `/foundation` y `/systems`.

**Tabla de redirects (decidida — no improvises destinos):**

| URL actual | Destino | Trato |
|---|---|---|
| `/audit` | `/diagnostic` | ✅ 301 aplicado |
| `/packages` | `/systems` | ✅ 301 aplicado |
| `/services` (índice) | `/how-it-works` | ✅ 301 aplicado |
| `/services/social-media` | `/systems` | ✅ 301 aplicado · SEO migrado a `/systems` |
| `/services/paid-ads` | `/systems` | ✅ 301 aplicado · SEO migrado a `/systems` |
| `/services/lead-generation` | `/systems` | ✅ 301 aplicado · SEO migrado a `/systems` |
| `/services/graphic-design` | `/foundation` | ✅ 301 aplicado · SEO migrado a `/foundation` |
| `/services/ecommerce` | — | **se conserva viva**, reescritura corta → `/foundation` (§12: intención de búsqueda propia y válida) |
| `/services/web-development` | — | **se conserva viva**, reescrita → `/foundation` |
| `/services/digital-marketing` | — | **se conserva viva**, reescrita → `/systems` |
| `/pricing` | — | se conserva, reescrita a rangos |
| `/contact` | — | se conserva, sale del nav → footer |

Cada 301 tiene su gemelo en español (`/es/auditoria` → `/es/diagnostico`, etc.).

**Los 301 se replican client-side.** Un redirect de `vercel.json` solo dispara en
peticiones reales, no en navegación dentro del SPA. `RETIRED_SERVICE_ROUTES` en
`src/App.tsx` mantiene el gemelo en cliente para que una misma URL nunca dé dos
respuestas distintas. Si añades un 301, añádelo en los dos sitios.

**Al retirar una página, sácala también del bundle.** No basta con el 301: hay
que borrar el componente, su entrada en `SERVICE_PAGES`/`SERVICE_SLUGS`/`PAGE_ROUTES`
y sus locales — si no, sigue en `getAllSeoRoutes()` y por tanto en el sitemap y en
el prerender, que es exactamente el error que el 301 intenta evitar.

### 11. `/contact` se queda
Quitar el contacto de un sitio de servicios destruye confianza — más aún en un mercado ya quemado por agencias. Sale del **nav principal**, vive en el **footer**, simplificada.

### 12. Marca
- **Paleta:** primary `#5140f2` · secondary `#ff7503` · neutral `#eaeaea` · ink `#0e0e12`
- **Tipografía:** Mulish — Bold / Regular / Light *(nota: solo están cargados los pesos 300/400/600/700/800; no uses `font-black`/900)*
- **Estética:** minimalista, premium, abstracto, influencia italiana

Los tokens viven en `src/index.css` bajo `@theme` (Tailwind v4, sin archivo de config JS). No hardcodees hex en componentes; usa `bg-primary`, `text-ink`, etc.

---

## CÓMO FUNCIONA ESTE REPO

### Stack
React 19.2 · Vite 8.1 · react-router-dom 7.18 · TypeScript 6.0 · Tailwind v4 (CSS-first) · framer-motion 12 · Lenis (smooth scroll). **Sin CMS** — todo el contenido vive en TypeScript bajo `src/data/` y `src/locales/`.

### i18n — el sistema es propio, no una librería
- Inglés en la raíz (`/foundation`), español bajo `/es/` **con slugs traducidos** (`/es/base`).
- El idioma se deriva de **la URL**, no de `localStorage`. `LanguageProvider` va **dentro** del router.
- Rutas y slugs se declaran en **`src/lib/i18n/routes.ts`** (`ROUTE_DEFS`, `SERVICE_SLUGS`). Añadir una página = añadir una entrada ahí + una en `PAGE_ROUTES` de `src/App.tsx`; ambos árboles (EN/ES) se generan solos.
- Dos formas de consumir texto: `dict.<namespace>` (chrome de UI, en `src/locales/{en,es}/`) y `pick(bilingual)` / `resolve*(source, language)` (contenido, en `src/data/`).

### Contratos que hay que respetar
- **`<Link>`** — importa siempre desde `@/components/ui/Link`, **nunca** de `react-router-dom`. Recibe la ruta **canónica en inglés** (`/foundation`) y la localiza sola.
- **`<Seo>`** — recibe también la ruta **canónica en inglés**. Genera canonical + `hreflang` en/es/x-default por su cuenta.
- **Slugs de contenido** — al enlazar posts o casos, pasa `source.slug.en`, nunca el slug ya resuelto.

### SEO y build
- `npm run build` = `tsc -b` + `vite build` + `postbuild`.
- El `postbuild` genera `dist/sitemap.xml` y **prerenderiza las 48 rutas** validando title/description/canonical/og/hreflang/`lang` contra `src/lib/seo-data.ts`. **Si algo no cuadra, el build falla.** Esa es la red de seguridad — no la desactives.
- Añadir una página nueva implica añadir su entrada a `STATIC_SEO` en `src/lib/seo-data.ts`, o el prerender no la cubrirá.
- Componentes que hagan `createPortal` a `<body>` deben contemplarse en `scripts/prerender.mjs` (ya limpia los hijos de `body` que no sean `#root`).

### Componentes reutilizables
Antes de crear uno nuevo, revisa: `PricingTable`, `FaqAccordion`/`Accordion`, `ServiceProcess` (timeline), `ServiceBenefits`, `ServiceFrustrations`, `AddOnsList`, `ProofSnapshot`, `ProofGallery`, `Breadcrumbs`, `ContactForm`, `NewsletterForm`, `MagneticButton`, `RevealText`, `Container`, `SectionLabel`, `Counter`, `JsonLd`.

El motor de formulario multi-paso (stepper + barra de progreso + back) ya existe en `src/pages/Pricing.tsx` sobre `src/lib/quiz.ts` — reúsalo como patrón para el Growth Score.

### Animación
Variantes compartidas en `src/lib/animations.ts` (`EASE`, `fadeUp`, `scaleIn`, `staggerContainer`, `viewportOnce`). Respeta `usePrefersReducedMotion()`. Lenis controla el scroll: para anclas usa `useLenis()` → `lenis.scrollTo(el, { offset })`, nunca `scroll-behavior: smooth`.

---

## FLUJO DE TRABAJO

1. Antes de escribir copy, **localiza el bloque exacto** en `docs/CONTENIDO-Web-EN-ES.md`.
2. Si no existe → **pregunta**. No inventes. Los huecos abiertos se registran en `docs/COPY-PENDIENTE.md`.
3. Escribe EN y ES en el mismo commit.
4. `npm run build` debe pasar (valida traducciones y SEO de las 48+ rutas).
5. Verifica en ambos idiomas antes de dar algo por hecho.
