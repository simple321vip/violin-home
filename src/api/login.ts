import request from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getQrCode = () => {
  return request({
    url: '/auth/authorize/baidu',
    method: 'GET',
    headers: headers,
  })
}

export { getQrCode }