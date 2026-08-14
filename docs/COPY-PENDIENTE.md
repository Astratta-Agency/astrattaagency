# COPY PENDIENTE

> **Estado: cerrado.** El doc de contenido incorporó §11 (huecos resueltos) y §12
> (tabla final de redirects), así que ya no hay copy pendiente de escribir.
> Este archivo queda como registro de origen del copy que se autorizó fuera del
> doc durante las Fases 1 y 2.

| Bloque | Qué es | Estado |
|---|---|---|
| **A** | Meta description del home | ✅ aplicado — Fase 1 |
| **B** | Meta de `/diagnostic` | ✅ aplicado — Fase 1 |
| **C v1** | FAQ "cómo empiezo" (versión diagnóstico) | ✅ aplicado — Fase 1 |
| **C v2** | FAQ "cómo empiezo" (versión Growth Score) | ⏳ Fase 5 — reemplaza a C v1 |
| **D** | Prosa de 2 artículos → Growth Score | ⏳ Fase 5 |
| **E** | `localSeo.paragraph2` del home | ✅ aplicado — Fase 1 |
| **F** | Meta de `/foundation` y `/systems` | ✅ aplicado — Fase 2 |
| **G** | Meta de `/how-it-works` | ⚠️ provisional, derivada del doc |
| **H** | Índice `/industries` · FAQ · línea `metrics` | ✅ **resuelto en el doc §11** |

**Las metas siguen siendo el único hueco estructural.** El doc no define meta
title/description para ninguna página nueva; las de `/how-it-works` y las que
vienen (`/industries/*`, `/growth-score`, `/pricing`) se derivan del H1 y el
subtítulo salvo que se escriban aparte.

---

## A · Meta description del HOME
`src/lib/seo-data.ts:39-50` · El snippet que Google muestra del home.
El **title no cambia** (no menciona auditoría). Solo la description.

**EN actual** (159 car.):
> Astratta builds high-converting websites, funnels, and digital marketing campaigns for Dallas–Fort Worth startups and small businesses. **Get a free website audit.**

→ NUEVO EN:
```
Astratta builds high-converting websites and growth systems for Dallas–Fort Worth businesses. Start with a $297 diagnostic — 7 days, 10 prioritized fixes.
```

**ES actual** (178 car.):
> Astratta crea sitios web, embudos y campañas de marketing digital de alta conversión para startups y pequeños negocios de Dallas–Fort Worth. **Solicita una auditoría gratuita.**

→ NUEVO ES:
```
Astratta crea sitios web y sistemas de crecimiento para negocios de Dallas–Fort Worth. Empieza con un diagnóstico de $297 — 7 días, 10 arreglos priorizados.
```

*Restricción: 150–160 caracteres ideal para no truncarse en Google. Debe cerrar con el diagnóstico de $297 en vez de la auditoría gratis.*

---

## B · Meta title + description de `/diagnostic`
`src/lib/seo-data.ts:124-135` · Hoy es `/audit`; la entrada se renombra a `/diagnostic`.
Es la página del CTA único del sitio, así que es la meta más importante después del home.

**EN actual:**
> **title:** Free Website Audit — Astratta Agency | Dallas, TX
> **description:** Get a free website audit from Astratta Agency: a prioritized action plan covering performance, mobile UX, messaging, conversion paths, and SEO — for Dallas–Fort Worth businesses.

→ NUEVO EN title:
```
Marketing & Website Diagnostic — Dallas, TX | Astratta
```
→ NUEVO EN description:
```
A 7-day diagnostic of your funnel, tracking and local presence for Dallas–Fort Worth businesses. 10 fixes ranked by return. $297, credited if you hire us.
```

**ES actual:**
> **title:** Auditoría Gratuita de Sitio Web — Astratta Agency | Dallas, TX
> **description:** Recibe una auditoría gratuita de tu sitio web: un plan de acción priorizado que cubre rendimiento, experiencia móvil, mensaje, rutas de conversión y SEO — para negocios de Dallas–Fort Worth.

→ NUEVO ES title:
```
Diagnóstico de Marketing y Sitio Web — Dallas, TX | Astratta
```
→ NUEVO ES description:
```
Un diagnóstico de 7 días de tu embudo, medición y presencia local en Dallas–Fort Worth. 10 arreglos ordenados por retorno. $297, acreditables al contratar.
```

