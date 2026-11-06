# La Reserva: app de reservas

Aplicación web para que las familias de La Reserva (guardería, hospedaje y colonia canina en Quilmes) puedan:

- conocer los servicios y los requisitos de ingreso,
- elegir un servicio y marcar las fechas en un calendario,
- cargar los datos del perro y adjuntar la libreta sanitaria,
- ver, editar, cancelar o eliminar sus reservas.

Hecha con **React + Vite**, **Firebase** (Authentication anónima + Cloud Firestore) y publicada en **Vercel**.
Trabajo Práctico 2 de Desarrollo Frontend II (UADE).

- Aplicación publicada: _completar con la URL de Vercel_
- Repositorio: _completar con la URL de GitHub_

## Cómo ejecutarla en tu computadora

Necesitás Node.js 20 o superior.

```bash
npm install
cp .env.example .env     # en Windows: copy .env.example .env
# abrí .env y completá los 4 valores de tu proyecto de Firebase
npm run dev
```

Después abrí la dirección que muestra la terminal (normalmente http://localhost:5173).
Si cambiás el archivo `.env`, reiniciá `npm run dev`.

## Cómo configurar Firebase

1. Entrá a [Firebase Console](https://console.firebase.google.com/) y creá un proyecto (sin Analytics).
2. En **Configuración del proyecto > Tus apps**, registrá una app web (`</>`). Copiá `apiKey`, `authDomain`, `projectId` y `appId` al archivo `.env`.
3. En **Authentication > Método de acceso**, habilitá **Anónimo**.
4. En **Firestore Database**, creá una base **Standard**, id `(default)`, región `southamerica-east1` (São Paulo), en **modo producción**.
5. En la pestaña **Reglas** de Firestore, pegá el contenido de [`firestore.rules`](./firestore.rules) y tocá **Publicar**.
   Las reglas se publican en Firebase: desplegar en Vercel no las actualiza.

## Variables de entorno

| Variable | Qué es |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | `apiKey` de la app web de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

Son datos de configuración pública de Firebase (van en el navegador). La seguridad la dan las reglas de Firestore.
Nunca se suben claves privadas ni cuentas de servicio.

## Cómo publicarla en Vercel

1. Subí el repositorio a GitHub (el `.gitignore` ya excluye `.env`, `node_modules` y `dist`).
2. En [Vercel](https://vercel.com/), importá el repositorio. Framework: **Vite**, comando `npm run build`, salida `dist`.
3. En **Settings > Environment Variables**, cargá las 4 variables `VITE_FIREBASE_*` para **Production**.
4. Desplegá. Si cambiás variables después, usá **Redeploy**.
5. Cada `git push` a la rama principal genera un nuevo despliegue automático.

## Qué se guarda en Firebase

```
reservas/{id}                       datos de la reserva
reservas/{id}/documentos/{id}       archivos adjuntos (libreta sanitaria, etc.)
```

Reserva: `uid`, `servicio`, `estado`, fechas, datos del perro, contacto, traslado, medicación, observaciones, lista de documentos y fecha de creación.
Cada visitante se identifica con un login anónimo: solo ve y maneja **sus** reservas.

Los archivos se guardan dentro de Firestore (en base64) porque Firebase Storage requiere activar facturación.
Las fotos se reducen automáticamente y los PDF pueden pesar hasta 650 KB.

## Dónde está cada cosa

| Archivo | Qué hace |
| --- | --- |
| `src/firebase.js` | Conecta la app con Firebase usando las variables de entorno |
| `src/services/reservas.js` | **Todas** las operaciones con Firestore: consultar, crear, modificar y eliminar |
| `src/hooks/useAuth.js` | Inicia sesión anónima |
| `src/hooks/useReservas.js` | Mantiene la lista de reservas sincronizada en tiempo real |
| `src/components/` | Pantallas y piezas de la interfaz |
| `src/data/servicios.js` | Textos de los servicios, requisitos y valores de la adaptación |
| `src/utils/` | Fechas, validaciones, archivos y armado de datos |
| `firestore.rules` | Reglas de seguridad de la base |

## Versiones

El historial de git marca las tres iteraciones del TP (`git checkout v1`, `v2`, `v3`):

- **v1**: versión funcional mínima (formulario simple y lista con cancelar y eliminar).
- **v2**: servicios con su información, calendario, formulario por pasos, requisitos, adjuntos y validaciones.
- **v3**: identidad visual, plano de La Reserva, resumen tipo libreta, visor de documentos y navegación pensada para celular.

## Limitaciones conocidas

- Cada navegador tiene su propia identidad (acceso anónimo): abrir la app en otro dispositivo no muestra las mismas reservas.
- Las reservas quedan **pendientes**. No hay todavía un panel para que La Reserva las confirme: por ahora se hace cambiando el campo `estado` a `confirmada` desde Firestore Console.
- La disponibilidad (máximo de 4 huéspedes a la vez) la evalúa La Reserva; la app no la calcula.
