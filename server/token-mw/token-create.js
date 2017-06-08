let jwt = require('jsonwebtoken'),
    conf = require('../conf')
module.exports = (name) => {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)
  return jwt.sign(
    {
      name: name,
      exp: parseInt(expiry.getTime()/1000)//除以1000以后表示的是秒数
    },
    conf.jwtSecret
  )
}