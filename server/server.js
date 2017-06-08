let express = require('express'),
    path = require('path'),
    app = express(),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    conf = require('./conf')

app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(`Processing ${req.method} ${req.originalUrl} ...`)
  next()
})
routes(app)

app.listen(conf.serverPort, (err) => {
  if (!err) {
    console.log(`Express server is listening on port ${conf.serverPort} ...`)
  } else {
    console.log(err)
  }
})