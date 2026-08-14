# PROMPTS PARA CLAUDE CODE
### Reestructuración completa de astrattaagency.com
**Astratta Agency · Agosto 2026 — v2 (incluye Growth Score)**

---

## ESTRUCTURA FINAL A CONSTRUIR

```
/                          Home
/how-it-works              Diagnóstico → Base → Motor
/foundation                Lite $1,200 · Foundation $3,500 · Pro $6,500
/systems                   START $697 · BUILD $1,800 · ENGINE $2,500 · SCALE $4,500
/industries                Hub + 4 páginas (el conector)
/growth-score              Quiz gratis, 12 preguntas → /growth-score/result
/diagnostic                $297 — el único CTA del sitio
/pricing                   Transparencia (rangos), no catálogo
/work · /about             Sin cambios mayores

Todo en EN y ES.
```

---

## ANTES DE EMPEZAR

**1. Copia estos archivos a `/docs` en tu repo:**
- `CONTENIDO-Web-EN-ES.md` ← el copy de todas las páginas + las 12 preguntas del quiz
- `Astratta-Arquitectura-Completa-de-Servicios.md` ← la estrategia

Sin ellos, Claude Code inventa texto y precios.

**2. Ejecuta en orden.** Un branch por bloque. No los pegues todos juntos.

---

# PROMPT 0 · Contexto y reglas

```
Vas a reestructurar la arquitectura de servicios de astrattaagency.com.

Primero, sin escribir código:

1. Explora el repo y dime:
   - Framework, versión, estructura de routing
   - Cómo está implementado el i18n EN/ES: dónde viven las traducciones,
     cómo se resuelve el locale, qué formato usan los archivos
   - Dónde vive el contenido de las páginas de servicios actuales
   - Cómo se manejan title, description, canonical y hreflang
   - Si hay CMS o design system, y cuál
   - Qué componentes reutilizables existen para: hero, tabla de precios,
     FAQ, timeline, tarjetas, CTA, formularios multi-paso

2. Lee /docs/CONTENIDO-Web-EN-ES.md y
   /docs/Astratta-Arquitectura-Completa-de-Servicios.md

3. Crea CLAUDE.md en la raíz con estas reglas:

   REGLAS NO NEGOCIABLES
   - Todo el texto visible sale de /docs/CONTENIDO-Web-EN-ES.md.
     NUNCA inventes copy, precios ni claims. Si falta algo, pregunta.
   - Todo cambio se hace en EN y ES a la vez. Una página sin su versión
     en español está incompleta.
   - El español NO es traducción del inglés. Usa la versión ES tal cual.
   - Precios vigentes (fuente única): Diagnostic $297 · Foundation Lite
     $1,200 · Foundation $3,500 · Foundation Pro $6,500 · START $697 ·
     BUILD $1,800 · ENGINE $2,500 · SCALE $4,500
   - Precios ELIMINADOS, no deben aparecer en ningún lado: $800, $2,000,
     $2,500 de funnel, $450, $200, $1,200/mo de lead gen, $100/mo
     de mantenimiento
   - Growth Score (gratis) y Diagnostic ($297) son productos DISTINTOS.
     Nunca uses "diagnostic/diagnóstico" para referirte al quiz gratis.
   - Nunca borres una URL sin redirect 301. El sitio tiene rankings.
   - Un solo CTA final en todo el sitio: /diagnostic. Nada de "free audit".
   - Paleta: primary #5140f2, secondary #ff7503, neutral #eaeaea.
     Tipografía Mulish (Bold/Regular/Light). Minimalista, premium,
     abstracto, influencia italiana.

4. Dame un plan de implementación por fases antes de tocar nada.
```

---

# PROMPT 1 · Quick wins (hazlo hoy)

