<template>
  <div>
    <el-menu router class="el-menu-vertical" :style="{ height: sideHeight }" :background-color="theme.background"
      :active-text-color="theme?.background">
      <el-menu-item v-for="(route, index) in current_routes" :key="index" :index="route.path" :title="route.meta?.name"
        @click="onclick()">
        <template #title>
          <div class="gva-menu-item">
            <el-icon v-if="index == 0" :size="20">
              <Sunny />
            </el-icon>
            <el-icon v-if="index == 1" :size="20">
              <EditPen />
            </el-icon>
            <el-icon v-if="index == 2" :size="20">
              <Star />
            </el-icon>
            <el-icon v-if="index == 3" :size="20">
              <Notebook />
            </el-icon>
            <el-icon v-if="index == 4" :size="20">
              <Calendar />
            </el-icon>
            <el-icon v-if="index == 5" :size="20">
              <MostlyCloudy />
            </el-icon>
            <el-icon v-if="index == 10" :size="20">
              <Setting />
            </el-icon>
            <span>{{ route.meta?.name }}</span>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue'
import router from "@/router/index"
import { settingsStore } from "@/store/modules/settings"
import { Theme } from "@/entity/index";

// -- IMPORT --
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --

// -- REF OBJECT --
let sideHeight = ref("")

let current_routes = router.options.routes[0].children
const theme = ref<Theme>({
  background: '#fff',
  activeBackground: '#4D70FF',
  activeText: '#fff',
  normalText: '#333',
  hoverBackground: 'rgba(64, 158, 255, 0.08)',
  hoverText: '#333'
})

// -- EVENT DEFINITION
const onclick = () => {
  activeBackground.value = '#4D70FF'
}

const getTheme = () => {
  switch (useSettingsStore.sideMode) {
    // white color
    case '#fff':
      theme.value = {
        background: '#fff',
        activeBackground: '#4D70FF',
        activeText: '#fff',
        normalText: '#333',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#333',
      }
      break;

    // black color
    case '#191a23':
      theme.value = {
        background: '#191a23',
        activeBackground: '#4D70FF',
        activeText: '#fff',
        normalText: '#fff',
        hoverBackground: 'rgba(64, 158, 255, 0.08)',
        hoverText: '#fff',
      }
      break;
  }
}

/**
 * AUTO INVOKE FUNCTION
 */
getTheme()

onBeforeMount(() => {
  sideHeight.value = window.innerHeight + 'px'
})
const activeBackground = ref(theme.value.activeBackground)
onclick()


</script>

<style lang="scss" scoped>
.side_Style {
  width: 100px;
}

.side-main {
  width: 200px;
}

.gva-menu-item {
  color: #fff;
}

.el-menu-item.is-active {
  color: v-bind(activeBackground);
  background: v-bind(activeBackground);
}

/* .el-menu-item {
  background-color: #01dfd7;
} */
</style>
