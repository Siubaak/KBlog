var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/classification/list', function (req, res) {
  console.log('POST /api/classification/list')
  // console.log(req.body)
  var { name, page, number } = req.body
  api.getArticleListByClassification(name, page, number)
     .then(function (articleList) {
       res.send({ articleList })
     }).catch(function (err) {
       res.send({ err })
     })
})
router.get('/classification/name', function (req, res) {
  console.log('GET /api/classification/name')
  api.getClassificationList()
     .then(function (classList) {
       res.send({ classList })
     }).catch(function (err) {
       res.send({ err })
     })
})

module.exports = router