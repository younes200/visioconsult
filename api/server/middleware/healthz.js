module.exports = status
//const requestIp = require('request-ip');

function status() {
  var started = new Date()

  return function(req, res) {
    res.send({
      started: started,
      uptime: (Date.now() - Number(started)) / 1000,
      version: process.env.VERSION,
      url: process.env.URL,
      env: process.env.NODE_ENV
    })
  }
}
