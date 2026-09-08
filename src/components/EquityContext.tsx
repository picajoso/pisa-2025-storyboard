import { motion } from 'framer-motion'
import { School, UserX, Users, Scale, ShieldCheck, GraduationCap } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { equityMetrics } from '../data/pisaData'
import { fmt } from '../lib/format'

const ICONS = [Scale, GraduationCap, Users, School, UserX, ShieldCheck]

export default function EquityContext() {
  return (
    <section id="equidad" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="Equidad y contexto"
          title="Un sistema justo que se queda sin profes"
          description={
            <>
              España sale mejor parada de lo que sugieren las notas cuando se mira la equidad: contexto
              socioeconómico explica menos diferencias que en la OCDE, y el clima de centro es bueno. Las dos
              alarmas están en los recursos — <strong className="text-rose-300">solo el 20 % de alumnos en centros
              sin escasez docente</strong> — y en un absentismo escolar que afecta a la mitad del alumnado.
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equityMetrics.map((m, i) => {
            const Icon = ICONS[i % ICONS.length]
            const diff = m.spain - m.oecd
            const good = m.better === 'higher' ? diff > 0 : diff < 0
            const same = Math.abs(diff) < (m.unit === '%' ? 1 : 3)
            const max = Math.max(m.spain, m.oecd) * 1.15

            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-200">{m.title}</h3>
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{m.description}</p>

                {/* Barras comparadas */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10px] tracking-wider text-slate-500 uppercase">Esp</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(m.spain / max) * 100}%` }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${same ? 'bg-slate-500' : good ? 'bg-emerald-400' : 'bg-rose-400'}`}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-sm font-semibold text-slate-100 tabular-nums">
                      {fmt(m.spain, m.unit === '%' ? 1 : 0)}
                      {m.unit.trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10px] tracking-wider text-slate-500 uppercase">OCDE</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(m.oecd / max) * 100}%` }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-slate-600"
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-sm text-slate-400 tabular-nums">
                      {fmt(m.oecd, m.unit === '%' ? 1 : 0)}
                      {m.unit.trim()}
                    </span>
                  </div>
                </div>

                <p className="mt-3 border-t border-slate-800 pt-2 text-[10px] leading-relaxed text-slate-600">
                  {m.source}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
