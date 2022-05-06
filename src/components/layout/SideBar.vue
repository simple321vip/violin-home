<template>
  <div>
    <el-menu router class="side_Style" :style="{ height: sideHeight }">
      <el-menu-item v-for="(route, index) in current_routes" v-bind:key="index" v-bind:index="route.path"
        v-bind:title="route.meta?.name">{{ route.meta?.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import { RouteRecordRaw } from "vue-router";
// import { store } from "../../store/index";
import router from "../../router/index";
import { onBeforeMount, ref } from 'vue';
let current_routes = router.options.routes[0].children;


let sideHeight = ref("")
onBeforeMount(() => {
  sideHeight.value = window.innerHeight + 'px'
})
</script>

<style>
.side_Style {
  width: 100px;
}

.side-main {
  width: 200px;
}

/* .el-menu-item {
  background-color: #01dfd7;
} */
</style>
