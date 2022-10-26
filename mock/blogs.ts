import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/api/v1/author/blog/list',
    method: 'get',
    response: () => {
      return [
        {
          btId: "001",
          btName: "your world",
          blog_list: [
            {
              bid: "0001",
              title: "one",
              content: "nothing",
              btId: "001",
              order: 0,
            },
            {
              bid: "0002",
              title: "two",
              content: "anything",
              btId: "001",
              order: 1,
            },
          ],
          order: 0
        },
        {
          btId: "002",
          btName: "my world",
          blog_list: [
            {
              bid: "0003",
              title: "three",
              content: "nothing",
              btId: "002",
              order: 0,
            },
            {
              bid: "0004",
              title: "two",
              content: "anything",
              btId: "002",
              order: 1,
            },
          ],
          order: 1
        },
      ]
    }
  },
  {
    url: '/auth/api/v1/author/blog_types',
    method: 'post',
    response: () => {
      return [
        {
          btId: "001",
          btName: "your world",
          blog_list: [
            {
              bid: "0001",
              title: "one",
              content: "nothing",
              btId: "001",
              order: 0,
            },
            {
              bid: "0002",
              title: "two",
              content: "anything",
              btId: "001",
              order: 1,
            },
          ],
          order: 1
        },
        {
          btId: "002",
          btName: "my world",
          blog_list: [
            {
              bid: "0003",
              title: "three",
              content: "nothing",
              btId: "002",
              order: 0,
            },
            {
              bid: "0004",
              title: "two",
              content: "anything",
              btId: "002",
              order: 1,
            },
          ],
          order: 0
        },
      ]
    }
  }
] as MockMethod[]
