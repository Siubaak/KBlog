import {USER_SIGNIN, USER_SIGNOUT} from './type'
export default {
  [USER_SIGNIN](state, token) {
    localStorage.setItem('jwt', token)
    state.token = token
  },
  [USER_SIGNOUT](state) {
    localStorage.removeItem('jwt')
    state.token = null
  }
}