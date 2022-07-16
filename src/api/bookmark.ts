import request from '../utils/request'
import Qs from 'qs'
const search_bookmark = (params: Object) => {
  return request({
    url: '/api/v1/bookmark',
    method: 'get',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const put_bookmark = (params: Object) => {
  return request({
    url: '/api/v1/bookmark/insert',
    method: 'put',
    data: params
  })
}

const update_bookmark = (params: Object) => {
  return request({
    url: '/api/v1/bookmark/update',
    method: 'post',
    data: params
  })
}

const delete_bookmark = (query: number) => {
  return request({
    url: '/api/v1/bookmark/delete/' + query,
    method: 'delete',
  })
}

const delete_bookmarks = (params: Object) => {
  return request({
    url: '/api/v1/bookmark',
    method: 'delete',
    headers: {},
    data: params
  })
}

export { search_bookmark, put_bookmark, delete_bookmark, delete_bookmarks, update_bookmark }
