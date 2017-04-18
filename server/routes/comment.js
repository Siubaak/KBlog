var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCheck = require('../token-mw/token-check')

// 前端API处理路由，不带权限
router.post('/comment/create', (req, res) => {
  console.log('POST /api/comment/create')
  var comment = req.body
  api.createComment(comment)
     .then((result) => {
       res.send({ result })
       console.log('-- Successful Response')
     }).catch((err) => {
       res.send({ err })
       console.log('-- Error Response')
     })
})

// 后台API处理路由，带权限
router.post('/comment/remove', tokenCheck, (req, res) => {
  console.log('POST /api/comment/remove')
  var commentId = req.body.commentId
  api.removeComment(commentId)
     .then((result) => {
       res.send({ result })
       console.log('-- Successful Response')
     }).catch((err) => {
       res.send({ err })
       console.log('-- Error Response')
     })
}

module.exports = router