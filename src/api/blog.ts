import request from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const listAll = () => {
  return request({
    url: '/auth/api/v1/author/blog/list',
    method: 'GET',
    headers: headers
  })
}

const updateBtName = (data: Object) => {
  return request({
    url: '/auth/api/v1/author/blog_type',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const putBlogType = (data: Object) => {
  return request({
    url: '/auth/api/v1/author/blog_type',
    method: 'PUT',
    headers: headers,
    data: data
  })
}

const removeBlogType = (data: Object) => {
  return request({
    url: '/auth/api/v1/author/blog_type',
    method: 'DELETE',
    headers: headers,
    data: data
  })
}

const getContent = (id: string) => {
  return request({
    url: '/auth/api/v1/author/blog/content/' + id,
    method: 'GET',
    headers: headers,
  })
}

const putBlog = (postData: Object) => {
  return request({
    url: '/auth/api/v1/author/blog/content',
    method: 'PUT',
    headers: headers,
    data: postData
  })
}

const updateContent = (postData: Object) => {
  return request({
    url: '/auth/api/v1/author/blog/content',
    method: 'POST',
    headers: headers,
    data: postData
  })
}

const deleteContent = (bid: string) => {
  return request({
    url: '/auth/api/v1/author/blog/' + bid,
    method: 'DELETE',
    headers: headers,
  })
}


export { listAll, updateBtName, putBlogType, removeBlogType, getContent, putBlog, updateContent, deleteContent }