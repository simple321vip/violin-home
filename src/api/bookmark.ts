import { service } from '../utils/request'
import Qs from 'qs'

/**
 * 
 * @param params 
 * @returns 
 */
const search_bookmark = (params: Object) => {
  return service({
    url: '/auth/api/v1/bookmark',
    method: 'GET',
    params: params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

const put_bookmark = (params: Object) => {
  return service({
    url: '/auth/api/v1/bookmark/insert',
    method: 'PUT',
    data: params
  })
}

const update_bookmark = (params: Object) => {
  return service({
    url: '/auth/api/v1/bookmark/update',
    method: 'POST',
    data: params
  })
}

const delete_bookmark = (query: number) => {
  return service({
    url: '/auth/api/v1/bookmark/delete/' + query,
    method: 'DELETE',
  })
}

const delete_bookmarks = (params: Object) => {
  return service({
    url: '/auth/api/v1/bookmark',
    method: 'DELETE',
    headers: {},
    data: params
  })
}

export {
  search_bookmark,
  put_bookmark,
  delete_bookmark,
  delete_bookmarks,
  update_bookmark
}
