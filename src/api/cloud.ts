import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getAudioInfo = (url: string) => {
  return service({
    url: '/auth/api/v1/common/audio-info',
    method: 'GET',
    params: { url: url },
  })
}

export { getAudioInfo }