```
Cambios urgentes en el sitio actual, sin crear páginas nuevas.
Aplica todo en EN y ES.

1. Elimina la línea "Paid Ads — FROM $200/MO + AD SPEND" y su equivalente
   en español. Reemplaza el texto de esa tarjeta por
   "Included in every system" / "Incluido en todos los sistemas",
   sin precio.

2. Busca en TODO el repo cualquier variante de "free audit" /
   "auditoría gratis" / "Book a free audit" — botones, formularios,
   metadatos, hero, footer, alt text — y reemplaza por:
   EN: "Get your diagnostic — $297"
   ES: "Agenda tu diagnóstico — $297"
   Todos apuntan a /diagnostic (crea la ruta como placeholder si no existe).

3. En /services/digital-marketing, quita los precios de
   "Social Media $450/mo" y "Paid Ads $200/mo". Deja las tarjetas
   descriptivas sin precio, con CTA al diagnóstico.

4. Corre una búsqueda global y lístame TODOS los lugares donde aparecen
   los precios eliminados. No los cambies aún — solo dame el inventario
   con archivo y línea.

Al terminar: diff resumido y confirmación de que no queda ningún
"free audit" ni "$200/mo" en ninguno de los dos idiomas.
```

---

# PROMPT 2 · Página `/systems` (El Motor)

```
Crea /systems (EN) y su equivalente ES, siguiendo la convención de
rutas i18n que ya usa el sitio.

Contenido: sección 4 de /docs/CONTENIDO-Web-EN-ES.md. Texto exacto.

Bloques en orden:
1. Hero con H1, subheadline y dos CTAs
2. "Qué hay adentro" — 4 tarjetas (Contenido, Publicidad, Captura y
   respuesta, Medición)
3. Tabla comparativa de los 4 niveles
4. Nota sobre el presupuesto de anuncios
5. FAQ (6 preguntas) con acordeón
6. CTA final al diagnóstico

Requisitos técnicos:
- La tabla debe ser responsive de verdad. En móvil, tarjetas apiladas
  por nivel con las filas como lista. NO scroll horizontal.
- BUILD marcado como "MOST POPULAR" / "MÁS CONTRATADO" en #ff7503.
- Reutiliza los componentes de pricing y FAQ existentes. Si no encajan,
  extiéndelos — no dupliques.
- IMPORTANTE: crea un archivo de datos único para precios y niveles
  (ej. /data/pricing.ts) con estructura para EN y ES. Todas las páginas
  y el Growth Score van a leer de ahí. Nada hardcodeado en JSX.
- SEO: title, meta description, canonical, hreflang EN↔ES.

Antes de escribir código, muéstrame el plan de componentes y el esquema
del archivo de datos.
```

---

# PROMPT 3 · Página `/foundation` (La Base)

```
Crea /foundation (EN) y su versión ES.

Contenido: sección 3 de /docs/CONTENIDO-Web-EN-ES.md.

Bloques:
1. Hero
2. Tres tarjetas: Foundation Lite $1,200 / Foundation $3,500 /
   Foundation Pro $6,500. Foundation marcado como el más contratado.
3. Nota "¿No sabes cuál te toca?"
4. Add-ons
5. Bloque "Del proyecto al motor" / "From project to engine" — explica
   que Foundation es el paso 2 de 3, enlaza a /systems, e incluye el
   incentivo: contratando Foundation + Motor con mínimo 6 meses, el
   setup del sistema va incluido (valor $1,200–$2,500).
6. CTA al diagnóstico

Requisitos:
- Precios desde /data/pricing.ts, el archivo creado en el prompt anterior.
- Reutiliza los componentes de tarjeta de /systems para que las dos
  páginas se vean como una misma familia.
- SEO con hreflang.

NO borres todavía /services/web-development. Eso se hace en el prompt 9.
```

---

# PROMPT 4 · Página `/how-it-works`

