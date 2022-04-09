import request from '../utils/request'

const get_notes = (params: Object) => {
  return request({
    url: '/one_note',
    method: 'get',
    params: params
  })
}

const update_page = (params: Object) => {
  return request({
    url: '/one_note/update_page',
    method: 'post',
    data: params
  })
}

const update_section = (params: Object) => {
  return request({
    url: '/one_note/update_section',
    method: 'post',
    data: params
  })
}

const insert_section = () => {
  return request({
    url: '/one_note/insert_section',
    method: 'put'
  })
}

const insert_page = (params: Object) => {
  return request({
    url: '/one_note/insert_page',
    method: 'put',
    data: params
  })
}

export { get_notes, update_page, update_section, insert_section, insert_page }
