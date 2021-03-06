import api from '../api'
import router from '../router'
export default {
  adminLogin ({ commit }, objectAccountPassword) {
    api.adminLogin(objectAccountPassword)
      .then((res) => {
        if (res.status === 200) {
          commit('ADMIN_LOGIN', res.data.token)
          router.replace({ path: '/admin' })
        } else {
          alert(res.data.msg)
        }
      }).catch((err) => {
        console.error(err)
        alert('登录出错，请稍后再试')
      })
  },
  adminLogout ({ commit }) {
    commit('ADMIN_LOGOUT')
    router.push({ path: '/login' })
  }
}
