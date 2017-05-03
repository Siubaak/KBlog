import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
// 分类相关API请求
  getArticleListByClassification (objectClassPageNumber) {
    return axios.post('/api/classification/articlelist', objectClassPageNumber)
  },
  getClassificationList () {
    return axios.get('/api/classification/list')
  },
// 文章相关API请求
  getArticleList (objectPageNumber) {
    return axios.post('/api/article/list', objectPageNumber)
  },
  getCommentListByArticle (objectArticleId) {
    return axios.post('/api/article/commentlist', objectArticleId)
  },
// 评论相关API请求
  createComment (objectComment) {
    return axios.post('/api/comment/create', objectComment)
  }
}
