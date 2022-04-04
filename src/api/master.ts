import request from '../utils/request'
const bookmark_type = () => {
  return request({
    url: '/master/bookmark/type',
    method: 'get',
    data: {}
  })
}

export { bookmark_type }
