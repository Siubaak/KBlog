 var Adim = require('../lib/mongo').Admin,
     Classification = require('../lib/mongo').Classification,
     Article = require('../lib/mongo').Article,
     Comments = require('../lib/mongo').Comments,
     async = require('async'),
     // 根据classificationId及commentsId查询分类及评论并补充
     ClassAndCommentQuery = (articles, resolve, reject) => {
       // 获取文章成功，查询分类及评论
       async.map(articles, (articleItem, callback) => {
         Classification.findOne({ _id: articleItem.classificationId })
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
           console.log('-- Successful Response')
           resolve(articles)
         } else {
           console.log('-- Error Response')
           reject(err.toString())
         }
       })
     }

module.exports = {
  getAdminByAccount (account) {
    return Admin.fineOne({ account: account })
                .exec()
  },
  getOneArticle (articleId) {
    return new Promise((resolve, reject) => {
      Article.find({ _id: articleId })
             .addDate()
             .exec()
             .then((articles) => {
               ClassAndCommentQuery(articles, resolve, reject)
             })
             .catch((err) => {
               console.log('-- Error Response')
               reject(err.toString())
             })
    })
  },
  // 根据页数和数量获取文章，page为页数，number为数量
  getArticleList (page, number) {
    // 嵌套太多，需要改写
    // 查询文章
    return new Promise((resolve, reject) => {
      // 数据库查询获取跳过数量，page从0开始，number需大于0
      var skip = page * number
      Article.find()
             .addDate()
             .sort({ _id: -1 })
             .skip(skip)
             .limit(number)
             .exec()
             .then((articles) => {
               ClassAndCommentQuery(articles, resolve, reject)
             })
             .catch((err) => {
               console.log('-- Error Response')
               reject(err.toString())
             })
    })
  },
  // 根据分类获取该分类下的所有文章
  getArticleListByClassification(name, page, number) {
    return new Promise((resolve, reject) => {
      var skip = page*number
      Classification.findOne({ name: name })
                    .exec()
                    .then((classResult) => {
                      Article.find({ classificationId: classResult._id })
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
                      console.log('-- Error Response')
                      reject(err.toString())
                    })
    })
  },
  // 获取分类
  getClassificationList() {
    return Classification.find()
                         .sort({ _id: -1 })
                         .exec()
  },
  // 提交评论
  createComment(comment) {
    return new Promise((resolve, reject) => {
      Comments.create(comment)
              .exec()
              .then((result) => {
                console.log('-- Successful Response')
                resolve(result)
              })
              .catch((err) => {
                console.log('-- Error Response')
                reject(err.toString())
              })
    })
  }
}
