import { ADMIN_LOGIN, ADMIN_LOGOUT } from './mutation-type'
export default {
  [ADMIN_LOGIN] (state, token) {
    localStorage.setItem('jwt', token)
    state.token = token
  },
  [ADMIN_LOGOUT] (state) {
    localStorage.removeItem('jwt')
    state.token = null
  }
}