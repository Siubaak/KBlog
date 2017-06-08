let jwt = require('jsonwebtoken'),
    conf = require('../conf')
module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1],
        decoded = jwt.decode(token, conf.jwtSecret)
    if (token && decoded.exp <= Date.now()/1000) {
      res.status(299).send({ code: 'auth:auth_expire', msg: '授权已过期，请重新登录' })
    } else {
      next()
    }
  } else {
    res.status(299).send({ code: 'auth:no_auth', msg: '请登录' })
  }
}