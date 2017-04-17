import api from '../api'
import router from '../router'
import message from './message'
export default {
  adminLogin ({ commit }, objectAccountPassword) {
    api.adminLogin(objectAccountPassword)
      .then((res) => {
        if (res.data.token) {
          commit('ADMIN_LOGIN', res.data.token)
          router.replace({ path: '/admin/articleList' })
        } else {
          message(res.data.msg || res.data.err)
        }
      })
      .catch((err) => {
        message(err)
      })
  },
  adminLogout ({ commit }) {
    commit('ADMIN_LOGOUT')
    router.push({ path: '/login' })
  }
}
