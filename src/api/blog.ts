import { service } from '../utils/request'

const headers = {
  'Content-Type': 'application/json;charsetset=UTF-8'
}

const createWikiType = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki/type',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const removeWikiType = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki/type',
    method: 'DELETE',
    headers: headers,
    data: data
  })
}

const updateWikiType = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki/type',
    method: 'PUT',
    headers: headers,
    data: data
  })
}

const getWikiType = (btId: string) => {
  return service({
    url: '/wiki/api/v1/author/wiki/type/' + btId,
    method: 'GET',
    headers: headers,
  })
}

const sortWikiType = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki/type/sort',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const createWiki = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki',
    method: 'POST',
    headers: headers,
    data: data
  })
}

const deleteWiki = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki',
    method: 'DELETE',
    headers: headers,
    data: data
  })
}

const updateWiki = (data: Object) => {
  return service({
    url: '/wiki/api/v1/author/wiki',
    method: 'PUT',
    headers: headers,
    data: data
  })
}

const getWiki = (id: string) => {
  return service({
    url: '/wiki/api/v1/author/wiki/' + id,
    method: 'GET',
    headers: headers,
  })
}

const sortWiki = (data: Object, btId: string) => {
  return service({
    url: '/wiki/api/v1/author/wiki/sort' + btId,
    method: 'POST',
    headers: headers,
    data: data
  })
}

const countWiki = () => {
  return service({
    url: '/wiki/api/v1/reader/wiki/count',
    method: 'GET',
    headers: headers,
  })
}

const listAll = () => {
  return service({
    url: '/wiki/api/v1/author/wiki/list',
    method: 'GET',
    headers: headers
  })
}

export {
  createWikiType,
  removeWikiType,
  updateWikiType,
  getWikiType,
  sortWikiType,
  createWiki,
  deleteWiki,
  updateWiki,
  getWiki,
  sortWiki,
  countWiki,
  listAll,
}