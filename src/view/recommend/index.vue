<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="订阅行情" name="2">
        <el-row>
          <el-col :span="4">
            <el-select v-model="exchange" placeholder="select a exchange">
              <el-option v-for="ex in exchanges" :value="ex" />
            </el-select>
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="4">
            <el-select v-model="vt_symbol" placeholder="select a vt_symbol">
              <el-option v-for="symbol in vt_symbols" :value="symbol" />
            </el-select>
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="4">
            <span style="cursor: pointer">
              <el-icon :size="25" @click="on_subscribe()">
                <ZoomIn />
              </el-icon>
            </span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="订阅一览" name="1">
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, onUnmounted, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { get_ticks, subscribe } from '../../api/capital'
import { strategyStore } from '../../store/strategy'

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

const store = strategyStore()
const vt_symbol = ref<string>()
const vt_symbols = reactive<string[]>([])
const exchange = ref<string>()
const exchanges = reactive<string[]>([])
store.exchanges.forEach(exchange => {
  exchanges.push(exchange)
})
const timer = ref(0)


const ticks_data = reactive<TickData[]>([])
const activeNames = ref(['1'])

const on_subscribe = () => {
  if (!vt_symbol.value) {
    return
  }
  subscribe(vt_symbol.value).then(res => {
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

watch(exchange, (newVal, oldVal) => {
  vt_symbols.length = 0
  // let sp_vt_symbol: [] = store.vt_symbols.get(vt_symbol.value)
  // sp_vt_symbol.forEach((record: string) => {
  //   vt_symbols.push(record)
  // })
})

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