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

const get_user_blogs = (params: Object) => {
  return request({
    url: '/blog',
    method: 'get',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const update_blog_type = (params: Object) => {
  return request({
    url: '/blog/update_blog_type',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    },
    data: params
  })
}

const insert_blog_type = (params: Object) => {
  return request({
    url: '/blog/insert_blog_type',
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    },
    data: params
  })
}


export { get_blogs, get_blog, get_user_blogs, update_blog_type, insert_blog_type }