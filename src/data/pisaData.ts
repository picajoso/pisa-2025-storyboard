/**
 * Datos PISA 2025 — extraídos del informe oficial:
 * OECD (2026), "PISA 2025 Results (Volume I): Future-Ready Students", OECD Publishing, Paris.
 * PDF local: 73451bc5-en.pdf (DOI: 10.1787/73451bc5-en)
 *
 * Cada bloque cita la tabla/figura de origen. Los valores marcados con
 * `estimated: true` no aparecen impresos: se derivan de datos del propio
 * informe (2025 − cambio 2022→25, o 2025 − tendencia decenal).
 */

export type Subject = 'science' | 'math' | 'reading'

export interface SubjectScores {
  science: number
  math: number
  reading: number
}

/* ------------------------------------------------------------------ */
/* 1. Medias históricas (2015 → 2025) — OCDE y España                  */
/* ------------------------------------------------------------------ */

export interface HistoricalPoint {
  year: 2015 | 2022 | 2025
  science: number
  math: number
  reading: number
  /** true = derivado de tendencias del informe, no impreso tal cual */
  estimated?: boolean
}

export interface HistoricalEntity {
  id: 'oecd' | 'spain'
  name: string
  series: HistoricalPoint[]
  /** Tendencia decenal media 2015–2025 (regresión lineal), Tabla I.2.9 */
  decennialTrend: SubjectScores
}

export const historicalMeans: HistoricalEntity[] = [
  {
    id: 'oecd',
    name: 'Media OCDE',
    series: [
      // Notas ejecutivas del informe (p. 5): ciencia 489→482, mates 485→463, lectura 489→461
      { year: 2015, science: 489, math: 485, reading: 489 },
      // Derivado: 2025 − cambio 2022→25 (Tabla I.1)
      { year: 2022, science: 485, math: 472, reading: 475, estimated: true },
      // Tabla I.1 (p. 28)
      { year: 2025, science: 482, math: 463, reading: 461 },
    ],
    decennialTrend: { science: -7, math: -24, reading: -27 },
  },
  {
    id: 'spain',
    name: 'España',
    series: [
      // Derivado: 2025 − tendencia decenal (Tabla I.2.9)
      { year: 2015, science: 492, math: 484, reading: 493, estimated: true },
      // Derivado: 2025 − cambio 2022→25 (Tabla I.1)
      { year: 2022, science: 484, math: 473, reading: 474, estimated: true },
      // Tabla I.1 (p. 28)
      { year: 2025, science: 477, math: 457, reading: 451 },
    ],
    decennialTrend: { science: -15, math: -27, reading: -42 },
  },
]

/* ------------------------------------------------------------------ */
/* 2. Comparativa 2025: España vs UE vs OCDE vs Top Global             */
/*    (Tabla I.1, p. 28 — Volumen I)                                   */
/* ------------------------------------------------------------------ */

export type CountryGroup = 'spain' | 'oecd-average' | 'eu-average' | 'top-global' | 'eu'

export interface Country2025 {
  id: string
  name: string
  group: CountryGroup
  scores: SubjectScores
  /** Resolución computacional de problemas (Tabla I.1); opcional */
  computational?: number
  /** Cambio 2022→2025 en puntos (Tabla I.1); null cuando el informe no lo publica */
  changeSince2022: SubjectScores | null
  /** % de altos rendimientos (Nivel 5-6 en ciencia, lectura o mates) */
  topPerformersPct: number
  /** % de bajos rendimientos (por debajo del Nivel 2 en las tres competencias) */
  lowPerformersPct: number
  /** Posición en el ranking de ciencia según el orden impreso de la Tabla I.1 */
  scienceRank?: number
  featured?: boolean
}

/** Media UE-27: media simple calculada a partir de los 27 sistemas de la UE
 *  en la Tabla I.1 (el informe no publica un agregado UE). */
export const euAverage2025: Country2025 = {
  id: 'eu',
  name: 'Media UE (27)',
  group: 'eu-average',
  scores: { science: 476, math: 460, reading: 451 },
  changeSince2022: null,
  topPerformersPct: 0,
  lowPerformersPct: 0,
}

