import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { worldTrends, cycleAverage, worldFindings, type CountryTrend } from '../data/worldData'
import { fmt } from '../lib/format'

type SortMode = 'total' | 'recent'

interface EvolvedRow {
  trend: CountryTrend
  d1525: number | null
  d1825: number | null
  top15: number | null
  top25: number | null
  low15: number | null
  low25: number | null
}

interface BarDatum {
  name: string
  diff: number
  d1825: number | null
  id: string
  group: CountryTrend['group']
}

function EvoTooltip({ active, payload }: { active?: boolean; payload?: { payload: BarDatum }[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const tone = d.diff > 3 ? 'text-emerald-300' : d.diff < -3 ? 'text-rose-300' : 'text-slate-300'
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur">
      <p className="text-sm font-medium text-slate-100">{d.name}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${tone}`}>
        {d.diff > 0 ? '+' : d.diff < 0 ? '−' : ''}
        {fmt(Math.abs(d.diff))} pts
      </p>
      <p className="text-[11px] text-slate-400">media de las tres materias, 2015→2025</p>
      {d.d1825 !== null && (
        <p className="mt-0.5 text-[11px] text-slate-500">
          desde 2018: {d.d1825 > 0 ? '+' : '−'}
          {fmt(Math.abs(d.d1825))} pts
        </p>
      )}
    </div>
  )
}

export default function WorldTrends() {
  const [sort, setSort] = useState<SortMode>('total')
  const [selected, setSelected] = useState<CountryTrend | null>(null)

  const rows = useMemo<EvolvedRow[]>(() => {
    return worldTrends
      .map((t) => {
        const a15 = cycleAverage(t, 2015)
        const a18 = cycleAverage(t, 2018)
        const a25 = cycleAverage(t, 2025)
        const c15 = t.cycles[2015]
        const c25 = t.cycles[2025]
        return {
          trend: t,
          d1525: a15 !== null && a25 !== null ? a25 - a15 : null,
          d1825: a18 !== null && a25 !== null ? a25 - a18 : null,
          top15: c15 ? c15[3] : null,
          top25: c25 ? c25[3] : null,
          low15: c15 ? c15[4] : null,
          low25: c25 ? c25[4] : null,
        }
      })
      .sort((a, b) => {
        const ka = sort === 'total' ? a.d1525 ?? -999 : a.d1825 ?? -999
        const kb = sort === 'total' ? b.d1525 ?? -999 : b.d1825 ?? -999
        return kb - ka
      })
  }, [sort])

  const data: BarDatum[] = useMemo(
    () =>
      rows
        .filter((r) => r.d1525 !== null)
        .map((r) => ({ name: r.trend.name, diff: r.d1525!, d1825: r.d1825, id: r.trend.id, group: r.trend.group })),
    [rows],
  )

  const chartHeight = data.length * 26 + 60
  const selectedRow = rows.find((r) => r.trend.id === selected?.id)

  return (
    <div>
      {/* Ranking de evolución */}
      <section id="mapa" className="scroll-mt-16 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            kicker="El mapa global"
            title="¿Quién gana y quién pierde en la década de PISA?"
            description={
              <>
                Evolución de la media de las tres materias entre PISA 2015 y PISA 2025, para 33 sistemas con serie
                comparable. <strong className="text-emerald-300">Solo cuatro ganan</strong> — y solo uno de ellos
                es occidental. En el lado contrario, el bloque nórdico-báltico concentra las mayores caídas del
                mundo desarrollado.
              </>
            }
          />

          {/* Toggle orden */}
          <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Ordenar evolución">
            {(
              [
                { id: 'total' as SortMode, label: 'Década completa (2015→2025)' },
                { id: 'recent' as SortMode, label: 'Último ciclo (2018→2025)' },
              ]
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={sort === t.id}
                onClick={() => setSort(t.id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  sort === t.id ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {sort === t.id && (
                  <motion.span
                    layoutId="world-sort-pill"
                    className="absolute inset-0 rounded-lg border border-slate-700"
                    style={{ boxShadow: 'inset 0 -2px 0 #22d3ee' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
            <div style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, left: 8, bottom: 4 }}>
                  <XAxis type="number" domain={[-50, 70]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <ReferenceLine x={0} stroke="#334155" />
                  <Tooltip content={<EvoTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                  <Bar
                    dataKey="diff"
                    barSize={16}
                    radius={[3, 3, 3, 3]}
                    onClick={(data: unknown) => {
                      const d = data as BarDatum
                      const t = worldTrends.find((x) => x.id === d?.id)
                      if (t) setSelected(t)
                    }}
                    className="cursor-pointer"
                  >
                    {data.map((d) => (
                      <Cell
                        key={d.id}
                        fill={d.diff > 3 ? '#34d399' : d.diff < -3 ? '#fb7185' : '#94a3b8'}
                        fillOpacity={selected?.id === d.id ? 1 : 0.75}
                      />
                    ))}
                    <LabelList
                      dataKey="diff"
                      position="right"
                      formatter={(v: unknown) => `${Number(v) > 0 ? '+' : Number(v) < 0 ? '−' : ''}${fmt(Math.abs(Number(v)))}`}
                      style={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-800 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-emerald-400" /> mejoran
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-rose-400" /> caen
              </span>
              <span>· clic en una barra para ver su historia · España 2018 y B-S-J-Z 2022 sin serie comparable</span>
            </p>
          </div>

          {/* Ficha del país seleccionado */}
          <AnimatePresence mode="wait">
            {selected && selectedRow && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium text-slate-50">{selected.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{selected.story}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-slate-100"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <MiniStat
                    label="Δ década"
                    value={selectedRow.d1525 !== null ? `${selectedRow.d1525 > 0 ? '+' : '−'}${fmt(Math.abs(selectedRow.d1525))}` : '—'}
                    tone={selectedRow.d1525 !== null && selectedRow.d1525 > 0 ? 'good' : 'bad'}
                  />
                  <MiniStat
                    label="Excelencia 2015→25"
                    value={selectedRow.top15 !== null ? `${fmt(selectedRow.top15, 1)}→${fmt(selectedRow.top25 ?? 0, 1)} %` : '—'}
                  />
                  <MiniStat
                    label="Bajos 2015→25"
                    value={selectedRow.low15 !== null ? `${fmt(selectedRow.low15, 1)}→${fmt(selectedRow.low25 ?? 0, 1)} %` : '—'}
                    tone={selectedRow.low15 !== null && (selectedRow.low25 ?? 0) > selectedRow.low15 ? 'bad' : 'good'}
                  />
                  <MiniStat
                    label="Desde 2018"
                    value={selectedRow.d1825 !== null ? `${selectedRow.d1825 > 0 ? '+' : '−'}${fmt(Math.abs(selectedRow.d1825))}` : '—'}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Conclusiones editoriales */}
      <section id="conclusiones" className="scroll-mt-16 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            kicker="Lo que dicen los datos"
            title="Tres conclusiones de la década"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <ConclusionCard
              icon={TrendingUp}
              tone="emerald"
              title="Ganar es la excepción"
              body={worldFindings.winnersInsight}
              kpi={{ value: '4/33', label: 'sistemas que mejoran' }}
            />
            <ConclusionCard
              icon={TrendingDown}
              tone="rose"
              title="El declive nórdico"
              body={worldFindings.declinersInsight}
              kpi={{ value: '−46', label: 'Noruega y Eslovenia, la mayor caída' }}
            />
            <ConclusionCard
              icon={Minus}
              tone="slate"
              title="Ni COVID ni IA lo explican todo"
              body={`${worldFindings.turkiyeInsight} Y la caída OCDE ya arrancó antes de 2018: el informe 2022 lo advirtió expresamente.`}
              kpi={{ value: '−23', label: 'media OCDE en la década' }}
            />
          </div>

          {/* Caso Finlandia */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-rose-400 uppercase">Caso de estudio</p>
            <h3 className="font-display mt-2 text-2xl font-medium text-slate-50 sm:text-3xl">
              Finlandia: el fin del mito
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">{worldFindings.nordicInsight}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Ciencia', v: '531 → 504' },
                { label: 'Mates', v: '511 → 469' },
                { label: 'Lectura', v: '526 → 474' },
                { label: 'Excelencia', v: '21,4 % → 14,0 %' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-slate-800 bg-slate-950/50 p-3.5">
                  <p className="text-[11px] tracking-wider text-slate-500 uppercase">{s.label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-200 tabular-nums">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <p className="text-[10px] tracking-wider text-slate-500 uppercase">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold tabular-nums ${
          tone === 'good' ? 'text-emerald-300' : tone === 'bad' ? 'text-rose-300' : 'text-slate-100'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function ConclusionCard({
  icon: Icon,
  tone,
  title,
  body,
  kpi,
}: {
  icon: typeof TrendingUp
  tone: 'emerald' | 'rose' | 'slate'
  title: string
  body: string
  kpi: { value: string; label: string }
}) {
  const toneCls =
    tone === 'emerald'
      ? 'border-emerald-500/25 bg-emerald-500/[0.05] text-emerald-400'
      : tone === 'rose'
        ? 'border-rose-500/25 bg-rose-500/[0.05] text-rose-400'
        : 'border-slate-800 bg-slate-900/50 text-slate-400'
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border p-6 ${toneCls.split(' ').slice(0, 2).join(' ')}`}
    >
      <Icon className={`h-6 w-6 ${toneCls.split(' ')[2]}`} />
      <h3 className="font-display mt-4 text-xl font-medium text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{body}</p>
      <p className="mt-4 border-t border-slate-800 pt-3">
        <span className="font-display text-2xl font-medium text-slate-100">{kpi.value}</span>{' '}
        <span className="text-xs text-slate-500">{kpi.label}</span>
      </p>
    </motion.article>
  )
}
