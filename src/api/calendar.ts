import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const put_event = (data: Object) => {
  return service({
    url: '/calendar/api/v1/event',
    method: 'PUT',
    data: data
  })
}

const get_event = () => {
  return service({
    url: '/calendar/api/v1/event',
    method: 'GET',
    headers: headers
  })
}

export {
  get_event,
  put_event,
}