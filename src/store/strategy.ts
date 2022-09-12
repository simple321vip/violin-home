import { acceptHMRUpdate, defineStore } from "pinia"

export const strategyStore = defineStore({
  id: 'strategy',
  state: () => ({
    class_names: [],
    vt_symbols: []
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(strategyStore, import.meta.hot))
}