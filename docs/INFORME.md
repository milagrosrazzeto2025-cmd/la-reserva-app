# Informe: app de gestión de servicios y estadías para La Reserva

Desarrollo Frontend II, Trabajo Práctico 2, UADE.
Docente: Joaquín Cerviño.
Alumna: Milagros Razzeto. L.U.: 1165231

- Aplicación publicada: https://la-reserva-app-beta.vercel.app
- Repositorio: https://github.com/milagrosrazzeto2025-cmd/la-reserva-app

## 1. Idea y público destinatario

La Reserva es una guardería, hospedaje y colonia canina familiar en Quilmes, atendida por Juli y Esteban. Es un cliente real: trabajo en su comunicación visual. Como "La Reserva" es el nombre del negocio, en este informe llamo "estadía" o "turno" a cada solicitud de un cliente; dentro de la app se muestra como "reserva".

Hoy los turnos se coordinan por mensajes. Eso obliga a repetir siempre las mismas preguntas (qué servicio, qué fechas, si el perro está castrado, si tiene la libreta al día) y a pedir los documentos por separado.

La app resuelve eso: la familia elige el servicio, marca las fechas en un calendario, completa los datos de su perro y adjunta la libreta sanitaria en un solo flujo. La Reserva recibe la solicitud con todo lo necesario para decidir.

**Público:** familias con perros que buscan cuidado para sus mascotas, la mayoría desde el celular. Por eso la interfaz prioriza el uso con el pulgar, textos claros y formularios cortos por pasos.

**Identidad visual:** la interfaz usa la paleta (oliva, crema, verde oscuro, blanco y dorado) y las tipografías (League Spartan y Codec Pro) de la guía de marca de La Reserva. Del motivo de arcos de la guía salió un recurso propio: las ventanas del plano de la casa, la marca de la cabecera y el marco de la foto de portada. Desde la versión 5 se suman el logo, que se anima al entrar, y fotos reales de los perros del cliente.

**Decisiones tomadas a partir de la información del cliente:**

- La adaptación es obligatoria antes de cualquier servicio, así que está en la app como un servicio más, marcado como "primer paso".
- No inventé precios: solo figuran los de la adaptación ($15.000 y $20.000), que son los que el cliente informó.
- La seña del 30 % se informa, pero se coordina con La Reserva (no se calcula porque no hay precios cargados).
- El requisito de castración se avisa, pero no bloquea el envío: el cliente todavía no definió cómo actuar en esos casos.

## 2. Funciones implementadas

- Pantalla de bienvenida con el logo animado, que se cierra sola, con "Entrar", con la tecla Esc o con un clic.
- Presentación de los tres servicios y la adaptación, cada uno con su foto, detalle desplegable, qué incluyen y requisitos de ingreso.
- Calendario propio con tres modos: un día (adaptación y colonia), varios días sueltos (guardería) y rango de ingreso y salida (hospedaje).
- Formulario de reserva en 5 pasos: servicio, fechas, datos del perro y contacto, documentos y confirmación.
- Colonia: frecuencia de 1, 2 o 3 veces por semana y días preferidos.
- Traslado opcional (CABA o GBA Sur) con dirección.
- Adjuntar libreta sanitaria (obligatoria) y otro documento (opcional), con foto o PDF.
- Validaciones en cada paso, indicador de carga y mensajes de éxito o error.
- "Mis reservas": lista en tiempo real, editar observaciones, cancelar, eliminar (con confirmación) y ver o descargar los archivos subidos.
- Diseño adaptable a computadora y celular, con botones de tres niveles (principal, contorno y texto) y tamaños táctiles cómodos.

## 3. Información guardada en Firebase

- **Authentication:** acceso anónimo (cada navegador tiene un `uid`).
- **Cloud Firestore:**
  - `reservas/{id}`: servicio, estado, fechas, datos del perro (nombre, raza, tamaño, castración, sociabilidad), contacto (nombre y teléfono), traslado, medicación, observaciones, lista de documentos, `uid` y fecha de creación.
  - `reservas/{id}/documentos/{id}`: archivo adjunto (tipo, nombre, formato, peso y contenido en base64).
- **Reglas:** cada persona solo lee y modifica sus propias reservas. Se validan el servicio, el estado inicial y el tamaño de los textos y archivos. Ver `firestore.rules`.

