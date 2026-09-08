import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { cycleMilestones } from '../data/pisaData'

/**
 * Scrollytelling: cada ciclo es un "capítulo" que se ilumina al entrar en
 * viewport. La barra de progreso lateral y la opacidad de las tarjetas
 * responden al scroll (Framer Motion useScroll).
 */

const TONE_STYLES = {
  positive: { border: 'border-emerald-500/40', text: 'text-emerald-300', bg: 'bg-emerald-500/[0.07]' },
  warning: { border: 'border-amber-500/40', text: 'text-amber-300', bg: 'bg-amber-500/[0.07]' },
  negative: { border: 'border-rose-500/40', text: 'text-rose-300', bg: 'bg-rose-500/[0.07]' },
} as const

function Chapter({
  milestone,
  index,
  progress,
}: {
  milestone: (typeof cycleMilestones)[number]
  index: number
  progress: MotionValue<number>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const tone = TONE_STYLES[milestone.tone]

  // Cada capítulo se ilumina al entrar y se atenúa al salir
  const opacity = useTransform(progress, [index / 4 - 0.12, index / 4 + 0.05, (index + 1) / 4, (index + 1) / 4 + 0.18], [0.35, 1, 1, 0.35])
  const scale = useTransform(progress, [index / 4 - 0.12, index / 4 + 0.06, (index + 1) / 4], [0.97, 1, 0.97])

  return (
    <div ref={ref} className="relative pl-20 sm:pl-28">
      {/* Marcador del año en el rail */}
      <div className="absolute left-0 top-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-950 sm:h-16 sm:w-16">
        <span className="font-display text-lg font-semibold text-slate-200 sm:text-xl">{milestone.year}</span>
      </div>
      <motion.div
        style={{ opacity, scale }}
        className={`rounded-xl border p-6 backdrop-blur transition-colors sm:p-8 ${tone.border} ${tone.bg}`}
      >
        <p className={`text-xs font-medium tracking-[0.25em] uppercase ${tone.text}`}>{milestone.kicker}</p>
        <h3 className="font-display mt-3 text-2xl leading-tight font-medium text-slate-50 sm:text-3xl">
          {milestone.headline}
        </h3>

        <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className={`font-display text-5xl font-medium tracking-tight sm:text-6xl ${tone.text}`}>
              {milestone.kpi.value}
            </p>
            <p className="mt-1 text-sm text-slate-400">{milestone.kpi.label}</p>
          </div>
        </div>

        <blockquote className="mt-6 border-l-2 border-slate-600 pl-4 text-sm leading-relaxed text-slate-300 italic">
          «{milestone.quote}»
          <footer className="mt-2 text-xs not-italic text-slate-500">{milestone.quoteSource}</footer>
        </blockquote>
      </motion.div>
    </div>
  )
}

export default function CycleStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.9'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <section id="ciclos" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-cyan-400 uppercase">
            <span className="h-px w-8 bg-cyan-400/60" />
            Crónica de un declive anunciado
          </p>
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-slate-50 sm:text-4xl">
            Cuatro ciclos, una trayectoria
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Ninguna caída es un accidente de una sola edición. Sigue la historia completa, ciclo a ciclo, con lo que
            cada informe decía de España en el momento de publicarse.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative space-y-10 sm:space-y-14">
          {/* Rail de progreso */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-slate-800 sm:left-8">
            <motion.div
              style={{ scaleY: railScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-emerald-400 via-amber-400 to-rose-500"
            />
          </div>

          {cycleMilestones.map((m, i) => (
            <Chapter key={m.year} milestone={m} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
