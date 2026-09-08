import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: ReactNode
}

export default function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 max-w-3xl"
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-cyan-400 uppercase">
        <span className="h-px w-8 bg-cyan-400/60" />
        {kicker}
      </p>
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
    </motion.div>
  )
}
