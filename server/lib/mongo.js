var Mongolass = require('mongolass'),
    mongolass = new Mongolass(),
    moment = require('moment'),
    idToTs = require('objectid-to-timestamp'),
    Classification = mongolass.model('Classification', {
      name: { type: 'string' }
    }),
    Article = mongolass.model('Article', {
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
// 建立索引
// Classification.index({_id: 1}).exec()
// Article.index({classification: 1, _id: -1}).exec()
// Comments.index({article: -1, _id: -1}).exec()
// 连接数据库
mongolass.connect('mongodb://localhost:27017/test')
// 注册插件，转化objectId为timestamp，再转化为YYYY-MM-DD HH:mm:ss格式时间并储存在date中
function transferTime (result) {
  if (result) {
    result.forEach(function (item) {
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
  Classification,
  Article,
  Comments
}