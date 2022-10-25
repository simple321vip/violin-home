import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const listAll = () => {
  return service({
    url: '/auth/api/v1/author/blog/list',
    method: 'GET',
    headers: headers
  })
}

const updateBtName = (data: Object) => {
  return service({
    url: '/auth/api/v1/author/blog_type',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const putBlogType = (data: Object) => {
  return service({
    url: '/auth/api/v1/author/blog_type',
    method: 'PUT',
    headers: headers,
    data: data
  })
}

const removeBlogType = (data: Object) => {
  return service({
    url: '/auth/api/v1/author/blog_type',
    method: 'DELETE',
    headers: headers,
    data: data
  })
}

const sortBlogTypes = (data: Object) => {
  return service({
    url: '/auth/api/v1/author/blog_types',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const getContent = (id: string) => {
  return service({
    url: '/auth/api/v1/author/blog/content/' + id,
    method: 'GET',
    headers: headers,
  })
}

const putBlog = (postData: Object) => {
  return service({
    url: '/auth/api/v1/author/blog/content',
    method: 'PUT',
    headers: headers,
    data: postData
  })
}

const updateContent = (postData: Object) => {
  return service({
    url: '/auth/api/v1/author/blog/content',
    method: 'POST',
    headers: headers,
    data: postData
  })
}

const deleteContent = (bid: string) => {
  return service({
    url: '/auth/api/v1/author/blog/' + bid,
    method: 'DELETE',
    headers: headers,
  })
}


export { listAll, updateBtName, putBlogType, removeBlogType, sortBlogTypes, getContent, putBlog, updateContent, deleteContent }