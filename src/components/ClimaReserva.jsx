import { useEffect, useState } from 'react'
import { pronosticoDelDia } from '../services/clima'

// Muestra el pronóstico del día de ingreso. Tiene tres estados posibles:
// cargando, error o con datos (renderizado condicional).
export default function ClimaReserva({ fecha }) {
  const [pronostico, setPronostico] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  // useEffect: se ejecuta cuando el componente aparece (y si cambia "fecha").
  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya se fue
    setCargando(true)
    setError(false)

    pronosticoDelDia(fecha)
      .then((dia) => {
        if (activo) setPronostico(dia ?? null)
      })
      .catch(() => {
        if (activo) setError(true)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [fecha])

  if (cargando) return <p className="clima nota" role="status">Consultando el pronóstico…</p>
  if (error) return <p className="clima nota">No pudimos cargar el pronóstico del día de ingreso.</p>
  if (!pronostico) {
    return <p className="clima nota">El pronóstico se muestra desde 16 días antes del ingreso.</p>
  }

  return (
    <p className="clima nota-info">
      Pronóstico para el ingreso: {pronostico.minima}° a {pronostico.maxima}°, con {pronostico.lluvia}% de probabilidad de lluvia.
    </p>
  )
}
