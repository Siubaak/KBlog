let Mongolass = require('mongolass'),
    mongolass = new Mongolass('mongodb://localhost:27017/test'),
    moment = require('moment'),
    idToTs = require('objectid-to-timestamp'),
    Admins = mongolass.model('Admin', {
      account: { type: 'string' },
      password: { type: 'string' }
    }),
    Classifications = mongolass.model('Classification', {
      name: { type: 'string' }
    }),
    Articles = mongolass.model('Article', {
      title: { type: 'string' },
      intro: { type: 'string' },
      body: { type: 'string' },
      classificationId: { type: Mongolass.Types.ObjectId }
    }),
    Comments = mongolass.model('Comment', {
      user: { type: 'string' },
      msg: { type: 'string' },
      articleId: { type: Mongolass.Types.ObjectId }
    })
// 注册插件，转化objectId为timestamp，再转化为YYYY-MM-DD HH:mm:ss格式时间并储存在date中
let transferTime = (result) => {
  if (result) {
    result.forEach((item) => {
      item.date = moment(idToTs(item._id)).format('YYYY-MM-DD HH:mm:ss')
    })
  }
  return result
}
mongolass.plugin('addDate', {
  afterFind (result) {
    return transferTime (result)
  },
  afterFindOne (result) {
    return transferTime (result)
  }
})

module.exports = {
  Admins,
  Classifications,
  Articles,
  Comments
}