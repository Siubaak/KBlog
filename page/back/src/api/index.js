import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (localStorage.getItem('jwt')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt').replace(/(^\\")|(\\"$)/g, '')
}

export default {
  adminLogin (objectAccountPassword) {
    console.log('Logining...')
    return axios.post('/api/login', objectAccountPassword)
  },
  getArticleList (objectPageNumber) {
    console.log('Requesting Articles...')
    return axios.post('/api/token/article/list', objectPageNumber)
  },
  removeArticle (objectArticleId) {
    console.log('Removing Article...')
    return axios.post('/api/token/article/remove', objectArticleId)
  },
  updateArticle (objectArticle) {
    console.log('Updating Article...')
    return axios.post('/api/token/article/update', objectArticle)
  },
  getClassificationList () {
    console.log('Requesting Classifications...')
    return axios.get('/api/token/classification/list')
  },
  createClassification (objectName) {
    console.log('Creating Classification...')
    return axios.post('/api/token/classification/create', objectName)
  },
  removeClassification (objectClassificationId) {
    console.log('Removing Classification...')
    return axios.post('/api/token/classification/remove', objectClassificationId)
  },
  updateClassification (objectClassification) {
    console.log('Updating Classification...')
    return axios.post('/api/token/classification/update', objectClassification)
  },
  getCommentList (objectPageNumber) {
    console.log('Requesting Comments...')
    return axios.post('/api/token/comment/list', objectPageNumber)
  },
  removeComment (objectCommentId) {
    console.log('Removing Comment...')
    return axios.post('/api/token/comment/remove', objectCommentId)
  }
}