*Insumos disponibles en `CONTENIDO-Web-EN-ES.md` §6: "Siete días. Un documento." · el listado de qué incluye · la garantía de reembolso · $297 acreditables.*

---

## C · FAQ "¿cómo empiezo?"
src/data/faq.ts:118-126 · La pregunta no cambia.

Decisión: dos versiones, por fase. El Growth Score convierte mejor en esta pregunta — es de alguien que aún no confía — pero no existe hasta la Fase 5. Así que se implementa la v1 ahora y se reemplaza después.

→ FASE 1 (implementar ahora)

EN

Start with the diagnostic — seven days, one document. We audit your site, funnel, tracking, local presence and competitors, then hand you the ten fixes that matter most, ranked by return, plus a 7-day and 30-day plan. It's $297, credited in full if we work together. You'll have a clear scope and timeline before any build work begins.

ES

Empieza con el diagnóstico — siete días, un documento. Auditamos tu sitio, tu embudo, tu medición, tu presencia local y tu competencia, y te entregamos los diez arreglos que más importan, ordenados por retorno, más un plan de 7 y 30 días. Son $297, acreditables completos si trabajamos juntos. Vas a tener un alcance y cronograma claros antes de que empiece cualquier construcción.
→ FASE 5 (reemplazar cuando /growth-score exista)

EN

Start with the Growth Score — twelve questions, four minutes, free. It tells you which stage your business is in and where your biggest gaps are. If you want the deeper version, the diagnostic goes seven days into your funnel, tracking, local presence and competitors, and hands you the ten fixes that matter most. It's $297, credited in full if we work together.

ES

Empieza con el Growth Score — doce preguntas, cuatro minutos, gratis. Te dice en qué etapa está tu negocio y dónde están tus fugas más grandes. Si quieres la versión profunda, el diagnóstico entra siete días en tu embudo, tu medición, tu presencia local y tu competencia, y te entrega los diez arreglos que más importan. Son $297, acreditables completos si trabajamos juntos.

Acción: agrega esto como tarea explícita de la Fase 5, o se va a olvidar.


---

## D · Prosa dentro de 2 artículos publicados → apunta a `/growth-score`
`src/data/blogPosts.ts` · Post `traffic-no-leads-dallas`, último párrafo.
**Decidido:** reescribir hacia `/growth-score` (mantiene la promesa de "sin costo" que el artículo ya le hizo al lector).

⚠️ **Se ejecuta en la Fase 5**, no en la 1 — `/growth-score` no existe antes y quedaría un enlace roto.

**EN actual** (solo cambia la frase final):
> …swap vague trust language for one real number or quote per section. **We cover exactly this in a free website audit** — a prioritized list of what's costing you leads today, not a 40-page report you'll never open.

→ NUEVO EN (frase final):
```
…swap vague trust language for one real number or quote per section. **Take the free Growth Score** — twelve questions that tell you which stage your business is in and where the biggest gaps are, not a 40-page report you'll never open.
```

**ES actual:**
> …cambiar el lenguaje de confianza vago por un número o cita real por sección. **Cubrimos exactamente esto en una auditoría gratuita de sitio web** — una lista priorizada de qué te está costando leads hoy, no un reporte de 40 páginas que nunca abrirás.

→ NUEVO ES (frase final):
```
…cambiar el lenguaje de confianza vago por un número o cita real por sección. **Haz el Growth Score gratis** — doce preguntas que te dicen en qué etapa está tu negocio y dónde están las fugas más grandes, no un reporte de 40 páginas que nunca abrirás.
```

*El `**bold**` marca el enlace. Debe envolver una subcadena exacta de la prosa — ver el comentario de `BlogBlock` en `blogPosts.ts`.*

---

## No bloquean — se resuelven solos

Estos también dicen "free audit" pero **desaparecen con su página**, no necesitan copy nuevo:

| Dónde | Cuándo se resuelve |
|---|---|
| `locales/{en,es}/servicePages.ts` — 12 × `closingSubtext` | Fases 2 y 6, al reescribir/redirigir cada página de servicio |
| `locales/{en,es}/packages.ts` | Fase 6 — `/packages` redirige a `/systems` |
| `locales/{en,es}/digitalMarketing.ts` | Fase 6 — reescritura hacia `/systems` |
| `lib/quiz.ts:204-205` | Fase 5 — el módulo se retira |
| `data/pricing.ts:181,429` | Fase 6 — además cargan precios muertos ($800 / $3,500+) |
| `lib/constants.ts:52` — footer "Free website audit" | Fase 1 — es label, el doc da el texto |

