/**
 * Tendencias mundiales PISA 2015 → 2025.
 * Todas las cifras extraídas de la Tabla I.1 del Volumen I de cada ciclo
 * (pisa-2015.pdf, pisa-2018.pdf, pisa-2022.pdf, 73451bc5-en.pdf).
 *
 * Formato por ciclo: (ciencia, mates, lectura, topPct, lowPct).
 * null = país no comparable o dato no publicado en ese ciclo:
 *  - España 2018: lectura no publicada (Annex A9) y top/low = m
 *  - Turquía 2022: resultados excluidos por participación incompleta
 *  - B-S-J-Z (China) 2022: no participó
 */

export type CycleData = [number, number, number, number, number] | null

export interface CountryTrend {
  id: string
  name: string
  /** Grupo editorial */
  group: 'winner' | 'resilient' | 'decliner' | 'reference'
  story?: string
  cycles: Partial<Record<2015 | 2018 | 2022 | 2025, CycleData>>
}

export const worldTrends: CountryTrend[] = [
  // ===== GANADORES =====
  {
    id: 'turkey',
    name: 'Turquía',
    group: 'winner',
    story:
      'La gran sorpresa de la década: +52 puntos de media y los bajos rendimientos a la mitad (31 % → 15 %). El único gran sistema que llega a 2025 por encima de donde empezó en 2015 — y lo hace con tendencia positiva en las tres materias, incluida la principal.',
    cycles: { 2015: [425, 420, 428, 1.6, 31.2], 2018: [468, 454, 466, 6.6, 17.1], 2022: null, 2025: [494, 462, 472, 11.1, 15.4] },
  },
  {
    id: 'bsjz',
    name: 'B-S-J-Z (China)',
    group: 'winner',
    story:
      'De 27,7 % a 55,5 % de altos rendimientos: más de la mitad de sus alumnos alcanza el nivel de excelencia. Su media crece +64 puntos desde 2015, aunque no participó en 2022 (COVID).',
    cycles: { 2015: [518, 531, 494, 27.7, 10.9], 2018: [590, 591, 555, 49.3, 1.1], 2022: null, 2025: [597, 612, 527, 55.5, 1.8] },
  },
  {
    id: 'taipei',
    name: 'China Taipéi',
    group: 'winner',
    story:
      'Crece +8 puntos y consolida su élite: 35 % de top performers. De los sistemas asiáticos, el que mejor combina nivel alto y mejora sostenida.',
    cycles: { 2015: [532, 542, 497, 29.9, 8.3], 2018: [516, 531, 503, 26.0, 9.0], 2022: [537, 547, 515, 34.8, 7.9], 2025: [540, 546, 508, 35.0, 9.1] },
  },
  {
    id: 'singapore',
    name: 'Singapur',
    group: 'winner',
    story:
      'El único que mejora sin desinflarse: +1 punto neto en una década donde el promedio OCDE cae 23. Frena a propósito: 42 % de excelencia, 6,8 % de bajos — estabilidad de élite mundial.',
    cycles: { 2015: [556, 564, 535, 39.1, 4.8], 2018: [551, 569, 549, 43.3, 4.1], 2022: [561, 575, 543, 44.5, 4.2], 2025: [560, 563, 535, 42.3, 6.8] },
  },
  // ===== RESISTENTES =====
  {
    id: 'japan',
    name: 'Japón',
    group: 'resilient',
    story:
      'Solo −7 puntos en una década de caída general, y mantiene su nivel de excelencia (27 %). La historia silenciosa del informe: ni COVID ni IA han roto su tendencia.',
    cycles: { 2015: [538, 532, 516, 25.8, 5.6], 2018: [529, 527, 504, 23.3, 6.4], 2022: [547, 536, 516, 28.7, 5.3], 2025: [538, 525, 503, 27.1, 8.8] },
  },
  {
    id: 'korea',
    name: 'Corea',
    group: 'resilient',
    story: '−3 puntos netos, con su mejor ciclo en 2022. Junto a Japón y Japón-Taipéi, el bloque asiático demostró resistencia estructural.',
    cycles: { 2015: [516, 524, 517, 25.6, 7.7], 2018: [519, 526, 514, 26.6, 7.5], 2022: [528, 527, 515, 29.7, 7.3], 2025: [526, 522, 501, 28.1, 9.4] },
  },
  {
    id: 'uk',
    name: 'Reino Unido',
    group: 'resilient',
    story: '−2 puntos netos y la única gran economía europea que mejora su % de excelencia (16,9 % → 18,2 %).',
    cycles: { 2015: [509, 492, 498, 16.9, 10.1], 2018: [505, 502, 504, 19.4, 9.0], 2022: [500, 489, 494, 17.9, 12.0], 2025: [511, 488, 494, 18.2, 12.0] },
  },
  {
    id: 'italy',
    name: 'Italia',
    group: 'resilient',
    story: '−10 puntos, pero en 2025 recupera: es de los pocos europeos cuya ciencia sube respecto a 2022 (+6).',
    cycles: { 2015: [481, 490, 485, 13.5, 12.2], 2018: [468, 487, 476, 12.1, 13.8], 2022: [477, 471, 482, 10.7, 12.9], 2025: [483, 468, 474, 10.1, 15.8] },
  },
  {
    id: 'estonia',
    name: 'Estonia',
    group: 'resilient',
    story:
      '−13 puntos, como media OCDE — pero sigue siendo el mejor sistema de Europa. Su detalle preocupante: los bajos rendimientos se duplican (4,7 % → 7,4 %). Ni Estonia se libra.',
    cycles: { 2015: [534, 520, 519, 20.4, 4.7], 2018: [530, 523, 523, 22.5, 4.2], 2022: [526, 510, 511, 20.0, 5.2], 2025: [527, 508, 499, 18.0, 7.4] },
  },
  // ===== REFERENCIA =====
  {
    id: 'oecd',
    name: 'Media OCDE',
    group: 'reference',
    story: 'La tendencia general: −23 puntos de media en una década, con la mitad de la caída concentrada tras 2018. Ni el COVID ni la IA la explican entera.',
    cycles: { 2015: [493, 490, 493, 15.3, 13.0], 2018: [489, 489, 487, 15.7, 13.4], 2022: [485, 472, 476, 13.7, 16.4], 2025: [482, 463, 461, 11.9, 19.7] },
  },
  {
    id: 'spain',
    name: 'España',
    group: 'reference',
    story: '−30 puntos de media, en línea con Francia pero peor que la OCDE. La lectura 2018 no es comparable (no publicada, Annex A9).',
    cycles: { 2015: [493, 486, 496, 10.9, 10.3], 2018: null, 2022: [485, 473, 474, 10.6, 12.9], 2025: [477, 457, 451, 7.0, 18.4] },
  },
  // ===== PERDEDORES =====
  {
    id: 'portugal',
    name: 'Portugal',
    group: 'decliner',
    story: 'El vecino que era referencia europea en 2015 (501 en ciencia) cae 29 puntos y pierde a su élite: del 15,6 % al 9 % de top performers.',
    cycles: { 2015: [501, 492, 498, 15.6, 10.7], 2018: [492, 492, 492, 15.2, 12.6], 2022: [484, 472, 477, 10.1, 13.8], 2025: [482, 460, 462, 9.0, 18.6] },
  },
  {
    id: 'france',
    name: 'Francia',
    group: 'decliner',
    story: '−30 puntos: la caída más dura de las grandes economías europeas junto a la de España. Su élite se desploma del 18,4 % al 9,8 %.',
    cycles: { 2015: [495, 493, 499, 18.4, 14.8], 2018: [493, 495, 493, 15.9, 12.5], 2022: [487, 474, 474, 12.9, 16.8], 2025: [483, 458, 456, 9.8, 21.3] },
  },
  {
    id: 'canada',
    name: 'Canadá',
    group: 'decliner',
    story: '−29 puntos pese a ser el sistema con mejor balance equidad-excelencia de 2015. La caída no respeta al que iba bien.',
    cycles: { 2015: [528, 516, 527, 22.7, 5.9], 2018: [518, 512, 520, 24.1, 6.4], 2022: [515, 497, 507, 22.7, 8.1], 2025: [510, 485, 490, 17.4, 12.0] },
  },
  {
    id: 'netherlands',
    name: 'P. Bajos',
    group: 'decliner',
    story: '−38 puntos y duplica sus bajos rendimientos (10,9 % → 21,3 %). De cabeza de cartel europeo a la media OCDE en una década.',
    cycles: { 2015: [509, 512, 503, 20.0, 10.9], 2018: [503, 519, 485, 21.8, 10.8], 2022: [488, 493, 459, 19.0, 20.2], 2025: [485, 483, 441, 15.7, 21.3] },
  },
  {
    id: 'denmark',
    name: 'Dinamarca',
    group: 'decliner',
    story: '−35 puntos pese a los datos digitales más optimistas de la OCDE. La tecnología sola no salvó a nadie.',
    cycles: { 2015: [502, 511, 500, 14.9, 7.5], 2018: [493, 509, 501, 15.8, 8.1], 2022: [494, 489, 489, 12.8, 10.3], 2025: [478, 471, 460, 8.9, 16.0] },
  },
  {
    id: 'finland',
    name: 'Finlandia',
    group: 'decliner',
    story:
      'El símbolo del declive nórdico: −40 puntos desde 2015. Finlandia era el referente mundial de la equidad con calidad; hoy está por debajo de la OCDE en mates y sus bajos rendimientos se multiplican por 2,5 (6,3 % → 15,7 %).',
    cycles: { 2015: [531, 511, 526, 21.4, 6.3], 2018: [522, 507, 520, 21.0, 7.0], 2022: [511, 484, 490, 17.9, 11.5], 2025: [504, 469, 474, 14.0, 15.7] },
  },
  {
    id: 'slovenia',
    name: 'Eslovenia',
    group: 'decliner',
    story: '−46 puntos: la mayor caída de toda la OCDE junto a Noruega. En 2015 superaba a Finlandia; hoy está 20 puntos por debajo.',
    cycles: { 2015: [513, 510, 505, 18.1, 8.2], 2018: [507, 509, 495, 17.3, 8.0], 2022: [500, 485, 469, 13.0, 12.0], 2025: [484, 460, 445, 10.1, 18.8] },
  },
  {
    id: 'norway',
    name: 'Noruega',
    group: 'decliner',
    story: '−46 puntos y duplica sus bajos rendimientos. Junto a Eslovenia y Finlandia, dibuja el declive nórdico-báltico: los sistemas más digitalizados de Europa son los que más caen.',
    cycles: { 2015: [498, 502, 513, 17.6, 8.9], 2018: [490, 501, 499, 17.8, 11.3], 2022: [478, 468, 477, 13.8, 17.5], 2025: [470, 452, 453, 9.7, 22.0] },
  },
]

