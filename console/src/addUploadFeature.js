// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
import { fetchJson } from './fetch'
import storage from './storage'
import axios from "axios"
const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.rawFile)

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })


/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => async (type, resource, params) => {
        const token = storage.load('lbtoken')
  if (type === 'UPDATE' &&( resource === 'users' || resource === 'patientcontacts')) {
    if (
    (params.data.photo && params.data.photo.rawFile instanceof File)
  ) {
const body = {
    fileName:params.data.photo.rawFile.name,
    type:params.data.photo.rawFile.type
  }
// // generate url signed
const  {json} = await fetchJson(`${process.env.API_URL}/users/${token.userId}/upload`, {
  method: 'POST',
  body: JSON.stringify(body),
})
await axios({
  url: json,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
  },    
  data:params.data.photo.rawFile,
})

const data = {
  ...params.data,
}
data.photo.url = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${params.data.photo.rawFile.name}`

return new Promise((resolve, reject) => {
  resolve(
    requestHandler(type, resource, {
      ...params,
      data,
    })
  )
})
  }
}
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);

}
export default addUploadFeature;