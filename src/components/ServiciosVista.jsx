import { useState } from 'react'
import { INCLUYE, REQUISITOS, SERVICIOS, dinero } from '../data/servicios'
import PlanoReserva from './PlanoReserva'

// Foto de cada servicio (están en public/fotos). Se asignan acá, y no en servicios.js,
// para que los textos de los servicios se puedan editar sin tocar nada de imágenes.
const FOTOS = {
  adaptacion: { src: '/fotos/adaptacion.jpg', alt: 'Perro salchicha descansando bajo una manta en una cama mullida, con un labrador al fondo' },
  guarderia: { src: '/fotos/guarderia.jpg', alt: 'Un labrador chocolate y un perro salchicha jugando en el pasto' },
  hospedaje: { src: '/fotos/hospedaje.jpg', alt: 'Perro salchicha mirando a cámara sobre una manta, en el sillón de la casa' },
  colonia: { src: '/fotos/colonia.jpg', alt: 'Dos perros salchicha corriendo y jugando en el parque' },
}

function FilaServicio({ servicio, onReservar }) {
  const [abierto, setAbierto] = useState(false)
  const esPrimerPaso = servicio.id === 'adaptacion'
  const foto = FOTOS[servicio.id]
  return (
    <article className={'servicio-fila' + (esPrimerPaso ? ' primer-paso' : '')}>
      {foto && <img className="servicio-foto" src={foto.src} alt={foto.alt} width="800" height="600" loading="lazy" />}

      <div className="servicio-texto">
        <h3>{servicio.nombre}</h3>
        <p className="servicio-tipo">{servicio.etiqueta}</p>
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
      </div>

      <div className="servicio-acciones">
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
      <section className="hero">
        <div className="hero-texto">
          <h1>Un patio de 300 m² y una casa abierta para tu perro</h1>
          <p>
            Guardería, hospedaje y colonia canina en Quilmes. Sin jaulas ni caniles: los perros comparten la casa con
            Juli y Esteban. Elegí el servicio, marcá las fechas y subí la libreta sanitaria desde acá.
          </p>
          <div className="botonera botonera-izq">
            <button type="button" className="btn btn-primario btn-grande" onClick={() => onReservar('')}>
              Hacer una reserva
            </button>
            <a className="btn btn-ghost btn-grande" href="#servicios">
              Ver servicios
            </a>
          </div>
        </div>
        <figure className="hero-foto">
          <img
            src="/fotos/hero.jpg"
            alt="Un hombre acariciando a dos perros en el parque de La Reserva"
            width="800"
            height="1000"
            fetchPriority="high"
          />
        </figure>
      </section>

      <section id="servicios" aria-labelledby="t-servicios">
        <h2 id="t-servicios">Nuestros servicios</h2>
        <div className="menu-servicios">
          {SERVICIOS.map((s) => (
            <FilaServicio key={s.id} servicio={s} onReservar={onReservar} />
          ))}
        </div>
      </section>

      <section aria-labelledby="t-incluye">
        <h2 id="t-incluye">Qué incluyen todos los servicios</h2>
        <div className="incluye">
          <dl className="incluye-lista">
            {INCLUYE.map((i) => (
              <div key={i.titulo}>
                <dt>{i.titulo}</dt>
                <dd>{i.texto}</dd>
              </div>
            ))}
          </dl>
          <PlanoReserva />
        </div>
      </section>

      <section aria-labelledby="t-requisitos">
        <h2 id="t-requisitos">Qué necesitamos para recibir a tu perro</h2>
        <ul className="requisitos">
          {REQUISITOS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="nota">
          Todos los ingresos se evalúan antes: miramos la compatibilidad con los demás huéspedes y la disponibilidad.
        </p>
      </section>
    </>
  )
}
