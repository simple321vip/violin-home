import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref } from "vue"

export const settingsStore = defineStore('settings', () => {

  const settings = ref({
    sideMode: '#191a23',
    isMobile: false,
  })

  const sideMode = computed(() => settings.value.sideMode)
  const isMobile = computed(() => settings.value.isMobile)

  return {
    settings,
    sideMode,
    isMobile,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(settingsStore, import.meta.hot))
}
