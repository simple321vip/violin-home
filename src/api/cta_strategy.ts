import { service2 } from '../utils/request'

"CTA strategy"

"strategy list"
const get_strategy_list = () => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"upload a strategy"
const upload_strategy = () => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"load a strategy"
const load_strategy = (strategy_id: string) => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"unload a strategy"
const unload_strategy = (strategy_id: string) => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"start a strategy"
const start_strategy = (strategy_id: string) => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"stop a strategy"
const stop_strategy = (strategy_id: string) => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

"remove a strategy"
const remove_strategy = (strategy_id: string) => {
  return service2({
    url: '/auth/api/v1/trader',
    method: 'PUT',
  })
}

export {
  get_strategy_list,
  upload_strategy,
  load_strategy,
  unload_strategy,
  start_strategy,
  stop_strategy,
  remove_strategy
}