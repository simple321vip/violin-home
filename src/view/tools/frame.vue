<template>
  <div class="frame_box">
    <unit class="unit_one"></unit>
  </div>
  <div class="unit_box" v-for="(index) in total">
    <unit class="unit_one"></unit>
  </div>
  <el-tag class="ml-2 click-icon" type="success" @click="add">增加一组</el-tag>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import unit from './unit.vue'
let total = ref(0)
const add = () => {
  total.value++
}
</script>

<style>
.unit_box {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid rgba(151, 151, 151, 0.3);
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
}
</style>