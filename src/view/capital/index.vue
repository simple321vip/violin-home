<template>
  <div class="capital">
    <el-descriptions title="Account Info">
      <el-descriptions-item class="descriptionsclass">
        <template #label>
          <div class="cell-item">
            <el-icon style="iconStyle">
              <user />
            </el-icon>
          </div>
        </template>
        <el-tag size="small"> {{account_data.account_id}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="gateway_name">{{account_data.geteway_name}}</el-descriptions-item>
      <el-descriptions-item label="frozen">{{account_data.frozen}}</el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon style="iconStyle">
              <Coin />
            </el-icon>
          </div>
        </template>
        <el-tag size="small"> {{account_data.balance}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">No.1188, Gaoxinyuan Avenue, Dalian District, Liaoning, Jiangsu
        Province</el-descriptions-item>
    </el-descriptions>

    <div class="operate">
      <div width="180px">
        <el-select v-model="vt_symbol" placeholder="select a vt_symbol" @change="select_contract">
          <el-option v-for="symbol in store.subscribe_vt_symbols" :value="symbol" />
        </el-select>
        <el-input-number v-model="volume" :min="1" :max="10" @change="handleChange" />
        <el-input-number v-model="price" :min="1" :max="10000" @change="handleChange" />
        <el-button type="primary" @click="on_order">下单</el-button>
      </div>
      <div>
        <div style="margin-top: 20px">
          <el-radio-group v-model="direction">
            <el-radio-button label="多" />
            <el-radio-button label="空" />
          </el-radio-group>
        </div>
        <div style="margin-top: 20px">
          <el-radio-group v-model="offset">
            <el-radio-button label="开" />
            <el-radio-button label="平" />
          </el-radio-group>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="持仓" name=1></el-tab-pane>
      <el-tab-pane label="挂单" name=2></el-tab-pane>
      <el-tab-pane label="委托" name=3></el-tab-pane>
      <el-tab-pane label="成交" name=4></el-tab-pane>
    </el-tabs>
    <el-table v-if="activeName == 1" :data="position_data" stripe style="width: 100%">
      <el-table-column prop="symbol" label="合约名称" width="180" />
      <el-table-column prop="direction" label="多空" width="180" />
      <el-table-column prop="open_price" label="开仓价格" width="180" />
      <el-table-column prop="gain_loss" label="盈亏" />
    </el-table>
    <el-table v-if="activeName == 2" :data="position_data" stripe style="width: 100%">
      <el-table-column prop="symbol" label="合约名称" width="180" />
      <el-table-column prop="direction" label="多空" width="180" />
      <el-table-column prop="balance" label="盈亏" />
    </el-table>
    <el-table v-if="activeName == 3" :data="position_data" stripe style="width: 100%">
      <el-table-column prop="symbol" label="合约名称" width="180" />
      <el-table-column prop="direction" label="多空" width="180" />
      <el-table-column prop="balance" label="盈亏" />
    </el-table>
    <el-table v-if="activeName == 4" :data="deal_data" stripe style="width: 100%">
      <el-table-column prop="symbol" label="合约名称" width="180" />
      <el-table-column prop="direction" label="开平" width="180" />
      <el-table-column prop="price" label="成交价" width="180" />
      <el-table-column prop="volume" label="成交量" width="180" />
      <el-table-column prop="balance" label="成交时间" width="180" />
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ElMessage, TabsPaneContext } from 'element-plus'
import { reactive, ref, h, onMounted, onUnmounted } from 'vue'
import { get_accounts, send_order, get_contract, subscribe } from '../../api/capital'
import { strategyStore } from '../../store/strategy';
type AccountData = {
  geteway_name: string
  account_id: string
  balance: number
  frozen: number
}
type PositionData = {
  symbol: string
  direction: string
  open_price: number
  gain_loss: number
}
type DealData = {
  symbol: string
  direction: string
  price: number
  volume: number
}
const store = strategyStore()
const vt_symbol = ref<string>("")
const contracts = reactive<string[]>([])
const direction = ref('多')
const offset = ref('开')
const activeName = ref(1)
const volume = ref(1)
const price = ref(3000)
const timer = ref(0)
const account_data = reactive<AccountData>({
  geteway_name: '',
  account_id: '',
  balance: 0.0,
  frozen: 0.0
})
const position_data = reactive<PositionData[]>([])
const deal_data = reactive<DealData[]>([])


const on_query_accounts = () => {
  get_accounts().then(res => {
    account_data.account_id = res.data.account_id
    account_data.balance = res.data.balance
    account_data.geteway_name = res.data.geteway_name
    account_data.frozen = res.data.frozen
  })
}
const select_contract = () => {
  subscribe(vt_symbol.value).then(res => {
    price.value = res.data.tick.last_price
  })
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const handleChange = (value: number) => {
  console.log(value)
}
const on_order = () => {

  ""
  if (vt_symbol.value == "") {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "合约不能为空"),
      ]),
    })
    return
  }

  let data = {
    vt_symbol: vt_symbol.value,
    direction: direction.value,
    offset: offset.value,
    volume: volume.value,
    price: price.value
  }
  send_order(data).then(res => {

  })
}

onMounted(() => {
  clearInterval(timer.value)
  timer.value = window.setInterval(on_query_accounts, 3000);
})
onUnmounted(() => {
  window.clearInterval(timer.value);
})

</script>

<style>
.dashboard {
  background-color: beige;
}

.iconStyle {
  margin-right: '6px'
}

.operate {
  display: flex;
  align-items: center
    /* justify-content: center */
}

.descriptionsclass {
  display: flex;
  align-items: center
}
</style>