var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/classification/list', (req, res) => {
  console.log('POST /api/classification/list')
  // console.log(req.body)
  var { name, page, number } = req.body
  api.getArticleListByClassification(name, page, number)
     .then((articleList) => {
       res.send({ articleList })
     }).catch((err) => {
       res.send({ err })
     })
})
router.get('/classification/name', (req, res) => {
  console.log('GET /api/classification/name')
  api.getClassificationList()
     .then((classList) => {
       res.send({ classList })
     }).catch((err) => {
       res.send({ err })
     })
})

module.exports = router