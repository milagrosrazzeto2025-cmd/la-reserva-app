// Utilidades para trabajar con fechas.
// Guardamos las fechas como texto "AAAA-MM-DD" (ej: "2026-11-20"): es simple,
// se ordena bien y evita problemas de zona horaria.

const pad = (n) => String(n).padStart(2, '0')

export const aISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const deISO = (iso) => {
  const [anio, mes, dia] = iso.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export const hoyISO = () => aISO(new Date())

export const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export function formatearFecha(iso) {
  return deISO(iso).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function nochesEntre(desde, hasta) {
  return Math.round((deISO(hasta) - deISO(desde)) / 86400000)
}

// Devuelve las "casillas" de un mes: primero huecos vacíos (null) hasta el
// día de la semana en que empieza el mes (la semana empieza en lunes) y
// después cada día como texto "AAAA-MM-DD".
export function celdasDelMes(anio, mes) {
  const primero = new Date(anio, mes, 1)
  const huecos = (primero.getDay() + 6) % 7
  const totalDias = new Date(anio, mes + 1, 0).getDate()
  const celdas = Array(huecos).fill(null)
  for (let dia = 1; dia <= totalDias; dia++) celdas.push(aISO(new Date(anio, mes, dia)))
  return celdas
}

// Texto legible con las fechas de una reserva (sirve para el resumen y para la lista).
export function resumenFechas(r) {
  switch (r.servicio) {
    case 'guarderia': {
      const n = r.fechas.length
      return `${n} ${n === 1 ? 'día' : 'días'}: ${r.fechas.map(formatearFecha).join('; ')}`
    }
    case 'hospedaje': {
      const n = nochesEntre(r.fechaInicio, r.fechaFin)
      return `Del ${formatearFecha(r.fechaInicio)} al ${formatearFecha(r.fechaFin)} (${n} ${n === 1 ? 'noche' : 'noches'})`
    }
    case 'colonia': {
      const dias = r.diasSemana.map((i) => DIAS_CORTOS[i]).join(', ')
      return `Desde el ${formatearFecha(r.fechaInicio)}, ${r.frecuencia} ${r.frecuencia === 1 ? 'vez' : 'veces'} por semana (${dias})`
    }
    default:
      return `${formatearFecha(r.fechaInicio)}, ${r.modalidad === 'noche' ? 'con noche incluida' : 'diurna'}`
  }
}
