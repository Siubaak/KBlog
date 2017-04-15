module.exports = (app) => {
  app.use('/', require('./main'))
  app.use('/api', require('./classification'))
  app.use('/api', require('./article'))
  app.use('/api', require('./comment'))
}