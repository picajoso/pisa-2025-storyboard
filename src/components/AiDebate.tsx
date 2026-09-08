import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, BrainCircuit, ChevronDown, Smartphone, Sparkles, TrendingDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { keyFactors } from '../data/pisaData'
import { fmt } from '../lib/format'

type FactorId = (typeof keyFactors)[number]['id']

interface CardConfig {
  icon: typeof Bot
  factorId: FactorId
  eyebrow: string
  title: string
  standfirst: string
  contrast: { label: string; text: string }
  accent: string // tailwind classes para acento
}

const CARDS: CardConfig[] = [
  {
    icon: Sparkles,
    factorId: 'ai-weekly-use',
    eyebrow: 'El dato',
    title: 'La IA ya está dentro',
    standfirst:
      'Casi la mitad de los estudiantes de la OCDE usa chatbots semanalmente para estudiar; en España, más de la mitad. La integración es un hecho, no una hipótesis.',
    contrast: {
      label: 'Adopción',
      text: 'España 54,2 % · OCDE 45,5 % · Singapur 65,6 % · Japón 27,4 %',
    },
    accent: 'text-cyan-400',
  },
  {
    icon: BrainCircuit,
    factorId: 'ai-performance',
    eyebrow: 'El debate',
    title: 'Andamiaje o muleta',
    standfirst:
      'El informe no cifra un único «efecto IA», pero su diagnóstico es incómodo: en tareas concretas (resumir, investigar, redactar), quienes no usan IA rinden mejor. El uso semanal «para aprender» apenas empata con el no-uso. La escala de todo ello: 20 puntos equivalen a un curso escolar.',
    contrast: {
      label: 'Sustitución cognitiva',
      text: 'El consumo de contenido no es aprendizaje: la lectura OCDE acumula −25 pts desde 2018 — un año lectivo entero — y España −23 solo desde 2022.',
    },
    accent: 'text-rose-400',
  },
  {
    icon: Smartphone,
    factorId: 'screen-distraction',
    eyebrow: 'El entorno',
    title: 'El aula interrumpida',
    standfirst:
      'Más de uno de cada cuatro alumnos ve cómo sus compañeros se distraen con pantallas en la mayoría de las clases. Tras la hora diaria de ocio digital, el rendimiento en ciencia cae de forma sostenida.',
    contrast: {
      label: 'Distracción digital',
      text: '28 % OCDE · 31 % en centros desfavorecidos vs 26 % en favorecidos. España responde con la prohibición de móviles más amplia: 86,3 % de los alumnos.',
    },
    accent: 'text-amber-400',
  },
]

export default function AiDebate() {
  const [openId, setOpenId] = useState<FactorId | null>(null)

  return (
    <section id="ia" className="scroll-mt-16 border-b border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          kicker="Tecnología"
          title="¿La IA ayuda a estudiar — o sustituye el esfuerzo de pensar?"
          description={
            <>
              PISA 2025 es la primera edición con datos masivos de uso de inteligencia artificial en el aula. El
              veredicto del Volumen I es matizado pero claro: <strong className="text-slate-200">la tecnología
              amplifica cuando sostiene el esfuerzo cognitivo</strong>, y lo socava cuando lo sustituye.
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {CARDS.map((card, i) => {
            const factor = keyFactors.find((f) => f.id === card.factorId)!
            const Icon = card.icon
            const open = openId === factor.id
            return (
              <motion.article
                key={factor.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group flex flex-col rounded-xl border p-6 transition-colors ${
                  open ? 'border-slate-600 bg-slate-900' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
                    {card.eyebrow}
                  </span>
                  <Icon className={`h-5 w-5 ${card.accent}`} />
                </div>

                <h3 className="font-display mt-4 text-2xl font-medium text-slate-50">{card.title}</h3>

                <p className="mt-3 flex items-baseline gap-2">
                  <span className={`font-display text-4xl font-medium tracking-tight ${card.accent}`}>
                    {factor.metric}
                  </span>
                  <span className="text-sm text-slate-500">{factor.title.toLowerCase()}</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">{card.standfirst}</p>

                <button
                  onClick={() => setOpenId(open ? null : factor.id)}
                  aria-expanded={open}
                  className="mt-5 flex w-full items-center justify-between border-t border-slate-800 pt-4 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Los números detrás
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    <ul className="space-y-2.5">
                      {factor.values.map((v) => (
                        <li key={v.label} className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="text-slate-400">{v.label}</span>
                          <span className="tabular-nums font-semibold text-slate-100">
                            {fmt(v.value, v.unit === '%' ? 1 : 0)}
                            {v.unit === '%' ? ' %' : v.unit ? ` ${v.unit}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-600">
                      {factor.source}
                    </p>
                  </div>
                </motion.div>
              </motion.article>
            )
          })}
        </div>

        {/* Cita editorial de cierre */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl border-l-2 border-cyan-400/50 pl-6 sm:pl-8"
        >
          <blockquote className="font-display text-xl leading-snug text-slate-200 italic sm:text-2xl">
            «No nos ponemos en forma viendo deporte, sino haciéndolo. El aprendizaje no ocurre consumiendo
            contenido, sino en el esfuerzo cognitivo productivo de la mente. Si lo hacemos bien, la IA será un
            andamiaje, no una muleta.»
          </blockquote>
          <figcaption className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <TrendingDown className="h-3.5 w-3.5 text-cyan-400" />
            Andreas Schleicher · Prólogo, PISA 2025 Results (Vol. I) · traducción propia
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
