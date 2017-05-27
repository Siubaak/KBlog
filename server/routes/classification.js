let express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCheck = require('../token-mw/token-check')

// 前端API处理路由，不带权限
router.get('/classification/list', async (req, res) => {
  try {
    let classList = await api.getClassificationList()
    res.status(200).send({ classList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/classification/articlelist', async (req, res) => {
  let { name, page, number } = req.body
  try {
    let articleList = await api.getArticleListByClassification(name, page, number)
    res.status(200).send({ articleList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

// 后台API处理路由，带权限
router.post('/token/classification/create', tokenCheck, async (req, res) => {
  let { name } = req.body
  try {
    await api.createClassification(name)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/classification/remove', tokenCheck, async (req, res) => {
  let { classificationId } = req.body
  try {
    let result = await api.removeClassification(classificationId)
    if (result === 'Left') {
      res.status(299).send({ code: 'data:article_left', msg: '分类中文章未删除，无法删除该分类' })
    }
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.post('/token/classification/update', tokenCheck, async (req, res) => {
  let { classification } = req.body
  try {
    await api.updateClassification(classification)
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})
router.get('/token/classification/list', tokenCheck, async (req, res) => {
  try {
    let classList = await api.getClassificationList()
    res.status(200).send({ classList })
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

module.exports = router