export const oecdAverage2025: Country2025 = {
  id: 'oecd',
  name: 'Media OCDE',
  group: 'oecd-average',
  scores: { science: 482, math: 463, reading: 461 },
  computational: 500,
  changeSince2022: { science: -3, math: -9, reading: -14 },
  topPerformersPct: 11.9,
  lowPerformersPct: 19.7,
}

export const comparison2025: Country2025[] = [
  // --- Top global ---
  { id: 'bsjz', name: 'B-S-J-Z (China)', group: 'top-global', scores: { science: 597, math: 612, reading: 527 }, computational: 560, changeSince2022: null, topPerformersPct: 55.5, lowPerformersPct: 1.8, scienceRank: 1 },
  { id: 'singapore', name: 'Singapur', group: 'top-global', scores: { science: 560, math: 563, reading: 535 }, computational: 563, changeSince2022: { science: -2, math: -12, reading: -8 }, topPerformersPct: 42.3, lowPerformersPct: 6.8, scienceRank: 2, featured: true },
  { id: 'macao', name: 'Macao (China)', group: 'top-global', scores: { science: 541, math: 549, reading: 501 }, computational: 572, changeSince2022: { science: -2, math: -3, reading: -9 }, topPerformersPct: 30.8, lowPerformersPct: 5.2, scienceRank: 3 },
  { id: 'taipei', name: 'China Taipéi', group: 'top-global', scores: { science: 540, math: 546, reading: 508 }, computational: 551, changeSince2022: { science: 2, math: -1, reading: -7 }, topPerformersPct: 35.0, lowPerformersPct: 9.1, scienceRank: 4 },
  { id: 'japan', name: 'Japón', group: 'top-global', scores: { science: 538, math: 525, reading: 503 }, computational: 557, changeSince2022: { science: -9, math: -10, reading: -13 }, topPerformersPct: 27.1, lowPerformersPct: 8.8, scienceRank: 5, featured: true },
  { id: 'estonia', name: 'Estonia', group: 'top-global', scores: { science: 527, math: 508, reading: 499 }, computational: 541, changeSince2022: { science: 1, math: -2, reading: -12 }, topPerformersPct: 18.0, lowPerformersPct: 7.4, scienceRank: 6, featured: true },
  { id: 'korea', name: 'Corea', group: 'top-global', scores: { science: 526, math: 522, reading: 501 }, computational: 538, changeSince2022: { science: -2, math: -5, reading: -15 }, topPerformersPct: 28.1, lowPerformersPct: 9.4, scienceRank: 7 },
  { id: 'uk', name: 'Reino Unido', group: 'top-global', scores: { science: 511, math: 488, reading: 494 }, computational: 523, changeSince2022: { science: 12, math: -1, reading: 0 }, topPerformersPct: 18.2, lowPerformersPct: 12.0, scienceRank: 8 },
  { id: 'canada', name: 'Canadá', group: 'top-global', scores: { science: 510, math: 485, reading: 490 }, computational: 525, changeSince2022: { science: -5, math: -12, reading: -17 }, topPerformersPct: 17.4, lowPerformersPct: 12.0, scienceRank: 9 },
  { id: 'usa', name: 'Estados Unidos', group: 'top-global', scores: { science: 502, math: 463, reading: 490 }, computational: 513, changeSince2022: { science: 2, math: -2, reading: -14 }, topPerformersPct: 17.8, lowPerformersPct: 17.5, scienceRank: 13 },
  { id: 'finland', name: 'Finlandia', group: 'top-global', scores: { science: 504, math: 469, reading: 474 }, computational: 507, changeSince2022: { science: -7, math: -15, reading: -16 }, topPerformersPct: 14.0, lowPerformersPct: 15.7, scienceRank: 12, featured: true },
  { id: 'switzerland', name: 'Suiza', group: 'top-global', scores: { science: 501, math: 499, reading: 470 }, computational: 520, changeSince2022: { science: -1, math: -9, reading: -13 }, topPerformersPct: 18.1, lowPerformersPct: 15.0, scienceRank: 14 },
  { id: 'ireland', name: 'Irlanda', group: 'top-global', scores: { science: 500, math: 480, reading: 500 }, computational: 511, changeSince2022: { science: -4, math: -12, reading: -16 }, topPerformersPct: 12.7, lowPerformersPct: 11.2, scienceRank: 15 },
  // --- España ---
  { id: 'spain', name: 'España', group: 'spain', scores: { science: 477, math: 457, reading: 451 }, computational: 499, changeSince2022: { science: -7, math: -16, reading: -23 }, topPerformersPct: 7.0, lowPerformersPct: 18.4, scienceRank: 32, featured: true },
  // --- Vecinos UE ---
  { id: 'germany', name: 'Alemania', group: 'eu', scores: { science: 486, math: 464, reading: 465 }, computational: 498, changeSince2022: { science: -7, math: -11, reading: -15 }, topPerformersPct: 14.0, lowPerformersPct: 20.7, scienceRank: 23 },
  { id: 'france', name: 'Francia', group: 'eu', scores: { science: 483, math: 458, reading: 456 }, computational: 497, changeSince2022: { science: -4, math: -16, reading: -18 }, topPerformersPct: 9.8, lowPerformersPct: 21.3, scienceRank: 27 },
  { id: 'italy', name: 'Italia', group: 'eu', scores: { science: 483, math: 468, reading: 474 }, computational: 490, changeSince2022: { science: 6, math: -3, reading: -7 }, topPerformersPct: 10.1, lowPerformersPct: 15.8, scienceRank: 28 },
  { id: 'portugal', name: 'Portugal', group: 'eu', scores: { science: 482, math: 460, reading: 462 }, computational: 501, changeSince2022: { science: -3, math: -12, reading: -15 }, topPerformersPct: 9.0, lowPerformersPct: 18.6, scienceRank: 29 },
  // --- Medias de referencia ---
  oecdAverage2025,
  euAverage2025,
]

