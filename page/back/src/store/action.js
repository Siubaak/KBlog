import api from '../api'
import router from '../router'
import message from './message'
export default {
  adminLogin({ commit }, data) {
    api.login(data)
      .then(function ({ data }) {
        if (data.code == 200) {
          // 找到用户
          commit('USER_SIGNIN', data.token)
          router.replace({ path: '/admin/articleList' })
        } else {
          // 没找到用户或者密码不对
          MsgAlert(data.message)
        }
      })
      .catch(function (error) {
        // 一般服务器连接不上这里就会报网络错误
        message(error.toString())
      })
  },
  adminLogout({ commit }) {
    commit('USER_SIGNOUT');
    router.push({ path: '/login' });
  }
}
