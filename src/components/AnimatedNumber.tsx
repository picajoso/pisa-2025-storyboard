import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { fmt } from '../lib/format'

interface AnimatedNumberProps {
  value: number
  decimals?: number
  /** Prefijo/sufijo opcional, p. ej. "+" o "pts" */
  prefix?: string
  suffix?: string
}

/**
 * Número que cuenta de 0 a su valor cuando entra en viewport.
 * El valor final se muestra siempre exacto (la animación solo es cosmética).
 */
export default function AnimatedNumber({ value, decimals = 0, prefix = '', suffix = '' }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 55, damping: 20 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(
    () =>
      spring.on('change', (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${fmt(v, decimals)}${suffix}`
      }),
    [spring, prefix, suffix, decimals],
  )

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {fmt(0, decimals)}
      {suffix}
    </span>
  )
}
