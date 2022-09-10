import { service } from '../utils/request'
const authorize = (params: any) => {
  return service({
    url: '/auth/api/v1/authorize',
    method: 'post',
    data: params
  })
}

const obtainUserInfo = (token: string) => {
  return service({
    url: '/auth/api/v1/user_info',
    method: 'GET',
    params: { token: token }
  })
}

const logout = (id: string) => {
  return service({
    url: '/auth/api/v1/logout/' + id,
    method: 'GET'
  })
}


export { authorize, obtainUserInfo, logout }