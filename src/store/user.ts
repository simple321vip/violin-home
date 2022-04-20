import { defineStore, acceptHMRUpdate } from 'pinia'
import { authorize } from '../api/user'
import { getToken, setToken, resetToken, setUser, getUser } from '../utils/auth'
import { User } from '../entity/index'

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
// function apiLogin(a, p) {
//   if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
//   if (p === 'ed') return Promise.resolve({ isAdmin: false })
//   return Promise.reject(new Error('invalid credentials'))
// }

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '',
    token: '',
    owner: false
  }),

  getters: {

  },
  actions: {
    logout() {
      this.$patch({
        name: '',
        token: '',
        owner: false
      })
      resetToken()
      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     * @param {string} user_id
     * @param {string} user_password
     */
    async login(user_id: string, user_password: string) {
      const userData = await authorize({ user_id, user_password })
      if (userData.data.token) {
        this.$patch({
          name: user_id,

          ...userData.data,
          owner: true
        })
        setToken(userData.data.token)
        setUser(userData)
        console.log('authorize success!')
      }
      return new Promise((resolve, reject) => {
        if (userData.data.message) {
          reject(userData.data.message)
        } else {
          resolve(userData.data)
        }
      })
    },
    async reflush() {
      if (getToken()) {
        const user = <User>(JSON.parse(getUser() as string))
        const token = <string>getToken()
        this.$patch({
          name: user.id,
          token: token,
          owner: true
        })
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}