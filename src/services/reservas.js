// Acá están TODAS las operaciones que hablan con Firestore (CRUD).
// Mantenerlas en un solo archivo hace fácil explicar "dónde se conecta Firebase".
//
// Estructura de datos en Firestore:
//   reservas/{id}                  -> datos de la reserva
//   reservas/{id}/documentos/{id}  -> archivos adjuntos (libreta sanitaria, etc.)
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'

const reservasRef = () => collection(db, 'reservas')
const documentosRef = (reservaId) => collection(db, 'reservas', reservaId, 'documentos')

const ms = (ts) => (ts?.toMillis ? ts.toMillis() : Date.now())

// CONSULTAR (Read): escucha en tiempo real las reservas de esta persona.
// Se filtra por uid para que las reglas de Firestore permitan la lectura.
export function escucharReservas(uid, onData, onError) {
  const q = query(reservasRef(), where('uid', '==', uid))
  return onSnapshot(
    q,
    (snap) => {
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      // Ordenamos acá (y no en la consulta) para no necesitar un índice extra.
      lista.sort((a, b) => ms(b.creadoEn) - ms(a.creadoEn))
      onData(lista)
    },
    onError,
  )
}

// AGREGAR (Create): guarda la reserva y después sus documentos adjuntos.
// Si falla algún documento, borra la reserva para no dejarla a medias.
export async function crearReserva(uid, datos, documentos) {
  const ref = await addDoc(reservasRef(), {
    ...datos,
    // Guardamos solo nombre y tipo en la reserva (liviano) para mostrarlos en la lista.
    documentos: documentos.map(({ tipo, nombre }) => ({ tipo, nombre })),
    uid,
    estado: 'pendiente',
    creadoEn: serverTimestamp(),
  })

  try {
    for (const d of documentos) {
      await addDoc(documentosRef(ref.id), {
        tipo: d.tipo,
        nombre: d.nombre,
        mime: d.mime,
        bytes: d.bytes,
        dataUrl: d.dataUrl,
        creadoEn: serverTimestamp(),
      })
    }
  } catch (error) {
    await eliminarReserva(ref.id).catch(() => {})
    throw error
  }
  return ref.id
}

// MODIFICAR (Update): cambia el estado (pendiente -> cancelada).
export function cambiarEstado(id, estado) {
  return updateDoc(doc(db, 'reservas', id), { estado })
}

// MODIFICAR (Update): edita campos de texto (observaciones, medicación).
export function actualizarReserva(id, campos) {
  return updateDoc(doc(db, 'reservas', id), campos)
}

// ELIMINAR (Delete): Firestore no borra las "subcolecciones" solo,
// así que primero borramos los documentos adjuntos y después la reserva.
export async function eliminarReserva(id) {
  const adjuntos = await getDocs(documentosRef(id))
  await Promise.all(adjuntos.docs.map((d) => deleteDoc(d.ref)))
  await deleteDoc(doc(db, 'reservas', id))
}
