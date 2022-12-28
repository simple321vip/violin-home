import { defineStore, acceptHMRUpdate } from 'pinia'
import { authorize } from '../api/user'
import { getToken, setToken, resetToken, setTenant, getTenant } from '../utils/auth'
import { Tenant } from '../entity/index'

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

export const tenantStore = defineStore({
  id: 'tenant',
  state: () => ({
    account: '',
    token: '',
    id: ''
  }),

  getters: {

  },
  actions: {
    logout() {
      this.$patch({
        account: '',
        token: '',
        id: ''
      })
      resetToken()
      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a tenant
     * @param {object} tenant
     * @param {string} token
     */
    async login(tenant: any, token: string) {

      try {
        await authorize({
          tenant_id: tenant.tenant_id, token: token
        })
        setToken(token)
        setTenant(tenant)
      } catch {
        Promise.resolve("authorize error")
      }

    },


    async reflush() {
      if (getToken()) {
        const tenant = <Tenant>(JSON.parse(getTenant() as string))
        const token = <string>getToken()
        this.$patch({
          account: tenant.account,
          token: token,
          id: tenant.id
        })
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(tenantStore, import.meta.hot))
}