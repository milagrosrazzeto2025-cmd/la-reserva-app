import { useState } from 'react'
import { INCLUYE, REQUISITOS, SERVICIOS, dinero } from '../data/servicios'

function TarjetaServicio({ servicio, onReservar }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <article className="tarjeta servicio">
      <span className="etiqueta">{servicio.etiqueta}</span>
      <h3>
        <span aria-hidden="true">{servicio.emoji}</span> {servicio.nombre}
      </h3>
      <p>{servicio.resumen}</p>

      {abierto && (
        <div className="servicio-detalle">
          <ul>
            {servicio.detalle.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {servicio.modalidades && (
            <ul className="precios">
              {servicio.modalidades.map((m) => (
                <li key={m.id}>
                  <strong>{m.nombre}:</strong> {dinero(m.precio)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="botonera botonera-izq">
        <button type="button" className="btn btn-ghost" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
          {abierto ? 'Ver menos' : 'Ver detalle'}
        </button>
        <button type="button" className="btn btn-primario" onClick={() => onReservar(servicio.id)}>
          Reservar
        </button>
      </div>
    </article>
  )
}

export default function ServiciosVista({ onReservar }) {
  return (
    <>
      <section className="intro">
        <h1>Reservá el lugar de tu perro en La Reserva</h1>
        <p>
          Guardería, hospedaje y colonia canina en un ambiente familiar. Elegí el servicio, marcá las fechas en el
          calendario y adjuntá la documentación: nosotros te confirmamos.
        </p>
      </section>

      <section aria-labelledby="t-servicios">
        <h2 id="t-servicios">Nuestros servicios</h2>
        <div className="grilla-servicios">
          {SERVICIOS.map((s) => (
            <TarjetaServicio key={s.id} servicio={s} onReservar={onReservar} />
          ))}
        </div>
      </section>

      <section aria-labelledby="t-incluye">
        <h2 id="t-incluye">Qué incluyen todos los servicios</h2>
        <div className="grilla-incluye">
          {INCLUYE.map((i) => (
            <div key={i.titulo} className="tarjeta incluye">
              <span className="emoji" aria-hidden="true">{i.emoji}</span>
              <strong>{i.titulo}</strong>
              <p>{i.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="t-requisitos">
        <h2 id="t-requisitos">Requisitos de ingreso</h2>
        <div className="tarjeta">
          <ul className="requisitos">
            {REQUISITOS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="nota">
            Todos los ingresos están sujetos a evaluación previa, compatibilidad con los demás huéspedes y
            disponibilidad.
          </p>
        </div>
      </section>
    </>
  )
}
