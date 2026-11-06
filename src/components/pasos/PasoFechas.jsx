import { SERVICIO_POR_ID, dinero } from '../../data/servicios'
import { DIAS_CORTOS, nochesEntre } from '../../utils/fechas'
import Calendario from '../Calendario'
import GrupoOpciones from '../GrupoOpciones'

export default function PasoFechas({ datos, cambiar, errores }) {
  const servicio = SERVICIO_POR_ID[datos.servicio]

  function cambiarFrecuencia(frecuencia) {
    // si había elegido más días que la nueva frecuencia, nos quedamos con los primeros
    cambiar({ frecuencia, diasSemana: datos.diasSemana.slice(0, frecuencia) })
  }

  function alternarDia(i) {
    const ya = datos.diasSemana.includes(i)
    cambiar({ diasSemana: ya ? datos.diasSemana.filter((d) => d !== i) : [...datos.diasSemana, i] })
  }

  return (
    <div className="paso-contenido">
      <h3>
        {servicio.emoji} {servicio.nombre}
      </h3>

      {datos.servicio === 'adaptacion' && (
        <GrupoOpciones
          nombre="modalidad"
          leyenda="Modalidad"
          opciones={servicio.modalidades.map((m) => ({
            valor: m.id,
            etiqueta: `${m.nombre} · ${dinero(m.precio)}`,
            detalle: m.detalle,
          }))}
          valor={datos.modalidad}
          onChange={(modalidad) => cambiar({ modalidad })}
        />
      )}

      {datos.servicio === 'colonia' && (
        <>
          <GrupoOpciones
            nombre="frecuencia"
            leyenda="¿Cuántas veces por semana?"
            opciones={servicio.frecuencias.map((n) => ({
              valor: n,
              etiqueta: `${n} ${n === 1 ? 'vez' : 'veces'} por semana`,
            }))}
            valor={datos.frecuencia}
            onChange={cambiarFrecuencia}
          />
          <fieldset className={'campo grupo' + (errores.dias ? ' con-error' : '')}>
            <legend>Tus días preferidos</legend>
            <small className="ayuda">La Reserva te confirma la disponibilidad de esos días.</small>
            <div className="chips">
              {DIAS_CORTOS.map((nombre, i) => {
                const marcado = datos.diasSemana.includes(i)
                const lleno = datos.diasSemana.length >= datos.frecuencia
                return (
                  <label key={nombre} className={'chip' + (marcado ? ' activa' : '')}>
                    <input type="checkbox" checked={marcado} disabled={!marcado && lleno} onChange={() => alternarDia(i)} />
                    <span>{nombre}</span>
                  </label>
                )
              })}
            </div>
            {errores.dias && (
              <small className="error" role="alert">
                {errores.dias}
              </small>
            )}
          </fieldset>
        </>
      )}

      <div className={'campo' + (errores.fechas ? ' con-error' : '')}>
        <span className="etiqueta-falsa">
          {{
            adaptacion: 'Día de la jornada',
            guarderia: 'Días de guardería',
            hospedaje: 'Ingreso y salida',
            colonia: '¿Desde cuándo querés empezar?',
          }[datos.servicio]}
        </span>

        {datos.servicio === 'guarderia' && (
          <Calendario modo="multiple" valor={datos.fechas} onChange={(fechas) => cambiar({ fechas })} />
        )}
        {datos.servicio === 'hospedaje' && (
          <>
            <Calendario modo="rango" valor={datos.rango} onChange={(rango) => cambiar({ rango })} />
            {datos.rango.desde && datos.rango.hasta && (
              <p className="dato-destacado">
                {nochesEntre(datos.rango.desde, datos.rango.hasta)} noche(s) de hospedaje
              </p>
            )}
          </>
        )}
        {(datos.servicio === 'adaptacion' || datos.servicio === 'colonia') && (
          <Calendario modo="unica" valor={datos.fechaInicio} onChange={(fechaInicio) => cambiar({ fechaInicio })} />
        )}

        {errores.fechas && (
          <small className="error" role="alert">
            {errores.fechas}
          </small>
        )}
      </div>

      <p className="nota">Las fechas quedan sujetas a disponibilidad: La Reserva trabaja con un máximo de cuatro huéspedes a la vez.</p>
    </div>
  )
}
