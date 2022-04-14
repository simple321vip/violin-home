import Cookies from 'js-cookie'

const getToken = () => {
  return Cookies.get('token')
}

const setToken = (token: String) => {
  Cookies.set('token', token)
}

const setUser = (user: object) => {
  Cookies.set('user', JSON.stringify(user))
}

const getUser = () => {
  return Cookies.get('user')
}

const resetToken = () => {
  Cookies.remove('token')
  Cookies.remove('user')
}

export { getToken, setToken, resetToken, setUser, getUser }
