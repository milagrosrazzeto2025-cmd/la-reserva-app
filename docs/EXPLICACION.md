# Explicación del proyecto, paso a paso

Pensada para quien está empezando. Está ordenada como te la preguntaría un profesor: qué hace la app, cómo se conecta Firebase y qué hace cada parte.

## 1. Qué pide la consigna y cómo lo cubre la app

| La consigna pide | Cómo lo resolví |
| --- | --- |
| React + Vite con componentes, eventos y estado | La interfaz está dividida en componentes en `src/components/` |
| Firebase: consultar, agregar, modificar y eliminar | Las cuatro operaciones están en `src/services/reservas.js` |
| Persistencia (no alcanza con un array ni localStorage) | Todo se guarda en Cloud Firestore |
| Validaciones, carga y mensajes de éxito o error | `src/utils/validaciones.js`, estados de "Cargando…" y avisos |
| Uso en computadora y celular | CSS adaptable, navegación inferior en celular |
| Reglas de Firestore | `firestore.rules` |
| GitHub, Vercel, README, `.env.example` | Incluidos; los pasos de publicación están en la guía |
| Tres versiones | Etiquetas de git `v1`, `v2`, `v3`, `v4` |
| Originalidad y justificación del diseño | Ver `docs/BITACORA.md` |

## 2. Qué ajusté de tu idea y por qué

Tu idea era buena y ya cumplía la consigna. Hice estos cambios, en orden de importancia:

1. **Archivos adjuntos en Firestore, no en Storage.** La consigna pide Firestore. Firebase Storage (el servicio normal para archivos) exige activar facturación. Por eso las fotos se achican en el navegador y se guardan dentro de Firestore. Es una decisión que tenés que poder contar.
2. **Agregué la "Jornada de adaptación" como servicio.** La información del cliente dice que es obligatoria antes de cualquier servicio, y tiene precio ($15.000 y $20.000). Sin ella, la app dejaría reservar a alguien que no puede ingresar.
3. **No inventé precios.** Solo aparecen los de la adaptación. Para los otros servicios la app dice que La Reserva coordina valor y seña del 30 %.
4. **Sin panel para La Reserva.** Es otra pantalla con otro tipo de permisos y haría el trabajo mucho más grande. La consigna recomienda "una propuesta pequeña que funcione correctamente". Queda anotada como mejora futura.
5. **La castración no bloquea el envío.** El documento del cliente dice que todavía no definieron qué hacer con esos casos. La app avisa y deja enviar. **Conviene que se lo confirmes a tu cliente.**
6. **Cada persona ve solo sus reservas.** Sin registro con mail, usamos acceso anónimo (el modelo de la consigna). Eso significa que no se ven las reservas desde otro dispositivo.

## 3. Conceptos básicos

- **Componente:** una pieza de pantalla que es una función de JavaScript. Por ejemplo, `Calendario` dibuja el calendario. Se arma la pantalla combinando componentes, como bloques.
- **Estado (`useState`):** la memoria de un componente. Cuando el estado cambia, React vuelve a dibujar la pantalla. Ejemplo: al tocar un día del calendario cambia el estado y el día se pinta.
- **Props:** los datos que un componente le pasa a otro, como parámetros de una función.
- **Hook (`useEffect` y los que empiezan con `use`):** funciones especiales de React. `useEffect` ejecuta algo cuando el componente aparece, por ejemplo, empezar a escuchar a Firestore.
- **Firebase:** servicio de Google que hace de "servidor" por nosotros (serverless). Usamos dos partes:
  - **Authentication anónima:** le da a cada navegador un identificador (`uid`) sin pedir registro.
  - **Cloud Firestore:** la base de datos. Guarda **documentos** (como fichas) dentro de **colecciones** (como carpetas).
- **Reglas de Firestore:** el "guardia de seguridad" de la base. Como la configuración de Firebase es pública, lo que protege los datos son las reglas.
- **Variables de entorno (`.env`):** valores de configuración que no se escriben en el código. Vite las lee con `import.meta.env`. El archivo `.env` no se sube a GitHub.
- **Vercel:** toma el código de GitHub, lo "construye" (`npm run build`) y lo publica en una URL.

## 4. Qué hice, en orden

### Paso 1: analicé la consigna y tu idea
Leí el PDF y tu información del cliente. Busqué qué pide la consigna y qué dice el cliente que la app tiene que respetar. De ahí salieron los ajustes de la sección 2.

### Paso 2: v1, la versión mínima (por qué empezar chico)
Creé primero lo mínimo: conexión con Firebase y las 4 operaciones sobre una reserva simple. La razón: si algo falla en la conexión, las reglas o Vercel, el problema se encuentra más rápido en una app chica. Además la consigna pide tres versiones.

Archivos clave:
- `src/firebase.js`: arma la conexión con los datos del `.env`. Si falta alguno, la app muestra un aviso en vez de romperse.
- `src/services/reservas.js`: aquí está la conexión con la base.
- `src/hooks/useAuth.js`: inicia sesión anónima apenas se abre la app.
- `src/hooks/useReservas.js`: mantiene la lista de reservas actualizada.
- `src/App.jsx`: pantalla simple con formulario y lista.

