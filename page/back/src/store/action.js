import api from '../api'
import router from '../router'
import message from './message'
export default {
  adminLogin({ commit }, data) {
    api.login(data)
      .then(({ data }) => {
        if (data.code == 200) {
          commit('ADMIN_LOGIN', data.token)
          router.replace({ path: '/admin/articleList' })
        } else {
          message(data.message)
        }
      })
      .catch((err) => {
        message(err.toString())
      })
  },
  adminLogout({ commit }) {
    commit('ADMIN_LOGOUT');
    router.push({ path: '/login' });
  }
}
