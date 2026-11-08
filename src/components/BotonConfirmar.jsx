import { useState } from 'react'

// Botón de dos pasos para acciones delicadas (cancelar / eliminar):
// primero pregunta "¿Seguro?" y recién después ejecuta la acción.
export default function BotonConfirmar({ etiqueta, pregunta = '¿Seguro?', onConfirmar, deshabilitado, peligro }) {
  const [preguntando, setPreguntando] = useState(false)

  if (preguntando) {
    return (
      <span className="confirmar">
        <span>{pregunta}</span>
        <button
          type="button"
          className={'btn ' + (peligro ? 'btn-peligro' : 'btn-secundario')}
          disabled={deshabilitado}
          onClick={() => {
            setPreguntando(false)
            onConfirmar()
          }}
        >
          Sí
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setPreguntando(false)}>
          No
        </button>
      </span>
    )
  }

  return (
    <button type="button" className="btn btn-texto" disabled={deshabilitado} onClick={() => setPreguntando(true)}>
      {etiqueta}
    </button>
  )
}
