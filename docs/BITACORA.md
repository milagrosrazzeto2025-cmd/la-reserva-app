# Bitácora del proceso

Cada versión está guardada como una etiqueta de git (`v1`, `v2`, `v3`, `v4`). Los apartados marcados con **[COMPLETAR]** son los que solo vos podés llenar, porque dependen de lo que hagas y veas en tu computadora. No los inventes: anotá lo que realmente pasó.

## Versión 1: primera versión funcional

**Objetivo:** comprobar que la cadena completa funciona (React, Firebase y publicación) antes de sumar funciones.

**Qué incluye**
- Un formulario simple: servicio, nombre del perro y fecha.
- Lista de reservas con los cuatro movimientos: consultar, agregar, modificar (cancelar) y eliminar.
- Acceso anónimo y reglas de Firestore que limitan cada reserva a su dueño.
- Estilos mínimos, sin identidad visual.

**Por qué empezar así:** si algo falla en la conexión con Firebase o en Vercel, es más fácil encontrar el problema en una app chica.

**Pruebas realizadas** [COMPLETAR]
- [ ] Agregar una reserva y encontrarla en Firestore > Datos
- [ ] Recargar y comprobar que sigue
- [ ] Cancelarla y ver el cambio en Firestore
- [ ] Eliminarla y ver que desaparece

**Uso de IA:** Claude generó la estructura del proyecto y el código base. _[COMPLETAR: qué revisaste vos]_

**Dificultades y cómo las resolví:** [COMPLETAR]

**Capturas:** [COMPLETAR: pantalla de la app v1 y de Firestore]

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

**Pruebas realizadas** [COMPLETAR]
- [ ] Cada servicio de punta a punta (adaptación, guardería, hospedaje, colonia)
- [ ] Intentar avanzar con campos vacíos y ver los errores
- [ ] Subir una foto grande, un PDF y un archivo no permitido
- [ ] Ver que los archivos aparecen en Firestore dentro de la subcolección `documentos`

**Uso de IA:** _[COMPLETAR: instrucciones que diste y qué corregiste]_

**Dificultades y cómo las resolví:** [COMPLETAR]

**Capturas:** [COMPLETAR: calendario, formulario con errores, adjuntos]

## Versión 3: primer diseño propio y experiencia de uso

**Cómo se llegó al diseño**

El primer impulso fue un diseño crema con tipografía con serif y acento terracota, que es lo que sale por defecto para cualquier guardería. Lo descarté porque no decía nada de La Reserva. Se rediseñó a partir del cliente:

| Decisión | Por qué |
| --- | --- |
| Paleta de celeste, azul tinta, verde pasto y amarillo pelota | Son los colores de un patio con perros. El amarillo se usa solo para marcar lo importante (la adaptación, lo seleccionado) |
| Tipografías Bricolage Grotesque (títulos) y Atkinson Hyperlegible (textos) | Una con carácter para los títulos, otra pensada para leerse con facilidad en formularios y celulares |
| Plano de La Reserva en el inicio (parque, galería y casa) | Es lo más propio del cliente: un patio de 300 m² y una casa sin jaulas. Remplaza al típico número grande con degradé |
| Servicios en filas, no en tarjetas iguales | Se leen como un menú y la adaptación se distingue como primer paso |
| Resumen con forma de libreta sanitaria | Es el documento que la familia ya conoce y que tiene que adjuntar |
| Navegación inferior en el celular | El pulgar llega mejor abajo |
| Se sacaron emojis, flechas y etiquetas en mayúsculas | Eran el toque "de plantilla" que no aportaba información |

**Qué cambió en funcionalidad**
- Ver y descargar los documentos subidos desde "Mis reservas" (se leen de Firestore solo cuando se piden).
- Mejor accesibilidad: foco visible, botones de buen tamaño, respeto por "reducir movimiento".

**Pruebas realizadas** [COMPLETAR]
- [ ] En el celular real y en la computadora
- [ ] Teclado: recorrer el formulario sin mouse
- [ ] Versión publicada en Vercel: agregar, consultar, modificar, eliminar y recargar

**Uso de IA:** _[COMPLETAR]_

**Capturas:** [COMPLETAR: inicio, calendario, resumen y mis reservas en celular y en computadora]

## Versión 4: versión final con la identidad de marca de La Reserva

**Qué pasó:** la v3 la diseñé con una paleta propuesta por mí (celeste, azul, verde y amarillo), porque todavía no tenía la identidad del cliente. Cuando llegó la guía de marca, el diseño se rehízo a partir de ella. Esa es una iteración real: pasar de una propuesta propia a la marca del cliente.

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
- Se mantuvo lo que funcionaba de la v3: plano, filas de servicios, resumen tipo libreta y navegación inferior en celular.
- Falta el logo en versión de archivo: en la cabecera hay un texto con el nombre y el arco, hasta tener el logo.

**Pruebas realizadas** [COMPLETAR]
- [ ] Revisar la app en el celular real con las tipografías cargadas
- [ ] Mostrarle el diseño al cliente y anotar su opinión

**Capturas:** [COMPLETAR: comparar inicio de la v3 y de la v4]

## Actualización y verificación en Vercel [COMPLETAR]

La consigna pide comprobar que un cambio en GitHub genera un nuevo despliegue. Sugerencia: publicá la v1, después hacé `git push` de la v2 y de la v3, y anotá en cada caso:

| Versión | Fecha | Build terminó bien | Cómo verifiqué | Problemas |
| --- | --- | --- | --- | --- |
| v1 | | | | |
| v2 | | | | |
| v3 | | | | |
| v4 | | | | |

## Dificultades generales y cómo se resolvieron [COMPLETAR]

Anotá cada problema real (por ejemplo, variables de entorno que no cargan, reglas que bloquean, pantalla en blanco en Vercel), cómo lo investigaste (consola del navegador, pestaña de logs del build de Vercel, preguntas a la IA) y qué lo resolvió.
