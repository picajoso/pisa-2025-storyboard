import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mars, Venus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { genderGaps } from '../data/pisaData'
import { fmt } from '../lib/format'

/**
 * Diferencia chicos − chicas en puntos (Tabla I.3, p. 32).
 * Barras divergentes: derecha = ventaja chicos, izquierda = ventaja chicas.
 */
export default function GenderGaps() {
  const maxGap = 50

  const rows = useMemo(
    () =>
      genderGaps.map((c) => ({
        ...c,
        science: c.gaps.science,
        math: c.gaps.math,
        reading: c.gaps.reading,
      })),
    [],
  )

  return (
    <section id="genero" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="Género"
          title="El empate perfecto que esconde tres brechas"
          description={
            <>
              En ciencia, España marca un caso único: <strong className="text-slate-200">477 a 477</strong>, un
              empate estadísticamente exacto entre chicos y chicas que solo consiguen cuatro sistemas. Pero esa
              igualdad se rompe al mirar dentro: <strong className="text-cyan-300">las chicas lideran lectura
              (+25)</strong> y <strong className="text-amber-300">los chicos, matemáticas (+14)</strong> — un
              patrón que comparten casi todos los países.
            </>
          }
        />

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
          {/* Cabecera de columnas */}
          <div className="mb-3 grid grid-cols-[9rem_1fr_1fr_1fr] gap-x-3 text-[11px] font-medium tracking-wider text-slate-500 uppercase sm:grid-cols-[11rem_1fr_1fr_1fr]">
            <span />
            <span className="flex items-center gap-1.5">
              <Venus className="h-3.5 w-3.5 text-cyan-300" /> Lectura (chicas +)
            </span>
            <span className="flex items-center gap-1.5">
              <Mars className="h-3.5 w-3.5 text-amber-300" /> Mates (chicos +)
            </span>
            <span>Ciencia</span>
          </div>

          <div className="space-y-1">
            {rows.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`grid grid-cols-[9rem_1fr_1fr_1fr] items-center gap-x-3 rounded-lg px-1 py-1.5 sm:grid-cols-[11rem_1fr_1fr_1fr] ${
                  c.featured ? 'bg-amber-400/[0.06]' : ''
                }`}
              >
                <span
                  className={`truncate text-sm ${
                    c.featured ? 'font-semibold text-amber-200' : c.reference ? 'font-medium text-slate-200' : 'text-slate-300'
                  }`}
                >
                  {c.name}
                </span>
                <GapBar value={c.reading} max={maxGap} color="#67e8f9" invert />
                <GapBar value={c.math} max={maxGap} color="#fbbf24" invert={false} />
                <GapBar value={c.science} max={maxGap} color="#94a3b8" invert />
              </motion.div>
            ))}
          </div>

          <p className="mt-5 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
            Diferencia chicos − chicas en puntos (positivo = ventaja chicos). Tabla I.3 (p. 32). Solo los valores
            significativos van en negrita en el informe; Finlandia es el único sistema donde las chicas también
            superan a los chicos en ciencia (+23).
          </p>
        </div>
      </div>
    </section>
  )
}

function GapBar({
  value,
  max,
  color,
  invert = false,
}: {
  value: number
  max: number
  color: string
  /** invert: valores negativos (a favor de chicas) se dibujan hacia la derecha */
  invert?: boolean
}) {
  // Normaliza: para lectura interesa magnitud de la ventaja femenina (valor negativo)
  const v = invert ? -value : value
  const pct = (Math.abs(value) / max) * 50
  const positive = v >= 0

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-4 flex-1">
        <div className="absolute inset-y-1/2 left-1/2 h-px w-full -translate-y-1/2 bg-slate-800" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-slate-600" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 rounded-sm"
          style={{
            backgroundColor: color,
            opacity: Math.abs(value) < 2 ? 0.15 : 0.75,
            ...(positive ? { left: '50%' } : { right: '50%' }),
          }}
        />
      </div>
      <span
        className={`w-8 shrink-0 text-right text-xs tabular-nums ${
          Math.abs(value) < 2 ? 'text-slate-600' : 'text-slate-400'
        }`}
      >
        {value === 0 ? '=' : `${value > 0 ? '+' : '−'}${fmt(Math.abs(value))}`}
      </span>
    </div>
  )
}
