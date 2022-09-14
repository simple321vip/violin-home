<template>
  <el-row>
    <el-col :span="4">
      <el-select v-model="exchange" placeholder="select a exchange" @change="filter_vt_symbols">
        <el-option v-for="ex in store.exchanges" :value="ex" />
      </el-select>
    </el-col>
    <el-col :span="1">
    </el-col>
    <el-col :span="4">
      <el-select v-model="vt_symbol" placeholder="select a vt_symbol">
        <el-option v-for="symbol in store.vt_symbols.get(exchange)" :value="symbol" />
      </el-select>
    </el-col>
    <el-col :span="1">
    </el-col>
    <el-col :span="4">
      <span style="cursor: pointer">
        <el-icon :size="25" @click="on_subscribe(vt_symbol)">
          <ZoomIn />
        </el-icon>
      </span>
    </el-col>
  </el-row>

  <el-table :data="ticks_data" style="width: 100%">
    <el-table-column fixed prop="symbol" label="symbol" width="80" />
    <el-table-column fixed prop="exchange" label="exchange" width="100" />
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column fixed prop="last_price" label="last_price" width="120" />
    <el-table-column fixed prop="volume" label="volume" width="100" />
    <el-table-column fixed prop="open_price" label="open_price" width="120" />
    <el-table-column fixed prop="high_price" label="high_price" width="120" />
    <el-table-column fixed prop="low_price" label="low_price" width="120" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, h, onMounted, onUnmounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { get_ticks, subscribe } from '../../api/capital'
import { strategyStore } from '../../store/strategy'

const store = strategyStore()
const vt_symbol = ref<string>("")
const exchange = ref<string>()
const timer = ref(0)

type TickData = {
  symbol: string,
  exchange: string,
  name: string,
  last_price: number,
  volume: number,
  open_price: number,
  high_price: number,
  low_price: number,
}
const ticks_data = reactive<TickData[]>([])

const on_subscribe = (vt_symbol: string) => {
  subscribe(vt_symbol).then(res => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: green' }, "行情订阅成功"),
      ]),
    })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: red' }, "行情订阅失败"),
      ]),
    })
  })
}

const on_ticks = () => {
  get_ticks().then(res => {
    ticks_data.length = 0
    res.data.ticks.forEach((element: any) => {
      ticks_data.push(element)
    });
  })
}

const filter_vt_symbols = () => {

}

onMounted(() => {
  clearInterval(timer.value)
  timer.value = window.setInterval(on_ticks, 3000);
})
onUnmounted(() => {
  window.clearInterval(timer.value);
})

</script>

<style>
.dashboard {
  background-color: beige;
}
</style>