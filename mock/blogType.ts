import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/wiki/api/v1/author/wiki/list',
    method: 'get',
    response: ({ }) => {
      return [
        {
          btId: "001",
          btName: "１",
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
            {
              bid: "0003",
              title: "three",
              content: "xxxxxxxxx",
              btId: "001",
              order: 2,
            },
            {
              bid: "0004",
              title: "four",
              content: "xxyyyyxxxxxxx",
              btId: "001",
              order: 3,
            },
          ],
          order: 0
        },
        {
          btId: "002",
          btName: "２",
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
        {
          btId: "003",
          btName: "３",
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
          order: 2
        },
      ]
    }
  },
  {
    url: '/wiki/api/v1/author/wiki/type', // create wikiType
    method: 'post',
    response: () => {
      return {
        btId: "001",
        btName: "your world---",
        blog_list: [
          {
            bid: "0001",
            title: "one",
            content: "nothing",
            btId: "001",
            order: 0,
          },
        ],
        order: 2,
      }
    }
  },
  {
    url: '/wiki/api/v1/author/wiki/type', // update wikiType
    method: 'put',
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
  },
  {
    url: '/wiki/api/v1/author/wiki/type', // delete wikiType
    method: 'delete',
    response: ({ body, query }) => {
      return [
        {
          btId: "001",
          btName: "your world---",
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
    url: '/wiki/api/v1/author/wiki/type/sort',
    method: 'post',
    response: () => {
      return {
      }
    }
  },

] as MockMethod[]
