import Cookies from 'js-cookie'

const getToken = () => {
  const token = Cookies.get('token')
  return token
}

const setToken = (token: String) => {
  Cookies.set('token', token)
}

const resetToken = (token: String) => {
  Cookies.set('token', "")
}

export { getToken, setToken, resetToken }