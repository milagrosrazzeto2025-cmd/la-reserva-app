import DocumentoUploader from '../DocumentoUploader'

export default function PasoDocumentos({ documentos, onCambiar, errores }) {
  const buscar = (tipo) => documentos.find((d) => d.tipo === tipo) ?? null

  function cambiarDocumento(tipo, nuevo) {
    const resto = documentos.filter((d) => d.tipo !== tipo)
    onCambiar(nuevo ? [...resto, nuevo] : resto)
  }

  return (
    <div className="paso-contenido">
      <h3>Documentos</h3>
      <p className="nota">
        Podés subir una foto o un PDF. Las fotos se reducen automáticamente para que pesen poco.
      </p>

      <DocumentoUploader
        id="libreta"
        etiqueta="Libreta sanitaria actualizada"
        ayuda="Completa, con los controles y vacunas correspondientes."
        obligatorio
        documento={buscar('libreta')}
        onChange={(d) => cambiarDocumento('libreta', d)}
        error={errores.libreta}
      />

      <DocumentoUploader
        id="otro"
        etiqueta="Otro documento"
        ayuda="Por ejemplo, la receta o indicaciones de la medicación."
        documento={buscar('otro')}
        onChange={(d) => cambiarDocumento('otro', d)}
      />
    </div>
  )
}
