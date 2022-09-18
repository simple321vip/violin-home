<template>
  <div class="about" ref="bookmarks" id="bookmarks" :style="{
    width: '600px',
    height: '400px'
  }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
import { get_vt_symbols, get_exchanges, get_subscribe_vt_symbols } from '../../api/capital';
import { get_strategy_load_files } from '../../api/cta_strategy'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { strategyStore } from '../../store/strategy';

const store = strategyStore()
onMounted(() => {

})

const init = () => {

  get_vt_symbols().then(res => {
    console.log(res)
    let map = new Map()
    let keys = Object.keys(res.data.vt_symbols)
    keys.forEach(key => {
      map.set(key, res.data.vt_symbols[key])
    })
    store.$patch({ vt_symbols: map })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
      ]),
    })
  })

  get_subscribe_vt_symbols().then(res => {
    store.$patch({ subscribe_vt_symbols: res.data.vt_symbols })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
      ]),
    })
  })

  get_exchanges().then(res => {
    store.$patch({ exchanges: res.data.exchanges })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取exchanges失败"),
      ]),
    })
  })

}
// init process
init()


</script>

<style>

</style>