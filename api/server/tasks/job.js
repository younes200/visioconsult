var app = require('../server')
const moment = require('moment')
const _ = require('lodash')
const logger = require('winston')


app.on('booted', async () => {

  logger.info('job started')
  return process.exit()

})
