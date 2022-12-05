import { service } from '../utils/request'
import Qs from 'qs'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getBlogs = (params: Object) => {
  return service({
    url: '/wiki/api/v1/reader/blogs',
    method: 'GET',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const getBtName = () => {
  return service({
    url: '/wiki/api/v1/reader/blog_type',
    method: 'GET',
    headers: headers
  })
}

const getBlog = (bid: string) => {
  return service({
    url: '/wiki/api/v1/reader/blog/' + bid,
    method: 'GET',
    headers: headers
  })
}

const publishAll = () => {
  return service({
    url: '/wiki/api/v1/reader/blogs/publish/all',
    method: 'GET'
  })
}

const publish = (bid: string) => {
  return service({
    url: '/wiki/api/v1/reader/blogs/publish/' + bid,
    method: 'GET'
  })
}


export { getBlogs, getBlog, getBtName, publish, publishAll }