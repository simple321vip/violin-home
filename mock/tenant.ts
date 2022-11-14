import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/api/v1/authorize',
    method: 'post',
    response: () => {
      return {
        token: "ABCDEFG"
      }
    }
  }
] as MockMethod[]