/* ------------------------------------------------------------------ */
/* 3. Desglose autonómico español                                      */
/*    Tablas web I.2.o3 (ciencias), I.2.o4 (lectura), I.2.o5 (mates)   */
/*    del Volumen I — Excel oficial vía StatLink https://stat.link/xgs41b */
/* ------------------------------------------------------------------ */

/**
 * ⚠️ Notas metodológicas del propio informe (Reader's Guide, p. 18):
 *  - Cataluña: resultados NO desglosados por tasa de exclusión escolar del
 *    23,2 % en 2025 (5,6 % en 2022) — no aparece en las tablas.
 *  - Murcia: publicada "con cautela" por posible sesgo al alza;
 *    exclusión del 12,7 % (4,1 % en 2022).
 */
export interface SpainRegion {
  id: string
  name: string
  featured: boolean
  scores: SubjectScores
  note?: string
}

export const spainRegions: SpainRegion[] = [
  { id: 'madrid', name: 'Comunidad de Madrid', featured: true, scores: { science: 495, math: 477, reading: 469 } },
  { id: 'cyl', name: 'Castilla y León', featured: true, scores: { science: 493, math: 472, reading: 466 } },
  { id: 'asturias', name: 'Asturias', featured: true, scores: { science: 492, math: 469, reading: 471 } },
  { id: 'cantabria', name: 'Cantabria', featured: false, scores: { science: 490, math: 470, reading: 461 } },
  { id: 'galicia', name: 'Galicia', featured: false, scores: { science: 486, math: 466, reading: 454 } },
  { id: 'clmancha', name: 'Castilla-La Mancha', featured: false, scores: { science: 485, math: 462, reading: 461 } },
  { id: 'rioja', name: 'La Rioja', featured: false, scores: { science: 484, math: 462, reading: 461 } },
  { id: 'aragon', name: 'Aragón', featured: false, scores: { science: 482, math: 462, reading: 461 } },
  { id: 'extremadura', name: 'Extremadura', featured: false, scores: { science: 473, math: 454, reading: 451 } },
  { id: 'navarra', name: 'Navarra', featured: false, scores: { science: 472, math: 462, reading: 441 } },
  { id: 'balears', name: 'Illes Balears', featured: false, scores: { science: 471, math: 449, reading: 441 } },
  {
    id: 'murcia',
    name: 'Región de Murcia',
    featured: false,
    scores: { science: 470, math: 447, reading: 448 },
    note: 'Publicada «con cautela» por posible sesgo al alza (exclusión del 12,7 %).',
  },
  { id: 'canarias', name: 'Canarias', featured: false, scores: { science: 469, math: 442, reading: 445 } },
  { id: 'andalucia', name: 'Andalucía', featured: false, scores: { science: 462, math: 442, reading: 441 } },
  { id: 'euskadi', name: 'País Vasco', featured: true, scores: { science: 459, math: 460, reading: 419 } },
  { id: 'cvalenciana', name: 'C. Valenciana', featured: true, scores: { science: 450, math: 435, reading: 424 } },
  { id: 'ceuta', name: 'Ceuta', featured: false, scores: { science: 420, math: 405, reading: 397 } },
  { id: 'melilla', name: 'Melilla', featured: false, scores: { science: 405, math: 395, reading: 379 } },
  {
    id: 'cataluna',
    name: 'Cataluña',
    featured: false,
    scores: { science: NaN, math: NaN, reading: NaN },
    note: 'No desglosada en PISA 2025: exclusión escolar del 23,2 % (5,6 % en 2022).',
  },
]

