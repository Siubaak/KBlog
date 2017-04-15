var express = require('express'),
    path = require('path'),
    app = express(),
    routes = require('./routes'),
    bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('page/front/dist'))

routes(app)

app.set('port', 3009);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});