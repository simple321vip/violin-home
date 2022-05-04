import request from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const getAudioInfo = (url: string) => {
  return request({
    url: '/common/audio-info',
    method: 'GET',
    params: { url: url },
  })
}

export { getAudioInfo }