import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref } from "vue"

export const settingsStore = defineStore('settings', () => {

  const settings = ref({
    sideMode: '#191a23',
    isMobile: false,
    isRouterAlive: true,
    isLoading: false
  })

  const sideMode = computed(() => settings.value.sideMode)
  const isMobile = computed(() => settings.value.isMobile)
  const isRouterAlive = computed(() => settings.value.isRouterAlive)
  const isLoading = computed(() => settings.value.isLoading)

  return {
    settings,
    sideMode,
    isMobile,
    isRouterAlive,
    isLoading,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(settingsStore, import.meta.hot))
}
