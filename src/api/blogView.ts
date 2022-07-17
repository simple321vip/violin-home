import request from '../utils/request'
import Qs from 'qs'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getBlogs = (params: Object) => {
  return request({
    url: '/auth/api/v1/reader/blogs',
    method: 'GET',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const getBtName = () => {
  return request({
    url: '/auth/api/v1/reader/blog_type',
    method: 'GET',
    headers: headers
  })
}

const getBlog = (bid: string) => {
  return request({
    url: '/auth/api/v1/reader/blog/' + bid,
    method: 'GET',
    headers: headers
  })
}

export { getBlogs, getBlog, getBtName }