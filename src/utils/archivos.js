// Procesa los archivos que adjunta la familia (libreta sanitaria, etc.).
//
// IMPORTANTE: Firebase Storage (el servicio pensado para archivos) hoy exige
// activar facturación. Para que el TP funcione gratis guardamos el archivo
// dentro de Firestore como texto (base64). Firestore limita cada documento a
// 1 MB, por eso las fotos se reducen antes de guardarse.

export const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

const MAX_PDF_BYTES = 650_000
export const MAX_CARACTERES = 900_000 // tope del texto base64 que guardamos

function leerComoDataUrl(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    lector.readAsDataURL(archivo)
  })
}

async function comprimirImagen(archivo) {
  let imagen
  try {
    imagen = await createImageBitmap(archivo)
  } catch {
    throw new Error('No se pudo abrir la imagen. Probá con otra foto (JPG o PNG).')
  }

  // Probamos de más a menos calidad hasta que entre en el límite.
  const intentos = [
    { lado: 1600, calidad: 0.75 },
    { lado: 1300, calidad: 0.65 },
    { lado: 1000, calidad: 0.55 },
    { lado: 800, calidad: 0.5 },
  ]
  for (const { lado, calidad } of intentos) {
    const escala = Math.min(1, lado / Math.max(imagen.width, imagen.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(imagen.width * escala)
    canvas.height = Math.round(imagen.height * escala)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff' // fondo blanco por si la imagen tiene transparencia
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', calidad)
    if (dataUrl.length <= MAX_CARACTERES) {
      imagen.close?.()
      return dataUrl
    }
  }
  imagen.close?.()
  throw new Error('La imagen es demasiado pesada. Probá con una foto más chica.')
}

// Devuelve { nombre, mime, bytes, dataUrl } o lanza un Error con un mensaje claro.
export async function procesarArchivo(archivo) {
  if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
    throw new Error('Formato no permitido. Subí una foto (JPG, PNG) o un PDF.')
  }

  if (archivo.type === 'application/pdf') {
    if (archivo.size > MAX_PDF_BYTES) {
      throw new Error('El PDF pesa demasiado (máximo 650 KB). Sacale una foto a la libreta o comprimí el PDF.')
    }
    const dataUrl = await leerComoDataUrl(archivo)
    return { nombre: archivo.name, mime: 'application/pdf', bytes: archivo.size, dataUrl }
  }

  const dataUrl = await comprimirImagen(archivo)
  return { nombre: archivo.name, mime: 'image/jpeg', bytes: Math.round(dataUrl.length * 0.75), dataUrl }
}
