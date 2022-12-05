import { service } from '../utils/request'

const get_stock_data = (data: Object) => {
  return service({
    url: '/trader/api/v1/trader',
    method: 'PUT',
    data: data
  })
}

export { get_stock_data }