
const loopback = require('loopback')
const boot = require('loopback-boot')
const debug = require('debug')('nour:boot')
const logger = require('winston');
const winstonGke = require('winston-gke');
const Sentry = require('winston-raven-sentry');
var app = loopback()

const IS_PROD = process.env.NODE_ENV != "development"
const LOG_LEVEL = process.env.LOG_LEVEL || "debug"

const moment = require('moment-timezone')
var Raven = require('raven');

const raven = Raven.config(IS_PROD ? process.env.SENTRY_DSN : null, {
  captureUnhandledRejections: true,
  release: process.env.VERSION,
  environment: process.env.NODE_ENV,
  tags: {
    git_commit: process.env.COMMIT_SHA
  }
})

if (IS_PROD) {
  logger.remove(logger.transports.Console);
  winstonGke(logger, LOG_LEVEL);
  logger.add(Sentry, {
    level: 'error',
    raven: raven,
    install: true
  })
  
} else {
  logger.level = LOG_LEVEL
  logger.remove(logger.transports.Console);
  logger.add(logger.transports.Console, {
    colorize: true
  });
}

let server
// start the web server
app.start = () => {
  logger.info(
    `Server init ENV:${process.env.NODE_ENV} version:${process.env.VERSION} NodeJS version: ${
      process.version
    } Timezone ${moment.tz.guess()}` 
  )

  return new Promise((resolve, reject) => {
    server = app.listen(() => {
      const baseUrl = app.get('url').replace(/\/$/, '')
      logger.info(`Web server started listening at: ${baseUrl} ENV:${process.env.NODE_ENV}`)
      if (app.get('loopback-component-explorer')) {
        const explorerPath = app.get('loopback-component-explorer').mountPath
        logger.info(`Browse your REST API at ${explorerPath}`)
      }
      app.emit('started', server)

  
      resolve(server)
    })
  })
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, err => {

  logger.info(`app booted ENV:${process.env.NODE_ENV}`)

  if (err) {
    throw err
  }
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start()
  }
})

process.on('unhandledRejection', (err, p) => {
  logger.error('UnhandledRejection: ', err)
})

process.on('uncaughtException', function (err) {
  logger.error('uncaughtException', err.stack)
})

process.on('SIGINT', function () {
  process.exit(0)
})

module.exports = app