```
Crea /how-it-works y su versión ES.

Contenido: sección 2 de /docs/CONTENIDO-Web-EN-ES.md.

Bloques:
1. Hero
2. "Por qué cambiamos" — texto largo, tratamiento editorial, tipografía
   grande, mucho aire. Es posicionamiento: debe leerse como manifiesto,
   no como copy de venta.
3. Los tres pasos (Diagnóstico → Base → Motor) como timeline horizontal
   en desktop y vertical en móvil. Cada paso enlaza a su página.
4. Diagrama de arquitectura: una puerta, dos fases. SVG inline o CSS puro
   — nada rasterizado. Debe funcionar en dark mode y escalar bien.
5. CTA al diagnóstico

Requisitos:
- Diagrama con la paleta de marca, accesible (roles ARIA, texto
  alternativo descriptivo).
- Es la página de posicionamiento del sitio. Que respire.
```

---

# PROMPT 5 · Página `/diagnostic`

```
Crea /diagnostic y su versión ES. Es el destino final de todo el sitio.

Contenido: sección 6 de /docs/CONTENIDO-Web-EN-ES.md.

Bloques:
1. Hero con precio visible ($297)
2. Qué incluye — 9 ítems con íconos
3. Cómo funciona — 3 pasos: pagas, mandas accesos, entrega en 7 días
4. Garantía (acreditable + devolución si no hay 3 fugas cuantificables)
5. FAQ (2 preguntas)
6. Formulario de conversión
7. Bloque secundario al final: "¿Aún no sabes en qué etapa estás?
   Empieza con el Growth Score gratis" → /growth-score
   (EN: "Not sure what stage you're in? Start with the free Growth Score")

Formulario:
- Campos: nombre, email, teléfono, empresa, industria (select con las
  4 industrias + "Otra"), URL del sitio (opcional), mensaje
- Máximo 5 campos visibles; el resto con progressive disclosure
- Validación en cliente con errores claros, en el idioma activo
- Evento de conversión a GA4 y Meta CAPI al enviar
- Página propia de agradecimiento: /diagnostic/thank-you
- Accesible: labels reales (no placeholders como label), navegación por
  teclado, errores anunciados con aria-live

Si hay Stripe en el repo, conéctalo. Si no, deja el formulario y dime
qué haría falta para cobrar los $297.
```

---

# PROMPT 6 · Páginas de industria

```
Crea /industries (hub) y cuatro páginas hijas, en EN y ES:
- /industries/med-spa
- /industries/home-improvement
- /industries/restaurants
- /industries/real-estate

Contenido: sección 5 de /docs/CONTENIDO-Web-EN-ES.md.

Cada página usa la MISMA plantilla de 8 bloques:
1. Hero (H1 + problema del rubro)
2. "Los tres números de tu negocio" — 3 tarjetas
3. La ruta — timeline con mes, qué pasa e inversión
4. "Qué se ve distinto en tu rubro"
5. Punto de equilibrio — destacado, es el argumento de cierre
6. Caso del rubro — placeholder con estructura lista si aún no hay caso
7. FAQ del rubro
8. CTA al diagnóstico

Requisitos técnicos:
- UN solo componente de plantilla parametrizado por data. Los datos de
  cada industria en archivos separados (/data/industries/med-spa.ts) con
  versión EN y ES. No dupliques la plantilla cuatro veces — agregar una
  quinta industria después debe ser crear un archivo, no copiar código.
- El timeline enlaza a /foundation y /systems en los pasos que
  corresponden. Esa conexión es el objetivo entero de la página.
- El bloque de punto de equilibrio es el más prominente después del hero.
- SEO:
  · title EN: "Med Spa Marketing in Dallas–Fort Worth | Astratta"
  · title ES: "Marketing para Med Spas en Dallas–Fort Worth | Astratta"
  · Schema.org Service + LocalBusiness, areaServed = Dallas–Fort Worth
  · hreflang EN↔ES en las cuatro
- El hub /industries lista las cuatro con su frase de dolor.

Empieza por med-spa y home-improvement. Cuando las apruebe, seguimos.
```

---

# PROMPT 7 · Growth Score — la herramienta ⭐

