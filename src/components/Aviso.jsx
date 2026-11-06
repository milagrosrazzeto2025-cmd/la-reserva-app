// Mensaje flotante de éxito o error (desaparece solo desde App.jsx).
export default function Aviso({ aviso, onCerrar }) {
  if (!aviso) return null
  return (
    <div className={'aviso aviso-' + aviso.tipo} role={aviso.tipo === 'error' ? 'alert' : 'status'}>
      <span>{aviso.texto}</span>
      <button type="button" onClick={onCerrar} aria-label="Cerrar mensaje">
        ×
      </button>
    </div>
  )
}
