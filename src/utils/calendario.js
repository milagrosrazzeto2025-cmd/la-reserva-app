// Arma un enlace que abre Google Calendar con el evento ya cargado.
// No usa claves ni pide iniciar sesión desde la app: es un enlace con
// parámetros en la URL (ver "Add to Calendar" de Google).
//
// Google espera las fechas de día completo como "AAAAMMDD" y el final
// es EXCLUSIVO: para que el evento incluya el último día, sumamos 1.
import { aISO, deISO } from './fechas'

const sinGuiones = (iso) => iso.replaceAll('-', '')

// Devuelve el día siguiente de una fecha "AAAA-MM-DD".
function diaSiguiente(iso) {
  const d = deISO(iso)
  d.setDate(d.getDate() + 1)
  return aISO(d)
}

export function urlGoogleCalendar(reserva, nombreServicio) {
  const inicio = reserva.fechaInicio
  const fin = reserva.fechaFin ?? reserva.fechaInicio

  const detalle = [
    `Perro: ${reserva.perro.nombre}`,
    `Estado: ${reserva.estado}`,
    'Reserva hecha desde la app de La Reserva.',
  ].join('\n')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${nombreServicio} de ${reserva.perro.nombre} en La Reserva`,
    dates: `${sinGuiones(inicio)}/${sinGuiones(diaSiguiente(fin))}`,
    details: detalle,
    location: 'La Reserva, Quilmes',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