```
Construye /growth-score y /growth-score/result, en EN y ES.

Contenido, preguntas, puntajes y lógica completa: sección 9 de
/docs/CONTENIDO-Web-EN-ES.md. Sigue esa spec al pie de la letra —
las tablas de puntaje están calibradas, no las cambies.

ALCANCE — ESTO ES UNA V1 LEAN. Construye SOLO esto:
✅ 12 preguntas en 6 pasos, una por pantalla en móvil
✅ Cálculo del score EN EL CLIENTE, sin backend
✅ Captura de contacto antes de mostrar el resultado
✅ Pantalla de resultado: score, 5 barras por pilar, nivel, 3 fugas,
   punto de equilibrio, CTA ruteado
✅ El lead va al CRM + notificación por email
✅ Bilingüe

NO construyas (queda fuera de la v1 a propósito):
❌ PDF descargable
❌ Secuencia de emails automatizada
❌ Guardar respuestas en base de datos
❌ Comparación contra promedio de industria (no tenemos esos datos)
❌ Login o "guardar y continuar"
❌ Dashboard interno

ESTRUCTURA DE DATOS
- Las preguntas, opciones, puntajes y textos de resultado van en un
  archivo de configuración (/data/growth-score.ts) con EN y ES.
  El componente NO debe tener texto ni números hardcodeados.
- Cada opción tiene: { label_en, label_es, points, pillar }
- Los 5 pilares suman 20 cada uno = 100. Valida esto con un test.

LÓGICA (spec en la sección 9.2 del doc)
- Nivel se asigna por revenue (Q2), no por score
- Excepción: si industria = restaurante y revenue < $45K, forzar START
- Si el pilar BASE < 10/20 → el resultado debe recomendar Foundation
  ANTES del sistema mensual, y cuál según revenue
- Las 3 fugas son los 3 pilares con menor puntaje
- Punto de equilibrio = retainer ÷ (ticket × margen de la industria)
- El CTA se rutea por revenue:
  · >$80K → link de calendario directo
  · $30–80K → /diagnostic
  · <$30K → /systems con enlace secundario al diagnóstico

UX
- Barra de progreso siempre visible
- Botón atrás siempre disponible, sin perder respuestas
- Una pregunta por pantalla en móvil, máximo dos en desktop
- Q2 (revenue) va en el paso 1 a propósito. No lo muevas al final.
- Las barras del resultado se animan al cargar
- El score en número grande, en #5140f2; las barras bajo 50% en #ff7503
- El bloque "Esto es lo que TÚ nos dijiste / El diagnóstico es lo que
  encontramos NOSOTROS" debe ser visualmente distinto del resto —
  es lo que evita que el quiz canibalice el diagnóstico pago

TÉCNICO
- Sin dependencias pesadas. Vanilla o el framework del sitio.
- El resultado debe tener URL compartible con los parámetros
  codificados, para poder mandarlo por WhatsApp
- Eventos GA4: inicio del quiz, cada paso completado, formulario
  enviado, clic en CTA final
- Debe verse impecable en móvil: se va a usar en el celular, sentada
  frente al cliente, en su oficina
- Accesible: navegación por teclado completa, fieldset/legend en cada
  pregunta, cambio de paso anunciado con aria-live

Antes de escribir código, muéstrame el esquema de /data/growth-score.ts
y cómo vas a calcular y rutear el resultado.
```

---

# PROMPT 8 · Transformar `/pricing`

```
/pricing existe y tiene tráfico. NO la borres. Conviértela de catálogo
en página de transparencia.

Contenido: sección 10 de /docs/CONTENIDO-Web-EN-ES.md. EN y ES.

1. Elimina todo el catálogo de SKUs con precio individual.

2. Nueva estructura:
   - Hero: "What this costs, honestly" / "Cuánto cuesta, honestamente"
   - Los rangos (4 bloques: Diagnóstico, Base, Sistemas, Presupuesto
     de anuncios)
   - "Qué determina tu número" — 3 puntos
   - "Qué NO cobramos" — 4 puntos
   - CTA principal → /growth-score
   - CTA secundario → /diagnostic

3. Conserva y reescribe el contenido SEO existente de la página.
   Si rankea para "agency pricing Dallas" o similar, ese texto se
   adapta, no se borra.

4. Los rangos salen de /data/pricing.ts. Si cambio un precio ahí,
   esta página debe reflejarlo sola.

5. Mantén la URL. Nada de redirects aquí.

Es una página estática de texto, no una herramienta. Rankea mejor así.
```

