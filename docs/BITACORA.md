# Bitácora del proceso

App de gestión de servicios y estadías para La Reserva. Alumna: Milagros Razzeto.

Cada versión está guardada como una etiqueta de git (`v1`, `v2`, `v3`, `v4`, `v5`). Esta bitácora cuenta qué se hizo en cada una, por qué, cómo se probó, cómo se usó la IA y qué dificultades aparecieron. Las capturas de pantalla de cada paso están en el PDF de la bitácora.

Las versiones 1 a 3 fueron pasos de desarrollo que la IA fue construyendo a partir de la consigna y de mi idea. Yo probé y publiqué la app completa desde la versión 4, y también la versión 5. Por eso las pruebas manuales aparecen en esas dos versiones.

- Aplicación publicada: https://la-reserva-app-beta.vercel.app
- Repositorio: https://github.com/milagrosrazzeto2025-cmd/la-reserva-app

## Cronología

| Día | Qué se hizo |
| --- | --- |
| Viernes 6/11 | Lectura de la consigna y definición de la idea con la información del cliente. Instalación de Node y puesta en marcha de la app en mi computadora. Creación del proyecto en Firebase, activación de Firestore y de la autenticación anónima, y carga del archivo `.env`. Aplicación de la identidad de marca (versión 4). Creación del repositorio en GitHub, primer `git push` y despliegue en Vercel. Cambio de un texto de la guardería para comprobar la actualización automática |
| Domingo 8/11 | Versión 5: logo animado de bienvenida, fotos del cliente y botones ordenados. Prueba en mi computadora, `npm run build`, commit, etiqueta `v5`, `git push` y verificación del despliegue en Vercel. Links en el README |

## Versión 1: primera versión funcional

**Objetivo:** comprobar que la cadena completa funciona (React, Firebase y publicación) antes de sumar funciones.

**Qué incluye**
- Un formulario simple: servicio, nombre del perro y fecha.
- Lista de reservas con los cuatro movimientos: consultar, agregar, modificar (cancelar) y eliminar.
- Acceso anónimo y reglas de Firestore que limitan cada reserva a su dueño.
- Estilos mínimos, sin identidad visual.

**Por qué empezar así:** si algo falla en la conexión con Firebase o en Vercel, es más fácil encontrar el problema en una app chica.

**Uso de IA:** Claude generó la estructura del proyecto y el código base a partir de la consigna del TP y de la información del cliente. Yo creé el proyecto en Firebase (Firestore y autenticación anónima), cargué mis claves en el archivo `.env`, encendí la app en mi computadora con `npm run dev` y la probé en el navegador.

**Dificultades:** al configurar Firebase no encontraba el ícono `</>` para registrar la app web, y al abrir la app apareció "No pudimos iniciar la sesión". Ambas se explican en "Dificultades generales".

**Capturas:** el proyecto creado en Firebase y mi archivo `.env` con las claves ocultas.

## Versión 2: mejoras de funcionalidad

**Qué cambió**
- Se agregó la información de los servicios, qué incluyen y los requisitos de ingreso, tomados de los datos del cliente.
- Calendario propio con modos de un día, varios días y rango.
- Formulario por pasos (servicio, fechas, perro, documentos, confirmación).
- Adjuntar libreta sanitaria (obligatoria) y otro documento, con foto o PDF.
- Validaciones por paso, mensajes de éxito o error y estados de carga.
- Reglas de Firestore más estrictas (servicio válido, estado inicial, tamaños, solo se pueden editar observaciones y medicación).
- Confirmación en dos pasos antes de cancelar o eliminar.

**Decisiones**
- Los archivos se guardan en Firestore y no en Storage (Storage requiere facturación). Las fotos se reducen antes de guardarse por el límite de 1 MB por documento.
- Se separaron la adaptación y los servicios, porque el cliente exige la adaptación antes de cualquier ingreso.
- No se bloquea a los perros sin castrar: el cliente no definió aún qué hacer.

**Uso de IA:** le pedí a Claude que ajustara mi idea a la consigna, y él propuso el calendario, los pasos de la reserva, la carga de archivos y las reglas de seguridad. Cuando apareció el error "No pudimos iniciar la sesión", le mostré una captura: la causa era que la autenticación anónima no estaba activada en Firebase, y la activé yo.

**Capturas:** el error "No pudimos iniciar la sesión", la pantalla de Authentication de Firebase donde activé el acceso anónimo y una reserva guardada en Firestore.

## Versión 3: primer diseño propio y experiencia de uso

**Cómo se llegó al diseño**

El primer impulso fue un diseño crema con tipografía con serif y acento terracota, que es lo que sale por defecto para cualquier guardería. Se descartó porque no decía nada de La Reserva. Se rediseñó a partir del cliente:

