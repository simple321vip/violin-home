<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Accounts list" name="1">
        <el-row v-for="account_data in account_datas">
          <el-col :span="1">
            <div class="cell-item">
              <el-icon style="iconStyle">
                <user />
              </el-icon>
            </div>
          </el-col>
          <el-col :span="3">
            <el-tag size="small"> {{ account_data.account_id }}</el-tag>
          </el-col>
          <el-col :span="1">
            <div class="cell-item">
              <el-icon style="iconStyle">
                <Coin />
              </el-icon>
            </div>
          </el-col>
          <el-col :span="3">
            <el-tag size="small"> {{ account_data.balance }}</el-tag>
          </el-col>
          <el-col :span="1">
            <div class="cell-item">
              <el-icon style="iconStyle">
                <GobletFull />
              </el-icon>
            </div>
          </el-col>
          <el-col :span="3">
            <el-tag size="small"> {{ account_data.frozen }}</el-tag>
          </el-col>
          <el-col :span="1">
            <div class="cell-item">
              <el-icon style="iconStyle">
                <School />
              </el-icon>
            </div>
          </el-col>
          <el-col :span="3">
            <el-tag size="small"> {{ account_data.gateway_name }}</el-tag>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="手动下单" name="2">

        <el-select v-model="vt_symbol" placeholder="select a vt_symbol" @change="select_contract">
          <el-option v-for="symbol in useStrategyStore.strategy.subscribe_vt_symbols" :value="symbol" />
        </el-select>
        <div style="height: 10px;"></div>
        <el-row>
          <el-col :span="5">
            <el-radio-group v-model="direction">
              <el-radio-button label="多" />
              <el-radio-button label="空" />
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-radio-group v-model="offset">
              <el-radio-button label="开" />
              <el-radio-button label="平" />
            </el-radio-group>
          </el-col>
        </el-row>
        <div style="height: 10px;"></div>
        <el-row>

          <el-col :span="5">
            <el-input-number v-model="volume" :min="1" :max="10" @change="handleChange" />
          </el-col>
          <el-col :span="4">
            <el-input-number v-model="price" :min="1" :max="10000" @change="handleChange" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="on_order">下单</el-button>
          </el-col>
          <el-col :span="7"></el-col>
        </el-row>

      </el-collapse-item>
      <el-collapse-item title="持仓一览" name="3">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="持仓" name=1></el-tab-pane>
          <el-tab-pane label="挂单" name=2></el-tab-pane>
          <el-tab-pane label="委托" name=3></el-tab-pane>
          <el-tab-pane label="成交" name=4></el-tab-pane>
        </el-tabs>
        <el-table v-if="activeName == 1" :data="positions_data" stripe style="width: 100%">
          <el-table-column prop="symbol" label="合约名称" width="100" />
          <el-table-column prop="exchange" label="交易所" width="100" />
          <el-table-column prop="direction" label="多空" width="100" />
          <el-table-column prop="volume" label="成交量" width="100" />
          <el-table-column prop="price" label="开仓价格" width="100" />
          <el-table-column prop="frozen" label="frozen" width="100" />
          <el-table-column prop="pnl" label="pnl" width="100" />
          <el-table-column prop="yd_volume" label="yd_volume" width="120" />
        </el-table>
        <el-table v-if="activeName == 2" :data="orders_data" stripe style="width: 100%">
          <el-table-column prop="symbol" label="合约名称" width="100" />
          <el-table-column prop="exchange" label="交易所" width="100" />
          <el-table-column prop="direction" label="多空" width="100" />
          <el-table-column prop="volume" label="成交量" width="100" />
          <el-table-column prop="price" label="开仓价格" width="100" />
        </el-table>
        <el-table v-if="activeName == 3" :data="orders_data" stripe style="width: 100%">
          <el-table-column prop="symbol" label="合约名称" width="80" />
          <el-table-column prop="exchange" label="交易所" width="80" />
          <el-table-column prop="direction" label="多空" width="80" />
          <el-table-column prop="volume" label="成交量" width="80" />
          <el-table-column prop="price" label="委托价格" width="100" />
          <el-table-column prop="orderid" label="orderid" width="160" />
          <el-table-column prop="type" label="type" width="80" />
          <el-table-column prop="offset" label="开平" width="80" />
          <el-table-column prop="traded" label="traded" width="80" />
          <el-table-column prop="status" label="status" width="80" />
          <el-table-column prop="reference" label="reference" width="100" />
        </el-table>
        <el-table v-if="activeName == 4" :data="trades_data" stripe style="width: 100%">
          <el-table-column prop="symbol" label="合约名称" width="100" />
          <el-table-column prop="exchange" label="交易所" width="100" />
          <el-table-column prop="direction" label="多空" width="100" />
          <el-table-column prop="volume" label="成交量" width="100" />
          <el-table-column prop="price" label="开仓价格" width="100" />
          <el-table-column prop="orderid" label="orderid" width="100" />
          <el-table-column prop="orderid" label="orderid" width="100" />
          <el-table-column prop="offset" label="offset" width="100" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, TabsPaneContext } from 'element-plus'
import { reactive, ref, h, onMounted, onUnmounted } from 'vue'
import { get_accounts, send_order, get_tick } from '../../api/capital'
import { strategyStore } from '../../store/modules/strategy'

// -- IMPORT --
const useStrategyStore = strategyStore()

// -- INTERFACE OR TYPE DEFINITION --
interface AccountData {
  gateway_name: string
  account_id: string
  balance: number
  frozen: number
}
interface PositionData {
  symbol: string
  exchange: string
  direction: string
  volume: number
  price: number
  frozen: number
  pnl: number
  yd_volume: number
}
interface OrderData {
  symbol: string
  exchange: string
  direction: string
  volume: number
  price: number
  orderid: string
  type: string
  offset: string
  traded: number
  status: string
  // datetime :datetime
  reference: string
}
interface TradeData {
  symbol: string
  exchange: string
  direction: string
  volume: number
  price: number
  orderid: string
  tradeid: string
  offset: string
  // datetime: datetime
}

// -- REACTIVE OBJECT --
const account_datas = reactive<AccountData[]>([])
const positions_data = reactive<PositionData[]>([])
const trades_data = reactive<TradeData[]>([])
const orders_data = reactive<OrderData[]>([])

// -- REF OBJECT --
const vt_symbol = ref<string>("")
const direction = ref('多')
const offset = ref('开')
const activeName = ref(1)
const volume = ref(1)
const price = ref(3000)
const timer = ref(0)
const activeNames = ref(['1'])

// -- EVENT DEFINITION
const on_query_accounts = () => {
  get_accounts().then(res => {
    account_datas.length = 0
    res.data.accounts.forEach((account: AccountData) => {
      account_datas.push(account)
    })
    positions_data.length = 0
    res.data.positions.forEach((element: PositionData) => {
      positions_data.push(element)
    })

    trades_data.length = 0
    res.data.trades.forEach((element: TradeData) => {
      trades_data.push(element)
    })

    orders_data.length = 0
    res.data.orders.forEach((element: OrderData) => {
      orders_data.push(element)
    })

  })
  return on_query_accounts
}

const select_contract = () => {
  get_tick(vt_symbol.value).then(res => {
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


/**
 * AUTO INVOKE FUNCTION
 */
(() => {

  useStrategyStore.select_subscribe_vt_symbols()
  onMounted(() => {
    clearInterval(timer.value)
    timer.value = window.setInterval(on_query_accounts(), 3000);
  })
  onUnmounted(() => {
    window.clearInterval(timer.value);
  })
})()

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