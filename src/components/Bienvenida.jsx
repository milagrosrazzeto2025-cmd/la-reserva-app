import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Pantalla de bienvenida con el logo de La Reserva.
// Aparece una vez por sesión del navegador (si cerrás la pestaña y volvés, se ve de nuevo).
// Se cierra sola o al tocar "Entrar", al hacer clic en cualquier parte o con la tecla Esc.

const CLAVE = 'bienvenida-vista'
const SALIDA_MS = 450

function yaFueVista() {
  try {
    return sessionStorage.getItem(CLAVE) === '1'
  } catch {
    return false // si el navegador bloquea el almacenamiento, la mostramos igual
  }
}

function marcarComoVista() {
  try {
    sessionStorage.setItem(CLAVE, '1')
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

function duracionTotal() {
  const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return reducido ? 1500 : 3600
}

export default function Bienvenida() {
  // 'entrando' = visible | 'saliendo' = se desvanece | 'fuera' = ya no existe
  const [fase, setFase] = useState(() => (yaFueVista() ? 'fuera' : 'entrando'))

  const cerrar = useCallback(() => {
    marcarComoVista()
    setFase((f) => (f === 'entrando' ? 'saliendo' : f))
  }, [])

  // Mientras se ve, se cierra sola y el resto de la página queda "inerte" (no se puede tabular detrás).
  useEffect(() => {
    if (fase !== 'entrando') return undefined
    const raiz = document.getElementById('root')
    raiz?.setAttribute('inert', '')
    const temporizador = setTimeout(cerrar, duracionTotal())
    const alTeclear = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', alTeclear)
    return () => {
      clearTimeout(temporizador)
      window.removeEventListener('keydown', alTeclear)
      raiz?.removeAttribute('inert')
    }
  }, [fase, cerrar])

  // Después del desvanecimiento, se saca del todo.
  useEffect(() => {
    if (fase !== 'saliendo') return undefined
    const t = setTimeout(() => setFase('fuera'), SALIDA_MS)
    return () => clearTimeout(t)
  }, [fase])

  if (fase === 'fuera') return null

  return createPortal(
    <div
      className={'bienvenida' + (fase === 'saliendo' ? ' saliendo' : '')}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a La Reserva"
      onClick={cerrar}
    >
      <img
        className="bienvenida-logo"
        src="/logo.jpg"
        alt="La Reserva, guardería y hospedaje canino"
        width="900"
        height="900"
      />
      <button type="button" className="btn btn-primario bienvenida-entrar" onClick={cerrar} autoFocus>
        Entrar
      </button>
      <span className="bienvenida-barra" aria-hidden="true" />
    </div>,
    document.body,
  )
}
