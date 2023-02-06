import { service } from '../utils/request'

const get_categorys = () => {
  return service({
    url: '/onenote/api/v1/category',
    method: 'GET',
  })
}

const get_items = (category_id: string) => {
  return service({
    url: '/onenote/api/v1/' + category_id + '/items/',
    method: 'GET',
  })
}


const put_category = (data: Object) => {
  return service({
    url: '/onenote/api/v1/category',
    method: 'PUT',
    data: data
  })
}

const put_item = (data: Object) => {
  return service({
    url: '/onenote/api/v1/item',
    method: 'PUT',
    data: data
  })
}

const post_item = (data: Object) => {
  return service({
    url: '/onenote/api/v1/item',
    method: 'post',
    data: data
  })
}

const delete_item = (data: Object) => {
  return service({
    url: '/onenote/api/v1/item',
    method: 'delete',
    data: data
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


const insert_page = (params: Object) => {
  return service({
    url: '/onenote/one_note/insert_page',
    method: 'PUT',
    data: params
  })
}

export { get_categorys, get_items, update_page, update_section, put_category, put_item, post_item, delete_item, insert_page }
