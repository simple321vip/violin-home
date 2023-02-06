import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/calendar/api/v1/event',
    method: 'get',
    response: () => {
      return [
        {
          event_date: '2023-01-09',
          title: '春游',
          event_info: '春节不觉晓，处处闻啼鸟，夜来风雨声，花落知多少',
        },
        {
          event_date: '2023-01-30',
          title: '月底发工资',
          event_info: '发了工资少一半，还了信用卡再少一半，试问如何攒下钱，只有两个字：做梦',
        }
      ]
    }
  },
  {
    url: '/calendar/api/v1/event',
    method: 'put',
    response: () => {
      return {
      }
    }
  },
] as MockMethod[]