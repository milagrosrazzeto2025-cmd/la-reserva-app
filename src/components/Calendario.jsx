import { useState } from 'react'
import { DIAS_CORTOS, MESES, celdasDelMes, deISO, hoyISO } from '../utils/fechas'

// Calendario propio (sin librerías). Tiene 3 modos:
//  - "unica":    se elige un solo día           -> valor: "2026-11-20"
//  - "multiple": se eligen varios días sueltos  -> valor: ["2026-11-20", ...]
//  - "rango":    ingreso y salida               -> valor: { desde, hasta }
export default function Calendario({ modo, valor, onChange }) {
  const hoy = hoyISO()
  const ahora = new Date()
  const [vista, setVista] = useState({ anio: ahora.getFullYear(), mes: ahora.getMonth() })
  const esMesActual = vista.anio === ahora.getFullYear() && vista.mes === ahora.getMonth()

  function mover(delta) {
    setVista(({ anio, mes }) => {
      const d = new Date(anio, mes + delta, 1)
      return { anio: d.getFullYear(), mes: d.getMonth() }
    })
  }

  function elegir(iso) {
    if (modo === 'unica') {
      onChange(iso)
    } else if (modo === 'multiple') {
      onChange(valor.includes(iso) ? valor.filter((f) => f !== iso) : [...valor, iso].sort())
    } else {
      const { desde, hasta } = valor
      // Primer clic (o reinicio): fija el ingreso. Segundo clic: fija la salida.
      if (!desde || hasta || iso <= desde) onChange({ desde: iso, hasta: '' })
      else onChange({ desde, hasta: iso })
    }
  }

  function clases(iso) {
    let seleccionado = false
    let enRango = false
    if (modo === 'unica') seleccionado = valor === iso
    else if (modo === 'multiple') seleccionado = valor.includes(iso)
    else {
      seleccionado = iso === valor.desde || iso === valor.hasta
      enRango = Boolean(valor.desde && valor.hasta && iso > valor.desde && iso < valor.hasta)
    }
    return {
      seleccionado,
      clase: 'dia' + (seleccionado ? ' seleccionado' : '') + (enRango ? ' en-rango' : '') + (iso === hoy ? ' hoy' : ''),
    }
  }

  const ayuda = {
    unica: 'Tocá el día que querés.',
    multiple: 'Podés tocar varios días. Tocá de nuevo un día para sacarlo.',
    rango: 'Tocá el día de ingreso y después el día de salida.',
  }[modo]

  return (
    <div className="calendario">
      <div className="cal-cabecera">
        <button type="button" className="cal-flecha" onClick={() => mover(-1)} disabled={esMesActual} aria-label="Mes anterior">
          ‹
        </button>
        <strong aria-live="polite">
          {MESES[vista.mes]} {vista.anio}
        </strong>
        <button type="button" className="cal-flecha" onClick={() => mover(1)} aria-label="Mes siguiente">
          ›
        </button>
      </div>

      <div className="cal-grilla">
        {DIAS_CORTOS.map((d) => (
          <span key={d} className="cal-dia-semana" aria-hidden="true">
            {d}
          </span>
        ))}
        {celdasDelMes(vista.anio, vista.mes).map((iso, i) => {
          if (!iso) return <span key={`vacio-${i}`} />
          const { seleccionado, clase } = clases(iso)
          return (
            <button
              key={iso}
              type="button"
              className={clase}
              disabled={iso < hoy}
              aria-pressed={seleccionado}
              aria-label={deISO(iso).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              onClick={() => elegir(iso)}
            >
              {Number(iso.slice(8))}
            </button>
          )
        })}
      </div>
      <p className="cal-ayuda">{ayuda}</p>
    </div>
  )
}