Los archivos van en Firestore y no en Firebase Storage porque Storage exige activar facturación. Para que entren en el límite de 1 MB por documento, las fotos se reducen en el navegador antes de guardarse.

## 4. Versiones

Cada versión está guardada como una etiqueta de git. El detalle de cada una, con sus decisiones y dificultades, está en la bitácora.

| Versión | Qué incorpora |
| --- | --- |
| v1 | Formulario simple, lista de reservas con consultar, agregar, modificar y eliminar, acceso anónimo y reglas de Firestore |
| v2 | Servicios con su información, calendario propio, formulario por pasos, adjuntos, validaciones y reglas más estrictas |
| v3 | Primer diseño propio: plano ilustrado, servicios en filas, resumen con forma de libreta sanitaria y navegación inferior en celular |
| v4 | Identidad de marca de La Reserva: colores, tipografías y motivo de arcos |
| v5 | Pantalla de bienvenida con el logo animado, fotos reales, logo en el pie y botones ordenados |

## 5. Publicación y control de versiones

El código está en GitHub y la app se publica en Vercel, conectada al repositorio. Cada `git push` a la rama principal genera un despliegue nuevo. Lo comprobé en cuatro despliegues: el primero (commit `a55f640`), un cambio de texto de la guardería (commit `55ec0ed`), la versión 5 (commit `4bb3e96`) y los links del README (commit `63ad41d`). En todos Vercel terminó sin errores y el cambio se vio en la web. En GitHub figuran las cinco etiquetas, de `v1` a `v5`.

## 6. Herramientas de IA utilizadas

- **Claude (Anthropic):** análisis de la consigna, ajuste de la idea, generación y revisión del código, diseño de la interfaz y explicación del funcionamiento, paso a paso.

Qué hice yo: creé el proyecto en Firebase (Firestore y autenticación anónima), cargué las claves en el archivo `.env`, probé la app en mi computadora, creé el repositorio en GitHub, conecté Vercel y verifiqué cada despliegue. Cuando algo falló, le mostré a la IA capturas del error y apliqué la solución.

## 7. Ejemplos de instrucciones dadas a la IA

1. _"Te voy a dejar adjunta la consigna de mi TP de desarrollo frontend y la idea que tengo. Mi intención es que realices el trabajo paso por paso, analizando la consigna y mi idea, ajustando lo que sea necesario, y después me expliques paso por paso detalladamente qué fuiste haciendo y por qué."_
2. _"Mi idea es hacer una app para mi cliente La Reserva: hospedaje, guardería y colonia canina. Que sus clientes puedan gestionar las reservas, elegir el servicio, elegir las fechas desde un calendario y adjuntar los archivos que se piden como requisito, como la libreta sanitaria."_ Resultado: la estructura de la app y las versiones 1 y 2.
3. _"Esta es la identidad de La Reserva"_, junto con la imagen de la guía de marca. Resultado: se rehízo el diseño con los colores, las tipografías y el arco de la marca (versión 4).
4. _"Ya tengo Node instalado, ahora explicame paso a paso cómo hago para revisarla"_, y después pedidos similares para Firebase, GitHub y Vercel, sumando capturas cuando algo no funcionaba. Resultado: la app corriendo en mi computadora y publicada en Vercel.
5. _"Quiero que agregues una animación con el logo antes de entrar. Quiero que sumes en los espacios que creas necesario las fotos que te adjunto para sumar identidad. Quiero que acomodes los textos que aparecen dentro de botones en cuanto a escalas, revisa que no quede todo junto ni se vea mal."_ Resultado: la versión 5, con la bienvenida animada, las fotos en la portada y en cada servicio, y botones con jerarquía y tamaños uniformes.

## 8. Posibles mejoras

- Un panel para que La Reserva vea y confirme las solicitudes. Quedó fuera porque requiere otro tipo de permisos y haría el trabajo mucho más grande.
- Un inicio de sesión con dos opciones: entrar como familia o entrar como La Reserva (Juli y Esteban), para que ellos gestionen las solicitudes desde el mismo sitio. Hoy es solo una idea; no está desarrollada.
- Registro con correo, para que cada familia vea sus reservas desde cualquier dispositivo. Hoy se ven solo en el navegador donde se hicieron.
- Definir con el cliente qué hacer con los perros sin castrar, y cargar los precios de todos los servicios.