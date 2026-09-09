import { motion } from 'framer-motion'
import { Globe2, TrendingDown, TrendingUp } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'
import { cycleAverage, worldTrends } from '../data/worldData'

const oecd = worldTrends.find((t) => t.id === 'oecd')!
const a15 = cycleAverage(oecd, 2015)!
const a25 = cycleAverage(oecd, 2025)!
const oecdDrop = Math.round(a25 - a15)

const winners = worldTrends.filter((t) => t.group === 'winner').length

const kpis = [
  {
    icon: TrendingDown,
    label: 'Caída de la media OCDE',
    value: Math.abs(oecdDrop),
    prefix: '−',
    suffix: ' pts',
    note: 'media de las tres materias, 2015→2025',
    tone: 'rose' as const,
  },
  {
    icon: Globe2,
    label: 'Sistemas analizados',
    value: 33,
    note: 'con serie comparable en los cuatro ciclos',
    tone: 'slate' as const,
  },
  {
    icon: TrendingUp,
    label: 'Sistemas que mejoran',
    value: winners,
    note: 'de los cuales, solo Turquía es OCDE',
    tone: 'emerald' as const,
  },
]

const toneCls = {
  rose: 'text-rose-300',
  emerald: 'text-emerald-300',
  slate: 'text-slate-50',
}

export default function WorldHero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(52,211,153,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-emerald-400 uppercase"
        >
          <span className="h-px w-8 bg-emerald-400/60" />
          PISA 2015–2025 · Vista mundial
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-slate-50 sm:text-6xl"
        >
          Una década en retroceso global.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          No es un problema español ni europeo:{' '}
          <strong className="font-medium text-slate-200">casi todo el mundo pierde</strong>. De 33 sistemas con serie
          comparable, solo cuatro llegan a 2025 mejores de lo que empezaron en 2015. Esta es la fotografía completa:
          quién resiste, quién se hunde y qué tienen en común los ganadores.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {kpis.map(({ icon: Icon, label, value, prefix, suffix, note, tone }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">{label}</p>
                <Icon className={`h-4 w-4 ${tone === 'rose' ? 'text-rose-400' : tone === 'emerald' ? 'text-emerald-400' : 'text-slate-400'}`} />
              </div>
              <p className={`font-display mt-4 text-5xl font-medium tracking-tight sm:text-[3.4rem] ${toneCls[tone]}`}>
                <AnimatedNumber value={value} prefix={prefix ?? ''} suffix={suffix ?? ''} />
              </p>
              <p className="mt-3 text-sm text-slate-500">{note}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 text-xs text-slate-600"
        >
          Fuente: Tabla I.1 del Volumen I de PISA 2015, 2018, 2022 y 2025 (OECD Publishing). Media de las tres
          materias por sistema y ciclo.
        </motion.p>
      </div>
    </header>
  )
}
