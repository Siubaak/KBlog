 var Admins = require('../lib/mongo').Admin,
     Classifications = require('../lib/mongo').Classifications,
     Articles = require('../lib/mongo').Articles,
     Comments = require('../lib/mongo').Comments,
     async = require('async'),
     // 根据classificationId及commentsId查询分类及评论并补充
     ClassAndCommentQuery = (articles, resolve, reject) => {
       // 获取文章成功，查询分类及评论
       async.map(articles, (articleItem, callback) => {
         Classifications.findOne({ _id: articleItem.classificationId })
                        .exec()
                        .then((classification) => {
                          // 获取分类成功，查询评论
                          articleItem.classification = classification.name
                          Comments.find({ articleId: articleItem._id })
                                  .addDate()
                                  .sort({ _id: -1 })
                                  .exec()
                                  .then((comments) => {
                                    // 获取评论成功，进行回调
                                    articleItem.comments = comments
                                    callback(null, articleItem)
                                  })
                          })
       }, (err, articles) => {
         if (!err) {
           resolve(articles)
         } else {
           reject(err)
         }
       })
     }

module.exports = {
// 管理员相关API函数 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAdmin (account) {
    return Admins.findOne({ account: account })
                 .exec()
  },
// 文章相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 数据库插入新文章
  createArticle (article) {
    return Articles.create(article)
                   .exec()
  },
  // 根据文章ID获取一篇文章
  getArticle (articleId) {
    return new Promise((resolve, reject) => {
      Articles.find({ _id: articleId })
              .addDate()
              .exec()
              .then((articles) => {
                ClassAndCommentQuery(articles, resolve, reject)
              })
              .catch((err) => {
                reject(err)
              })
    })
  },
  // 根据页数和数量获取文章，page为页数，number为数量
  getArticleList (page, number) {
    // 查询文章
    return new Promise((resolve, reject) => {
      // 数据库查询获取跳过数量，page从0开始，number需大于0
      var skip = page * number
      Articles.find()
              .addDate()
              .sort({ _id: -1 })
              .skip(skip)
              .limit(number)
              .exec()
              .then((articles) => {
                ClassAndCommentQuery(articles, resolve, reject)
              })
              .catch((err) => {
                reject(err)
              })
    })
  },
  // 根据文章ID获取文章内所有评论
  getCommentListByArticle (articleId) {
    return Comments.find({ articleId: articleId })
                   .addDate()
                   .sort({ _id: -1 })
                   .exec()
  },
// 分类相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 数据库插入新分类
  // 获取分类
  getClassificationList() {
    return Classifications.find()
                          .sort({ _id: -1 })
                          .exec()
  },
  // 根据分类获取该分类下的所有文章
  getArticleListByClassification(name, page, number) {
    return new Promise((resolve, reject) => {
      var skip = page*number
      Classifications.findOne({ name: name })
                     .exec()
                     .then((classResult) => {
                       Articles.find({ classificationId: classResult._id })
                              .addDate()
                              .sort({ _id: -1 })
                              .skip(skip)
                              .limit(number)
                              .exec()
                              .then((articles) => {
                                ClassAndCommentQuery(articles, resolve, reject)
                              })
                      })
                      .catch((err) => {
                        reject(err)
                      })
    })
  },
// 评论相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 数据库插入新评论
  createComment (comment) {
    return Comments.create(comment)
                   .exec()
  }
}
