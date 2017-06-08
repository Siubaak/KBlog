let express = require('express'),
    path = require('path'),
    router = express.Router(),
    api = require('../api'),
    tokenCreate = require('../token-mw/token-create'),
    sha1 = require('sha1')

// 后台登录路由，返回token
router.post('/login', async (req, res) => {
  let { account, password } = req.body
  try {
    let admin = await api.getAdmin(account)
    if (admin) {
      if ((sha1(password) === admin.password)) {
        res.status(200).send({ token: tokenCreate(account) })
      } else {
        res.status(299).send({ code: 'auth:bad_password', msg: '密码错误' })
      }
    } else {
      res.status(299).send({ code: 'auth:user_not_found', msg: '账号不存在' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send({ code: 'internal:unknow_error', msg: err })
  }
})

module.exports = router