/** Media de España (Tabla I.1) como referencia del ranking autonómico. */
export const spainAverage: SubjectScores = { science: 477, math: 457, reading: 451 }

/** Puntos que equivalen aproximadamente a un curso escolar (Box I.2.2). */
export const SCORES_PER_SCHOOL_YEAR = 20

export const regionsSourceNote =
  'Tablas I.2.o3–I.2.o5 (web) del Vol. I · Excel oficial: stat.link/xgs41b'

/* ------------------------------------------------------------------ */
/* 4. Factores clave cuantitativos                                     */
/* ------------------------------------------------------------------ */

export type FactorTone = 'positive' | 'negative' | 'neutral'

export interface FactorValue {
  label: string
  value: number
  unit?: string
}

export interface KeyFactor {
  id: string
  title: string
  metric: string
  description: string
  values: FactorValue[]
  tone: FactorTone
  source: string
}

export const keyFactors: KeyFactor[] = [
  {
    id: 'ai-weekly-use',
    title: 'La IA ya está en el aula',
    metric: '≈ 46 %',
    description:
      'Alumnos que usan chatbots de IA al menos una vez por semana para ayudarles a aprender. En España el uso weekly supera claramente la media internacional.',
    values: [
      { label: 'Media OCDE', value: 45.5, unit: '%' },
      { label: 'España', value: 54.2, unit: '%' },
      { label: 'Singapur', value: 65.6, unit: '%' },
      { label: 'Japón', value: 27.4, unit: '%' },
    ],
    tone: 'neutral',
    source: 'Tabla I.6 (p. 38) · "Students using AI at least weekly to help them learn"',
  },
  {
    id: 'ai-performance',
    title: 'Usar IA no es estudiar',
    metric: '−1 año',
    description:
      'El Vol. I no publica un "efecto IA" puntual único: lo que documenta es que quienes no usan IA para tareas específicas (resumir, investigar) obtienen mejores notas en ciencia, y que el uso semanal "para aprender" rinde igual que no usarla. La escala de choque: 20 puntos ≈ un curso escolar; la lectura OCDE cayó 25 pts desde 2018 (≈ 1 año de aprendizaje).',
    values: [
      { label: 'Umbral de un curso escolar', value: 20, unit: 'pts' },
      { label: 'Caída lectura OCDE 2018–25', value: -25, unit: 'pts' },
      { label: 'Caída lectura España 2022–25', value: -23, unit: 'pts' },
    ],
    tone: 'negative',
    source: 'Box I.2.2 · Anexo A1 (p. 309) · Cap. 4 "AI use and science performance" (pp. 239–240)',
  },
  {
    id: 'screen-distraction',
    title: 'Distracción digital',
    metric: '28 %',
    description:
      'Alumnos que perciben que sus compañeros se distraen con dispositivos en la mayoría o todas las clases de ciencias. La distracción es mayor en centros desfavorecidos (31 % vs 26 %) y tras superar 1 h/día de ocio digital el rendimiento cae.',
    values: [
      { label: 'Media OCDE', value: 28, unit: '%' },
      { label: 'Centros desfavorecidos', value: 31, unit: '%' },
      { label: 'Centros favorecidos', value: 26, unit: '%' },
      { label: 'España: alumnos sin distracción', value: 37.2, unit: '%' },
    ],
    tone: 'negative',
    source: 'Fig. I.4.7 (p. 231) · Tabla I.6 (p. 38) · Fig. I.4.6 (p. 230)',
  },
  {
    id: 'school-belonging',
    title: 'Pertenencia escolar',
    metric: '0.46 vs 0.09',
    description:
      'Índice de sentido de pertenencia al centro: España puntúa muy por encima de la media OCDE, en el grupo de cabeza junto a Japón o Arabia Saudí. Es el factor "blando" donde el sistema español mejor posicionado está.',
    values: [
      { label: 'España', value: 0.46 },
      { label: 'Arabia Saudí', value: 0.43 },
      { label: 'Japón', value: 0.42 },
      { label: 'Media OCDE', value: 0.09 },
      { label: 'Estonia', value: -0.04 },
    ],
    tone: 'positive',
    source: 'Tabla I.5 (p. 37) · "Sense of belonging at school, Mean index"',
  },
  {
    id: 'phone-bans',
    title: 'Móviles prohibidos',
    metric: '86 %',
    description:
      'Alumnos españoles en centros donde no se permiten móviles: el triple de restricción que Estonia, y muy por encima de la OCDE. Los centros con prohibiciones muestran menos distracción, aunque su relación con el rendimiento no es clara.',
    values: [
      { label: 'España', value: 86.3, unit: '%' },
      { label: 'Media OCDE', value: 49.5, unit: '%' },
      { label: 'Reino Unido', value: 80.3, unit: '%' },
      { label: 'Estonia', value: 26.0, unit: '%' },
    ],
    tone: 'positive',
    source: 'Tabla I.6 (p. 38) · "Students in schools where cell phones are not allowed"',
  },
]