| Decisión | Por qué |
| --- | --- |
| Paleta de celeste, azul tinta, verde pasto y amarillo pelota | Son los colores de un patio con perros. El amarillo se usa solo para marcar lo importante (la adaptación, lo seleccionado) |
| Tipografías Bricolage Grotesque (títulos) y Atkinson Hyperlegible (textos) | Una con carácter para los títulos, otra pensada para leerse con facilidad en formularios y celulares |
| Plano de La Reserva en el inicio (parque, galería y casa) | Es lo más propio del cliente: un patio de 300 m² y una casa sin jaulas. Reemplaza al típico número grande con degradé |
| Servicios en filas, no en tarjetas iguales | Se leen como un menú y la adaptación se distingue como primer paso |
| Resumen con forma de libreta sanitaria | Es el documento que la familia ya conoce y que tiene que adjuntar |
| Navegación inferior en el celular | El pulgar llega mejor abajo |
| Se sacaron emojis, flechas y etiquetas en mayúsculas | Eran el toque "de plantilla" que no aportaba información |

**Qué cambió en funcionalidad**
- Ver y descargar los documentos subidos desde "Mis reservas" (se leen de Firestore solo cuando se piden).
- Mejor accesibilidad: foco visible, botones de buen tamaño, respeto por "reducir movimiento".

**Uso de IA:** Claude propuso el diseño de esta versión (la ilustración, las huellas y el resumen con forma de libreta). Después le compartí la identidad visual real del cliente, y por eso esta paleta se reemplazó en la versión 4.

**Capturas:** inicio con el plano de La Reserva, calendario, paso "Sobre el perro" y resumen con forma de libreta.

## Versión 4: versión con la identidad de marca de La Reserva

**Qué pasó:** la versión 3 se diseñó con una paleta propuesta por la IA (celeste, azul, verde y amarillo), porque todavía no tenía la identidad del cliente. Cuando le pasé la guía de marca, el diseño se rehízo a partir de ella. Esa es una iteración real: pasar de una propuesta propia a la marca del cliente.

**Qué se tomó de la identidad de marca**

| Elemento de la marca | Cómo se usa en la app |
| --- | --- |
| Verde oscuro `#3C3F2A` | Color de textos, títulos y de lo seleccionado |
| Oliva `#737150` | Botones principales y estados completados |
| Dorado `#CFA96A` | Lo importante: la adaptación como primer paso, el paso actual, la galería del plano |
| Crema `#EDE7DD` y fondo `#F7F6F1` | Fondos de la página y del plano; rango de fechas en el calendario |
| League Spartan | Títulos y nombre de la marca |
| Codec Pro | Textos. No está en Google Fonts: se usa Outfit como reemplazo parecido |
| Muestras de color con forma de arco | Motivo propio: las ventanas del plano, la marca de la cabecera y el ícono de la pestaña |
| Títulos de sección centrados entre líneas finas | Los títulos de sección de la app |

**Decisiones**
- El color de error es un rojo ladrillo aparte, porque la paleta de marca no tiene ningún color que se lea como alerta. Se verificó el contraste de los textos sobre cada fondo.
- Se mantuvo lo que funcionaba de la versión 3: plano, filas de servicios, resumen tipo libreta y navegación inferior en celular.
- El logo todavía no estaba en versión de archivo: en la cabecera quedó un texto con el nombre y el arco. El logo se incorporó en la versión 5.

**Pruebas realizadas**
- Copié los archivos de esta versión a mi carpeta, y comprobé en el navegador que los colores nuevos reemplazaran a los de la versión 3.
- Abrí la app publicada en Vercel desde una ventana de incógnito y funcionó.

**Uso de IA:** le compartí la imagen de la identidad de marca de La Reserva y Claude la aplicó: tomó los colores de la imagen, las tipografías y el arco. Yo verifiqué en mi computadora que los colores se vieran como en la guía.

**Capturas:** inicio, servicios y calendario con la identidad de marca (oliva, dorado y crema).

## Versión 5: pantalla de bienvenida, fotos reales y botones ordenados

**Pedido:** sumar identidad con el logo y las fotos del cliente, y revisar que los textos de los botones se vean bien.

**Qué se hizo**

| Cambio | Dónde | Por qué |
| --- | --- | --- |
| Pantalla de bienvenida con el logo animado (se abre desde el centro, como una ventana) | `src/components/Bienvenida.jsx` y `src/main.jsx` | Presenta la marca antes de entrar. Se cierra sola, con "Entrar", con Esc o con un clic. Aparece una vez por sesión y respeta "reducir movimiento" |
| Foto de portada dentro de un arco | `ServiciosVista.jsx` | El arco repite el de la marca; la foto con una persona y los perros genera confianza en la primera pantalla |
| Una foto por servicio | `ServiciosVista.jsx` | Ayuda a reconocer cada servicio de un vistazo |
| Logo en el pie de página | `App.jsx` | Cierra la página con la marca |
| Botones con tres niveles: principal (relleno), secundario (contorno) y de texto (subrayado) | `index.css` | Antes los botones secundarios se parecían a enlaces y quedaban desalineados |
| Tarjetas de opciones con aire interno | `index.css` | Una regla general anulaba su relleno y el texto tocaba el borde |
| Contador de "Mis reservas" como globito | `App.jsx` | El texto se partía en dos líneas en el celular |
| "Enviar solicitud" en una sola línea en el celular | `index.css` | "Atrás" ocupaba la mitad del ancho |
| Etiquetas "obligatoria" y "opcional" como píldoras | `index.css` | Quedaban sangradas en una línea aparte |

