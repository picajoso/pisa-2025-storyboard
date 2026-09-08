import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const LINKS = [
  { href: '#comparador', label: 'Ranking' },
  { href: '#autonomias', label: 'Autonomías' },
  { href: '#ia', label: 'IA' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#talento', label: 'Talento' },
  { href: '#genero', label: 'Género' },
  { href: '#equidad', label: 'Equidad' },
  { href: '#bienestar', label: 'Bienestar' },
]

export default function SectionNav() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : -60 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="font-display text-sm font-medium text-slate-200">
          PISA 2025 <span className="text-slate-600">· una década perdida</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Secciones">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-100 sm:px-3 sm:text-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <motion.div className="h-px origin-left bg-cyan-400" style={{ scaleX: progress }} />
    </motion.div>
  )
}
