import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Info } from 'lucide-react'
import SectionHeading from './SectionHeading'
import {
  spainRegions,
  spainAverage,
  SCORES_PER_SCHOOL_YEAR,
  regionsSourceNote,
  type Subject,
  type SpainRegion,
} from '../data/pisaData'
import { fmt } from '../lib/format'

type RegionWithAvg = SpainRegion & { diffVsSpain: number; coursesVsSpain: number }

const TABS: { id: Subject; label: string }[] = [
  { id: 'science', label: 'Ciencias' },
  { id: 'math', label: 'Matemáticas' },
  { id: 'reading', label: 'Lectura' },
]

const MAX_COURSES = 4 // tope del eje de barras (Melilla ≈ −3,9 cursos)

export default function RegionalGap() {
  const [tab, setTab] = useState<Subject>('science')
  const spainScore = spainAverage[tab]

  const ranked = useMemo<RegionWithAvg[]>(() => {
    return spainRegions
      .filter((r) => !Number.isNaN(r.scores[tab]))
      .map((r) => {
        const diff = r.scores[tab] - spainScore
        return { ...r, diffVsSpain: diff, coursesVsSpain: diff / SCORES_PER_SCHOOL_YEAR }
      })
      .sort((a, b) => b.scores[tab] - a.scores[tab])
  }, [tab, spainScore])

  const best = ranked[0]
  const worst = ranked[ranked.length - 1]
  const gapCourses = (best.scores[tab] - worst.scores[tab]) / SCORES_PER_SCHOOL_YEAR

  return (
    <section id="autonomias" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="La brecha interna"
          title="Dieciocho sistemas educativos en un solo país"
          description={
            <>
              La distancia entre la primera y la última comunidad equivale a{' '}
              <strong className="text-rose-300">
                {fmt(gapCourses, 1)} cursos escolares
              </strong>{' '}
              en la competencia elegida. Cataluña no aparece: la OCDE no desglosa sus resultados por su tasa de
              exclusión escolar (23,2 %). Y Murcia se publica «con cautela» por un posible sesgo al alza.
            </>
          }
        />

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Elegir competencia autonómica">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                tab === t.id
                  ? 'bg-slate-800 text-slate-50'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="region-tab-pill"
                  className="absolute inset-0 rounded-lg border border-slate-700"
                  style={{ boxShadow: 'inset 0 -2px 0 #f59e0b' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Ranking con barras */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
          <div className="space-y-1.5">
            {ranked.map((r, i) => (
              <BarRow
                key={r.id}
                region={r}
                rank={i + 1}
                score={r.scores[tab]}
                diff={r.diffVsSpain}
                delay={i * 0.03}
              />
            ))}

            {/* Referencia España */}
            <div className="flex items-center gap-3 border-t border-slate-800 pt-3 mt-3">
              <span className="w-6 shrink-0" />
              <span className="w-36 shrink-0 truncate text-sm font-semibold text-slate-200 sm:w-44">España</span>
              <div className="relative h-6 flex-1">
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-600" />
                <div
                  className="absolute inset-y-0 rounded bg-slate-500/50"
                  style={{
                    left: `calc(50% + ${(Math.min(spainScore - spainScore, 0) / (MAX_COURSES * SCORES_PER_SCHOOL_YEAR)) * 50}%)`,
                    width: '2px',
                  }}
                />
                <span className="absolute left-1/2 -translate-x-1/2 -top-6 text-[11px] font-medium text-slate-400 tabular-nums">
                  media {spainScore}
                </span>
              </div>
              <span className="w-16 shrink-0 text-right text-xs text-slate-500 tabular-nums">ref.</span>
            </div>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-800 pt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-emerald-400" /> sobre la media española
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-rose-400" /> por debajo
            </span>
            <span>· cada 20 pts ≈ un curso escolar</span>
          </p>
        </div>

        {/* Nota metodológica */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
          <p>
            {regionsSourceNote}. Madrid, Castilla y León, Asturias y Cantabria rinden al nivel de países como
            Canadá o Reino Unido; Ceuta y Melilla, al de Marruecos o Panamá.
          </p>
        </div>
      </div>
    </section>
  )
}

function BarRow({
  region,
  rank,
  score,
  diff,
  delay,
}: {
  region: RegionWithAvg
  rank: number
  score: number
  diff: number
  delay: number
}) {
  const courses = diff / SCORES_PER_SCHOOL_YEAR
  const width = (Math.abs(diff) / (MAX_COURSES * SCORES_PER_SCHOOL_YEAR)) * 50
  const positive = diff >= 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay }}
      className="group flex items-center gap-3"
    >
      <span className="w-6 shrink-0 text-right text-[11px] text-slate-600 tabular-nums">{rank}</span>
      <span className="w-36 shrink-0 truncate text-sm text-slate-300 sm:w-44" title={region.name}>
        {region.name}
        {region.note && <AlertTriangle className="ml-1.5 inline h-3 w-3 text-amber-400" aria-label={region.note} />}
      </span>
      <div className="relative h-6 flex-1">
        {/* línea central = media España */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-slate-600" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-y-0 rounded-sm ${positive ? 'bg-emerald-400/70' : 'bg-rose-400/70'}`}
          style={positive ? { left: '50%' } : { right: '50%' }}
        />
      </div>
      <span
        className={`w-16 shrink-0 text-right text-xs tabular-nums ${
          positive ? 'text-emerald-300' : 'text-rose-300'
        }`}
      >
        {positive ? '+' : '−'}
        {fmt(Math.abs(courses), 1)} cursos
      </span>
      <span className="hidden w-10 shrink-0 text-right text-xs text-slate-400 tabular-nums sm:inline">{score}</span>
    </motion.div>
  )
}
