import { useCallback, useEffect, useState } from 'react'
import Aviso from './components/Aviso'
import MisReservas from './components/MisReservas'
import ReservaWizard from './components/ReservaWizard'
import ServiciosVista from './components/ServiciosVista'
import { configOk } from './firebase'
import { useAuth } from './hooks/useAuth'
import { useReservas } from './hooks/useReservas'
import { mensajeDeError } from './utils/errores'

export default function App() {
  const { uid, cargando: autenticando, error: errorAuth } = useAuth()
  const { reservas, cargando, error } = useReservas(uid)

  const [vista, setVista] = useState('servicios') // 'servicios' | 'reservar' | 'mis-reservas'
  const [servicioElegido, setServicioElegido] = useState('')
  const [intento, setIntento] = useState(0) // cambia para reiniciar el formulario
  const [aviso, setAviso] = useState(null)

  const notificar = useCallback((tipo, texto) => setAviso({ tipo, texto }), [])

  // El aviso se cierra solo a los 5 segundos.
  useEffect(() => {
    if (!aviso) return undefined
    const t = setTimeout(() => setAviso(null), 5000)
    return () => clearTimeout(t)
  }, [aviso])

  function empezarReserva(servicio = '') {
    setServicioElegido(servicio)
    setIntento((n) => n + 1)
    setVista('reservar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!configOk) {
    return (
      <main className="contenedor">
        <div className="tarjeta">
          <h1>Falta configurar Firebase</h1>
          <p>
            No se encontraron las variables de entorno. Copiá <code>.env.example</code> como <code>.env</code>, completá
            los valores de tu proyecto y reiniciá <code>npm run dev</code>.
          </p>
        </div>
      </main>
    )
  }

  if (errorAuth) {
    return (
      <main className="contenedor">
        <div className="tarjeta">
          <h1>No pudimos iniciar la sesión</h1>
          <p>{mensajeDeError(errorAuth)}</p>
        </div>
      </main>
    )
  }

  if (autenticando) {
    return (
      <main className="contenedor">
        <p className="estado-carga" role="status">Conectando…</p>
      </main>
    )
  }

  return (
    <>
      <header className="cabecera">
        <div className="contenedor cabecera-interior">
          <button type="button" className="marca" onClick={() => setVista('servicios')}>
            <span className="marca-arco" aria-hidden="true" /> La Reserva
          </button>
          <nav aria-label="Principal">
            <button type="button" className={vista === 'servicios' ? 'activo' : ''} onClick={() => setVista('servicios')}>
              Servicios
            </button>
            <button type="button" className={vista === 'reservar' ? 'activo' : ''} onClick={() => empezarReserva()}>
              Reservar
            </button>
            <button type="button" className={vista === 'mis-reservas' ? 'activo' : ''} onClick={() => setVista('mis-reservas')}>
              Mis reservas{reservas.length > 0 ? ` (${reservas.length})` : ''}
            </button>
          </nav>
        </div>
      </header>

      <main className="contenedor">
        {vista === 'servicios' && <ServiciosVista onReservar={empezarReserva} />}
        {vista === 'reservar' && (
          <ReservaWizard
            key={intento}
            uid={uid}
            servicioInicial={servicioElegido}
            notificar={notificar}
            onCreada={() => setVista('mis-reservas')}
          />
        )}
        {vista === 'mis-reservas' && (
          <MisReservas
            reservas={reservas}
            cargando={cargando}
            error={error}
            notificar={notificar}
            onNueva={() => empezarReserva()}
          />
        )}
      </main>

      <footer className="pie">
        <div className="contenedor">La Reserva, guardería, hospedaje y colonia canina en Quilmes</div>
      </footer>

      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />
    </>
  )
}
