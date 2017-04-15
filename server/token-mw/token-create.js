var jwt = require('jsonwebtoken')
module.exports = function (name) {
  var expiry = new Date()
  //有效期设置为七天
  expiry.setDate(expiry.getDate() + 7)
  const token = jwt.sign(
    {
      name: name,
      exp: parseInt(expiry.getTime()/1000)//除以1000以后表示的是秒数
    },
    process.env.JWT_SECRET
  )
  return token
}