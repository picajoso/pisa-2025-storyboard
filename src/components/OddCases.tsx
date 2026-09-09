import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, AlertTriangle, XCircle, ExternalLink, Check, Minus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { oddCases, oddCasesIntro, type Verdict } from '../data/oddCases'

const VERDICT_STYLE: Record<
  Verdict,
  { border: string; bg: string; text: string; icon: typeof BadgeCheck }
> = {
  true: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/[0.05]', text: 'text-emerald-300', icon: BadgeCheck },
  partial: { border: 'border-amber-500/30', bg: 'bg-amber-500/[0.05]', text: 'text-amber-300', icon: AlertTriangle },
  misleading: { border: 'border-rose-500/30', bg: 'bg-rose-500/[0.05]', text: 'text-rose-300', icon: XCircle },
}

export default function OddCases() {
  const [openId, setOpenId] = useState<string | null>('bukele')

  return (
    <section id="casos" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="Los casos raros"
          title="Milagros, espejismos y anomalías: cómo leer un titular de PISA"
          description={oddCasesIntro}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {oddCases.map((c, i) => {
            const style = VERDICT_STYLE[c.verdict]
            const VerdictIcon = style.icon
            const open = openId === c.id
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                className={`flex flex-col rounded-xl border p-6 transition-colors ${style.border} ${
                  open ? 'bg-slate-900' : style.bg
                }`}
              >
                {/* Cabecera: claim + veredicto */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-2xl" aria-hidden>
                    {c.icon}
                  </span>
                  <span
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider ${style.border} ${style.text}`}
                  >
                    <VerdictIcon className="h-3 w-3" />
                    {c.verdictLabel}
                  </span>
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-slate-300 italic">«{c.claim}»</blockquote>
                <p className="mt-2 text-[11px] text-slate-500">{c.claimSource}</p>

                <button
                  onClick={() => setOpenId(open ? null : c.id)}
                  aria-expanded={open}
                  className="mt-4 flex w-full items-center justify-between border-t border-slate-800 pt-3 text-xs font-medium tracking-wider text-slate-400 uppercase transition-colors hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {open ? 'Ocultar el análisis' : 'Lo que dicen los datos'}
                  <Minus
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? '' : 'rotate-90'}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <p className="text-sm leading-relaxed text-slate-400">{c.reality}</p>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {c.numbers.map((n) => (
                            <div key={n.label} className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                              <p className="text-[10px] leading-tight text-slate-500">{n.label}</p>
                              <p className="mt-1 text-sm font-semibold text-slate-100 tabular-nums">{n.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-y-1.5 border-t border-slate-800 pt-3">
                          {c.sources.map((s) => (
                            <a
                              key={s.url}
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-[11px] text-cyan-400/80 underline decoration-cyan-400/20 underline-offset-2 transition-colors hover:text-cyan-300"
                            >
                              <ExternalLink className="h-3 w-3 shrink-0" />
                              {s.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>

        {/* Cierre metodológico */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-10 max-w-3xl rounded-xl border border-slate-800 bg-slate-900/40 p-6"
        >
          <p className="font-display text-lg leading-snug text-slate-200">
            La regla de oro: pregunta siempre <em>quién</em> hizo el examen.
          </p>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-400">
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-slate-200">PISA</strong> es la evaluación nacional representativa: muestrea a
                los 15-year-olds de todo el sistema. Es la única comparable entre países.
              </span>
            </li>
            <li className="flex gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                <strong className="text-slate-200">PISA for Schools</strong> evalúa centros concretos que se inscriben:
                útil para benchmarking escolar, no para decir que «un país alcanzó a otro».
              </span>
            </li>
            <li className="flex gap-2.5">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <span>
                <strong className="text-slate-200">Las «economías» regionales</strong> (B-S-J-Z, Taipéi, Macao, Hong
                Kong) son subsistemas seleccionados — legítimos como casos de estudio, engañosos como «ranking de
                países».
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
