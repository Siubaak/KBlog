let logToken = () => {
  let token = localStorage.getItem('kblogjwt')
  if (token) {
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    if (payload.exp > Date.now() / 1000) {
      return token
    } else {
      return false
    }
  } else {
    return false
  }
}
export default {
  token: logToken()
}
