import { defineStore, acceptHMRUpdate } from 'pinia'
import { authorize } from '../api/user'
import { getToken, setToken, resetToken, setTenant, getTenant } from '../utils/auth'
import { Tenant } from '../entity/index'


interface Record {
  isFolder: boolean
  path: string
  records: Set<Record>
}

/**
 * skeleton 
 * 
 * 
 */
export const tenantStore = defineStore({
  id: 'cloud',
  state: () => ({
    cloud: new Set<Record>(),
  }),

  getters: {

  },
  actions: {
    logout() {
      this.$patch({
      })
      resetToken()
      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     * @param {string} user_id
     * @param {string} user_password
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

        })
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(tenantStore, import.meta.hot))
}