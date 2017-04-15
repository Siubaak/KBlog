var express = require('express'),
    path = require('path'),
    router = express.Router()

router.get('/', function (req, res) {
  console.log('GET /')
  res.sendfile('page/front/dist/index.html')
  console.log('-- Successful Response')
})

module.exports = router