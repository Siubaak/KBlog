let express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCheck = require('../token-mw/token-check')

// 前端API处理路由，不带权限
router.post('/comment/create', async (req, res) => {
  let comment = req.body
  try {
    await api.createComment(comment)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

// 后台API处理路由，带权限
router.post('/token/comment/remove', tokenCheck, async (req, res) => {
  let { commentId } = req.body
  try {
    await api.removeComment(commentId)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/comment/list', tokenCheck, async (req, res) => {
  let { page, number } = req.body
  try {
    let commentList = await api.getCommentList(page, number)
    res.status(200).send({ commentList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

module.exports = router