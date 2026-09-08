/** Formatea números al estilo editorial español (coma decimal, signo menos tipográfico). */
export function fmt(value: number, decimals = 0): string {
  const sign = value < 0 ? '−' : ''
  return (
    sign +
    Math.abs(value).toLocaleString('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  )
}
