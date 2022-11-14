import Cookies from 'js-cookie'

const getToken = () => {
  return Cookies.get('token')
}

const setToken = (token: String) => {
  Cookies.set('token', token)
}

const setTenant = (tenant: object) => {
  Cookies.set('tenant', JSON.stringify(tenant))
}

const getTenant = () => {
  return Cookies.get('tenant')
}

const resetToken = () => {
  Cookies.remove('token')
  Cookies.remove('tenant')
}

export { getToken, setToken, resetToken, setTenant, getTenant }
