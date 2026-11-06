// Envuelve un campo de formulario: etiqueta + ayuda + mensaje de error.
export default function Campo({ id, etiqueta, ayuda, error, children }) {
  return (
    <div className={'campo' + (error ? ' con-error' : '')}>
      <label htmlFor={id}>{etiqueta}</label>
      {ayuda && <small className="ayuda">{ayuda}</small>}
      {children}
      {error && (
        <small className="error" role="alert">
          {error}
        </small>
      )}
    </div>
  )
}
