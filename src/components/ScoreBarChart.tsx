import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import SectionHeading from './SectionHeading'
import { comparison2025, type Subject } from '../data/pisaData'
import { fmt } from '../lib/format'

type TabId = Subject

const TABS: { id: TabId; label: string; color: string }[] = [
  { id: 'science', label: 'Ciencias', color: '#22d3ee' },
  { id: 'math', label: 'Matemáticas', color: '#2dd4bf' },
  { id: 'reading', label: 'Lectura', color: '#f59e0b' },
]

const BAR_HEIGHT = 30
const GAP = 10

interface TooltipData {
  name: string
  score: number
  fill: string
  change: number | null
  isReference: boolean
  isSpain: boolean
  euAvg: number
}

interface TooltipPayloadItem {
  payload: TooltipData
}

type ChartTooltipProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const diffVsEu = d.score - d.euAvg
  return (
    <div className="max-w-64 rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-3 shadow-xl shadow-black/40 backdrop-blur">
      <p className="flex items-center gap-2 text-sm font-medium text-slate-100">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
        {d.name}
      </p>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums text-slate-50">{d.score} pts</p>
      {d.change !== null && (
        <p className={`mt-1 text-xs ${d.change < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
          {d.change < 0 ? '▼' : '▲'} {fmt(Math.abs(d.change))} pts desde 2022
        </p>
      )}
      {!d.isReference && (
        <p className={`mt-1 text-xs ${diffVsEu >= 0 ? 'text-cyan-300' : 'text-slate-400'}`}>
          {diffVsEu >= 0 ? '+' : '−'}
          {fmt(Math.abs(diffVsEu))} pts vs media UE
        </p>
      )}
    </div>
  )
}

export default function ScoreBarChart() {
  const [tab, setTab] = useState<TabId>('science')
  const active = TABS.find((t) => t.id === tab)!
  const euAvg = comparison2025.find((c) => c.group === 'eu-average')!.scores[tab]

  const data = useMemo(() => {
    return comparison2025
      .map((c) => ({
        name: c.name,
        score: c.scores[tab],
        fill: c.group === 'spain' ? '#f59e0b' : c.featured ? active.color : mutedFor(c),
        isFeatured: c.featured === true,
        change: c.changeSince2022 ? c.changeSince2022[tab] : null,
        isReference: c.group === 'oecd-average' || c.group === 'eu-average',
        isSpain: c.group === 'spain',
        euAvg,
        groupOrder: groupOrder(c.group),
      }))
      .sort((a, b) => a.groupOrder - b.groupOrder || b.score - a.score)
  }, [tab, euAvg, active.color])

  const height = data.length * (BAR_HEIGHT + GAP) + 40

  return (
    <section id="comparador" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="El ranking"
          title="España, a la cola de Europa occidental"
          description={
            <>
              Con <strong className="text-slate-200">477 puntos en ciencias</strong>, España se sitúa por debajo de
              la media de la OCDE y de la UE-27, superada también por vecinos como Italia o Portugal. La distancia
              con los líderes globales ronda el <strong className="text-rose-300">equivalente a dos cursos
              escolares</strong>.
            </>
          }
        />

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Elegir competencia">
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
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg border border-slate-700"
                  style={{ boxShadow: `inset 0 -2px 0 ${t.color}` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.color }} />
                {t.label}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              style={{ height }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 4, right: 64, left: 8, bottom: 4 }}>
                  <XAxis type="number" domain={[300, 620]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                  <Bar dataKey="score" barSize={BAR_HEIGHT} radius={[0, 4, 4, 0]} isAnimationActive={true}>
                    {data.map((d) => (
                      <Cell key={d.name} fill={d.fill} fillOpacity={d.isFeatured || d.isReference ? 1 : 0.35} />
                    ))}
                    <LabelList
                      dataKey="score"
                      position="right"
                      formatter={(v: unknown) => `${fmt(Number(v))}`}
                      style={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <LegendSwatch color="#f59e0b" label="España" />
            <LegendSwatch color={active.color} label="Destacados" />
            <span className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-sm bg-slate-600/40" />
              Resto de países
            </span>
            <span>· La media UE-27 se calcula sobre los 27 sistemas de la UE en la Tabla I.1.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2 w-4 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

function groupOrder(g: string): number {
  switch (g) {
    case 'spain':
      return 0
    case 'oecd-average':
    case 'eu-average':
      return 1
    case 'eu':
      return 2
    default:
      return 3
  }
}

function mutedFor(c: { group: string }): string {
  switch (c.group) {
    case 'eu':
      return '#64748b'
    case 'top-global':
      return '#0891b2'
    default:
      return '#475569'
  }
}
