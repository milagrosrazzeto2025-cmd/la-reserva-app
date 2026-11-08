import { useState } from 'react'
import { procesarArchivo } from '../utils/archivos'

// Un "casillero" para adjuntar un documento (foto o PDF).
export default function DocumentoUploader({ id, etiqueta, ayuda, obligatorio, documento, onChange, error }) {
  const [procesando, setProcesando] = useState(false)
  const [errorLocal, setErrorLocal] = useState('')

  async function elegirArchivo(e) {
    const archivo = e.target.files?.[0]
    e.target.value = '' // permite volver a elegir el mismo archivo
    if (!archivo) return
    setProcesando(true)
    setErrorLocal('')
    try {
      const procesado = await procesarArchivo(archivo)
      onChange({ ...procesado, tipo: id })
    } catch (err) {
      setErrorLocal(err.message)
    } finally {
      setProcesando(false)
    }
  }

  const mensajeError = errorLocal || error

  return (
    <div className={'documento' + (mensajeError ? ' con-error' : '')}>
      <div className="documento-texto">
        <strong>
          {etiqueta} {obligatorio ? <span className="obligatorio">obligatoria</span> : <span className="opcional">opcional</span>}
        </strong>
        {ayuda && <small className="ayuda">{ayuda}</small>}
      </div>

      {documento ? (
        <div className="documento-listo">
          {documento.mime.startsWith('image/') ? (
            <img src={documento.dataUrl} alt={`Vista previa de ${documento.nombre}`} />
          ) : (
            <span className="pdf-icono" aria-hidden="true">📄</span>
          )}
          <span className="documento-nombre">{documento.nombre}</span>
          <button type="button" className="btn btn-texto" onClick={() => onChange(null)}>
            Quitar
          </button>
        </div>
      ) : (
        <>
          <input
            id={`archivo-${id}`}
            className="archivo-input"
            type="file"
            accept="image/*,application/pdf"
            onChange={elegirArchivo}
            disabled={procesando}
          />
          <label htmlFor={`archivo-${id}`} className="btn btn-secundario">
            {procesando ? 'Procesando…' : 'Elegir foto o PDF'}
          </label>
        </>
      )}

      {mensajeError && (
        <small className="error" role="alert">
          {mensajeError}
        </small>
      )}
    </div>
  )
}
