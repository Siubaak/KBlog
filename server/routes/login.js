var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/article/one', function (req, res) {
  console.log('POST /api/article/one')
  // console.log(req.body)
  var articleId = req.body.articleId
  api.getOneArticle(articleId)
     .then(function (article) {
       res.send({ article })
     }).catch(function (err) {
       res.send({ err })
     })
})

module.exports = router