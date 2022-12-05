import { service } from '../utils/request'

const put_bookmark_type = (params: Object) => {
  return service({
    url: '/bookmark/api/v1/bookmark_type/insert',
    method: 'PUT',
    data: params
  })
}

const get_bookmark_type = () => {
  return service({
    url: '/bookmark/api/v1/bookmark_type',
    method: 'GET',
    data: {}
  })
}

const delete_bookmark_type = (type_id: string) => {
  return service({
    url: '/bookmark/api/v1/bookmark_type/' + type_id,
    method: 'DELETE'
  })
}

const post_bookmark_type = (params: Object) => {
  return service({
    url: '/bookmark/api/v1/bookmark_type',
    method: 'POST',
    data: params
  })
}

export {
  put_bookmark_type,
  get_bookmark_type,
  delete_bookmark_type,
  post_bookmark_type
}