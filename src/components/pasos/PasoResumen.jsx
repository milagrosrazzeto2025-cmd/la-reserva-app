import { SERVICIO_POR_ID, TAMANOS, ZONAS_TRASLADO, dinero } from '../../data/servicios'
import { resumenFechas } from '../../utils/fechas'

const etiquetaDe = (lista, valor) => lista.find((x) => x.valor === valor)?.etiqueta ?? valor

function Fila({ etiqueta, children }) {
  return (
    <div className="fila">
      <dt>{etiqueta}</dt>
      <dd>{children}</dd>
    </div>
  )
}

// `reserva` es el objeto ya armado con armarReserva().
export default function PasoResumen({ reserva, documentos, acepta, onAceptar, error }) {
  const servicio = SERVICIO_POR_ID[reserva.servicio]
  const modalidad = servicio.modalidades?.find((m) => m.id === reserva.modalidad)

  return (
    <div className="paso-contenido">
      <h3>Revisá tu solicitud</h3>
      <dl className="resumen">
        <Fila etiqueta="Servicio">
          {servicio.emoji} {servicio.nombre}
        </Fila>
        <Fila etiqueta="Fechas">{resumenFechas(reserva)}</Fila>
        {modalidad && <Fila etiqueta="Valor de la adaptación">{dinero(modalidad.precio)}</Fila>}
        <Fila etiqueta="Perro">
          {reserva.perro.nombre}
          {reserva.perro.raza ? ` (${reserva.perro.raza})` : ''} · {etiquetaDe(TAMANOS, reserva.perro.tamano)} ·{' '}
          {reserva.perro.castrado ? 'castrado' : 'sin castrar'}
        </Fila>
        <Fila etiqueta="Contacto">
          {reserva.contacto.familia} · {reserva.contacto.telefono}
        </Fila>
        {reserva.medicacion && <Fila etiqueta="Medicación">{reserva.medicacion}</Fila>}
        {reserva.observaciones && <Fila etiqueta="Observaciones">{reserva.observaciones}</Fila>}
        <Fila etiqueta="Traslado">
          {reserva.traslado.necesita
            ? `${etiquetaDe(ZONAS_TRASLADO, reserva.traslado.zona)} · ${reserva.traslado.direccion}`
            : 'No'}
        </Fila>
        <Fila etiqueta="Documentos">{documentos.map((d) => d.nombre).join(', ')}</Fila>
      </dl>

      <div className="nota nota-info">
        <strong>¿Qué pasa ahora?</strong>
        <ul>
          <li>Tu solicitud queda <b>pendiente</b>: La Reserva te contacta para confirmar disponibilidad.</li>
          <li>Para confirmar la reserva se solicita una seña del 30 % del valor del servicio.</li>
          <li>Si hacés una adaptación y después contratás un servicio, su importe se descuenta de tu primera reserva.</li>
          <li>Recordá llevar alimento suficiente para toda la estadía.</li>
        </ul>
      </div>

      <label className={'check' + (error ? ' con-error' : '')}>
        <input type="checkbox" checked={acepta} onChange={(e) => onAceptar(e.target.checked)} />
        <span>
          Leí los requisitos de ingreso y entiendo que la reserva queda sujeta a evaluación, compatibilidad con
          los demás huéspedes y disponibilidad.
        </span>
      </label>
      {error && (
        <small className="error" role="alert">
          {error}
        </small>
      )}
    </div>
  )
}
