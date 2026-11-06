import { DIAS_CORTOS } from './fechas'

// Valores con los que arranca el formulario de reserva.
export function estadoInicial(servicio = '') {
  return {
    servicio,
    // fechas (según el servicio se usa una u otra)
    fechas: [], // guardería: varios días
    rango: { desde: '', hasta: '' }, // hospedaje: entrada y salida
    fechaInicio: '', // adaptación y colonia
    modalidad: 'diurna', // adaptación
    frecuencia: 1, // colonia
    diasSemana: [], // colonia: 0 = lunes ... 6 = domingo
    // perro
    perro: '',
    raza: '',
    tamano: '',
    castrado: '',
    sociabilidad: '',
    medicacion: '',
    observaciones: '',
    // familia
    familia: '',
    telefono: '',
    // traslado
    traslado: false,
    zona: '',
    direccion: '',
  }
}

// Convierte lo que se cargó en el formulario en el documento que se guarda
// en Firestore. Ojo: Firestore NO acepta valores "undefined", por eso todo
// campo que no aplica se guarda como null, [] o "".
export function armarReserva(d) {
  const s = d.servicio
  const fechasOrdenadas = [...d.fechas].sort()

  let fechaInicio = d.fechaInicio || null
  let fechaFin = null
  if (s === 'guarderia') {
    fechaInicio = fechasOrdenadas[0] ?? null
    fechaFin = fechasOrdenadas[fechasOrdenadas.length - 1] ?? null
  }
  if (s === 'hospedaje') {
    fechaInicio = d.rango.desde || null
    fechaFin = d.rango.hasta || null
  }

  return {
    servicio: s,
    fechaInicio,
    fechaFin,
    fechas: s === 'guarderia' ? fechasOrdenadas : [],
    modalidad: s === 'adaptacion' ? d.modalidad : null,
    frecuencia: s === 'colonia' ? d.frecuencia : null,
    diasSemana: s === 'colonia' ? [...d.diasSemana].sort((a, b) => a - b) : [],
    perro: {
      nombre: d.perro.trim(),
      raza: d.raza.trim(),
      tamano: d.tamano,
      castrado: d.castrado === 'si',
      sociabilidad: d.sociabilidad,
    },
    contacto: { familia: d.familia.trim(), telefono: d.telefono.trim() },
    medicacion: d.medicacion.trim(),
    observaciones: d.observaciones.trim(),
    traslado: {
      necesita: d.traslado,
      zona: d.traslado ? d.zona : '',
      direccion: d.traslado ? d.direccion.trim() : '',
    },
  }
}

export const nombreDia = (i) => DIAS_CORTOS[i]
