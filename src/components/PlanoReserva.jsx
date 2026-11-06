// Huella de perro (una almohadilla y cuatro deditos).
function Pata({ x, y }) {
  return (
    <g fill="var(--tinta)" transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="6" rx="11" ry="9" />
      <circle cx="-13" cy="-6" r="4.5" />
      <circle cx="-5" cy="-14" r="4.5" />
      <circle cx="5" cy="-14" r="4.5" />
      <circle cx="13" cy="-6" r="4.5" />
    </g>
  )
}

// Plano simplificado de La Reserva, hecho con SVG.
// Muestra los espacios que describe el cliente: parque, galería y casa.
export default function PlanoReserva() {
  return (
    <svg className="plano" viewBox="0 0 440 320" role="img" aria-labelledby="plano-titulo">
      <title id="plano-titulo">Plano de La Reserva: parque de 300 metros cuadrados, galería y casa</title>

      {/* Parque */}
      <rect x="10" y="10" width="250" height="300" rx="26" fill="var(--pasto-claro)" />
      <circle cx="62" cy="64" r="26" fill="var(--pasto)" opacity="0.85" />
      <circle cx="214" cy="250" r="22" fill="var(--pasto)" opacity="0.85" />
      <circle cx="150" cy="170" r="12" fill="var(--pelota)" />
      <path d="M141 168c6 3 12 3 18 0" fill="none" stroke="var(--tinta)" strokeWidth="1.6" strokeLinecap="round" />
      <Pata x={96} y={214} />
      <Pata x={200} y={112} />
      <text x="28" y="298" className="plano-texto plano-titulo">Parque de 300 m²</text>

      {/* Galería */}
      <rect x="270" y="10" width="40" height="300" rx="10" fill="var(--pelota-claro)" />
      <text transform="translate(296 160) rotate(-90)" textAnchor="middle" className="plano-texto">
        Galería
      </text>

      {/* Casa */}
      <rect x="320" y="10" width="110" height="300" rx="16" fill="var(--tinta)" />
      <rect x="332" y="26" width="86" height="82" rx="8" fill="var(--cielo)" />
      <rect x="332" y="120" width="86" height="82" rx="8" fill="var(--cielo)" />
      <rect x="332" y="214" width="86" height="82" rx="8" fill="var(--cielo)" />
      <rect x="340" y="34" width="34" height="14" rx="5" fill="var(--pelota)" />
      <rect x="340" y="128" width="34" height="14" rx="5" fill="var(--pelota)" />
      <rect x="340" y="222" width="34" height="14" rx="5" fill="var(--pelota)" />
      <text x="375" y="92" textAnchor="middle" className="plano-texto plano-chico">Camas</text>
      <text x="375" y="186" textAnchor="middle" className="plano-texto plano-chico">Descanso</text>
      <text x="375" y="280" textAnchor="middle" className="plano-texto plano-chico">Casa</text>
    </svg>
  )
}
