# Guía paso a paso: lo que tenés que hacer vos

Entrega: **viernes 13/11 a las 18:15**. Estimá unas 3 a 4 horas en total, repartidas en varios días.

El código ya está hecho. Lo que falta depende de tus cuentas (Firebase, GitHub, Vercel), así que no puedo hacerlo por vos.

## Antes de empezar

- Instalá [Node.js](https://nodejs.org/) (versión LTS) y [Git](https://git-scm.com/).
- Tené cuenta de Google (para Firebase), GitHub y Vercel (se puede entrar con GitHub).
- Descomprimí el proyecto en una carpeta. Abrí una terminal **dentro de esa carpeta**.

## Parte 1: probar en tu computadora

1. `npm install`
2. Seguí con la Parte 2 para conseguir los datos de Firebase.
3. `npm run dev` y abrí la dirección que aparece.

## Parte 2: crear Firebase

1. Entrá a https://console.firebase.google.com/ y creá un proyecto. Apagá Google Analytics.
2. **Configuración del proyecto > Tus apps > `</>`**: registrá una app web. Te muestra un objeto `firebaseConfig`.
3. Copiá `.env.example` como `.env` y completá `apiKey`, `authDomain`, `projectId` y `appId`. Sin comillas ni comas.
4. **Authentication > Comenzar > Método de acceso > Anónimo > Habilitar.**
5. **Firestore Database > Crear base de datos**: edición Standard, id `(default)`, región `southamerica-east1`, **modo producción**.
6. En la pestaña **Reglas**, borrá lo que hay, pegá el contenido de `firestore.rules` y tocá **Publicar**.

## Parte 3: verificar que guarda

Con `npm run dev` andando:

1. Hacé una reserva completa y buscala en **Firestore > Datos** (colección `reservas`).
2. Recargá la página: tiene que seguir.
3. Editá las observaciones y cancelá: mirá el cambio en Firestore.
4. Eliminá: tiene que desaparecer.
5. Sacá capturas de cada paso para la bitácora.

Para probar el estado "confirmada", cambiá el campo `estado` de una reserva a `confirmada` directo en Firestore.

## Parte 4: subir a GitHub

El proyecto ya trae git con 3 commits (v1, v2, v3). Dentro de la carpeta:

1. Creá un repositorio **vacío** en GitHub (sin README).
2. `git remote add origin https://github.com/TU_USUARIO/TU_REPO.git`
3. Si querés mostrar las tres versiones en Vercel, seguí la Parte 6 en lugar de este paso. Si no: `git push -u origin main --tags`
4. Revisá en GitHub que **no** aparezca `.env`.

Los commits dicen autor "Estudiante TP". Si querés tu nombre, antes de subir: `git config user.name "Tu Nombre"` y `git config user.email "tu@mail.com"` valen para los commits nuevos. Para cambiar los ya hechos, preguntame.

## Parte 5: publicar en Vercel

1. En https://vercel.com/ elegí **Add New > Project** e importá el repositorio.
2. Framework: **Vite**. Build: `npm run build`. Output: `dist`. Root Directory: la carpeta con `package.json`.
3. En **Environment Variables**, cargá las 4 variables `VITE_FIREBASE_*` (Production).
4. **Deploy.** Si agregás variables después, **Redeploy**.
5. En Firebase, **Authentication > Configuración > Dominios autorizados**, agregá el dominio de Vercel si no está.
6. Probá todo desde la URL pública y desde tu celular.

## Parte 6: mostrar la evolución y la actualización en Vercel

La consigna pide registrar las versiones y comprobar que un cambio en GitHub genera un nuevo despliegue. Ojo: las tres versiones usan **la misma base de datos** y las reglas finales (`firestore.rules`) rechazan los datos de la v1. Por eso no conviene publicar v1 y v2 en Vercel con esas reglas.

**Camino recomendado (simple):**

1. Publicá la versión final (v4, que es `main`) como en la Parte 5.
2. Hacé un cambio chico y real (por ejemplo, un texto en `src/data/servicios.js`), después `git add -A`, `git commit -m "Ajusto texto"` y `git push`.
3. En Vercel, mirá que arranque solo un nuevo despliegue, que el build termine bien y que el cambio se vea en la URL. Eso es lo que pide la consigna, anotalo en la bitácora.
4. Para v1 y v2 mostrá capturas locales: `git checkout v1`, `npm run dev`, capturá y volvé con `git checkout main`. Para v1 y v2 usá las reglas de esa versión (`git show v1:firestore.rules`) y, al terminar, volvé a publicar las reglas finales. Borrá las reservas de prueba antes de seguir.

**Camino completo (más trabajo):** subir `v1`, `v2` y `main` en ese orden con `git push origin v1:main`, `git push origin v2:main` y `git push origin main --tags`, publicando las reglas de cada versión en Firebase antes de probar y borrando los datos de prueba entre una y otra.

## Parte 7: entrega

- [ ] URL de Vercel
- [ ] Link del repositorio
- [ ] `docs/INFORME.md` completo (tu nombre, L.U., herramientas, instrucciones)
- [ ] `docs/BITACORA.md` completa, con capturas
- [ ] Mini video: mostrá dónde se configura Firebase, cómo se guarda una reserva en `src/services/reservas.js` y cómo aparece en Firestore
- [ ] Subir todo a la tarea de Teams

## Qué tenés que poder explicar si te preguntan

Mirá el archivo `docs/EXPLICACION.md`: está escrito para eso.
