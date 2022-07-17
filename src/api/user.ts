import request from '../utils/request'
const authorize = (params: any) => {
  return request({
    url: '/auth/api/v1/authorize',
    method: 'post',
    data: params
  })
}

const obtainUserInfo = (token: string) => {
  return request({
    url: '/auth/api/v1/user_info',
    method: 'GET',
    params: { token: token }
  })
}

export { authorize, obtainUserInfo }