const {Storage} = require('@google-cloud/storage');
const  path = require("path");
let pathFile = path.resolve(__dirname + '/keyfile.json')
const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: pathFile
  });
  module.exports = function(app, options) {
  
    storage.signature = async function(body) {
    const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType:'application/octet-stream'
      };
          // Get a v4 signed URL for the file
           const [url] = await storage
            .bucket("visioconsult")
            .file(body.fileName)
            .getSignedUrl(options);
          return  url
   
    }
    app.googleCloud = storage
  }
  