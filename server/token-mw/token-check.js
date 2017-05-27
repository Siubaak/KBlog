let jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1],
        decoded = jwt.decode(token, process.env.JWT_SECRET)
    // 过期重新登录
    if (token && decoded.exp <= Date.now()/1000) {
      res.status(299).send({ code: 'auth:auth_expire', msg: '授权已过期，请重新登录' })
    } else {
      next()
    }
  }
}