import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const create_profile = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/profile',
    method: 'POST',
    data: data
  })
}

const update_profile = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/profile',
    method: 'PUT',
    data: data
  })
}

const publish_profile = () => {
  return service({
    url: '/wiki/api/v1/author/profile/publish',
    method: 'PUT'
  })
}

const get_profile = () => {
  return service({
    url: '/wiki/api/v1/author/profile',
    method: 'GET',
    headers: headers
  })
}

const get_profileName = () => {
  return service({
    url: '/wiki/api/v1/author/profile/name',
    method: 'GET',
    headers: headers
  })
}

const judge_profile = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/profile/judge',
    method: 'POST',
    data: data
  })
}



export {
  create_profile,
  get_profile,
  update_profile,
  get_profileName,
  judge_profile,
  publish_profile
}