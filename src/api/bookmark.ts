import request from '../utils/request'
const search_bookmark = (params: Object) => {
  return request({
    url: '/bookmark',
    method: 'get',
    headers: {},
    // data: params
  })
}

const put_bookmark = (params: Object) => {
  return request({
    url: '/bookmark',
    method: 'put',
    headers: {},
    data: params
  })
}

const delete_bookmark = (params: Object) => {
  return request({
    url: '/bookmark',
    method: 'delete',
    headers: {},
    data: params
  })
}

const delete_bookmarks = (params: Object) => {
  return request({
    url: '/bookmark',
    method: 'delete',
    headers: {},
    data: params
  })
}

export { search_bookmark, put_bookmark, delete_bookmark, delete_bookmarks }
