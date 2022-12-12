import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getFileList = (url: string) => {
  return service({
    url: '/cloud/api/v1/file/list',
    method: 'GET',
    params: { url: url },
    headers: headers
  })
}

export { getFileList }