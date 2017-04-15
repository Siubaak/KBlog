var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/comment/create', function (req, res) {
  console.log('POST /api/comment/create')
  var comment = req.body
  api.createComment(comment)
     .then(function (result) {
       res.send({ result })
     }).catch(function (err) {
       res.send({ err })
     })
})

module.exports = router