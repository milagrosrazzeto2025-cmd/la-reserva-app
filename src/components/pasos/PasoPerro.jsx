import { TAMANOS, ZONAS_TRASLADO } from '../../data/servicios'
import Campo from '../Campo'
import GrupoOpciones from '../GrupoOpciones'

const SOCIABILIDAD = [
  { valor: 'bien', etiqueta: 'Se lleva bien con otros perros' },
  { valor: 'depende', etiqueta: 'Depende del perro' },
  { valor: 'no-seguro', etiqueta: 'No lo sé todavía' },
]

export default function PasoPerro({ datos, cambiar, errores }) {
  return (
    <div className="paso-contenido">
      <h3>Sobre tu perro</h3>

      <Campo id="perro" etiqueta="Nombre del perro" error={errores.perro}>
        <input id="perro" value={datos.perro} maxLength={60} autoComplete="off" onChange={(e) => cambiar({ perro: e.target.value })} />
      </Campo>

      <Campo id="raza" etiqueta="Raza (opcional)">
        <input id="raza" value={datos.raza} maxLength={60} autoComplete="off" onChange={(e) => cambiar({ raza: e.target.value })} />
      </Campo>

      <GrupoOpciones
        nombre="tamano"
        leyenda="Tamaño"
        opciones={TAMANOS}
        valor={datos.tamano}
        onChange={(tamano) => cambiar({ tamano })}
        error={errores.tamano}
      />

      <GrupoOpciones
        nombre="castrado"
        leyenda="¿Está castrado?"
        ayuda="La Reserva solicita que machos y hembras estén castrados para ingresar."
        opciones={[
          { valor: 'si', etiqueta: 'Sí' },
          { valor: 'no', etiqueta: 'No' },
        ]}
        valor={datos.castrado}
        onChange={(castrado) => cambiar({ castrado })}
        error={errores.castrado}
      />
      {datos.castrado === 'no' && (
        <p className="nota nota-aviso">
          Podés enviar la solicitud igual: La Reserva se va a comunicar con vos para conversar cómo
          proceder. La decisión de castrar y el momento indicado conviene hablarlos con tu veterinario.
        </p>
      )}

      <GrupoOpciones
        nombre="sociabilidad"
        leyenda="Convivencia con otros perros"
        opciones={SOCIABILIDAD}
        valor={datos.sociabilidad}
        onChange={(sociabilidad) => cambiar({ sociabilidad })}
        error={errores.sociabilidad}
      />

      <Campo
        id="medicacion"
        etiqueta="Medicación (si corresponde)"
        ayuda="Indicá nombre, dosis, horarios y forma de administración."
        error={errores.medicacion}
      >
        <textarea id="medicacion" rows={3} value={datos.medicacion} onChange={(e) => cambiar({ medicacion: e.target.value })} />
      </Campo>

      <Campo id="observaciones" etiqueta="Algo más que debamos saber (opcional)" error={errores.observaciones}>
        <textarea
          id="observaciones"
          rows={3}
          value={datos.observaciones}
          onChange={(e) => cambiar({ observaciones: e.target.value })}
          placeholder="Hábitos, miedos, alimentación, personalidad…"
        />
      </Campo>

      <h3>Tus datos de contacto</h3>
      <Campo id="familia" etiqueta="Tu nombre" error={errores.familia}>
        <input id="familia" value={datos.familia} maxLength={80} autoComplete="name" onChange={(e) => cambiar({ familia: e.target.value })} />
      </Campo>
      <Campo id="telefono" etiqueta="Teléfono / WhatsApp" error={errores.telefono}>
        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          value={datos.telefono}
          maxLength={25}
          autoComplete="tel"
          onChange={(e) => cambiar({ telefono: e.target.value })}
        />
      </Campo>

      <label className="check">
        <input type="checkbox" checked={datos.traslado} onChange={(e) => cambiar({ traslado: e.target.checked })} />
        <span>Necesito servicio de traslado (búsqueda y regreso)</span>
      </label>

      {datos.traslado && (
        <div className="subbloque">
          <GrupoOpciones
            nombre="zona"
            leyenda="Zona"
            opciones={ZONAS_TRASLADO}
            valor={datos.zona}
            onChange={(zona) => cambiar({ zona })}
            error={errores.zona}
          />
          <Campo id="direccion" etiqueta="Dirección de búsqueda y regreso" error={errores.direccion}>
            <input id="direccion" value={datos.direccion} maxLength={120} autoComplete="street-address" onChange={(e) => cambiar({ direccion: e.target.value })} />
          </Campo>
          <p className="nota">
            Según la zona, el recorrido y la duración de la estadía, el traslado puede tener un costo adicional o
            realizarse sin cargo. La Reserva lo coordina con vos.
          </p>
        </div>
      )}
    </div>
  )
}
