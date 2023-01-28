import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/bookmark/api/v1/bookmark/count',
    method: 'get',
    response: () => {
      return {
        count: 53,
      }
    }
  }
] as MockMethod[]
