var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/comment/create', (req, res) => {
  console.log('POST /api/comment/create')
  var comment = req.body
  api.createComment(comment)
     .then((result) => {
       res.send({ result })
     }).catch((err) => {
       res.send({ err })
     })
})

module.exports = router