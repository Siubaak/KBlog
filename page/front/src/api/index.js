import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
// 分类相关API请求
  getArticleListByClassification (objectClassPageNumber) {
    console.log('Requesting Articles By Classification...')
    return axios.post('/api/classification/articlelist', objectClassPageNumber)
  },
  getClassificationList () {
    console.log('Requesting Classifications...')
    return axios.get('/api/classification/list')
  },
// 文章相关API请求
  getArticleList (objectPageNumber) {
    console.log('Requesting Articles...')
    return axios.post('/api/article/list', objectPageNumber)
  },
  getCommentListByArticle (objectArticleId) {
    console.log('Requesting Comments By Article...')
    return axios.post('/api/article/commentlist', objectArticleId)
  },
// 评论相关API请求
  createComment (objectComment) {
    console.log('Creating Comment...')
    return axios.post('/api/comment/create', objectComment)
  }
}
