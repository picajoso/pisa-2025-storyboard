import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'
import { Brain, Cpu } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { talentPyramid, computationalGap } from '../data/pisaData'
import { fmt } from '../lib/format'

interface TooltipPayloadItem {
  payload: {
    name: string
    top: number
    low: number
    isSpain: boolean
    isReference: boolean
  }
}

function TalentTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const ratio = d.low > 0 ? (d.top / d.low).toFixed(1) : '—'
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur">
      <p className="text-sm font-medium text-slate-100">{d.name}</p>
      <p className="mt-1 text-xs text-emerald-300">
        ▲ Altos rendimientos: <span className="font-semibold">{fmt(d.top, 1)} %</span>
      </p>
      <p className="text-xs text-rose-300">
        ▼ Bajos rendimientos: <span className="font-semibold">{fmt(d.low, 1)} %</span>
      </p>
      <p className="mt-1 text-[11px] text-slate-400">
        {ratio === '—' ? '' : `${ratio} altos por cada bajo`}
      </p>
    </div>
  )
}

/** Pirámide de talento apilada: % altos (esmeralda) vs % bajos (rosa). */
export function TalentSection() {
  const data = useMemo(
    () =>
      [...talentPyramid]
        .sort((a, b) => b.top / Math.max(b.low, 0.1) - a.top / Math.max(a.low, 0.1))
        .map((d) => ({ ...d, isSpain: d.id === 'spain', isReference: d.reference === true })),
    [],
  )

  return (
    <section id="talento" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="El talento"
          title="Poca cúspide, mucha base perdida"
          description={
            <>
              Solo <strong className="text-emerald-300">7 de cada 100 alumnos españoles</strong> alcanza el nivel
              superior (Nivel 5-6) en alguna competencia, frente a 55 en B-S-J-Z (China) y 18 en Estonia. Y un
              18,4 % ni siquiera alcanza el nivel básico. La pirámide española es ancha y baja: mucho rendimiento
              medio-agraviado, poca excelencia.
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 lg:col-span-3"
          >
            <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-emerald-400" /> Nivel 5-6 (top)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-3 rounded-sm bg-rose-400" /> Bajo el Nivel 2
              </span>
            </div>
            <div className="h-[440px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 8, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 60]} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip content={<TalentTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                  <Bar dataKey="top" stackId="a" barSize={16} fill="#34d399" />
                  <Bar dataKey="low" stackId="a" barSize={16} fill="#fb7185" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Tabla I.1 (p. 28) · ordenado por ratio top/bajos. Barras = % del alumnado.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-xl border border-rose-500/25 bg-rose-500/[0.05] p-6"
            >
              <Brain className="h-6 w-6 text-rose-400" />
              <p className="font-display mt-4 text-4xl font-medium tracking-tight text-rose-300">
                2,6×<span className="ml-2 align-middle text-base font-normal text-slate-400">más bajos que altos</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                España tiene 7 % de excelencia y 18,4 % de alumnado sin competencias básicas. Estonia invierte la
                proporción: 18 % de top y solo 7,4 % de bajos. La excelencia no es un lujo: es la diferencia entre
                liderar la década de la IA o consumirla.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <h3 className="font-display text-xl font-medium text-slate-100">¿Y por qué importa?</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                El informe vincula el nivel 5-6 con carreras STEM y con la capacidad de razonar con datos y modelos
                — exactamente las destrezas que la economía de la IA va a premiumizar. Un país con un 7 % de
                top performers está exportando su capa de innovación.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface CompTooltipItem {
  payload: {
    name: string
    math: number
    computational: number
    isSpain: boolean
  }
}

function ComputationalTooltip({ active, payload }: { active?: boolean; payload?: CompTooltipItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const diff = d.computational - d.math
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur">
      <p className="text-sm font-medium text-slate-100">{d.name}</p>
      <p className="mt-1 text-xs text-slate-300">
        Mates <span className="font-semibold tabular-nums">{d.math}</span> → Computacional{' '}
        <span className="font-semibold tabular-nums">{d.computational}</span>
      </p>
      <p className={`mt-0.5 text-xs font-medium ${diff >= 0 ? 'text-cyan-300' : 'text-rose-300'}`}>
        {diff >= 0 ? '+' : '−'}
        {fmt(Math.abs(diff))} pts con herramientas digitales
      </p>
    </div>
  )
}

/** Efecto calculadora: mates vs resolución computacional de problemas (slope chart Recharts). */
export default function ComputationalSection() {
  const data = useMemo(
    () =>
      [...computationalGap].sort(
        (a, b) => b.computational - b.math - (a.computational - a.math),
      ),
    [],
  )

  return (
    <section id="calculadora" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="El efecto calculadora"
          title="Con una calculadora, España vale 42 puntos más"
          description={
            <>
              La gran novedad de PISA 2025: una prueba de <strong className="text-slate-200">resolución
              computacional de problemas</strong> donde se puede usar tecnología. España pasa de 457 en matemáticas a{' '}
              <strong className="text-cyan-300">499 con herramientas digitales</strong> — el mayor salto de los
              grandes sistemas europeos. El mensaje: el problema no es la capacidad de los alumnos, es cómo (y con
              qué) la evaluamos y enseñamos.
            </>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-slate-500" /> Matemáticas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-cyan-400" /> Resolución computacional
            </span>
            <span className="text-slate-600">· ordenado por ganancia</span>
          </div>

          <div className="h-[480px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
                <XAxis type="number" domain={[400, 660]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip content={<ComputationalTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
                <Bar dataKey="math" barSize={10} fill="#64748b" radius={[3, 0, 0, 3]} />
                <Bar dataKey="computational" barSize={10} radius={[0, 3, 3, 0]}>
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.id === 'spain' ? '#f59e0b' : d.reference ? '#0e7490' : '#22d3ee'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-4 flex items-start gap-2 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
            <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
            Cada país muestra dos barras: matemáticas (gris) y resolución computacional de problemas (cian). Tabla
            I.1 (p. 28) y Tabla I.2.o6 (web). La prueba computacional mide resolver problemas reales con
            herramientas digitales: hojas de cálculo, simulaciones, datos.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
