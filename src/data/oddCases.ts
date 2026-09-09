/**
 * Los casos raros: afirmaciones virales, anomalías y lecciones metodológicas
 * de PISA. Cada tarjeta contrasta lo que se dijo con lo que muestran los datos.
 *
 * Fuentes:
 *  - Cifras de países: Tabla I.1 de cada Volumen I (PDFs verificados)
 *  - Caso Bukele: cobertura de Infobae, Le Grand Continent, Lynnwood Times
 *  - Caso B-S-J-Z: Brookings (Loveless), The 74 Million (Schneider), Norrag
 *  - Camboya: cita del prólogo del Vol. I 2025 (p. 7)
 */

export type Verdict = 'true' | 'partial' | 'misleading'

export interface OddCase {
  id: string
  icon: string
  claim: string
  claimSource: string
  verdict: Verdict
  verdictLabel: string
  reality: string
  /** Datos clave en formato etiqueta → valor */
  numbers: { label: string; value: string }[]
  sources: { label: string; url: string }[]
}

export const oddCases: OddCase[] = [
  {
    id: 'bukele',
    icon: '🇸🇻',
    claim:
      '«171 escuelas públicas de El Salvador alcanzan el nivel de Suecia y Alemania en un solo año, según la OCDE» — el «milagro educativo de Bukele».',
    claimSource: 'El Economista y decenas de medios, 8-9 sept 2026',
    verdict: 'partial',
    verdictLabel: 'CIERTO A MEDIAS',
    reality:
      'El resultado existe, pero no es PISA: es PISA for Schools, una prueba de benchmarking a nivel de centro aplicada en junio 2026 solo a las 171 escuelas del piloto de tutores de IA (con xAI). No es una muestra nacional: es un programa seleccionado, recién implantado. El propio Bukele tuvo que aclarar tras las críticas que los resultados no representan al sistema educativo salvadoreño. El Salvador en PISA real sigue a ~110 puntos de la OCDE.',
    numbers: [
      { label: 'El Salvador 2025 (ciencia)', value: '385 pts' },
      { label: 'Media OCDE 2025', value: '482 pts' },
      { label: 'Bajos rendimientos', value: '61,3 %' },
      { label: 'Escuelas del piloto', value: '171 de ~5.000' },
    ],
    sources: [
      { label: 'Infobae — Bukele y los tutores de IA', url: 'https://www.infobae.com/el-salvador/2026/09/05/nayib-bukele-asegura-que-escuelas-con-tutores-de-ia-alcanzaron-el-nivel-educativo-de-alemania-y-suecia/' },
      { label: 'Le Grand Continent — análisis crítico', url: 'https://legrandcontinent.eu/es/2026/09/08/educacion-en-manos-de-ia-en-el-salvador-de-bukele/' },
      { label: 'OECD — qué es PISA for Schools', url: 'https://www.oecd.org/en/about/projects/pisa-for-schools.html' },
    ],
  },
  {
    id: 'bsjz',
    icon: '🇨🇳',
    claim:
      '«China encabeza el ranking mundial de PISA» — B-S-J-Z (China) primero en 2018 y 2025, con 612 puntos en matemáticas.',
    claimSource: 'Titulares globales en cada edición de PISA',
    verdict: 'misleading',
    verdictLabel: 'ENGAÑOSO',
    reality:
      'B-S-J-Z no es China: son cuatro provincias ricas (Pekín, Shanghái, Jiangsu, Zhejiang) que representan a una fracción menor del país, seleccionadas por la OCDE como «economías» desde 2009 (antes solo Shanghái). Investigadores de Brookings y la Universidad de Kansas documentan cómo las barreras del hukou excluyen a los hijos de migrantes internos de las aulas de Shanghái. En 2012 China llegó a retirar sus resultados; en 2022 participó pero no publicó. El caso Bukele repite el patrón: evaluar solo lo mejor y presentarlo como país.',
    numbers: [
      { label: 'Provincias B-S-J-Z', value: '4 de ~34' },
      { label: 'Población representada', value: '≈ 5 % de China' },
      { label: 'PISA 2022', value: 'participó, no publicó' },
      { label: 'Mates B-S-J-Z 2025', value: '612 pts (+149 vs OCDE)' },
    ],
    sources: [
      { label: 'Brookings — PISA\'s China Problem', url: 'https://www.brookings.edu/articles/pisas-china-problem/' },
      { label: 'The 74 Million — cherry-picking regional', url: 'https://www.the74million.org/article/schneider-the-strange-case-of-china-and-its-top-pisa-rankings-how-cherry-picking-regions-to-take-part-skews-its-high-scores/' },
      { label: 'Norrag — ¿cuán representativos son?', url: 'https://www.norrageducation.org/how-unrepresentative-are-chinas-stellar-pisa-results-by-rob-j-gruijters/' },
    ],
  },
  {
    id: 'uae',
    icon: '🇦🇪',
    claim:
      '«Emiratos Árabes Unidos es el sistema que más mejora del mundo: +44 puntos en lectura en un solo ciclo.»',
    claimSource: 'Cifras de las Tablas I.1 de 2018 y 2022',
    verdict: 'partial',
    verdictLabel: 'CIERTO PERO CON ASTERISCO',
    reality:
      'Las cifras son reales y UAE encabeza las mejoras de 2018→2022 (+44 lectura, +17 mates, +7 ciencia) y sigue mejorando en 2025 (+26 en ciencia). Pero su sistema es atípico: la mayoría de sus alumnos son hijos de familias inmigrantes de élite expatriada, y la OCDE advierte de que las mejoras coinciden con cambios en la composición del alumnado. Es el caso espejo de El Salvador: la demografía puede explicar lo que la pedagogía presume.',
    numbers: [
      { label: 'Lectura 2018→2022', value: '396 → 440 (+44)' },
      { label: 'Ciencia 2022→2025', value: '435 → 458 (+26)' },
      { label: 'Alumnos inmigrantes', value: 'mayoría del sistema' },
      { label: 'Nivel absoluto 2025', value: '458 (aún bajo la OCDE)' },
    ],
    sources: [
      { label: 'OECD Education GPS — UAE', url: 'https://gpseducation.oecd.org/CountryProfile?primaryCountry=ARE&treshold=10&topic=PI' },
      { label: 'KHDA — PISA 2022 en Dubái', url: 'https://web.khda.gov.ae/en/Resources/Publications/International-Assessments/PISA-2022-Report-World-Class-Education-in-Dubai' },
    ],
  },
  {
    id: 'cambodia',
    icon: '🇰🇭',
    claim:
      '«Camboya está iniciando la transformación educativa que impulsó a Corea, China y Vietnam» — la mayor tendencia positiva de la década.',
    claimSource: 'Andreas Schleicher, prólogo del Vol. I 2025 (p. 7)',
    verdict: 'true',
    verdictLabel: 'CIERTO — CON PERSPECTIVA',
    reality:
      'Es la cita oficial del informe 2025: Camboya lidera la tendencia decenal positiva (+35 pts de ciencia, la mayor de todos los participantes). Los matices: parte de niveles muy bajos (382 en ciencia, 61,7 % de bajos rendimientos) y solo evaluó ciencia como competencia principal. Es el espejo real de la historia de Turquía — los sistemas que parten de abajo pueden crecer rápido; la pregunta es si sostienen el ritmo como lo hicieron Corea o Vietnam.',
    numbers: [
      { label: 'Tendencia decenal ciencia', value: '+35 (la mayor)' },
      { label: 'Ciencia 2025', value: '382 pts' },
      { label: 'Bajos rendimientos', value: '61,7 %' },
      { label: 'Competencia evaluada', value: 'solo ciencia' },
    ],
    sources: [
      { label: 'PISA 2025 Vol. I — Tabla I.2.9 (p. 101)', url: 'https://doi.org/10.1787/73451bc5-en' },
      { label: 'Prólogo del informe (p. 7)', url: 'https://doi.org/10.1787/73451bc5-en' },
    ],
  },
  {
    id: 'vietnam',
    icon: '🇻🇳',
    claim:
      '«Vietnam, el milagro que se acaba: de superar a media OCDE a desplomarse en lectura.»',
    claimSource: 'Análisis educativos tras PISA 2025',
    verdict: 'true',
    verdictLabel: 'CIERTO — EL ESPEJO INVERSO',
    reality:
      'Vietnam era la gran excepción del mundo en desarrollo: en 2015 superaba a la OCDE en ciencia (525 vs 493) con una fracción de su gasto, y el 10 % más desfavorecido rendía como el alumno medio de otros países. La caída es brutal: lectura 487 → 392 (−95 pts, casi cinco cursos escolares). Su historia demuestra que ningún modelo de éxito está garantizado — el correlato de lo que le está pasando a Finlandia.',
    numbers: [
      { label: 'Ciencia 2015', value: '525 (+32 vs OCDE)' },
      { label: 'Lectura 2015→2025', value: '487 → 392 (−95)' },
      { label: 'Top performers 2025', value: '4,2 %' },
      { label: 'Bajos 2015→2025', value: '4,5 % → 26,0 %' },
    ],
    sources: [
      { label: 'PISA 2025 Vol. I — Tabla I.1', url: 'https://doi.org/10.1787/73451bc5-en' },
      { label: 'Glewwe et al. — el modelo Vietnam', url: 'https://www.tandfonline.com/doi/full/10.1080/09645292.2025.2612041' },
    ],
  },
  {
    id: 'philippines',
    icon: '🇵🇭',
    claim: '«Filipinas debutó en el fondo absoluto del ranking — ¿y ahora qué?»',
    claimSource: 'Cobertura de PISA 2018 y 2022',
    verdict: 'true',
    verdictLabel: 'CIERTO — CON GIRO',
    reality:
      'En su debut (2018) Filipinas registró uno de los resultados más bajos jamás vistos: 340 en lectura, con más del 70 % de bajos rendimientos. Pero es también uno de los pocos sistemas que mejora desde el fondo: +16 en lectura y +22 en ciencia hasta 2025 (385 en ciencia, mismo nivel que El Salvador). La lección metodológica: los rankings no distinguen entre «caer» y «empezar a subir desde muy abajo» — ambos mueven posiciones, pero significan cosas opuestas.',
    numbers: [
      { label: 'Lectura 2018 (debut)', value: '340 pts' },
      { label: 'Ciencia 2018→2025', value: '357 → 385 (+28)' },
      { label: 'Bajos rendimientos 2025', value: '≈ 62 %' },
      { label: 'Cambios 2022→2025', value: 'positivos en 2 de 3' },
    ],
    sources: [
      { label: 'PISA 2025 Vol. I — Tabla I.1', url: 'https://doi.org/10.1787/73451bc5-en' },
      { label: 'OECD — nota país Filipinas 2022', url: 'https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii-country-notes_ed6fbcc5-en.html' },
    ],
  },
]

export const oddCasesIntro =
  'Cada edición de PISA genera titulares que confunden lo que los datos dicen con lo que los comunicados cuentan. Estos son los seis casos que mejor ilustran cómo leer (y no leer) un resultado PISA — todos verificados contra los propios informes.'
