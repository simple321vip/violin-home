import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/onenote/api/v1/category',
    method: 'get',
    response: () => {
      return [
        {
          category_id: '4444',
          category_color: '	#B0E0E6',
          category_icon: 'Document',
          category_theme: 'WIKI'
        },
        {
          category_id: '4444',
          category_color: '	#B0E0E6',
          category_icon: 'Collection',
          category_theme: 'Collection'
        },
        {
          category_id: '4444',
          category_color: '	#B0E0E6',
          category_icon: 'Files',
          category_theme: 'Files'
        },
        {
          category_id: '4444',
          category_color: '	#B0E0E6',
          category_icon: 'Phone',
          category_theme: 'Phone'
        },
      ]
    }
  },
  {
    url: '/onenote/api/v1/4444/items/',
    method: 'get',
    response: () => {
      return [
        {
          item_id: '00001',
          item_name: '中国联通',
          item_value: '13332247026'
        },
        {
          item_id: '00002',
          item_name: '中国联通副号',
          item_value: '13333333333'
        },
      ]
    }
  },
  {
    url: '/onenote/api/v1/category',
    method: 'put',
    response: () => {
      return {}
    }
  },
  {
    url: '/onenote/api/v1/item',
    method: 'put',
    response: () => {
      return {}
    }
  },
  {
    url: '/onenote/api/v1/item',
    method: 'delete',
    response: () => {
      return {}
    }
  }
] as MockMethod[]