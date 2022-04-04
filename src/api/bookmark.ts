import request from '../utils/request'
const search_bookmark = (params: Object) => {
  return request({
    url: '/bookmark',
    method: 'get',
    headers: {},
    params: params
  })
}

const put_bookmark = (params: Object) => {
  return request({
    url: '/bookmark/insert',
    method: 'put',
    data: params
  })
}

const update_bookmark = (params: Object) => {
  return request({
    url: '/bookmark/update',
    method: 'post',
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

export { search_bookmark, put_bookmark, delete_bookmark, delete_bookmarks, update_bookmark }
