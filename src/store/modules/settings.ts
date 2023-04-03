import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref } from "vue"

export const settingsStore = defineStore('settings', () => {

  const settings = ref({
    sideMode: '#191a23',
    isMobile: false,
    isRouterAlive: true,
    isLoading: false,
    profileName: null,
  })

  const sideMode = computed(() => settings.value.sideMode)
  const isMobile = computed(() => settings.value.isMobile)
  const isRouterAlive = computed(() => settings.value.isRouterAlive)
  const isLoading = computed(() => settings.value.isLoading)
  const profileName = computed(() => settings.value.profileName)

  return {
    settings,
    sideMode,
    isMobile,
    isRouterAlive,
    isLoading,
    profileName,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(settingsStore, import.meta.hot))
}
