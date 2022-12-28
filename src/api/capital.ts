import { service } from '../utils/request'

"CTA strategy"

"query account"
const get_accounts = () => {
  return service({
    url: '/trader/api/v1/accounts',
    method: 'GET',
  })
}

"get contract"
const get_contract = (symbol: string) => {
  return service({
    url: '/trader/api/v1/contract/' + symbol,
    method: 'GET',
  })
}

"get tick"
const get_tick = (symbol: string) => {
  return service({
    url: '/trader/api/v1/tick/' + symbol,
    method: 'GET',
  })
}

"get ticks"
const get_ticks = () => {
  return service({
    url: '/trader/api/v1/ticks',
    method: 'GET',
  })
}

"send_order"
const send_order = (data: any) => {
  return service({
    url: '/trader/api/v1/order',
    method: 'POST',
    data: data
  })
}

"subscribe tick"
const subscribe = (symbol: string) => {
  return service({
    url: '/trader/api/v1/subscribe/' + symbol,
    method: 'GET',
  })
}

"get subscribe vt_symbols"
const get_subscribe_vt_symbols = () => {
  return service({
    url: '/trader/api/v1/subscribe/vt_symbols',
    method: 'GET',
  })
}

"cancel a subscribe for vt_symbol"
const concel_subscribe = (symbol: string) => {
  return service({
    url: '/trader/api/v1/subscribe/' + symbol,
    method: 'DELETE',
  })
}

"get all vt_symbols"
const get_vt_symbols = () => {
  return service({
    url: '/trader/api/v1/vt_symbols',
    method: 'GET',
  })
}

"get exchanges"
const get_exchanges = () => {
  return service({
    url: '/trader/api/v1/exchanges',
    method: 'GET',
  })
}

export {
  get_accounts,
  get_contract,
  get_tick,
  get_ticks,
  subscribe,
  concel_subscribe,
  send_order,
  get_vt_symbols,
  get_subscribe_vt_symbols,
  get_exchanges
}