import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/wiki/api/v1/author/blog/content/0001',
    method: 'get',
    response: ({ body, query }) => {
      return {
        content: "asdasdasdasdsadasdasdasdasdas"
      }
    }
  },
  {
    url: '/wiki/api/v1/author/blog/content/0002',
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
  {
    url: '/auth/api/v1/author/blog/0001',
    method: 'delete',
    response: () => {
      return {
        btId: "001",
        btName: "your world---",
        blog_list: [
          {
            bid: "0002",
            title: "two",
            content: "anything",
            btId: "001",
            order: 0,
          },
        ],
        order: 0
      }
    },
  },
  {
    url: '/auth/api/v1/author/blog/content',
    method: 'PUT',
    response: () => {
      return {
        bid: "0003",
        title: "three",
        content: "just a insert test",
        btId: "001",
        order: 2,
      }
    },
  },
  {
    url: '/auth/api/v1/author/blog/content',
    method: 'POST',
    response: () => {
      return {
        bid: "0003",
        title: "three",
        content: "just a insert test",
        btId: "001",
        order: 2,
      }
    },
  },
  {
    url: '/wiki/api/v1/author/blogs/count',
    method: 'GET',
    response: () => {
      return {
        count: 101,
      }
    },
  },
] as MockMethod[]
