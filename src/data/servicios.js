// Contenido de los servicios de La Reserva (tomado de la información del cliente).
// Está separado del resto del código para poder cambiar textos sin tocar la lógica.

export const SERVICIOS = [
  {
    id: 'adaptacion',
    emoji: '🐾',
    nombre: 'Jornada de adaptación',
    etiqueta: 'Primer paso obligatorio',
    resumen:
      'Antes de usar cualquier servicio, cada perro pasa una jornada para conocernos y ver cómo se desenvuelve en La Reserva.',
    detalle: [
      'Es obligatoria para todos los perros: pequeños, medianos y grandes.',
      'Observamos cómo se adapta al espacio, cómo se relaciona con otros huéspedes y cómo responde a nuestras rutinas.',
      'Si después contratás un servicio, lo que pagaste se descuenta de tu primera reserva.',
      'Si el perro no pudo adaptarse como se esperaba, se devuelve el dinero.',
    ],
    modoFecha: 'unica',
    modalidades: [
      {
        id: 'diurna',
        nombre: 'Adaptación diurna',
        precio: 15000,
        detalle: 'Ingresa por la mañana y su familia lo retira por la tarde.',
      },
      {
        id: 'noche',
        nombre: 'Adaptación con noche incluida',
        precio: 20000,
        detalle: 'Ingresa por la mañana, pasa el día y también se queda a dormir.',
      },
    ],
  },
  {
    id: 'guarderia',
    emoji: '☀️',
    nombre: 'Guardería canina',
    etiqueta: 'Cuidado por el día',
    resumen:
      'Tu perro pasa el día en La Reserva y vuelve a su casa por la tarde o noche, según lo coordinado con cada familia.',
    detalle: [
      'Disfruta de los espacios de recreación, descansa y comparte con otros huéspedes, siempre bajo supervisión.',
      'Mantiene sus rutinas.',
      'Podés elegir uno o varios días en el calendario.',
    ],
    modoFecha: 'multiple',
  },
  {
    id: 'hospedaje',
    emoji: '🌙',
    nombre: 'Hospedaje canino',
    etiqueta: 'Estadía de 24 horas',
    resumen:
      'Estadía completa que incluye la noche. Tu perro convive con nosotros y comparte los espacios de la casa.',
    detalle: [
      'Mantiene sus rutinas de alimentación, descanso y recreación.',
      'Sin jaulas ni caniles: es un ambiente familiar.',
      'En estadías de más de 10 días o de un mes, el traslado puede ofrecerse sin cargo.',
    ],
    modoFecha: 'rango',
  },
  {
    id: 'colonia',
    emoji: '🎾',
    nombre: 'Colonia canina',
    etiqueta: 'Asistencia semanal',
    resumen:
      'Propuesta semanal para que tu perro disfrute de actividades, juegos, recreación y socialización.',
    detalle: [
      'Cada familia elige la frecuencia: 1, 2 o 3 veces por semana.',
      'Elegís desde cuándo querés empezar y tus días preferidos; La Reserva te confirma.',
    ],
    modoFecha: 'semanal',
    frecuencias: [1, 2, 3],
  },
]

export const SERVICIO_POR_ID = Object.fromEntries(SERVICIOS.map((s) => [s.id, s]))

export const INCLUYE = [
  { emoji: '🩺', titulo: 'Asistencia veterinaria 24 h', texto: 'Disponible ante cualquier situación que requiera atención profesional.' },
  { emoji: '🌿', titulo: 'Parque de 300 m²', texto: 'Espacio al aire libre para jugar, explorar y socializar con supervisión.' },
  { emoji: '🏡', titulo: 'Casa familiar, sin jaulas', texto: 'Los huéspedes comparten los espacios interiores para descansar y dormir acompañados.' },
  { emoji: '🚗', titulo: 'Traslados', texto: 'Búsqueda y regreso desde y hacia CABA y GBA Sur, sujeto a coordinación y disponibilidad.' },
  { emoji: '📸', titulo: 'Fotos y videos', texto: 'Seguimiento diario con material de tu perro durante su estadía.' },
]

export const REQUISITOS = [
  'Primera visita (sin costo ni compromiso) y jornada de adaptación obligatoria.',
  'Libreta sanitaria actualizada, con los controles y vacunas correspondientes.',
  'Alimento suficiente para toda la estadía.',
  'Medicación (si corresponde) con indicaciones de dosis, horarios y forma de administración.',
  'Que el perro pueda convivir adecuadamente con otros huéspedes.',
  'Castración, tanto en machos como en hembras.',
]

export const TAMANOS = [
  { valor: 'pequeno', etiqueta: 'Pequeño' },
  { valor: 'mediano', etiqueta: 'Mediano' },
  { valor: 'grande', etiqueta: 'Grande' },
]

export const ZONAS_TRASLADO = [
  { valor: 'caba', etiqueta: 'CABA' },
  { valor: 'gba-sur', etiqueta: 'GBA Sur' },
]

export const dinero = (n) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
