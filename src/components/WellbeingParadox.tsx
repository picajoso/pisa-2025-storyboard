import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { fmt } from '../lib/format'

/**
 * Índice de sentido de pertenencia al centro escolar (Tabla I.5, p. 37 del Vol. I).
 * Valores seleccionados: España, los otros líderes y referencias de contraste.
 */
const belonging = [
  { name: 'Albania', value: 0.67 },
  { name: 'Arabia Saudí', value: 0.43 },
  { name: 'Japón', value: 0.42 },
  { name: 'Corea', value: 0.31 },
  { name: 'Suecia', value: 0.3 },
  { name: 'España', value: 0.46 },
  { name: 'Noruega', value: 0.39 },
  { name: 'Polonia', value: -0.56 },
  { name: 'Francia', value: -0.09 },
  { name: 'Estonia', value: -0.04 },
  { name: 'Finlandia', value: -0.11 },
  { name: 'Reino Unido', value: 0.05 },
]

const OECD_AVG = 0.09

interface TooltipPayloadItem {
  payload: { name: string; value: number; isSpain: boolean }
}

type ChartTooltipProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
}

function BelongingTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur">
      <p className="text-sm font-medium text-slate-100">{d.name}</p>
      <p className="mt-0.5 text-lg font-semibold tabular-nums text-slate-50">
        {d.value > 0 ? '+' : '−'}
        {fmt(Math.abs(d.value), 2)}
      </p>
      <p className="text-xs text-slate-400">índice de pertenencia</p>
    </div>
  )
}

export default function WellbeingParadox() {
  const data = useMemo(
    () =>
      [...belonging]
        .sort((a, b) => b.value - a.value)
        .map((d) => ({ ...d, isSpain: d.name === 'España' })),
    [],
  )

  return (
    <section id="bienestar" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="La paradoja"
          title="España suspende en notas y sobresale en bienestar"
          description={
            <>
              En plena caída de resultados, el sentido de pertenencia al centro en España (
              <strong className="text-emerald-300">+0,46</strong>) quintuplica la media de la OCDE (+0,09) y roza el
              top-10 mundial. Alumnos que se sienten aceptados y conectados con su escuela… rindiendo como nunca
              antes de mal. Esa tensión es la pregunta que este reportaje deja abierta.
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
            <p className="mb-4 text-sm font-medium text-slate-300">
              Sentido de pertenencia al centro · índice PISA 2025
            </p>
            <div className="h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
                  <XAxis type="number" domain={[-0.7, 0.75]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={100}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <ReferenceLine x={0} stroke="#334155" />
                  <ReferenceLine
                    x={OECD_AVG}
                    stroke="#22d3ee"
                    strokeDasharray="4 4"
                    label={{ value: 'OCDE +0,09', fill: '#22d3ee', fontSize: 11, position: 'top' }}
                  />
                  <Tooltip content={<BelongingTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                  <Bar dataKey="value" barSize={18} radius={[0, 3, 3, 0]}>
                    {data.map((d) => (
                      <Cell
                        key={d.name}
                        fill={d.isSpain ? '#34d399' : d.value < 0 ? '#475569' : '#64748b'}
                        fillOpacity={d.isSpain ? 1 : 0.55}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Tabla I.5 (p. 37) · selección de sistemas. Barras hacia la izquierda = pertenencia por debajo de la
              media internacional.
            </p>
          </motion.div>

          {/* Lectura editorial */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-6"
            >
              <HeartHandshake className="h-6 w-6 text-emerald-400" />
              <p className="font-display mt-4 text-4xl font-medium tracking-tight text-emerald-300">
                ×5<span className="ml-2 align-middle text-base font-normal text-slate-400">la media OCDE</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                España (+0,46) se coloca junto a Japón y Arabia Saudí en la cabeza mundial, muy por delante de
                Finlandia (−0,11), Estonia (−0,04) o Francia (−0,09).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <h3 className="font-display text-xl font-medium text-slate-100">
                Pertenencia no se nota en las notas
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                El informe confirma que la pertenencia se asocia positivamente con curiosidad, perseverancia y
                rendimiento. España lo incumple en un solo sentido: sus alumnos se sienten bien en la escuela y, aun
                así, han caído a su mínimo histórico. La pertenencia es un activo — el informe la vincula también a
                menor acoso y mejor clima — pero no basta sola para sostener el aprendizaje en la era de la
                distracción digital.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
