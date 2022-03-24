import loopbackRestClient from './loopback'
import addUploadFeature from './addUploadFeature'

export default addUploadFeature(loopbackRestClient(process.env.API_URL))
