import request from '../utils/request'
import Qs from 'qs'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}
const get_blogs = (params: Object) => {
  return request({
    url: '/blog',
    method: 'GET',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const listAll = () => {
  return request({
    url: '/author/blog/list',
    method: 'GET'
  })
}

const updateBtName = (data: Object) => {
  return request({
    url: '/author/blog_type',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const putBlogType = (data: Object) => {
  return request({
    url: '/author/blog_type',
    method: 'PUT',
    headers: headers,
    data: data
  })
}

const getContent = (id: string) => {
  return request({
    url: '/author/blog/content/' + id,
    method: 'GET',
    headers: headers,
  })
}

const putBlog = (postData: Object) => {
  return request({
    url: '/author/blog/content',
    method: 'PUT',
    headers: headers,
    data: postData
  })
}

const updateContent = (postData: Object) => {
  return request({
    url: '/author/blog/content',
    method: 'POST',
    headers: headers,
    data: postData
  })
}

const deleteContent = (bid: string) => {
  return request({
    url: '/author/blog/content/' + bid,
    method: 'DELETE',
    headers: headers,
  })
}


export { get_blogs, listAll, updateBtName, putBlogType, getContent, putBlog, updateContent, deleteContent }