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

const listAll = () => {
  return request({
    url: '/author/blog/list',
    method: 'get'
  })
}

const updateBtName = (params: Object) => {
  return request({
    url: '/author/blog/update_blog_type',
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

const getContent = (id: string) => {
  return request({
    url: '/author/blog/' + id + '/content',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    }
  })
}

const newBlog = (params: Object) => {
  return request({
    url: '/author/blog/createContent',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    },
    data: params
  })
}

const updateContent = (params: Object) => {
  return request({
    url: '/author/blog/updateContent',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    },
    data: params
  })
}

const deleteContent = (params: string) => {
  return request({
    url: '/author/blog/delete/' + params,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charsetset=UTF-8'
    }
  })
}


export { get_blogs, get_blog, listAll, updateBtName, insert_blog_type, getContent, newBlog, updateContent, deleteContent }