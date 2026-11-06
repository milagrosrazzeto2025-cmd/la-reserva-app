import { useRef, useState } from 'react'
import { crearReserva } from '../services/reservas'
import { mensajeDeError } from '../utils/errores'
import { armarReserva, estadoInicial } from '../utils/reserva'
import { validarPaso } from '../utils/validaciones'
import PasoDocumentos from './pasos/PasoDocumentos'
import PasoFechas from './pasos/PasoFechas'
import PasoPerro from './pasos/PasoPerro'
import PasoResumen from './pasos/PasoResumen'
import PasoServicio from './pasos/PasoServicio'

const PASOS = ['Servicio', 'Fechas', 'Tu perro', 'Documentos', 'Confirmar']

// Formulario de reserva en 5 pasos. Guarda todo en el estado de React y
// recién al final (paso 5) lo manda a Firestore.
export default function ReservaWizard({ uid, servicioInicial, onCreada, notificar }) {
  const [paso, setPaso] = useState(servicioInicial ? 1 : 0)
  const [datos, setDatos] = useState(() => estadoInicial(servicioInicial))
  const [documentos, setDocumentos] = useState([])
  const [errores, setErrores] = useState({})
  const [acepta, setAcepta] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const arriba = useRef(null)

  // Algunos campos tienen un error con otro nombre (ej: el campo "rango" muestra el error "fechas").
  const ERROR_DE_CAMPO = { rango: 'fechas', fechaInicio: 'fechas', diasSemana: 'dias', frecuencia: 'dias' }

  const cambiar = (campos) => {
    setDatos((d) => ({ ...d, ...campos }))
    // al corregir un campo, borramos su error
    setErrores((e) => {
      const copia = { ...e }
      Object.keys(campos).forEach((k) => {
        delete copia[k]
        delete copia[ERROR_DE_CAMPO[k]]
      })
      return copia
    })
  }

  function cambiarDocumentos(lista) {
    setDocumentos(lista)
    setErrores({})
  }

  function irA(n) {
    setPaso(n)
    arriba.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function siguiente() {
    const errs = validarPaso(paso, datos, documentos)
    setErrores(errs)
    if (Object.keys(errs).length > 0) return
    irA(paso + 1)
  }

  async function confirmar() {
    if (!acepta) {
      setErrores({ acepta: 'Tenés que aceptar para enviar la solicitud.' })
      return
    }
    setEnviando(true)
    try {
      await crearReserva(uid, armarReserva(datos), documentos)
      notificar('exito', 'Solicitud enviada ✔ La Reserva se va a comunicar con vos para confirmarla.')
      onCreada()
    } catch (err) {
      notificar('error', mensajeDeError(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="wizard" ref={arriba}>
      <ol className="pasos" aria-label="Progreso de la reserva">
        {PASOS.map((nombre, i) => (
          <li key={nombre} className={i === paso ? 'actual' : i < paso ? 'hecho' : ''} aria-current={i === paso ? 'step' : undefined}>
            <span className="paso-numero">{i < paso ? '✓' : i + 1}</span>
            <span className="paso-nombre">{nombre}</span>
          </li>
        ))}
      </ol>

      <div className="tarjeta">
        {paso === 0 && (
          <PasoServicio datos={datos} errores={errores} onElegir={(id) => setDatos(estadoInicial(id))} />
        )}
        {paso === 1 && <PasoFechas datos={datos} cambiar={cambiar} errores={errores} />}
        {paso === 2 && <PasoPerro datos={datos} cambiar={cambiar} errores={errores} />}
        {paso === 3 && <PasoDocumentos documentos={documentos} onCambiar={cambiarDocumentos} errores={errores} />}
        {paso === 4 && (
          <PasoResumen
            reserva={armarReserva(datos)}
            documentos={documentos}
            acepta={acepta}
            onAceptar={(v) => {
              setAcepta(v)
              setErrores({})
            }}
            error={errores.acepta}
          />
        )}

        <div className="botonera">
          {paso > 0 && (
            <button type="button" className="btn btn-ghost" onClick={() => irA(paso - 1)} disabled={enviando}>
              Atrás
            </button>
          )}
          {paso < PASOS.length - 1 ? (
            <button type="button" className="btn btn-primario" onClick={siguiente}>
              Siguiente
            </button>
          ) : (
            <button type="button" className="btn btn-primario" onClick={confirmar} disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar solicitud'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
