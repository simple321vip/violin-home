<template>
  <div class="about" ref="bookmarks" id="bookmarks" :style="{
    width: '600px',
    height: '400px'
  }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
import {
  get_strategy_load_files,
  get_vt_symbols
} from '../../api/cta_strategy'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { strategyStore } from '../../store/strategy';

const store = strategyStore()
onMounted(() => {

})

const init = () => {

  get_strategy_load_files().then(res => {
    store.$patch({ class_names: res.data.class_names })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取策略文件失败"),
      ]),
    })
  })

  get_vt_symbols().then(res => {
    store.$patch({ vt_symbols: res.data.vt_symbols })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
      ]),
    })
  })
}
// init process
init()


</script>

<style>

</style>