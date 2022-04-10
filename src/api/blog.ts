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

const get_blog = (params: any) => {
  return request({
    url: '/blog/' + params.blog_id,
    method: 'get'
  })
}

export { get_blogs, get_blog }