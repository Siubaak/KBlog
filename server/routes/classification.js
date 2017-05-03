var express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCheck = require('../token-mw/token-check')

// 前端API处理路由，不带权限
router.get('/classification/list', (req, res) => {
  api.getClassificationList()
     .then((classList) => {
       res.send({ classList })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})
router.post('/classification/articlelist', (req, res) => {
  var { name, page, number } = req.body
  api.getArticleListByClassification(name, page, number)
     .then((articleList) => {
       res.send({ articleList })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})

// 后台API处理路由，带权限
router.post('/token/classification/create', tokenCheck, (req, res) => {
  var { name } = req.body
  console.log(name)
  api.createClassification(name)
     .then((result) => {
       res.send({ result })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})
router.post('/token/classification/remove', tokenCheck, (req, res) => {
  var { classificationId } = req.body
  api.removeClassification(classificationId)
     .then((result) => {
       res.send({ result })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})
router.post('/token/classification/update', tokenCheck, (req, res) => {
  var { classification } = req.body
  api.updateClassification(classification)
     .then((result) => {
       res.send({ result })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})
router.get('/token/classification/list', tokenCheck, (req, res) => {
  api.getClassificationList()
     .then((classList) => {
       res.send({ classList })
       console.log(`-- Successful Response (${req.originalUrl}) !`)
     }).catch((err) => {
       res.send({ err })
       console.log(`-- Error Response (${req.originalUrl}) !`)
     })
})

module.exports = router