/* Extra: brecha de género en España (Tabla I.3, p. 32) — puntos a favor de niñas(+) o niños(−) */
export const spainGenderGaps = {
  reading: { girlsLead: 26 },
  math: { boysLead: 14 },
  science: { gap: 0 },
}

/* ------------------------------------------------------------------ */
/* 7. Brechas de género (Tabla I.3, p. 32)                             */
/*    Diferencia chicos − chicas en puntos: + favor niños, − favor niñas */
/* ------------------------------------------------------------------ */

export interface GenderGapCountry {
  id: string
  name: string
  featured?: boolean
  reference?: boolean
  /** chicos − chicas (positivo =领先 niños; negativo = lideran niñas) */
  gaps: SubjectScores
}

export const genderGaps: GenderGapCountry[] = [
  { id: 'oecd', name: 'Media OCDE', reference: true, gaps: { science: -2, reading: -30, math: 13 } },
  { id: 'spain', name: 'España', featured: true, gaps: { science: 0, reading: -25, math: 14 } },
  { id: 'bsjz', name: 'B-S-J-Z (China)', gaps: { science: 14, reading: -21, math: 22 } },
  { id: 'japan', name: 'Japón', gaps: { science: 10, reading: -14, math: 16 } },
  { id: 'uk', name: 'Reino Unido', gaps: { science: 12, reading: -14, math: 24 } },
  { id: 'korea', name: 'Corea', gaps: { science: -2, reading: -28, math: 11 } },
  { id: 'estonia', name: 'Estonia', gaps: { science: -1, reading: -25, math: 13 } },
  { id: 'finland', name: 'Finlandia', gaps: { science: -23, reading: -46, math: 2 } },
  { id: 'portugal', name: 'Portugal', gaps: { science: -4, reading: -33, math: 11 } },
  { id: 'france', name: 'Francia', gaps: { science: -13, reading: -44, math: -38 } },
]

/* ------------------------------------------------------------------ */
/* 8. Equidad y contexto (Tablas I.2, I.5, I.7)                        */
/* ------------------------------------------------------------------ */

export interface EquityMetric {
  id: string
  title: string
  description: string
  spain: number
  oecd: number
  unit: string
  /** higher-is-better | lower-is-better — para colorear */
  better: 'higher' | 'lower'
  source: string
}

