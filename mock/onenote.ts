import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/onenote/api/v1/one_note',
    method: 'get',
    response: () => {
      return [
        {
          section_id: 'x111',
          section_name: 'A',
          page_list: [
            {
              page_id: 'y111',
              section_id: 'x111',
              page_name: 'B',
            },
            {
              page_id: 'y222',
              section_id: 'x111',
              page_name: 'C',
            },
          ]
        }
      ]
    }
  }
] as MockMethod[]