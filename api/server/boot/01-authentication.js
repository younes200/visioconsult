'use strict'

module.exports = app => {
  // enable authentication
  app.enableAuth()

  app.use(
    app.loopback.token({
      model: app.models.accessToken,
      params: ['access_token', 'accessToken']
    })
  )

  // app.use((req, res, next) => {
  //   var token = req.accessToken,
  //     now = new Date(),
  //     createTS = token ? token.created.getTime() : 0,
  //     expiredTS = token ? req.accessToken.ttl * 1000 : 0,
  //     dayTS = 24 * 60 * 60 * 1000

  //   if (!token || (token && createTS + expiredTS < now)) {
  //     return next()
  //   }

  //   if (now.getTime() - createTS < dayTS) {
  //     return next()
  //   }

  //   token.updateAttribute('created', now, next)
  // })


}
