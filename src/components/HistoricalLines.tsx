import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AlertCircle } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { historicalSeries, reading2018Note, type Subject } from '../data/pisaData'
import { fmt } from '../lib/format'

type TabId = Subject

const TABS: { id: TabId; label: string; color: string }[] = [
  { id: 'reading', label: 'Lectura', color: '#f59e0b' },
  { id: 'science', label: 'Ciencias', color: '#22d3ee' },
  { id: 'math', label: 'Matemáticas', color: '#2dd4bf' },
]

interface ChartDatum {
  year: number
  esp: number | null
  oecd: number | null
}

interface HistTooltipItem {
  payload: ChartDatum & { espDisplay: string; oecdDisplay: string; diff: string }
}

function HistTooltip({ active, payload, label }: { active?: boolean; payload?: HistTooltipItem[]; label?: string | number }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur">
      <p className="text-sm font-semibold text-slate-100">PISA {label}</p>
      <p className="mt-1 text-xs text-amber-300">
        España <span className="text-base font-semibold tabular-nums">{d.espDisplay}</span>
      </p>
      <p className="text-xs text-slate-400">
        OCDE <span className="font-semibold tabular-nums text-slate-300">{d.oecdDisplay}</span>
      </p>
      {d.esp !== null && (
        <p className={`mt-1 text-[11px] font-medium ${d.esp >= d.oecd! ? 'text-emerald-400' : 'text-rose-400'}`}>
          {d.esp >= d.oecd! ? '+' : '−'}
          {fmt(Math.abs(d.esp - d.oecd!))} pts vs OCDE
        </p>
      )}
    </div>
  )
}

export default function HistoricalLines() {
  const [tab, setTab] = useState<TabId>('reading')
  const active = TABS.find((t) => t.id === tab)!

  const data = useMemo<ChartDatum[]>(
    () =>
      historicalSeries.map((p) => ({
        year: p.year,
        esp: p.esp[tab],
        oecd: p.oecd[tab],
      })),
    [tab],
  )

  const first = data[0]
  const last = data[data.length - 1]
  const totalDrop = first.esp !== null && last.esp !== null ? last.esp - first.esp : null

  return (
    <section id="decada" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="La década"
          title="Una década en caída libre"
          description={
            <>
              En 2015, España <strong className="text-slate-200">superaba la media de la OCDE en lectura</strong>.
              Diez años después, acumula su mínimo histórico en las tres competencias. Esta es la trayectoria real,
              ciclo a ciclo, extraída del Volumen I de cada informe.
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Gráfico */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 lg:col-span-3"
          >
            {/* Tabs */}
            <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Elegir competencia histórica">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    tab === t.id
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="hist-tab-pill"
                      className="absolute inset-0 rounded-lg border border-slate-700"
                      style={{ boxShadow: `inset 0 -2px 0 ${t.color}` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 24, left: -8, bottom: 4 }}>
                      <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#334155' }}
                        padding={{ left: 16, right: 16 }}
                      />
                      <YAxis
                        domain={['dataMin - 12', 'dataMax + 12']}
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v: number) => fmt(v)}
                      />
                      <ReferenceLine y={480} stroke="#334155" strokeDasharray="2 4" />
                      <Tooltip content={<HistTooltip />} cursor={{ stroke: '#475569', strokeDasharray: '3 3' }} />
                      {/* OCDE: línea tenue */}
                      <Line
                        type="monotone"
                        dataKey="oecd"
                        stroke="#64748b"
                        strokeWidth={1.5}
                        strokeDasharray="5 4"
                        dot={{ r: 2.5, fill: '#64748b', strokeWidth: 0 }}
                        activeDot={{ r: 4 }}
                        animationDuration={700}
                      />
                      {/* España: línea protagonista */}
                      <Line
                        type="monotone"
                        dataKey="esp"
                        stroke={active.color}
                        strokeWidth={3}
                        dot={{ r: 5, fill: active.color, strokeWidth: 0 }}
                        activeDot={{ r: 7, stroke: '#0f172a', strokeWidth: 2 }}
                        connectNulls={false}
                        animationDuration={900}
                      />
                      {/* Punto hueco en lectura 2018 (missing) */}
                      {tab === 'reading' && (
                        <ReferenceDot
                          x={2018}
                          y={472}
                          r={5}
                          fill="none"
                          stroke="#f59e0b"
                          strokeDasharray="2 2"
                          ifOverflow="extendDomain"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>

            {tab === 'reading' && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs leading-relaxed text-amber-200/80">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <p>
                  El punto hueco marca 2018: <strong className="text-amber-200">España no publicó datos de
                  lectura</strong> ese año. La línea salta ese ciclo.
                </p>
              </div>
            )}
          </motion.div>

          {/* Panel editorial lateral */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className={`rounded-xl border p-6 ${
                totalDrop !== null && totalDrop < -20
                  ? 'border-rose-500/25 bg-rose-500/[0.05]'
                  : 'border-slate-800 bg-slate-900/50'
              }`}
            >
              <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                Caída total {first.year}→{last.year}
              </p>
              <p
                className={`font-display mt-3 text-5xl font-medium tracking-tight ${
                  totalDrop !== null && totalDrop < -20 ? 'text-rose-300' : 'text-slate-50'
                }`}
              >
                {totalDrop !== null ? `−${fmt(Math.abs(totalDrop))}` : '—'}
                <span className="ml-1 text-xl">pts</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {tab === 'reading' && 'El mayor desplome de las tres competencias: más de un curso escolar entero perdido (20 pts ≈ 1 curso).'}
                {tab === 'science' && 'La competencia principal de 2015 y 2025: España pasó de empatar con la OCDE a distanciarse 5 puntos por debajo.'}
                {tab === 'math' && 'En 2015 España superaba a la OCDE en mates (486 vs 490 casi empatados); hoy está 6 puntos por debajo.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <h3 className="font-display text-lg font-medium text-slate-100">El cruce de 2018</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                En mates, 2015 fue el último ciclo con España{' '}
                <strong className="text-slate-200">por encima de la OCDE</strong> (486 vs 490 a un punto). Desde
                entonces, las trayectorias divergen: la OCDE apenas pierde 27 puntos en una década; España, 29 en
                mates y 42 en lectura. El punto de inflexión coincide con el ciclo 2018 — antes del COVID.
              </p>
              <p className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-600">
                {reading2018Note}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
