<template>
  <span class="headerAvatar">
    <template v-if="picType === 'avatar'">
      <el-avatar v-if="useTenantStore.tenant.headerImg" :size="30" :src="avatar" />
      <el-avatar v-else :size="30" :src="noAvatar" />
    </template>
    <template v-if="picType === 'img'">
      <img v-if="useTenantStore.tenant.headerImg" :src="avatar" class="avatar">
      <img v-else :src="noAvatar" class="avatar">
    </template>
    <template v-if="picType === 'file'">
      <img :src="file" class="file">
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { tenantStore } from '@/store/modules/tenant'
import noAvatarPng from '@/assets/nobody.jpg'

const props = defineProps({
  picType: {
    type: String,
    required: false,
    default: 'avatar'
  },
  picSrc: {
    type: String,
    required: false,
    default: ''
  }
})
const path = ref(import.meta.env.VITE_BASE_API + '/')
const noAvatar = ref(noAvatarPng)
const useTenantStore = tenantStore()
const avatar = computed(() => {
  if (props.picSrc === '') {
    if (useTenantStore.tenant.headerImg !== '' && useTenantStore.tenant.headerImg.slice(0, 4) === 'http') {
      return useTenantStore.tenant.headerImg
    }
    return path.value + useTenantStore.tenant.headerImg
  } else {
    if (props.picSrc !== '' && props.picSrc.slice(0, 4) === 'http') {
      return props.picSrc
    }
    return path.value + props.picSrc
  }
})
const file = computed(() => {
  if (props.picSrc && props.picSrc.slice(0, 4) !== 'http') {
    return path.value + props.picSrc
  }
  return props.picSrc
})
</script>
<style scoped>
.headerAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}

.file {
  width: 80px;
  height: 80px;
  position: relative;
}
</style>