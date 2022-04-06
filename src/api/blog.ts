import request from '../utils/request'
import Qs from 'qs'
const get_blogs = (params: Object) => {
  return request({
    url: '/blog',
    method: 'get',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

export { get_blogs }