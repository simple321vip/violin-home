import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/cloud/api/v1/file/list',
    method: 'get',
    response: ({ body, query }) => {
      return [
        {
          server_filename: "java实战.pdf",
          path: "/",
          isDir: 0,
          size: 1000
        },
        {
          server_filename: "天道.pdf",
          path: "/",
          isDir: 0,
          size: 1000
        },
        {
          server_filename: "我得音乐",
          path: "/",
          isDir: 1,
          size: 10001

        },
      ]
    }
  },
] as MockMethod[]
