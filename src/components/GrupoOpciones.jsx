// Grupo de opciones tipo "tarjeta" (botones de radio con buen aspecto).
export default function GrupoOpciones({ nombre, leyenda, ayuda, opciones, valor, onChange, error }) {
  return (
    <fieldset className={'campo grupo' + (error ? ' con-error' : '')}>
      <legend>{leyenda}</legend>
      {ayuda && <small className="ayuda">{ayuda}</small>}
      <div className="opciones">
        {opciones.map((o) => (
          <label key={o.valor} className={'opcion' + (valor === o.valor ? ' activa' : '')}>
            <input
              type="radio"
              name={nombre}
              value={o.valor}
              checked={valor === o.valor}
              onChange={() => onChange(o.valor)}
            />
            <span className="opcion-titulo">{o.etiqueta}</span>
            {o.detalle && <small>{o.detalle}</small>}
          </label>
        ))}
      </div>
      {error && (
        <small className="error" role="alert">
          {error}
        </small>
      )}
    </fieldset>
  )
}
