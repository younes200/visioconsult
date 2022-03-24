var Raven = require('raven')

module.exports.requestHandler = Raven.requestHandler.bind(Raven)
module.exports.errorHandler = Raven.errorHandler.bind(Raven)
