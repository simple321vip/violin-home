import { acceptHMRUpdate, defineStore } from "pinia"
import { get_vt_symbols, get_exchanges, get_subscribe_vt_symbols } from '../api/capital'

export const strategyStore = defineStore({
  id: 'strategy',
  state: () => ({
    class_names: [],
    vt_symbols: new Map(),
    subscribe_vt_symbols: [],
    exchanges: []
  }),

  actions: {
    async select_exchanges() {
      if (this.exchanges.length == 0) {
        get_exchanges().then(res => {
          this.$patch({ exchanges: res.data.exchanges })
        })
      }
    },
    async select_vt_symbols() {
      if (this.vt_symbols.size == 0) {
        get_vt_symbols().then(res => {
          let keys = Object.keys(res.data.vt_symbols)
          keys.forEach(key => {
            this.vt_symbols.set(key, res.data.vt_symbols[key])
          })
        })
      }
    },
    async select_subscribe_vt_symbols() {
      if (this.subscribe_vt_symbols.length == 0) {
        get_subscribe_vt_symbols().then(res => {
          this.$patch({ subscribe_vt_symbols: res.data.vt_symbols })
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(strategyStore, import.meta.hot))
}