---

## E · Bloque `localSeo` del home *(adelantado a Fase 1)*
`src/locales/{en,es}/home.ts` · `localSeo.paragraph2`

Se adelanta desde la Fase 3 porque su enlace apunta a `/audit`, que muere en la Fase 1.
**Doble problema:** promete una auditoría *gratis y sin compromiso*, y presenta social media, paid ads y lead generation como **productos sueltos** — los tres desaparecen como SKU.

**EN actual** (los `to:` son enlaces internos dentro del párrafo):
> Not sure whether the problem is your site, your traffic, or your follow-up? Start with a free **[website audit → /audit]** — a straight read on performance, messaging, and conversion paths for any Dallas–Fort Worth business, no obligation attached. From there, our **[digital marketing → /services/digital-marketing]** programs cover social media, paid ads, and full lead generation systems for small businesses in DFW, each measured against leads and cost per lead — not likes, not impressions.

→ NUEVO EN:
```
Not sure whether the problem is your site, your traffic, or your follow-up? That's what **the diagnostic** answers — seven days of analysis on your funnel, tracking and local presence, with the ten fixes that matter most ranked by return. From there, our digital marketing systems for Dallas–Fort Worth small businesses combine content, paid ads and follow-up automation into one measured pipeline — judged on leads and cost per lead, not likes, not impressions.
```

**ES actual:**
> ¿No sabes si el problema es tu sitio, tu tráfico o tu seguimiento? Empieza con una **[auditoría de sitio web → /audit]** gratuita — un análisis directo del rendimiento, mensaje y rutas de conversión para cualquier negocio de Dallas–Fort Worth, sin compromiso. A partir de ahí, nuestros programas de **[marketing digital → /services/digital-marketing]** cubren redes sociales, anuncios pagados y sistemas completos de generación de leads para pequeños negocios en DFW, cada uno medido por leads y costo por lead — no likes, no impresiones.

→ NUEVO ES:
```
¿No sabes si el problema es tu sitio, tu tráfico o tu seguimiento? Eso es exactamente lo que responde **el diagnóstico** — siete días de análisis sobre tu embudo, tu medición y tu presencia local, con los diez arreglos que más importan ordenados por retorno. A partir de ahí, nuestros sistemas de marketing digital para pequeños negocios de Dallas–Fort Worth combinan contenido, publicidad paga y automatización de seguimiento en un solo canal medido — evaluado por leads y costo por lead, no por likes ni impresiones.
```

*Es un bloque de SEO local: conviene conservar densidad de "Dallas–Fort Worth" y términos de servicio. Los enlaces se marcan igual que hoy (segmentos con `to:`); destinos disponibles: `/diagnostic`, `/foundation`, `/systems`.*

### Quedan para la Fase 3 (reescritura del home, §8 del doc)
| Clave | Actual | Por qué muere |
|---|---|---|
| `home.hero.ticker` | `Web Development · Digital Marketing · Graphic Design · Website Audits` | Son las 4 disciplinas viejas |
| `home.process.heading` | `From audit to launch.` / `De la auditoría al lanzamiento.` | El proceso ya no arranca en auditoría |
| `services.ts` | `four service lines` · `website-audits: Free` | Arquitectura vieja completa |


---

## F · Meta de `/foundation` y `/systems`
`src/lib/seo-data.ts`

§3 y §4 dan el H1 y el subtítulo, pero **no** meta title/description. El prerender exige una entrada por ruta, así que quedaron **derivadas del propio copy del doc** — sin claims inventados, pero sin tu criterio editorial tampoco.

**`/foundation` — actual (provisional):**
> EN title: `Foundation — Websites, Brand & Tracking | Astratta Agency Dallas`
> EN desc: `A site that converts, a brand that holds up, and measurement wired in from day one. One-time projects from $1,200 to $6,500 for Dallas–Fort Worth businesses.`
> ES title: `Base — Sitios Web, Marca y Medición | Astratta Agency Dallas`
> ES desc: `Un sitio que convierte, una marca que se sostiene y medición conectada desde el día uno. Proyectos de pago único de $1,200 a $6,500 para negocios de Dallas–Fort Worth.`

