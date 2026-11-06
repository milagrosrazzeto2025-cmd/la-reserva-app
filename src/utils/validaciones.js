// Validaciones básicas de cada paso del formulario.
// Cada función devuelve un objeto con los errores: {} significa "todo bien".

export function validarFechas(d) {
  const e = {}
  switch (d.servicio) {
    case 'guarderia':
      if (d.fechas.length === 0) e.fechas = 'Elegí al menos un día en el calendario.'
      break
    case 'hospedaje':
      if (!d.rango.desde) e.fechas = 'Elegí el día de ingreso.'
      else if (!d.rango.hasta) e.fechas = 'Ahora elegí el día de salida (tiene que ser posterior al ingreso).'
      break
    case 'colonia':
      if (!d.fechaInicio) e.fechas = 'Elegí desde qué día querés empezar.'
      if (d.diasSemana.length !== d.frecuencia) {
        e.dias = `Elegí ${d.frecuencia} ${d.frecuencia === 1 ? 'día preferido' : 'días preferidos'}.`
      }
      break
    default:
      if (!d.fechaInicio) e.fechas = 'Elegí el día de la jornada en el calendario.'
  }
  return e
}

export function validarPerro(d) {
  const e = {}
  if (!d.perro.trim()) e.perro = 'Escribí el nombre de tu perro.'
  else if (d.perro.trim().length > 60) e.perro = 'El nombre es demasiado largo.'
  if (!d.tamano) e.tamano = 'Elegí el tamaño.'
  if (!d.castrado) e.castrado = 'Indicá si está castrado.'
  if (!d.sociabilidad) e.sociabilidad = 'Contanos cómo se lleva con otros perros.'
  if (!d.familia.trim()) e.familia = 'Escribí tu nombre.'

  const digitos = d.telefono.replace(/\D/g, '')
  if (!d.telefono.trim()) e.telefono = 'Dejanos un teléfono para contactarte.'
  else if (digitos.length < 8 || digitos.length > 15) e.telefono = 'Revisá el teléfono: parece incompleto.'

  if (d.traslado) {
    if (!d.zona) e.zona = 'Elegí la zona del traslado.'
    if (d.direccion.trim().length < 5) e.direccion = 'Escribí la dirección de búsqueda y regreso.'
  }
  if (d.medicacion.length > 500) e.medicacion = 'Máximo 500 caracteres.'
  if (d.observaciones.length > 500) e.observaciones = 'Máximo 500 caracteres.'
  return e
}

export function validarDocumentos(documentos) {
  const e = {}
  if (!documentos.some((doc) => doc.tipo === 'libreta')) {
    e.libreta = 'La libreta sanitaria actualizada es obligatoria para ingresar.'
  }
  return e
}

export function validarPaso(paso, datos, documentos) {
  if (paso === 0) return datos.servicio ? {} : { servicio: 'Elegí un servicio para continuar.' }
  if (paso === 1) return validarFechas(datos)
  if (paso === 2) return validarPerro(datos)
  if (paso === 3) return validarDocumentos(documentos)
  return {}
}
