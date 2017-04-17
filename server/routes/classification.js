var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api')

// 前端API处理路由，不带权限
router.get('/classification/list', (req, res) => {
  console.log('GET /api/classification/list')
  api.getClassificationList()
     .then((classList) => {
       res.send({ classList })
       console.log('-- Successful Response')
     }).catch((err) => {
       res.send({ err })
       console.log('-- Error Response')
     })
})
router.post('/classification/articlelist', (req, res) => {
  console.log('POST /api/classification/articlelist')
  // console.log(req.body)
  var { name, page, number } = req.body
  api.getArticleListByClassification(name, page, number)
     .then((articleList) => {
       res.send({ articleList })
       console.log('-- Successful Response')
     }).catch((err) => {
       res.send({ err })
       console.log('-- Error Response')
     })
})

// 后台API处理路由，带权限

module.exports = router