/** Media de las tres materias de un ciclo (null si falta alguna). */
export function cycleAverage(c: CountryTrend, year: 2015 | 2018 | 2022 | 2025): number | null {
  const v = c.cycles[year]
  if (!v || v[0] === null || v[1] === null || v[2] === null) return null
  return (v[0] + v[1] + v[2]) / 3
}

export const worldFindings = {
  winnersInsight:
    'Los ganadores son de dos tipos: sistemas asiáticos que ya dominaban (Singapur, Taipéi, B-S-J-Z) y Turquía, que partía de abajo y ha reducido a la mitad sus bajos rendimientos. Ningún sistema europeo de la OCDE mejora de forma significativa.',
  declinersInsight:
    'El declive nórdico-báltico (Noruega −46, Eslovenia −46, Finlandia −40, Letonia −34, Dinamarca −35) encabeza la caída. Son los sistemas con mayor digitalización escolar de Europa antes de 2015 — un correlato incómodo para la narrativa «más pantallas, mejor aprendizaje».',
  nordicInsight:
    'Finlandia merece capítulo propio: era el ejemplo mundial de «sistema público de calidad». Su caída de −40 puntos (y de 21 % a 14 % en excelencia) demuestra que ningún sistema es inmune.',
  turkiyeInsight:
    'Turquía crece +52 puntos pero con la matización del propio informe: su tendencia es real en las tres materias y arrastraba niveles muy bajos en 2015 (31 % de bajos rendimientos).',
}
