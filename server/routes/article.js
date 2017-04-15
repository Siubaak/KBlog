var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

router.post('/article/one', (req, res) => {
  console.log('POST /api/article/one')
  // console.log(req.body)
  var articleId = req.body.articleId
  api.getOneArticle(articleId)
     .then((article) => {
       res.send({ article })
     }).catch((err) => {
       res.send({ err })
     })
})

router.post('/article/list', (req, res) => {
  console.log('POST /api/article/list')
  // console.log(req.body)
  var { page, number } = req.body
  api.getArticleList(page, number)
     .then((articleList) => {
       res.send({ articleList })
     }).catch((err) => {
       res.send({ err })
     })
})

module.exports = router