→ REEMPLAZO (si quieres afinarlo):
```
/foundation

EN title (56)

Website Design & Brand Foundation — Dallas, TX | Astratta

EN description (150)

High-converting websites, brand identity and tracking built together. Three levels from $1,200 to $6,500 for Dallas–Fort Worth businesses. Flat pricing.

ES title (52)

Diseño Web y Marca para Negocios de Dallas | Astratta

ES description (154)

Sitios que convierten, identidad de marca y medición construidos juntos. Tres niveles de $1,200 a $6,500 para negocios de Dallas–Fort Worth. Precio cerrado.
```

**`/systems` — actual (provisional):**
> EN title: `Growth Systems — Ads, Content & Follow-up | Astratta Agency Dallas`
> EN desc: `Ads, content and follow-up run as one system for Dallas–Fort Worth businesses — measured in customers, not likes. Four levels from $697 to $4,500 a month.`
> ES title: `Sistemas de Crecimiento — Anuncios, Contenido y Seguimiento | Astratta`
> ES desc: `Anuncios, contenido y seguimiento funcionando como un solo sistema para negocios de Dallas–Fort Worth — medidos en clientes, no en likes. Cuatro niveles de $697 a $4,500 al mes.`

→ REEMPLAZO (si quieres afinarlo):
```
/systems

EN title (57)

Digital Marketing Systems for Dallas Businesses | Astratta

EN description (154)

Content, paid ads and follow-up automation running as one system. Four levels from $697 to $4,500/month for Dallas–Fort Worth businesses. Measured in leads.

ES title (51)

Marketing Digital para Negocios de Dallas | Astratta

ES description (148)

Contenido, publicidad paga y automatización de seguimiento en un solo sistema. Cuatro niveles de $697 a $4,500/mes para negocios de Dallas–Fort Worth.
```

*Nota: las mismas páginas volverán a necesitar meta propia para `/how-it-works`, `/industries/*`, `/growth-score` y el `/pricing` reescrito. Conviene decidir si las escribes tú o si se derivan así por defecto.*


---

## G · Meta de `/how-it-works` *(provisional)*
`src/lib/seo-data.ts` · §2 no trae meta. Derivada del H1 y el subtítulo, igual que el bloque F antes de que lo afinaras.

> EN title: `How We Work — Diagnostic, Foundation, Engine | Astratta Dallas`
> EN desc: `One system instead of a menu of services: a diagnostic first, then the foundation, then the engine. How Astratta works with Dallas–Fort Worth businesses.`
> ES title: `Cómo Trabajamos — Diagnóstico, Base y Motor | Astratta Dallas`
> ES desc: `Un sistema en vez de un menú de servicios: primero el diagnóstico, después la base y luego el motor. Así trabaja Astratta con negocios de Dallas–Fort Worth.`

→ REEMPLAZO:
```

```

---

## H · Lo que bloquea la Fase 4 (industrias)

### H1 · Página índice `/industries`
El mapa del sitio la incluye como nodo padre de las cuatro, pero **§5 solo define las hijas**. Sin copy no existe la página — y el nav §7 la necesita como destino del dropdown.

→ H1, subtítulo y, si aplica, el texto que acompaña a cada una de las 4 tarjetas:
```

```

*Alternativa sin copy nuevo: que "Industries" en el nav sea solo un menú desplegable sin página propia. Dime si prefieres eso y el bloque se cierra.*

### H2 · FAQ de Restaurantes y Real Estate
§5.1 (med spa) y §5.2 (home improvement) traen FAQ del rubro. §5.3 y §5.4 **no**. La plantilla de 8 bloques las pide.

→ Restaurantes (2 preguntas EN + ES):
```

```
→ Real Estate (2 preguntas EN + ES):
```

```

*Alternativa: omitir el bloque FAQ en esas dos páginas. La plantilla no se rompe — simplemente tienen 7 bloques en vez de 8.*

### H3 · Versión EN de la línea de cierre del modo `metrics`
Me diste la española: *"Si tu agencia actual no te reporta estos tres, pregúntale por qué."*
Falta la inglesa (Regla 3: el español no es traducción, así que no la derivo yo).

→ EN:
```

```
