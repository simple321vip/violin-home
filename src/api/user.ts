import request from '../utils/request'
const authorize = (params: any) => {
  return request({
    url: '/api/vi/authorize',
    method: 'post',
    data: {}
  })
}

export { authorize }