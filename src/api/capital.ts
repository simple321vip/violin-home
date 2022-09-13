import { trader_service } from '../utils/request'

"CTA strategy"

"query account"
const get_accounts = () => {
  return trader_service({
    url: '/trader/api/v1/accounts',
    method: 'GET',
  })
}

"get contract"
const get_contract = (symbol: string) => {
  return trader_service({
    url: '/trader/api/v1/contract/' + symbol,
    method: 'GET',
  })
}

"unload a strategy file"
const send_order = (data: any) => {
  return trader_service({
    url: '/trader/api/v1/order',
    method: 'POST',
    data: data
  })
}

export {
  get_accounts,
  get_contract,
  send_order
}