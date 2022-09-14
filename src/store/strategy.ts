import { acceptHMRUpdate, defineStore } from "pinia"

export const strategyStore = defineStore({
  id: 'strategy',
  state: () => ({
    class_names: [],
    vt_symbols: new Map(),
    subscribe_vt_symbols: [],
    exchanges: []
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(strategyStore, import.meta.hot))
}