---

# PROMPT 9 · Navegación, home y redirects

```
Conectamos todo y limpiamos lo viejo.

A) NAVEGACIÓN
EN: How it works · Systems · Foundation · Industries (dropdown) ·
    Pricing · Work · About · [Get your diagnostic]
ES: Cómo trabajamos · Sistemas · Base · Industrias (dropdown) ·
    Precios · Trabajos · Nosotros · [Agenda tu diagnóstico]

- Dropdown de Industries con las cuatro industrias
- CTA destacado en #5140f2
- Menú móvil accesible: trampa de foco, cierre con Escape

B) HOME
1. Reemplaza el bloque "OUR SERVICES" (Web Development, Digital
   Marketing, Graphic Design, Website Audits) por "How it works" /
   "Cómo trabajamos" con los 3 pasos, enlazando a /how-it-works.
2. Agrega el bloque de Industrias (sección 8 del doc de contenido),
   4 tarjetas enlazando a sus páginas.
3. Agrega un bloque del Growth Score: "Where does your marketing
   actually stand? 12 questions, 4 minutes, free" / "¿En qué punto
   está realmente tu marketing? 12 preguntas, 4 minutos, gratis"
   → /growth-score
4. En FEATURED WORK, cada caso enlaza a su página de industria:
   - Amazon's Flooring → /industries/home-improvement
   - Perreando HotDog → /industries/restaurants
   - Los demás según corresponda; sin enlace si no encaja ninguna.
5. Todos los CTAs principales apuntan a /diagnostic.

C) REDIRECTS Y SEO — CRÍTICO, NO ROMPAS RANKINGS
El sitio rankea para "web development pricing Dallas" y "how much does
a website cost in Dallas". Esas URLs NO se borran.

1. /services/web-development → MANTENER viva. Reescribe: quita los 4
   planes con precio, conserva el texto SEO sobre desarrollo web en
   Dallas, agrega rangos ("desde $1,200") y CTA al diagnóstico.
   Enlaza a /foundation.
2. /services/digital-marketing → mismo tratamiento. Enlaza a /systems.
3. /services/graphic-design → 301 a /foundation. Antes de redirigir,
   migra el contenido SEO útil a una sección de /foundation.
4. /services/website-audits → 301 a /diagnostic.
5. Actualiza sitemap.xml con todas las páginas nuevas.
6. Verifica hreflang recíproco en TODAS las páginas nuevas y modificadas.
7. Dame la lista completa de redirects en formato tabla.
```

---

# PROMPT 10 · Verificación final

