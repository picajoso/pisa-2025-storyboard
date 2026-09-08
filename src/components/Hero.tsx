import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, TrendingDown } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'
import { historicalMeans } from '../data/pisaData'

const oecd = historicalMeans.find((e) => e.id === 'oecd')!
const spain = historicalMeans.find((e) => e.id === 'spain')!

const oecd2025 = oecd.series.find((p) => p.year === 2025)!
const spain2025 = spain.series.find((p) => p.year === 2025)!

const oecd2015 = oecd.series.find((p) => p.year === 2015)!
const spain2015 = spain.series.find((p) => p.year === 2015)!

// Caída acumulada 2015 → 2025 en lectura (valores positivos: la caída se
// muestra con prefijo '−')
const oecdReadingDrop = Math.abs(oecd2025.reading - oecd2015.reading)
const spainReadingDrop = Math.abs(spain2025.reading - spain2015.reading)

const kpis = [
  {
    icon: TrendingDown,
    label: 'Media OCDE 2025',
    value: oecd2025.science,
    suffix: ' pts',
    note: 'Ciencia · principal de esta edición',
  },
  {
    icon: BookOpen,
    label: 'Caída en Lectura desde 2015',
    value: oecdReadingDrop,
    prefix: '−',
    suffix: ' pts',
    note: 'OCDE · equivale a más de un curso escolar',
    tone: 'rose' as const,
  },
  {
    icon: GraduationCap,
    label: 'Caída en Lectura de España',
    value: spainReadingDrop,
    prefix: '−',
    suffix: ' pts',
    note: `España 2025: ${spain2025.reading} pts · mínimo histórico`,
    tone: 'amber' as const,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-800">
      {/* Fondo editorial: gradiente sutil + retícula */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(34,211,238,0.07),transparent_70%)]"
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
          className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-cyan-400 uppercase"
        >
          <span className="h-px w-8 bg-cyan-400/60" />
          PISA 2025 · Reportaje interactivo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display max-w-3xl text-4xl leading-[1.08] font-medium tracking-tight text-slate-50 sm:text-6xl"
        >
          Una década perdida en las aulas.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Los resultados de <strong className="font-medium text-slate-200">PISA 2025</strong> confirman el peor
          escenario: el rendimiento de los estudiantes de 15 años cae en las tres competencias hasta mínimos
          históricos. España no es la excepción — registra{' '}
          <strong className="font-medium text-rose-300">sus peores resultados de la serie</strong>, aunque resiste
          mejor que la media en ciencia.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {kpis.map(({ icon: Icon, label, value, prefix, suffix, note, tone }) => (
            <motion.div
              key={label}
              variants={item}
              className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur transition-colors hover:border-slate-700 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">{label}</p>
                <Icon
                  className={`h-4 w-4 ${
                    tone === 'rose' ? 'text-rose-400' : tone === 'amber' ? 'text-amber-400' : 'text-cyan-400'
                  }`}
                />
              </div>
              <p
                className={`font-display mt-4 text-5xl font-medium tracking-tight sm:text-[3.4rem] ${
                  tone === 'rose' ? 'text-rose-300' : tone === 'amber' ? 'text-amber-300' : 'text-slate-50'
                }`}
              >
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
          Datos: OECD (2026), <em>PISA 2025 Results (Volume I): Future-Ready Students</em> · caídas 2015→2025 en
          lectura calculadas sobre las tendencias decenales del informe.
        </motion.p>
      </div>
    </header>
  )
}
