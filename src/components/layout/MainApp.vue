<template>
  <section class="section-main" v-loading="usesSttingsStore.isLoading" element-loading-text="页面加载中……"
    element-loading-background="rgba(0, 0, 0, 0.1)">
    <router-view v-if="usesSttingsStore.isRouterAlive" />
  </section>
</template>

<script setup lang='ts'>
import { settingsStore } from "@/store/modules/settings"
const usesSttingsStore = settingsStore()

</script>

<style>
.section-main {
  height: 100%;
  padding: 14px;
}
</style>
