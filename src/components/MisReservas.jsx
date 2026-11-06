import { useState } from 'react'
import { SERVICIO_POR_ID, TAMANOS, ZONAS_TRASLADO } from '../data/servicios'
import { actualizarReserva, cambiarEstado, eliminarReserva } from '../services/reservas'
import { mensajeDeError } from '../utils/errores'
import { resumenFechas } from '../utils/fechas'
import BotonConfirmar from './BotonConfirmar'

const ESTADOS = {
  pendiente: 'Pendiente de confirmación',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
}

const etiquetaDe = (lista, valor) => lista.find((x) => x.valor === valor)?.etiqueta ?? valor

function TarjetaReserva({ reserva: r, notificar }) {
  const servicio = SERVICIO_POR_ID[r.servicio]
  const [ocupada, setOcupada] = useState(false)
  const [editando, setEditando] = useState(false)
  const [notas, setNotas] = useState(r.observaciones ?? '')

  // Ejecuta una operación de Firebase mostrando éxito o error.
  async function ejecutar(operacion, mensajeOk) {
    setOcupada(true)
    try {
      await operacion()
      notificar('exito', mensajeOk)
      return true
    } catch (err) {
      notificar('error', mensajeDeError(err))
      return false
    } finally {
      setOcupada(false)
    }
  }

  async function guardarNotas() {
    if (notas.length > 500) {
      notificar('error', 'Las observaciones pueden tener hasta 500 caracteres.')
      return
    }
    const ok = await ejecutar(() => actualizarReserva(r.id, { observaciones: notas.trim() }), 'Observaciones actualizadas ✔')
    if (ok) setEditando(false)
  }

  const modificable = r.estado === 'pendiente'

  return (
    <article className="tarjeta reserva">
      <div className="reserva-cabecera">
        <h3>
          <span aria-hidden="true">{servicio.emoji}</span> {servicio.nombre}
        </h3>
        <span className={'estado estado-' + r.estado}>{ESTADOS[r.estado]}</span>
      </div>

      <dl className="resumen">
        <div className="fila">
          <dt>Perro</dt>
          <dd>
            {r.perro.nombre} · {etiquetaDe(TAMANOS, r.perro.tamano)}
          </dd>
        </div>
        <div className="fila">
          <dt>Fechas</dt>
          <dd>{resumenFechas(r)}</dd>
        </div>
        {r.traslado.necesita && (
          <div className="fila">
            <dt>Traslado</dt>
            <dd>
              {etiquetaDe(ZONAS_TRASLADO, r.traslado.zona)} · {r.traslado.direccion}
            </dd>
          </div>
        )}
        <div className="fila">
          <dt>Documentos</dt>
          <dd>{r.documentos?.map((d) => d.nombre).join(', ') || '—'}</dd>
        </div>
        {r.medicacion && (
          <div className="fila">
            <dt>Medicación</dt>
            <dd>{r.medicacion}</dd>
          </div>
        )}
        {!editando && r.observaciones && (
          <div className="fila">
            <dt>Observaciones</dt>
            <dd>{r.observaciones}</dd>
          </div>
        )}
      </dl>

      {editando && (
        <div className="campo">
          <label htmlFor={`notas-${r.id}`}>Observaciones</label>
          <textarea id={`notas-${r.id}`} rows={3} value={notas} onChange={(e) => setNotas(e.target.value)} />
          <div className="botonera botonera-izq">
            <button type="button" className="btn btn-primario" onClick={guardarNotas} disabled={ocupada}>
              {ocupada ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { setEditando(false); setNotas(r.observaciones ?? '') }}>
              Descartar
            </button>
          </div>
        </div>
      )}

      {r.estado === 'confirmada' && (
        <p className="nota">Esta reserva ya fue confirmada. Para hacer cambios, comunicate con La Reserva.</p>
      )}

      {r.estado !== 'confirmada' && !editando && (
        <div className="botonera botonera-izq">
          {modificable && (
            <button type="button" className="btn btn-ghost" onClick={() => setEditando(true)} disabled={ocupada}>
              Editar observaciones
            </button>
          )}
          {modificable && (
            <BotonConfirmar
              etiqueta="Cancelar reserva"
              pregunta="¿Cancelar la reserva?"
              deshabilitado={ocupada}
              onConfirmar={() => ejecutar(() => cambiarEstado(r.id, 'cancelada'), 'Reserva cancelada.')}
            />
          )}
          <BotonConfirmar
            etiqueta="Eliminar"
            pregunta="¿Eliminar definitivamente?"
            peligro
            deshabilitado={ocupada}
            onConfirmar={() => ejecutar(() => eliminarReserva(r.id), 'Reserva eliminada.')}
          />
        </div>
      )}
    </article>
  )
}

export default function MisReservas({ reservas, cargando, error, notificar, onNueva }) {
  return (
    <section aria-labelledby="t-mis">
      <h2 id="t-mis">Mis reservas</h2>
      <p className="nota">Tus reservas quedan asociadas a este navegador. Si abrís la app desde otro dispositivo, no las vas a ver.</p>

      {cargando && <p className="estado-carga" role="status">Cargando tus reservas…</p>}
      {error && (
        <p className="nota nota-error" role="alert">
          No pudimos leer tus reservas. {error.code === 'permission-denied' ? 'Revisá las reglas de Firestore.' : 'Probá recargar la página.'}
        </p>
      )}

      {!cargando && !error && reservas.length === 0 && (
        <div className="tarjeta vacio">
          <p>Todavía no hiciste ninguna reserva.</p>
          <button type="button" className="btn btn-primario" onClick={onNueva}>
            Hacer una reserva
          </button>
        </div>
      )}

      <div className="lista-reservas">
        {reservas.map((r) => (
          <TarjetaReserva key={r.id} reserva={r} notificar={notificar} />
        ))}
      </div>
    </section>
  )
}
