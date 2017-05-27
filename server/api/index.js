 let Admins = require('../lib/mongo').Admins,
     Classifications = require('../lib/mongo').Classifications,
     Articles = require('../lib/mongo').Articles,
     Comments = require('../lib/mongo').Comments

module.exports = {
// 管理员相关API函数 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAdmin (account) {
    return Admins.findOne({ account: account }).exec()
  },
// 文章相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 新建文章
  createArticle (article) {
    return Articles.create({
      title: article.title,
      intro: article.intro,
      body: article.body,
      classificationId: article.classificationId
    }).exec()
  },
  // 根据文章ID删除文章
  removeArticle (articleId) {
    return Promise.all([
      Articles.remove({ _id: articleId }).exec(),
      Comments.remove({ articleId: articleId }).exec()
    ])
  },
  // 根据文章ID更新文章
  updateArticle (article) {
    return Articles.update({ _id: article._id }, { $set: {
      title: article.title,
      intro: article.intro,
      body: article.body,
      classificationId: article.classificationId
    } }).exec()
  },
  // 根据文章ID获取一篇文章
  async getArticle (articleId) {
    let articles = await Articles.find({ _id: articleId }).addDate().exec()
    for (let articleItem of articles) {
      articleItem.classification = (await Classifications.findOne({ _id: articleItem.classificationId}).exec()).name
      articleItem.comments = await Comments.find({ articleId: articleItem._id }).addDate().sort({ _id: -1 }).exec()
    }
    return Promise.resolve(articles)
  },
  // 根据页数和数量获取文章，page为页数，number为数量，page从0开始，number不为负数
  async getArticleList (page, number) {
    if (number) {
      // 当number不为0时，数据库查询跳过page*number数量
      let skip = page * number
      let articles = await Articles.find().addDate().sort({ _id: -1 }).skip(skip).limit(number).exec()
      for (let articleItem of articles) {
        articleItem.classification = (await Classifications.findOne({ _id: articleItem.classificationId}).exec()).name
        articleItem.comments = await Comments.find({ articleId: articleItem._id }).addDate().sort({ _id: -1 }).exec()
      }
      return Promise.resolve(articles)
    } else {
      // 当number为0时，则获取所有文章
      let articles = await Articles.find().addDate().sort({ _id: -1 }).exec()
      for (let articleItem of articles) {
        articleItem.classification = (await Classifications.findOne({ _id: articleItem.classificationId}).exec()).name
        articleItem.comments = await Comments.find({ articleId: articleItem._id }).addDate().sort({ _id: -1 }).exec()
      }
      return Promise.resolve(articles)
    }
  },
  // 根据文章ID获取文章内所有评论
  getCommentListByArticle (articleId) {
    return Comments.find({ articleId: articleId }).addDate().sort({ _id: -1 }).exec()
  },
// 分类相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 新建分类
  createClassification (name) {
    return Classifications.create({ name }).exec()
  },
  // 根据分类ID删除分类
  async removeClassification (classificationId) {
    let articles = await Articles.find({ classificationId: classificationId }).exec()
    if (articles.length === 0) {
      return Classifications.remove({ _id: classificationId }).exec()
    } else {
      return Promise.resolve('Left')
    }
  },
  // 根据分类ID更新分类
  updateClassification (classification) {
    return Classifications.update({ _id: classification._id }, { $set: { name: classification.name } }).exec()
  },
  // 获取分类
  getClassificationList() {
    return Classifications.find().sort({ _id: -1 }).exec()
  },
  // 根据分类获取该分类下的所有文章
  async getArticleListByClassification(name, page, number) {
    let skip = page*number
    let classification = await Classifications.findOne({ name: name }).exec()
    let articles = await Articles.find({ classificationId: classification._id }).addDate().sort({ _id: -1 }).skip(skip).limit(number).exec()
    for (let articleItem of articles) {
      articleItem.classification = classification.name
      articleItem.comments = await Comments.find({ articleId: articleItem._id }).addDate().sort({ _id: -1 }).exec()
    }
    return Promise.resolve(articles)
  },
// 评论相关API函数 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 新建评论
  createComment (comment) {
    return Comments.create(comment).exec()
  },
  // 根据评论ID删除评论
  removeComment (commentId) {
    return Comments.remove({ _id: commentId }).exec()
  },
  // 获取一定数量的评论及对应文章标题，page为页数，number为数量，page从0开始，number不为负数
  async getCommentList (page, number) {
    if (number) {
      // 当number不为0时，数据库查询跳过page*number数量
      let skip = page*number
      let comments = await Comments.find().addDate().sort({ _id: -1 }).skip(skip).limit(number).exec()
      for (let commentItem of comments) {
         let article = await Articles.findOne({ _id: commentItem.articleId }).exec()
         commentItem.article = article
      }
      return Promise.resolve(comments)
    } else {
      let comments = await Comments.find().addDate().sort({ _id: -1 }).exec()
      for (let commentItem of comments) {
         let article = await Articles.findOne({ _id: commentItem.articleId }).exec()
         commentItem.article = article
      }
      return Promise.resolve(comments)
    }
  }
}