### Paso 3: v2, lo que pediste (servicios, calendario y adjuntos)
- **Datos de los servicios** (`src/data/servicios.js`): los textos del cliente están separados del código, para cambiarlos sin tocar la lógica.
- **Calendario propio** (`Calendario.jsx`): sin librerías, para que lo puedas explicar. Tiene tres modos porque cada servicio elige fechas distinto: un día, varios días, o ingreso y salida. Las fechas se guardan como texto `"2026-11-20"` para evitar problemas de zona horaria.
- **Formulario por pasos** (`ReservaWizard.jsx` y la carpeta `pasos/`): un formulario largo en celular cansa, por pasos es más simple. El estado de todo el formulario vive en el componente principal y recién al final se envía a Firestore.
- **Validaciones** (`validaciones.js`): cada paso revisa sus campos y no deja avanzar si falta algo. Los errores se muestran junto al campo.
- **Adjuntos** (`archivos.js` y `DocumentoUploader.jsx`): al elegir una foto, se reduce en el navegador para que entre en el límite de 1 MB de Firestore. Se rechazan formatos no permitidos y PDFs pesados.
- **Reglas más estrictas** (`firestore.rules`): se valida que el servicio sea uno de los cuatro, que la reserva nazca "pendiente" y que solo se puedan editar observaciones y medicación.
- **Confirmación antes de cancelar o eliminar** (`BotonConfirmar.jsx`): evita borrar por error.

### Paso 4: v3, diseño y experiencia
Seguí la consigna de que el diseño no sea "el primer resultado de una IA". Las decisiones y sus razones están en una tabla en `docs/BITACORA.md`. En resumen: partí del cliente (un patio de 300 m² con perros) y no de una plantilla. Revisé el resultado con capturas en computadora y celular y corregí detalles: las huellas del plano, el plural de "noches" y el trazo del progreso.

Cuando me pasaste la **identidad de marca de La Reserva** (paleta y tipografías), rehíce el diseño con ella y lo guardé como **v4**. De la guía tomé los colores exactos (leyéndolos de tu imagen), las tipografías y el arco, que usé como motivo en el plano y en la marca de la cabecera. Codec Pro no está en Google Fonts: uso Outfit como reemplazo y el README explica cómo poner la original si tenés los archivos. Así el diseño pasó por dos rondas (propuesta propia y marca del cliente), que es justo lo que la consigna pide justificar.

También agregué ver y descargar los documentos subidos, que lee la subcolección `documentos` solo cuando la persona lo pide (los archivos pesan).

### Paso 5: pruebas y documentación
Probé la lógica con un script: fechas, validaciones, y que ningún dato quede `undefined` (Firestore lo rechaza). También comprobé que las pantallas se dibujan sin errores. Escribí el README, el informe, la bitácora y la guía.

## 5. Dónde se conecta Firebase (lo que más te van a preguntar)

**Archivo `src/firebase.js`:** crea la conexión. Lee las 4 variables del `.env` y exporta `auth` y `db`.

**Archivo `src/services/reservas.js`:** las 4 operaciones sobre los datos:

| Operación | Función | Qué hace en Firestore |
| --- | --- | --- |
| Consultar | `escucharReservas` | `onSnapshot` con `where('uid', '==', uid)`: la lista se actualiza sola en tiempo real |
| Consultar | `leerDocumentos` | `getDocs` de la subcolección de archivos |
| Agregar | `crearReserva` | `addDoc` de la reserva y después de cada documento |
| Modificar | `cambiarEstado`, `actualizarReserva` | `updateDoc` |
| Eliminar | `eliminarReserva` | `deleteDoc` (primero los archivos, después la reserva) |

**Un detalle técnico que podés mencionar:** la consulta filtra por `uid` y se ordena en el código, no en Firestore. Ordenar y filtrar a la vez en Firestore exige crear un índice extra.

**Otro:** Firestore no acepta `undefined`. Por eso `armarReserva` guarda `null`, `[]` o `""` en lo que no aplica.

## 6. Preguntas que te pueden hacer

- **¿Dónde se guardan los datos?** En Cloud Firestore, colección `reservas`, y subcolección `documentos` para los archivos.
- **¿Qué pasa si recargo?** Los datos siguen, porque están en Firebase, no en la memoria de la página.
- **¿Cómo sabe la app de quién es cada reserva?** Por el `uid` del acceso anónimo, guardado en cada reserva.
- **¿Cómo se evita que alguien lea reservas ajenas?** Con las reglas de Firestore: solo se permite leer si `resource.data.uid == request.auth.uid`.
- **¿Por qué las claves de Firebase están en el navegador y no pasa nada?** Son configuración pública. Lo que protege es las reglas.
- **¿Por qué no usaste Storage?** Exige facturación; con Firestore alcanza para el TP y las fotos se achican.
- **¿Qué mejorarías?** Panel para que La Reserva confirme, inicio de sesión con mail para ver las reservas desde cualquier dispositivo, y bloqueo de fechas según la disponibilidad.

## 7. Qué NO pude comprobar

No pude instalar paquetes ni abrir la app con Vite y Firebase en mi entorno (sin acceso a internet). Probé la lógica y que las pantallas se dibujan, pero **la conexión real con Firebase y el build de Vercel los vas a verificar vos**. Si algo falla, anotalo en la bitácora y pasame el mensaje de error: puede ser parte de "dificultades y cómo se resolvieron".
