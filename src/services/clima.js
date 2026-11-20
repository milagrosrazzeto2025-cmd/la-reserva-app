// Consulta el pronóstico a una API externa: Open-Meteo (gratis y sin clave).
// Usa fetch, que devuelve una promesa; la respuesta llega en formato JSON.
//
// Open-Meteo da hasta 16 días hacia adelante. Pedimos todo junto una sola vez
// y guardamos el resultado en "cache", así varias reservas no repiten la consulta.

// Coordenadas aproximadas de Quilmes.
const LATITUD = -34.72
const LONGITUD = -58.26

const URL_CLIMA =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${LATITUD}&longitude=${LONGITUD}` +
  '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=America%2FArgentina%2FBuenos_Aires&forecast_days=16'

let cache = null

export async function obtenerPronostico() {
  if (cache) return cache

  const respuesta = await fetch(URL_CLIMA)
  if (!respuesta.ok) {
    // fetch NO falla solo con un error 404 o 500: hay que revisarlo a mano.
    throw new Error(`La API del clima respondió ${respuesta.status}`)
  }

  const datos = await respuesta.json()
  const d = datos.daily

  // La API devuelve listas paralelas; las convertimos en una lista de objetos.
  cache = d.time.map((fecha, i) => ({
    fecha,
    maxima: Math.round(d.temperature_2m_max[i]),
    minima: Math.round(d.temperature_2m_min[i]),
    lluvia: d.precipitation_probability_max[i],
  }))
  return cache
}

// Busca el pronóstico de un día "AAAA-MM-DD". Devuelve undefined si está
// fuera de los 16 días que ofrece la API.
export async function pronosticoDelDia(fecha) {
  const lista = await obtenerPronostico()
  return lista.find((dia) => dia.fecha === fecha)
}
