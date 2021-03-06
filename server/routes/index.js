let express = require('express'),
    path = require('path')
module.exports = (app) => {
  app.use('/static', express.static('assets/front/dist/static'))
  app.use('/static', express.static('assets/back/dist/static'))
  app.use(express.static('assets/favicon'))
  app.use('/', require('./assets'))

  app.use('/api', require('./admin'))
  app.use('/api', require('./classification'))
  app.use('/api', require('./article'))
  app.use('/api', require('./comment'))
}