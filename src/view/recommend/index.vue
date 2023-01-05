<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="订阅行情" name="2">
        <el-row>
          <el-col :span="4">
            <el-select v-model="exchange" placeholder="select a exchange">
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
              <el-icon :size="25" @click="on_subscribe()">
                <ZoomIn />
              </el-icon>
            </span>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="订阅一览" name="1">
        <el-table @row-contextmenu="rightClickRow" @cell-mouse-enter="rowMouseEnter" @cell-mouse-leave="rowMouseLeave"
          :data="ticks_data" style="width: 100%">
          <el-table-column fixed prop="symbol" label="symbol" width="80" />
          <el-table-column prop="exchange" label="exchange" width="100" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="last_price" label="last_price" width="120" />
          <el-table-column prop="volume" label="volume" width="100" />
          <el-table-column prop="open_price" label="open_price" width="120" />
          <el-table-column prop="high_price" label="high_price" width="120" />
          <el-table-column prop="low_price" label="low_price" width="100" />
          <el-table-column prop="differ" label="differ" width="70" />
          <el-table-column prop="differ_percent" label="differ_per" :formatter="Formatter" width="120" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
  <Contextmenu auto-ajust-placement ref="contextmenu">
    <ContextmenuItem @click="concelSubscribe">
      <el-icon class="contextmenu-icon">
        <CircleClose />
      </el-icon>
      <label> concel subscribe</label>
    </ContextmenuItem>
  </Contextmenu>
</template>

<script setup lang="ts">
import { ref, h, onMounted, onUnmounted, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { get_ticks, subscribe, concel_subscribe } from '../../api/capital'
import { strategyStore } from '../../store/strategy'
import { Contextmenu, ContextmenuItem } from "v-contextmenu"
import { toPercent } from '../../utils/number'

import * as echarts from 'echarts'
// -- IMPORT --
const currentInstance = getCurrentInstance()
const store = strategyStore()

// -- INTERFACE OR TYPE DEFINITION --
interface TickData {
  symbol: string
  exchange: string
  name: string
  last_price: number
  volume: number
  open_price: number
  high_price: number
  low_price: number
  differ: number
  differ_percent: number
}


// -- REACTIVE OBJECT --
const ticks_data = reactive<TickData[]>([])


// -- REF OBJECT --
const vt_symbol = ref<string>()
const exchange = ref<string>()
const timer = ref(0)
const activeNames = ref(['1'])
const selection = ref<string>("")


// -- EVENT DEFINITION
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
    store.select_subscribe_vt_symbols()
    on_ticks()
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: red' }, "行情订阅失败"),
      ]),
    })
  })
}

const concelSubscribe = () => {
  if (!selection.value) {
    return
  }
  concel_subscribe(selection.value).then(res => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: green' }, "取消订阅成功"),
      ]),
    })
    on_ticks()
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: red' }, "取消订阅失败"),
      ]),
    })
  })
}

const Formatter = (row: any, column: any) => {
  let diff = (row.last_price - row.open_price) / row.open_price
  return toPercent(diff)
}

const rowMouseEnter = (row: any, column: any, cell: any, event: any) => {
  selection.value = row.symbol + "." + row.exchange
  console.log(selection.value)
}

const rowMouseLeave = (row: any, column: any, cell: any, event: any) => {

}

const rightClickRow = (row: any, column: any, event: any) => {

  let contextmenuRef: any = currentInstance?.proxy?.$refs.contextmenu

  event.preventDefault()
  contextmenuRef.show({
    top: event.clientY,
    left: event.clientX
  })

  window.onclick = () => {
    contextmenuRef.hide()
    // contextMenuTargetBlank.value = false;
    // contextMenuTargetFile.value = false;
  }
}

const on_ticks = () => {
  get_ticks().then(res => {
    ticks_data.length = 0
    res.data.ticks.forEach((element: any) => {
      ticks_data.push(element)
    });
  })
  return on_ticks
}

/**
 * AUTO INVOKE FUNCTION
 */
(() => {

  onMounted(() => {
    clearInterval(timer.value)
    timer.value = window.setInterval(on_ticks(), 3000);
  })
  onUnmounted(() => {
    window.clearInterval(timer.value)
  })

  store.select_subscribe_vt_symbols()
    .catch(error => {
      ElMessage({
        message: h('p', null, [
          h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
        ]),
      })
    })

  store.select_vt_symbols()
    .catch((error) => {
      ElMessage({
        message: h('p', null, [
          h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
        ]),
      })
    })

  store.select_exchanges()
    .catch((error) => {
      ElMessage({
        message: h('p', null, [
          h('i', { style: 'color: teal' }, "读取exchanges失败"),
        ]),
      })
    })

})()

</script>

<style>
.dashboard {
  background-color: beige;
}
</style>