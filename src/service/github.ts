import axios from 'axios'

const service = axios.create()

export function Commits(page: number) {
  return service({
    url: 'https://api.github.com/repos/simple321vip/violin-home/commits?page=' + page,
    method: 'get'
  })
}

export function Members() {
  return service({
    url: 'https://api.github.com/orgs/FLIPPED-AURORA/members',
    method: 'get'
  })
}