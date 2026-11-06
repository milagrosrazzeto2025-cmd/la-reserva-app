// Huella de perro (una almohadilla y cuatro deditos).
function Pata({ x, y }) {
  return (
    <g fill="var(--oscuro)" transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="6" rx="11" ry="9" />
      <circle cx="-13" cy="-6" r="4.5" />
      <circle cx="-5" cy="-14" r="4.5" />
      <circle cx="5" cy="-14" r="4.5" />
      <circle cx="13" cy="-6" r="4.5" />
    </g>
  )
}

// Ventana en forma de arco: el motivo de la identidad visual de La Reserva.
function Arco({ x, y, w, h, fill }) {
  const r = w / 2
  return <path d={`M${x} ${y + h}V${y + r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h}Z`} fill={fill} />
}

// Plano simplificado de La Reserva, hecho con SVG.
// Muestra los espacios que describe el cliente: parque, galería y casa.
export default function PlanoReserva() {
  return (
    <svg className="plano" viewBox="0 0 440 320" role="img" aria-labelledby="plano-titulo">
      <title id="plano-titulo">Plano de La Reserva: parque de 300 metros cuadrados, galería y casa</title>

      {/* Parque */}
      <rect x="10" y="10" width="250" height="300" rx="26" fill="var(--crema)" />
      <circle cx="62" cy="64" r="26" fill="var(--oliva)" />
      <circle cx="214" cy="250" r="22" fill="var(--oliva)" />
      <circle cx="150" cy="170" r="12" fill="var(--dorado)" />
      <path d="M141 168c6 3 12 3 18 0" fill="none" stroke="var(--oscuro)" strokeWidth="1.6" strokeLinecap="round" />
      <Pata x={96} y={214} />
      <Pata x={200} y={112} />
      <text x="28" y="298" className="plano-texto plano-titulo">Parque de 300 m²</text>

      {/* Galería */}
      <rect x="270" y="10" width="40" height="300" rx="10" fill="var(--dorado)" />
      <text transform="translate(296 160) rotate(-90)" textAnchor="middle" className="plano-texto">
        Galería
      </text>

      {/* Casa: cada ambiente es un arco */}
      <rect x="320" y="10" width="110" height="300" rx="16" fill="var(--oscuro)" />
      <Arco x={332} y={22} w={86} h={86} fill="var(--crema)" />
      <Arco x={332} y={118} w={86} h={86} fill="var(--crema)" />
      <Arco x={332} y={214} w={86} h={84} fill="var(--crema)" />
      <text x="375" y="92" textAnchor="middle" className="plano-texto plano-chico">Camas</text>
      <text x="375" y="188" textAnchor="middle" className="plano-texto plano-chico">Descanso</text>
      <text x="375" y="282" textAnchor="middle" className="plano-texto plano-chico">Casa</text>
    </svg>
  )
}
