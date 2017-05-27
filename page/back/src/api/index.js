import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
let insertToken = () => {
  if (localStorage.getItem('jwt')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtf').replace(/(^\\")|(\\"$)/g, '')
  }
}

export default {
// 登录API
  adminLogin (objectAccountPassword) {
    return axios.post('/api/login', objectAccountPassword)
  },
// 文章API
  createArticle (objectArticle) {
    insertToken()
    return axios.post('/api/token/article/create', objectArticle)
  },
  removeArticle (objectArticleId) {
    insertToken()
    return axios.post('/api/token/article/remove', objectArticleId)
  },
  updateArticle (objectArticle) {
    insertToken()
    return axios.post('/api/token/article/update', objectArticle)
  },
  getArticleList (objectPageNumber) {
    insertToken()
    return axios.post('/api/token/article/list', objectPageNumber)
  },
// 分类API
  createClassification (objectName) {
    insertToken()
    return axios.post('/api/token/classification/create', objectName)
  },
  removeClassification (objectClassificationId) {
    insertToken()
    return axios.post('/api/token/classification/remove', objectClassificationId)
  },
  updateClassification (objectClassification) {
    insertToken()
    return axios.post('/api/token/classification/update', objectClassification)
  },
  getClassificationList () {
    insertToken()
    return axios.get('/api/token/classification/list')
  },
// 评论API
  removeComment (objectCommentId) {
    insertToken()
    return axios.post('/api/token/comment/remove', objectCommentId)
  },
  getCommentList (objectPageNumber) {
    insertToken()
    return axios.post('/api/token/comment/list', objectPageNumber)
  }
}
