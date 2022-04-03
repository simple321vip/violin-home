import { defineStore } from 'pinia'
import { Tables } from './table'

export const store = defineStore(Tables.AccessRoutes, {
  state: () => {
    return [
      {
        current: 1,
        name: 'xiaoman'
      }
    ]
  },
  getters: {

  },
  actions: {

  }
})