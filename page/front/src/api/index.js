import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  getOneArticle (params) {
    console.log('Requesting An Article...')
    return axios.post('/api/article/one', params)
  },
  getArticleList (params) {
    console.log('Requesting Articles...')
    return axios.post('/api/article/list', params)
  },
  getArticleListByClassification (params) {
    console.log('Requesting Articles By Classification...')
    return axios.post('/api/classification/list', params)
  },
  getClassificationList () {
    console.log('Requesting Classifications...')
    return axios.get('/api/classification/name')
  },
  createComment (params) {
    console.log('Creating Comment...')
    return axios.post('/api/comment/create', params)
  }
}
