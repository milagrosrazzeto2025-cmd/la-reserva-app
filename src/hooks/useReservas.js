import { useEffect, useState } from 'react'
import { escucharReservas } from '../services/reservas'

// Mantiene la lista de reservas sincronizada con Firestore.
export function useReservas(uid) {
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uid) return undefined
    setCargando(true)
    const desuscribir = escucharReservas(
      uid,
      (lista) => {
        setReservas(lista)
        setError(null)
        setCargando(false)
      },
      (e) => {
        setError(e)
        setCargando(false)
      },
    )
    return desuscribir
  }, [uid])

  return { reservas, cargando, error }
}
