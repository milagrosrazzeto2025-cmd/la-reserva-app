import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'

// Identifica a cada visitante con un login anónimo (sin pantalla de registro).
// Devuelve el uid (identificador único de ese navegador).
export function useAuth() {
  const [uid, setUid] = useState(null)
  const [cargando, setCargando] = useState(Boolean(auth))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth) return undefined
    const desuscribir = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        setCargando(false)
      } else {
        signInAnonymously(auth).catch((e) => {
          setError(e)
          setCargando(false)
        })
      }
    })
    return desuscribir
  }, [])

  return { uid, cargando, error }
}
