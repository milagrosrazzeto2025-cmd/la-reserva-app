// Acá están TODAS las operaciones que hablan con Firestore (CRUD).
// Mantenerlas en un solo archivo hace fácil explicar "dónde se conecta Firebase".
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'

const reservasRef = () => collection(db, 'reservas')

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

const ms = (ts) => (ts?.toMillis ? ts.toMillis() : Date.now())

// AGREGAR (Create)
export function crearReserva(uid, datos) {
  return addDoc(reservasRef(), {
    ...datos,
    uid,
    estado: 'pendiente',
    creadoEn: serverTimestamp(),
  })
}

// MODIFICAR (Update): cambia el estado (pendiente / cancelada)
export function cambiarEstado(id, estado) {
  return updateDoc(doc(db, 'reservas', id), { estado })
}

// ELIMINAR (Delete)
export function eliminarReserva(id) {
  return deleteDoc(doc(db, 'reservas', id))
}
