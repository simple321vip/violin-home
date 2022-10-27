import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/api/v1/author/blog/content/0001',
    method: 'get',
    response: ({ body, query }) => {
      return {
        content: "asdasdasdasdsadasdasdasdasdas"
      }
    }
  },
  {
    url: '/auth/api/v1/author/blog/content/0002',
    method: 'get',
    response: ({ body, query }) => {
      return {
        content: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
      }
    }
  },
  {
    url: '/auth/api/v1/author/blog/content',
    method: 'POST',
    response: ({ body, query }) => {
      return {
        content: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  },
] as MockMethod[]
