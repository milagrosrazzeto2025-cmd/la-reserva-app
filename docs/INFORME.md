# Informe: La Reserva, app de reservas

Desarrollo Frontend II, Trabajo Práctico 2.
Alumna: _completar nombre y L.U._

- Aplicación publicada: _URL de Vercel_
- Repositorio: _URL de GitHub_

## 1. Idea y público destinatario

La Reserva es una guardería, hospedaje y colonia canina familiar en Quilmes, atendida por Juli y Esteban. Es un cliente real: trabajo en su comunicación visual.

Hoy las reservas se coordinan por mensajes. Eso obliga a repetir siempre las mismas preguntas (qué servicio, qué fechas, si el perro está castrado, si tiene la libreta al día) y a pedir los documentos por separado.

La app resuelve eso: la familia elige el servicio, marca las fechas en un calendario, completa los datos de su perro y adjunta la libreta sanitaria en un solo flujo. La Reserva recibe la solicitud con todo lo necesario para decidir.

**Público:** familias con perros que buscan cuidado para sus mascotas, la mayoría desde el celular. Por eso la interfaz prioriza el uso con el pulgar, textos claros y formularios cortos por pasos.

**Decisiones tomadas a partir de la información del cliente:**

- La adaptación es obligatoria antes de cualquier servicio, así que está en la app como un servicio más, marcado como "primer paso".
- No inventé precios: solo figuran los de la adaptación ($15.000 y $20.000), que son los que el cliente informó.
- La seña del 30 % se informa, pero se coordina con La Reserva (no se calcula porque no hay precios cargados).
- El requisito de castración se avisa, pero no bloquea el envío: el cliente todavía no definió cómo actuar en esos casos.

## 2. Funciones implementadas

- Presentación de los tres servicios y la adaptación, con detalle desplegable, qué incluyen y requisitos de ingreso.
- Calendario propio con tres modos: un día (adaptación y colonia), varios días sueltos (guardería) y rango de ingreso y salida (hospedaje).
- Formulario de reserva en 5 pasos: servicio, fechas, datos del perro y contacto, documentos y confirmación.
- Colonia: frecuencia de 1, 2 o 3 veces por semana y días preferidos.
- Traslado opcional (CABA o GBA Sur) con dirección.
- Adjuntar libreta sanitaria (obligatoria) y otro documento (opcional), con foto o PDF.
- Validaciones en cada paso, indicador de carga y mensajes de éxito o error.
- "Mis reservas": lista en tiempo real, editar observaciones, cancelar, eliminar (con confirmación) y ver o descargar los archivos subidos.
- Diseño adaptable a computadora y celular.

## 3. Información guardada en Firebase

- **Authentication:** acceso anónimo (cada navegador tiene un `uid`).
- **Cloud Firestore:**
  - `reservas/{id}`: servicio, estado, fechas, datos del perro (nombre, raza, tamaño, castración, sociabilidad), contacto (nombre y teléfono), traslado, medicación, observaciones, lista de documentos, `uid` y fecha de creación.
  - `reservas/{id}/documentos/{id}`: archivo adjunto (tipo, nombre, formato, peso y contenido en base64).
- **Reglas:** cada persona solo lee y modifica sus propias reservas. Se validan el servicio, el estado inicial y el tamaño de los textos y archivos. Ver `firestore.rules`.

Los archivos van en Firestore y no en Firebase Storage porque Storage exige activar facturación. Para que entren en el límite de 1 MB por documento, las fotos se reducen en el navegador antes de guardarse.

## 4. Herramientas de IA utilizadas

- **Claude (Anthropic):** análisis de la consigna, ajuste de la idea, generación y revisión del código, diseño de la interfaz y explicación del funcionamiento.

_Completar si usaste otras herramientas._

## 5. Ejemplos de instrucciones dadas a la IA

1. _"Te voy a dejar adjunta la consigna de mi TP de desarrollo frontend y la idea que tengo. Mi intención es que realices el trabajo paso por paso, analizando la consigna y mi idea, ajustando lo que sea necesario, y después me expliques paso por paso detalladamente qué fuiste haciendo y por qué."_
2. _"Mi idea es hacer una app para mi cliente La Reserva: hospedaje, guardería y colonia canina. Que sus clientes puedan gestionar las reservas, elegir el servicio, elegir las fechas desde un calendario y adjuntar los archivos que se piden como requisito, como la libreta sanitaria."_
3. _Agregar acá las instrucciones de refinamiento que le des (por ejemplo, cambios de color, de textos o de comportamiento) y qué cambió después de cada una._
