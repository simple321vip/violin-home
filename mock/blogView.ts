import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/api/v1/reader/blogs',
    method: 'get',
    response: () => {
      return [
        {
          bid: "string",
          btId: "string",
          btName: "string",
          title: "string",
          blog_prex: "string",
          content: "string"
        },
        {
          bid: "string",
          btId: "string",
          btName: "string",
          title: "string",
          blog_prex: "string",
          content: "string"
        },
      ]
    }
  },
  {
    url: '/auth/api/v1/reader/blog_type',
    method: 'get',
    response: () => {
      return [
        {
          btId: "string",
          btName: "string",
        },
        {
          btId: "string",
          btName: "string",
        },
      ]
    }
  },
] as MockMethod[]