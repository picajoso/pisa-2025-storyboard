# PISA 2025 Interactive Data Storyboard

Reportaje interactivo (scrollytelling) sobre los resultados PISA 2025 y su evolución
2015→2025. Datos verificados contra los Volúmenes I oficiales de la OCDE de cada ciclo.
**Web pública**: https://pisa-2025-storyboard.vercel.app (deploy automático desde `main`)
**Repo**: https://github.com/picajoso/pisa-2025-storyboard

## Tech Stack
- Framework: Vite + React 19 + TypeScript + Tailwind CSS **v4** (plugin `@tailwindcss/vite`, sin `tailwind.config.js` — la config va en `src/index.css` con `@theme`)
- Components & Icons: Lucide React
- Charts: Recharts v3 (⚠️ API de tooltips cambió: los `TooltipProps` tipados ya no exponen `payload`; usar props propias `{ active?, payload? }`)
- Animations: Framer Motion (`layoutId` para píldoras de tabs, `useScroll` para scrollytelling)
- Quality Checks: Run `npm run build` and `npm run lint` before completing tasks.

## Estructura

```
src/
├── data/
│   ├── pisaData.ts       # Datos España: 2025, históricos, CCAA, factores IA/bienestar
│   ├── worldData.ts      # Vista Mundo: evolución 2015→2025 de 33 sistemas
│   └── oddCases.ts       # Fact-checks de titulares virales (sección casos raros)
├── components/           # Un componente por sección (ver abajo)
└── lib/format.ts         # fmt(): números al estilo español (coma decimal, − tipográfico)
```

## Arquitectura de la app

`App.tsx` mantiene dos vistas con pestañas (`spain` | `world`) usando `AnimatePresence`:

**Vista 🇪🇸 España** (11 secciones):
1. `Hero` — KPIs animados (count-up con `AnimatedNumber`)
2. `HistoricalLines` — líneas 2015→2025 España vs OCDE, tabs por materia
3. `CycleStory` — scrollytelling 2015/2018/2022/2025 con rail de progreso
4. `ScoreBarChart` — ranking internacional con tabs Ciencias/Mates/Lectura
5. `RegionalGap` — 18 CCAA + Ceuta/Melilla, barras divergentes vs media España
6. `AiDebate` — tarjetas expandibles sobre IA
7. `ComputationalSection` + `TalentSection` (mismo archivo `TalentAndComputational.tsx`) — efecto calculadora y pirámide de talento
8. `GenderGaps` — brechas de género divergentes
9. `EquityContext` — 6 tarjetas de equidad España vs OCDE
10. `WellbeingParadox` — pertenencia escolar (gráfico divergente)

**Vista 🌍 Mundo** (3 secciones):
1. `WorldHero`
2. `WorldTrends` (`#mapa`, `#conclusiones`) — ranking de evolución con ficha interactiva por país (clic en barra) y mini gráfico de líneas por materia
3. `OddCases` (`#casos`) — fact-checks con badges de veredicto

`SectionNav` (barra superior fija) cambia sus enlaces según la vista activa.

## Fuentes de datos y convenciones críticas

**NUNCA inventar datos.** Todas las cifras provienen de:
- PDFs locales: `pisa-2015.pdf`, `pisa-2018.pdf`, `pisa-2022.pdf`, `73451bc5-en.pdf` (= Vol. I 2025). ⚠️ Los PDFs están en `.gitignore` (copyright OCDE) — no sacarlos del repo
- Tabla I.1 de cada Vol. I = puntuaciones medias, top/low performers
- Tablas web I.2.o3–I.2.o5 = datos autonómicos (Excel vía `stat.link/xgs41b`)
- Las citas textuales del informe citan tabla y página

**Exclusiones documentadas** (no rellenar con estimaciones sin marcar):
- España no publicó lectura en 2018 (Annex A9 del Vol. I 2018) → `null`/línea que salta el ciclo
- Turquía 2022 y B-S-J-Z (China) 2022: sin datos comparables
- Cataluña no desglosada en 2025 (exclusión 23,2%); Murcia "con cautela"
- La media UE-27 es cálculo propio (el informe no la publica)

**Formato numérico**: usar siempre `fmt()` de `lib/format.ts` — signo menos tipográfico (−), coma decimal española.

## Estilo de diseño (Data Journalism / Scrollytelling)
- Aesthetic: Modern, high-end editorial (The Pudding, NYT Graphics, Financial Times)
- Palette: `bg-slate-950`, bordes `border-slate-800`, acentos: cian/teal (líderes/positivo), ámbar (España/caídas), rose (negativo/brechas), emerald (bienestar/ganadores)
- Tipografía: **Newsreader** (serif editorial) vía Google Fonts, clase `font-display` definida en `@theme` de `index.css`
- Tooltips Recharts personalizados: `bg-slate-900/95`, borde `slate-700`, `backdrop-blur`, sombra
- Animaciones scroll: `whileInView` + `viewport={{ once: true, margin: '-60px' }}` como patrón estándar
- Responsive verificado en 1440px y 390px (iPhone 13)

## Gotchas conocidos

- **AnimatedNumber + valores negativos con `prefix`**: pasar el valor en absoluto y el signo solo en `prefix` (si no, sale `−−28`)
- **Imports default vs nombrados**: `TalentAndComputational.tsx` exporta `ComputationalSection` como default y `TalentSection` como nombrado — un import default duplicado hacía que TalentSection no se montara
- **Grid con tarjetas expandibles**: usar `items-start` para que las tarjetas cerradas no se estiren igualando la altura de las abiertas (bug ya corregido en OddCases)
- **Comillas «»**: no duplicarlas — los strings de datos ya las llevan, el render no debe añadirlas
- **HMR del dev server puede desincronizarse** al cambiar exports: recargar con query param (`?v=N`) antes de diagnosticar

## Deploy

Vercel conectado al repo de GitHub: cada push a `main` redespliega automáticamente (~1 min).
Verificar versión desplegada buscando strings nuevos en el bundle JS del sitio.
