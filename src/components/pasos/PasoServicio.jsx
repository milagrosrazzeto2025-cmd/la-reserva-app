import { SERVICIOS } from '../../data/servicios'
import GrupoOpciones from '../GrupoOpciones'

export default function PasoServicio({ datos, onElegir, errores }) {
  const opciones = SERVICIOS.map((s) => ({
    valor: s.id,
    etiqueta: s.nombre,
    detalle: s.resumen,
  }))
  return (
    <GrupoOpciones
      nombre="servicio"
      leyenda="¿Qué servicio querés reservar?"
      ayuda="Si es la primera vez de tu perro en La Reserva, empezá por la jornada de adaptación."
      opciones={opciones}
      valor={datos.servicio}
      onChange={onElegir}
      error={errores.servicio}
    />
  )
}