export const equityMetrics: EquityMetric[] = [
  {
    id: 'escs-variance',
    title: 'Varianza socioeconómica',
    description:
      'Porcentaje de la diferencia en ciencia explicada por el estatus socioeconómico de los alumnos. Menor = sistema más equitativo. España está entre los más justos de la OCDE.',
    spain: 9.2,
    oecd: 11.6,
    unit: '%',
    better: 'lower',
    source: 'Tabla I.2 (p. 30) · Strength: % of variance in science performance explained by ESCS',
  },
  {
    id: 'resilient',
    title: 'Alumnos resilientes',
    description:
      'Alumnos desfavorecidos que rinden en el cuartil superior de la OCDE. España (13,2 %) queda en la media internacional: la equidad estructural no llega para compensar del todo.',
    spain: 13.2,
    oecd: 11.9,
    unit: '%',
    better: 'higher',
    source: 'Tabla I.2 (p. 30) · % of disadvantaged students who are academically resilient',
  },
  {
    id: 'immigrant-gap',
    title: 'Brecha de inmigración',
    description:
      'Diferencia entre alumnos nativos e inmigrantes en ciencia. En España (489 vs 447) es 12 puntos menor que la media OCDE, aunque sigue siendo una brecha enorme.',
    spain: -42,
    oecd: -43,
    unit: ' pts',
    better: 'higher',
    source: 'Tabla I.2 (p. 30) · Difference between non-immigrant and immigrant students',
  },
  {
    id: 'teacher-shortage',
    title: 'Centros sin escasez docente',
    description:
      'Alumnos en centros donde la dirección no percibe falta de profesorado que dificulte la enseñanza. España queda 9 puntos por debajo de la OCDE: el problema no son los alumnos, son los recursos.',
    spain: 20.1,
    oecd: 28.8,
    unit: '%',
    better: 'higher',
    source: 'Tabla I.7 (p. 40) · Students in schools with no teacher shortages',
  },
  {
    id: 'truancy',
    title: 'Ausencia de absentismo',
    description:
      'Alumnos que no faltan a clase. El absentismo es la asignatura pendiente española: la mitad de los alumnos se salta clases, frente a un tercio en la OCDE. Es de las peores de la OCDE.',
    spain: 51.3,
    oecd: 66.1,
    unit: '%',
    better: 'higher',
    source: 'Tabla I.5 (p. 36) · Lack of truancy: % of students',
  },
  {
    id: 'bullying-free',
    title: 'Libre de acoso',
    description:
      'Alumnos que no sufren ninguna forma de acoso. España (59,9 %) supera claramente la media OCDE (52,5 %): el clima de centro es uno de los activos del sistema.',
    spain: 59.9,
    oecd: 52.5,
    unit: '%',
    better: 'higher',
    source: 'Tabla I.5 (p. 36) · Absence of bullying: % of students',
  },
]

/* ------------------------------------------------------------------ */
/* 9. Pirámide de talento (Tabla I.1, p. 28)                           */
/* ------------------------------------------------------------------ */

export interface TalentProfile {
  id: string
  name: string
  /** % de alumnos de alto rendimiento (Nivel 5-6 en ciencia, lectura o mates) */
  top: number
  /** % de bajos rendimientos (por debajo del Nivel 2 en las tres) */
  low: number
  featured?: boolean
  reference?: boolean
}

export const talentPyramid: TalentProfile[] = [
  { id: 'bsjz', name: 'B-S-J-Z (China)', top: 55.5, low: 1.8 },
  { id: 'singapore', name: 'Singapur', top: 42.3, low: 6.8 },
  { id: 'korea', name: 'Corea', top: 28.1, low: 9.4 },
  { id: 'uk', name: 'Reino Unido', top: 18.2, low: 12.0 },
  { id: 'estonia', name: 'Estonia', top: 18.0, low: 7.4 },
  { id: 'canada', name: 'Canadá', top: 17.4, low: 12.0 },
  { id: 'usa', name: 'Estados Unidos', top: 17.8, low: 17.5 },
  { id: 'finland', name: 'Finlandia', top: 14.0, low: 15.7 },
  { id: 'germany', name: 'Alemania', top: 14.0, low: 20.7 },
  { id: 'oecd', name: 'Media OCDE', top: 11.9, low: 19.7, reference: true },
  { id: 'france', name: 'Francia', top: 9.8, low: 21.3 },
  { id: 'spain', name: 'España', top: 7.0, low: 18.4, featured: true },
]

/* ------------------------------------------------------------------ */
/* 10. Efecto calculadora: mates vs resolución computacional            */
/*     (Tabla I.1 p. 28 y Tabla I.2.o6 web)                            */
/* ------------------------------------------------------------------ */

