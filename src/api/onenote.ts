import { service } from '../utils/request'

const get_categorys = () => {
  return service({
    url: '/onenote/api/v1/category',
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

const get_items = (category_id: string) => {
  return service({
    url: '/onenote/api/v1/' + category_id + '/items/',
    method: 'GET',
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

export { get_categorys, get_items, put_category, put_item, post_item, delete_item }
