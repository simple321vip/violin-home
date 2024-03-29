import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/trader/api/v1/exchanges',
    method: 'get',
    response: ({ body, query }) => {
      return {
        "exchanges": [
          "CFFEX",
          "SHFE",
          "CZCE",
          // "DCE",
          // "INE",
          // "GFEX"
        ]
      }
    }
  },
  {
    url: '/trader/api/v1/subscribe/vt_symbols',
    method: 'get',
    response: ({ body, query }) => {
      return {
        "vt_symbols": [
          "RM301.CZCE",
          "RM303.CZCE",
        ]
      }
    }
  },
  {
    url: '/trader/api/v1/vt_symbols',
    method: 'get',
    response: ({ body, query }) => {
      return {
        "vt_symbols": {
          "CFFEX": [],
          "SHFE": [],
          "CZCE": ["RM301.CZCE", "RM303.CZCE", "RM305.CZCE",],
        }
      }
    }
  },
  {
    url: '/trader/api/v1/ticks',
    method: 'get',
    response: ({ body, query }) => {
      return {
        "ticks": [
          {
            "ask_price_1": 3159.0,
            "ask_price_2": 0,
            "ask_price_3": 0,
            "ask_price_4": 0,
            "ask_price_5": 0,
            "bid_price_1": 3156.0,
            "bid_price_2": 0,
            "bid_price_3": 0,
            "bid_price_4": 0,
            "bid_price_5": 0,
            "exchange": "CZCE",
            "high_price": 3167.0,
            "last_price": 3156.0,
            "last_volume": 0,
            "limit_down": 2900.0,
            "limit_up": 3406.0,
            "low_price": 3156.0,
            "name": "\u83dc\u7c951\u6708",
            "open_interest": 10099.0,
            "open_price": 3160.0,
            "pre_close": 3160.0,
            "symbol": "RM301",
            "turnover": 4149080.0,
            "volume": 1313
          },
          {
            "ask_price_1": 3094.0,
            "ask_price_2": 0,
            "ask_price_3": 0,
            "ask_price_4": 0,
            "ask_price_5": 0,
            "bid_price_1": 3093.0,
            "bid_price_2": 0,
            "bid_price_3": 0,
            "bid_price_4": 0,
            "bid_price_5": 0,
            "exchange": "CZCE",
            "high_price": 3104.0,
            "last_price": 3093.0,
            "last_volume": 0,
            "limit_down": 2839.0,
            "limit_up": 3333.0,
            "low_price": 3084.0,
            "name": "\u83dc\u7c953\u6708",
            "open_interest": 136677.0,
            "open_price": 3088.0,
            "pre_close": 3087.0,
            "symbol": "RM303",
            "turnover": 12512136.0,
            "volume": 4044
          },
          {
            "ask_price_1": 0.0,
            "ask_price_2": 0,
            "ask_price_3": 0,
            "ask_price_4": 0,
            "ask_price_5": 0,
            "bid_price_1": 0.0,
            "bid_price_2": 0,
            "bid_price_3": 0,
            "bid_price_4": 0,
            "bid_price_5": 0,
            "exchange": "CZCE",
            "high_price": 0,
            "last_price": 0,
            "last_volume": 0,
            "limit_down": 2684.0,
            "limit_up": 3560.0,
            "low_price": 0,
            "name": "\u666e\u9ea65\u6708",
            "open_interest": 0.0,
            "open_price": 0,
            "pre_close": 0,
            "symbol": "PM305",
            "turnover": 0.0,
            "volume": 0
          }
        ]
      }
    }
  },
  {
    url: '/trader/api/v1/accounts',
    method: 'get',
    response: ({ body, query }) => {
      return {
        accounts: [
          {
            gateway_name: 'cpt',
            account_id: '7788',
            balance: '7',
            frozen: '8',
          },
          {
            gateway_name: 'cpt',
            account_id: '778899',
            balance: '8',
            frozen: '9',
          }
        ],
        positions: [
          {
            symbol: 'czce',
            exchange: 'RM301',
            direction: '1',
            volume: 222,
            price: 2500,
            frozen: 3,
            pnl: 2,
            yd_volume: 1,
          }
        ],
        trades: [
          {
            symbol: 'string',
            exchange: 'string',
            direction: 'string',
            volume: 2,
            price: 4,
            orderid: 'string',
            tradeid: 'string',
            offset: 'string',
          }
        ],
        orders: [{
          symbol: 'string',
          exchange: 'string',
          direction: 'string',
          volume: 6,
          price: 4,
          orderid: 'string',
          type: 'string',
          offset: 'string',
          traded: 7,
          status: 'string',
          // datetime :datetime
          reference: 'string',
        }]
      }
    }
  },
  {
    url: '/trader/api/v1/strategy_file',
    method: 'get',
    response: ({ body, query }) => {
      return [
        {
          file_name: 'string',
          class_name: 'string',
          status: 'string',
        }
      ]
    }
  },
  {
    url: '/trader/api/v1/strategies',
    method: 'get',
    response: ({ body, query }) => {
      return [
        {
          strategy_name: 'string',
          class_name: 'string',
          vt_symbol: 'string',
          setting: {},
          status: 1,
        }
      ]
    }
  },
  {
    url: '/trader/api/v1/strategy_file/load',
    method: 'get',
    response: ({ body, query }) => {
      return [
        {
          class_names: 'asdasdas'
        }
      ]
    }
  },



] as MockMethod[]