**Decisión sobre las fotos:** se asignan en `ServiciosVista.jsx` y no en `servicios.js`, para poder editar los textos de los servicios sin tocar las imágenes. Las fotos se redujeron de tamaño para que la página cargue rápido.

**Pruebas realizadas**
- Con la IA: se revisaron todas las pantallas en computadora y celular, la animación cuadro por cuadro, las formas de cerrar la bienvenida (botón, Esc, Enter y clic), que no vuelva a aparecer al recargar y el modo de movimiento reducido. También un script que arma una reserva de cada servicio y verifica los datos, que terminó sin errores.
- Mías: probé la versión en mi computadora con `npm run dev`, corrí `npm run build` (terminó bien, con un aviso por el tamaño del paquete, sin errores) y verifiqué la web publicada.

**Uso de IA:** le pasé el logo y cinco fotos del cliente, y le pedí tres cambios: la animación con el logo antes de entrar, fotos en los lugares que le parecieran estratégicos y botones con textos mejor ordenados. Claude propuso dónde poner cada foto y revisó la app para encontrar los problemas de los botones. Yo probé el resultado, lo subí a GitHub y lo publiqué.

**Capturas:** la pantalla de bienvenida con el logo y el inicio y el calendario de la versión 5 en mi iPhone.

## Actualización y verificación en Vercel

La consigna pide comprobar que un cambio en GitHub genera un nuevo despliegue. Las versiones 1 a 3 no se publicaron por separado: quedaron guardadas como etiquetas de git, y publiqué directamente la versión con la identidad de marca. Estos son los despliegues que verifiqué:

| Despliegue | Fecha | Resultado del build | Cómo verifiqué | Problemas |
| --- | --- | --- | --- | --- |
| Primer despliegue (commit `a55f640`, agrega `package-lock.json`) | Viernes 6/11 | Listo en 10 s | Abrí la URL de producción en una ventana de incógnito | El botón "Autorizar" de GitHub no respondía en Vercel |
| Cambio de un texto de la guardería (commit `55ec0ed`) | Viernes 6/11 | Listo en 6 s | Apareció un despliegue nuevo y el texto cambió en la web | Ninguno |
| Versión 5 (commit `4bb3e96`) | Domingo 8/11 | Listo en 8 s | Apareció el despliegue nuevo y la web mostró la bienvenida, las fotos y los botones nuevos | Ninguno |
| Links en el README (commit `63ad41d`) | Domingo 8/11 | Listo | Apareció un cuarto despliegue en la lista | Ninguno |

**Capturas:** la lista de despliegues de Vercel con los cuatro en "Listo".

## Versiones guardadas en GitHub

Las cinco etiquetas (`v1` a `v5`) se subieron con `git push origin v1 v2 v3 v4 v5`. En el repositorio figuran 5 etiquetas y 9 commits.

**Capturas:** la terminal con las etiquetas subidas y el repositorio en GitHub.

## Dificultades generales y cómo se resolvieron

| Dificultad | Causa | Cómo se resolvió |
| --- | --- | --- |
| No encontraba el ícono `</>` de Firebase | Está dentro de "+ Agregar app" | Mandé una captura a la IA y me indicó dónde buscarlo |
| "No pudimos iniciar la sesión" al abrir la app | La autenticación anónima no estaba activada | La activé en Authentication, en "Configurar el método de acceso" |
| Escribí comandos de git en la terminal donde corría `npm run dev` | Esa terminal estaba ocupada por la app | Abrí una terminal nueva con el botón `+` |
| GitHub mostró "¡Algo salió mal!" al crear el repositorio | Error de la página: el repositorio se creó igual | Verifiqué que existiera y seguí |
| `remote origin already exists` | El remoto ya estaba agregado | Es inofensivo; seguí con el `push` |
| Seguía viendo los colores de la versión 3 | Había copiado un zip anterior | Copié los archivos nuevos y la carpeta `.git` |
| No podía apretar "Autorizar" de GitHub en Vercel | El botón no respondía | Esperé, probé sin traductor y en una ventana de incógnito |
| No encontraba la pestaña de despliegues | Vercel estaba en español | Busqué el nombre traducido en el proyecto |
| Trabajaba en dos carpetas del mismo proyecto y la terminal estaba en la equivocada | Tenía una copia "V2" dentro de otra carpeta | Abrí la carpeta correcta, que ya tenía `node_modules` y `.env`, y entré con `cd` |

**Capturas:** el error de GitHub al crear el repositorio, `git status` con archivos sin seguimiento y Vercel pidiendo instalar la aplicación de GitHub.
