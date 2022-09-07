import request from '../utils/request'

const get_stock_data = (data: Object) => {
  return request({
    url: '/auth/api/v1/trader',
    method: 'PUT',
    data: data
  })
}

export { get_stock_data }