export interface ComputationalProfile {
  id: string
  name: string
  math: number
  computational: number
  featured?: boolean
  reference?: boolean
}

export const computationalGap: ComputationalProfile[] = [
  { id: 'bsjz', name: 'B-S-J-Z (China)', math: 612, computational: 560 },
  { id: 'singapore', name: 'Singapur', math: 563, computational: 563 },
  { id: 'macao', name: 'Macao (China)', math: 549, computational: 572 },
  { id: 'japan', name: 'Japón', math: 525, computational: 557 },
  { id: 'korea', name: 'Corea', math: 522, computational: 538 },
  { id: 'estonia', name: 'Estonia', math: 508, computational: 541 },
  { id: 'canada', name: 'Canadá', math: 485, computational: 525 },
  { id: 'uk', name: 'Reino Unido', math: 488, computational: 523 },
  { id: 'finland', name: 'Finlandia', math: 469, computational: 507 },
  { id: 'oecd', name: 'Media OCDE', math: 463, computational: 500, reference: true },
  { id: 'spain', name: 'España', math: 457, computational: 499, featured: true },
]

/* ------------------------------------------------------------------ */
/* 5. Uso de IA y digitalización por país (Tabla I.6, p. 38)           */
/* ------------------------------------------------------------------ */

export interface CountryDigitalProfile {
  id: string
  name: string
  /** % alumnos que usan IA ≥1 vez/semana para aprender */
  aiWeeklyPct: number
  /** % alumnos que aprenden a evaluar información generada por IA */
  aiAssessPct: number
  /** % alumnos que reportan NO distracción con dispositivos */
  noDistractionPct: number
  /** % alumnos en centros donde no se permiten móviles */
  phoneBanPct: number
}

export const digitalProfiles: CountryDigitalProfile[] = [
  { id: 'oecd', name: 'Media OCDE', aiWeeklyPct: 45.5, aiAssessPct: 62.6, noDistractionPct: 39.2, phoneBanPct: 49.5 },
  { id: 'spain', name: 'España', aiWeeklyPct: 54.2, aiAssessPct: 59.5, noDistractionPct: 37.2, phoneBanPct: 86.3 },
  { id: 'singapore', name: 'Singapur', aiWeeklyPct: 65.6, aiAssessPct: 81.0, noDistractionPct: 25.8, phoneBanPct: 43.1 },
  { id: 'estonia', name: 'Estonia', aiWeeklyPct: 58.4, aiAssessPct: 72.5, noDistractionPct: 26.6, phoneBanPct: 26.0 },
  { id: 'korea', name: 'Corea', aiWeeklyPct: 50.7, aiAssessPct: 66.5, noDistractionPct: 72.2, phoneBanPct: 34.1 },
  { id: 'japan', name: 'Japón', aiWeeklyPct: 27.4, aiAssessPct: 31.2, noDistractionPct: 74.1, phoneBanPct: 33.8 },
  { id: 'uk', name: 'Reino Unido', aiWeeklyPct: 31.5, aiAssessPct: 42.4, noDistractionPct: 48.1, phoneBanPct: 80.3 },
  { id: 'bsjz', name: 'B-S-J-Z (China)', aiWeeklyPct: 40.7, aiAssessPct: 44.6, noDistractionPct: 70.1, phoneBanPct: 82.8 },
]

/* ------------------------------------------------------------------ */
/* 6. Metadatos de fuente                                              */
/* ------------------------------------------------------------------ */

export const reportSource = {
  title: 'PISA 2025 Results (Volume I): Future-Ready Students',
  publisher: 'OECD Publishing, París, 2026',
  doi: '10.1787/73451bc5-en',
  file: '73451bc5-en.pdf',
  keyTables: {
    performance: 'Tabla I.1 — Snapshot of performance (p. 28)',
    gender: 'Tabla I.3 — Snapshot of gender gaps (p. 32)',
    climate: 'Tabla I.5 — Safe and fair learning environment (p. 37)',
    digital: 'Tabla I.6 — Snapshot of digitalisation and AI (p. 38)',
    trends: 'Tabla I.2.9 — Trends since 2015 (p. 101)',
    distraction: 'Fig. I.4.7 — Distraction from digital devices (p. 231)',
  },
}
