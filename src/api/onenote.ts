import { service } from '../utils/request'

const get_notes = (params: Object) => {
  return service({
    url: '/onenote/api/v1/one_note',
    method: 'GET',
    params: params
  })
}

const update_page = (params: Object) => {
  return service({
    url: '/onenote/api/v1/one_note/update_page',
    method: 'POST',
    data: params
  })
}

const update_section = (params: Object) => {
  return service({
    url: '/onenote/api/v1/one_note/update_section',
    method: 'POST',
    data: params
  })
}

const insert_section = () => {
  return service({
    url: '/onenote/api/v1/one_note/insert_section',
    method: 'PUT'
  })
}

const insert_page = (params: Object) => {
  return service({
    url: '/onenote/one_note/insert_page',
    method: 'PUT',
    data: params
  })
}

export { get_notes, update_page, update_section, insert_section, insert_page }
