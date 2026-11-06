import { useState } from 'react'
import { configOk } from './firebase'
import { useAuth } from './hooks/useAuth'
import { useReservas } from './hooks/useReservas'
import { cambiarEstado, crearReserva, eliminarReserva } from './services/reservas'

const SERVICIOS = [
  { id: 'guarderia', nombre: 'Guardería canina' },
  { id: 'hospedaje', nombre: 'Hospedaje canino' },
  { id: 'colonia', nombre: 'Colonia canina' },
]

export default function App() {
  const { uid, cargando: autenticando, error: errorAuth } = useAuth()
  const { reservas, cargando, error } = useReservas(uid)

  const [servicio, setServicio] = useState('guarderia')
  const [perro, setPerro] = useState('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')

  if (!configOk) return <p>Faltan las variables de entorno de Firebase (.env).</p>
  if (autenticando) return <p>Cargando...</p>
  if (errorAuth) return <p>No se pudo iniciar sesión: {errorAuth.message}</p>

  async function enviar(e) {
    e.preventDefault()
    if (!perro.trim() || !fecha) {
      setMensaje('Completá el nombre del perro y la fecha.')
      return
    }
    try {
      await crearReserva(uid, { servicio, perro: perro.trim(), fecha })
      setPerro('')
      setFecha('')
      setMensaje('Reserva guardada ✔')
    } catch (err) {
      setMensaje('Error al guardar: ' + err.message)
    }
  }

  async function accion(fn) {
    try {
      await fn()
    } catch (err) {
      setMensaje('Error: ' + err.message)
    }
  }

  return (
    <main>
      <h1>La Reserva</h1>
      <h2>Nueva reserva</h2>
      <form onSubmit={enviar}>
        <select value={servicio} onChange={(e) => setServicio(e.target.value)}>
          {SERVICIOS.map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
        <input placeholder="Nombre del perro" value={perro} onChange={(e) => setPerro(e.target.value)} />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <button type="submit">Reservar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      <h2>Mis reservas</h2>
      {cargando && <p>Cargando reservas...</p>}
      {error && <p>Error al leer: {error.message}</p>}
      <ul>
        {reservas.map((r) => (
          <li key={r.id}>
            {r.servicio} · {r.perro} · {r.fecha} · <b>{r.estado}</b>
            {r.estado === 'pendiente' && (
              <button onClick={() => accion(() => cambiarEstado(r.id, 'cancelada'))}>Cancelar</button>
            )}
            <button onClick={() => accion(() => eliminarReserva(r.id))}>Eliminar</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
