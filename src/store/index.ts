import { defineStore } from 'pinia'
import { Tables } from './table'

export const cloudStore = defineStore({
  id: 'cloudStore',
  state: () => {
    return {
      tableData: 1,
      showDocument: false,
      tableSize: 12
    }
  },
  getters: {

  },
  actions: {

  }
})