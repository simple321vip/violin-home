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
  },
  {
    url: '/bookmark/api/v1/bookmark',
    method: 'get',
    response: () => {
      return [
        {
          bk_id: '001',
          bk_type_id: '2',
          bk_type_name: '3',
          comment: '4',
          url: '5'
        },
        {
          bk_id: '002',
          bk_type_id: '2',
          bk_type_name: '3',
          comment: '4',
          url: '5'
        }
      ]
    }
  },
  {
    url: '/bookmark/api/v1/bookmark_type',
    method: 'get',
    response: () => {
      return [

      ]
    }
  },

] as MockMethod[]