```
QA antes de publicar. Repórtame en checklist:

CONTENIDO
- [ ] Busca en todo el repo: "$200", "$450", "$800", "$2,000",
      "$1,200/mo", "$100/mo", "free audit", "auditoría gratis".
      Deben dar CERO resultados en texto visible. Lista cualquier hallazgo.
- [ ] Toda página nueva existe en EN y ES
- [ ] Nada sin traducir ni con placeholder tipo "TODO"
- [ ] Los precios del sitio coinciden con /data/pricing.ts
- [ ] El quiz gratis NUNCA se llama "diagnostic" o "diagnóstico"

GROWTH SCORE
- [ ] Los 5 pilares suman exactamente 100 (test automatizado)
- [ ] Cada combinación de revenue asigna el nivel correcto
- [ ] La excepción de restaurante < $45K funciona
- [ ] BASE < 10 dispara la recomendación de Foundation
- [ ] El punto de equilibrio calcula bien en las 5 industrias
- [ ] El CTA se rutea correcto en los 3 tramos de revenue
- [ ] El resultado es compartible por URL
- [ ] Funciona completo en móvil, de la Q1 al CTA

SEO
- [ ] Ninguna URL previa devuelve 404
- [ ] hreflang correcto y recíproco en todas
- [ ] Canonical correcto
- [ ] sitemap.xml actualizado
- [ ] Schema.org válido en industrias
- [ ] Un solo H1 por página

ACCESIBILIDAD
- [ ] Contraste WCAG AA, especialmente #ff7503 sobre blanco y
      #5140f2 sobre #eaeaea
- [ ] Teclado completo: dropdown, menú móvil, quiz
- [ ] Labels reales en todos los formularios
- [ ] Focus visible en todo elemento interactivo

RENDIMIENTO
- [ ] Lighthouse en /systems, /foundation, /growth-score y
      /industries/med-spa: las 4 métricas
- [ ] Imágenes optimizadas con lazy loading
- [ ] Sin layout shift en tablas de precios ni al avanzar el quiz

CONVERSIÓN
- [ ] Todo CTA final va a /diagnostic
- [ ] Formularios disparan a GA4 y Meta CAPI
- [ ] /diagnostic/thank-you existe y es rastreable
- [ ] Enlaces cruzados funcionan: industria → foundation → systems
- [ ] /pricing → /growth-score → /diagnostic funciona de punta a punta

Al final, resumen de lo pendiente o que requiera decisión mía.
```

---

# PROMPT 11 · Opcional — Calculadora de llamadas perdidas

```
Herramienta interactiva en /tools/missed-calls y su versión ES.

Qué hace: el contratista ingresa dos números y ve cuánto dinero perdió.

Inputs (sliders):
- Llamadas entrantes al mes (10–200)
- Ticket promedio de trabajo ($1,000–$30,000)
- Tasa de cierre estimada (10%–60%, default 30%)

Cálculo:
- Llamadas perdidas = entrantes × 35% (promedio de la industria)
- Trabajos perdidos = llamadas perdidas × tasa de cierre
- Dinero perdido = trabajos perdidos × ticket promedio
- Muestra también el anual

Output:
- Número grande, animado al mover los sliders, en #ff7503
- Debajo: "Eso es lo que se fue a tu competencia el mes pasado"
- CTA: "Agenda tu diagnóstico — $297"

Requisitos:
- Sin dependencias pesadas
- Impecable en móvil: se usa en el celular frente al cliente
- El supuesto del 35% visible como nota al pie con su fuente.
  Nada de números sin explicación.
- Schema.org WebApplication
- Eventos GA4 al mover sliders y al hacer clic en el CTA
- Enlace cruzado desde /industries/home-improvement
```

---

## ORDEN Y RIESGO

| # | Prompt | Cuándo | Riesgo |
|---|---|---|---|
| 0 | Contexto y reglas | Antes que todo | — |
| 1 | Quick wins | **Hoy** | Bajo |
| 2 | `/systems` | Semana 1 | Medio |
| 3 | `/foundation` | Semana 1 | Bajo |
| 4 | `/how-it-works` | Semana 2 | Bajo |
| 5 | `/diagnostic` | Semana 2 | Medio — toca pagos |
| 6 | Industrias | Semana 3 | Medio |
| 7 | **Growth Score** | Semana 3–4 | **Alto — lógica** |
| 8 | `/pricing` | Semana 4 | Bajo |
| 9 | Nav, home, redirects | Semana 4 | **Alto — SEO** |
| 10 | QA final | Semana 4 | — |
| 11 | Calculadora | Opcional | Bajo |

**Prompt 7** es el de mayor complejidad lógica. Pide el esquema de datos antes de que escriba código, y verifica a mano 3 o 4 combinaciones de respuestas contra la spec.

**Prompt 9** es el de mayor riesgo de negocio. Exporta la lista de URLs actuales y el sitemap antes de correrlo, y revisa Search Console la semana siguiente.
