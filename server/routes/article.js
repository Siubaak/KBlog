let express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCheck = require('../token-mw/token-check')

// 前端API处理路由，不带权限
router.post('/article/list', async (req, res) => {
  let { page, number } = req.body
  try {
    let articleList = await api.getArticleList(page, number)
    res.status(200).send({ articleList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/article/commentlist', async (req, res) => {
  let { articleId } = req.body
  try {
    let commentList = await api.getCommentListByArticle(articleId)
    res.status(200).send({ commentList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

// 后台API处理路由，带权限
router.post('/token/article/create', tokenCheck, async (req, res) => {
  let { article } = req.body
  try {
    await api.createArticle(article)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/article/remove', tokenCheck, async (req, res) => {
  let { articleId } = req.body
  try {
    await api.removeArticle(articleId)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/article/update', tokenCheck, async (req, res) => {
  let { article } = req.body
  try {
    await api.updateArticle(article)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/article', tokenCheck, async (req, res) => {
  let { articleId } = req.body
  try {
    let article = await api.getArticle(articleId)
    res.status(200).send({ article })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/article/list', tokenCheck, async (req, res) => {
  let { page, number } = req.body
  try {
    let articleList = await api.getArticleList(page, number)
    res.status(200).send({ articleList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

module.exports = router