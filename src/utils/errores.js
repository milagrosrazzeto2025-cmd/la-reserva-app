// Traduce los errores técnicos de Firebase a mensajes que entienda cualquier persona.
export function mensajeDeError(err) {
  switch (err?.code) {
    case 'permission-denied':
      return 'No tenés permiso para hacer esto. Si sos quien administra la app: revisá las reglas de Firestore.'
    case 'unavailable':
    case 'auth/network-request-failed':
      return 'No hay conexión con el servidor. Revisá tu internet y probá de nuevo.'
    case 'auth/operation-not-allowed':
    case 'auth/admin-restricted-operation':
      return 'El acceso anónimo no está habilitado en Firebase (Authentication > Método de acceso > Anónimo).'
    case 'invalid-argument':
    case 'resource-exhausted':
      return 'No se pudo guardar: los datos o archivos son demasiado pesados.'
    default:
      return 'Ocurrió un error inesperado. Probá de nuevo en unos minutos.'
  }
}
