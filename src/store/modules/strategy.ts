import { acceptHMRUpdate, defineStore } from "pinia"
import { reactive } from "vue"
import { get_vt_symbols, get_exchanges, get_subscribe_vt_symbols } from '../../api/capital'

export const strategyStore = defineStore('strategy', () => {

  const strategy = reactive({
    class_names: [],
    vt_symbols: new Map(),
    subscribe_vt_symbols: [],
    exchanges: []
  })

  const select_exchanges = async () => {
    if (strategy.exchanges.length == 0) {
      get_exchanges().then(res => {
        strategy.exchanges = res.data.exchanges
      })
    }
  }

  const select_vt_symbols = async () => {
    if (strategy.vt_symbols.size == 0) {
      get_vt_symbols().then(res => {
        let keys = Object.keys(res.data.vt_symbols)
        keys.forEach(key => {
          strategy.vt_symbols.set(key, res.data.vt_symbols[key])
        })
      })
    }
  }

  const select_subscribe_vt_symbols = async () => {
    if (strategy.subscribe_vt_symbols.length == 0) {
      get_subscribe_vt_symbols().then(res => {
        strategy.subscribe_vt_symbols = res.data.subscribe_vt_symbols
      })
    }
  }

  return {
    strategy,
    select_exchanges,
    select_vt_symbols,
    select_subscribe_vt_symbols
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(strategyStore, import.meta.hot))
}
