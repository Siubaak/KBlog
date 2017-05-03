var express = require('express'),
    path = require('path'),
    router = express.Router()

// 前端页面返回路由
router.get('/', (req, res) => {
  res.sendfile('assets/front/dist/index.html')
  console.log(`-- Successful Response (${req.originalUrl}) !`)
})

// 后台页面返回路由
router.get('/admin', (req, res) => {
  res.sendfile('assets/back/dist/index.html')
  console.log(`-- Successful Response (${req.originalUrl}) !`)
})

module.exports = router