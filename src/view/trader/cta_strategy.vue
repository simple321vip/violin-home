<template>
  <div class="startegy">
    <div class="create_dialog">
      <el-button type="primary" @click="handle_create">新建策略</el-button>
    </div>

    <el-table ref="multipleTableRef" :data="strategy_list" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="index" width="80" />
      <el-table-column prop="strategy_name" label="策略名" width="200" />
      <el-table-column prop="class_name" label="策略类名" width="200" />
      <el-table-column prop="vt_symbol" label="合约" width="100" />
      <el-table-column prop="status" label="状态" width="60">
        <template #default="scope">
          <el-icon v-if="scope.row.status == 0" :size="20">
            <Cloudy />
          </el-icon>
          <el-icon v-if="scope.row.status == 1" :size="20" color="yellow">
            <Sunrise />
          </el-icon>
          <el-icon v-if="scope.row.status == 2" :size="20" color="gold">
            <Sunny />
          </el-icon>
          <el-icon v-if="scope.row.status == 3" :size="20" color="blue">
            <Moon />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="开始" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 0" style="cursor: pointer" @click="on_remove(scope.row)">
            <el-icon :size="20" @click="on_start(scope.row)">
              <VideoPlay />
            </el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="停止" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 2" style="cursor: pointer" @click="on_remove(scope.row)">
            <el-icon :size="20" @click="on_stop(scope.row)">
              <VideoPause />
            </el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="删除" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 0" style="cursor: pointer" @click="on_remove(scope.row)">
            <el-icon :size="20" @click="on_remove(scope.row)">
              <Delete />
            </el-icon>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="createStrategyDialogVisible">
      <create_strategy_dialog ref="dialogRef" @on-create="on_list"></create_strategy_dialog>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import create_strategy_dialog from './dialog.vue'
import {
  get_strategies,
  start_strategy,
  stop_strategy,
  get_strategy_status,
  get_strategy_load_files,
  get_vt_symbols
} from '../../api/cta_strategy'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { strategyStore } from '../../store/strategy'

const store = strategyStore()

let createStrategyDialogVisible = ref(false)


type Strategy = {
  strategy_name: string,
  class_name: string,
  vt_symbol: string,
  setting: Object,
  status: number,
}

const strategy_list = reactive<Strategy[]>([])

const on_list = () => {
  get_strategies().then(res => {
    strategy_list.length = 0
    res.data.forEach((item: Strategy, index: number) => {
      strategy_list.push(item)
    })
  })
}
const dialogRef = ref()
const handle_create = () => {
  createStrategyDialogVisible.value = true
  dialogRef.value.clear_form()
}


const on_start = (row: any) => {
  start_strategy(row.strategy_name).then(res => {
    row.status = 2
  })
}

const on_stop = (row: any) => {
  stop_strategy(row.strategy_name).then(res => {
    row.status = 3
  })
}

const on_remove = (row: any) => {
  stop_strategy(row.strategy_name).then(res => {
    on_list()
  })
}

const on_status = (row: any) => {
  get_strategy_status(row.strategy_name).then(res => {
    row.status = res.data.status
  })
}

const init = () => {
  on_list()

  get_strategy_load_files().then(res => {
    store.$patch({ class_names: res.data.class_names })
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, "读取策略文件失败"),
      ]),
    })
  })

  // get_vt_symbols().then(res => {
  //   console.log(res)
  // }).catch(error => {
  //   ElMessage({
  //     message: h('p', null, [
  //       h('i', { style: 'color: teal' }, "读取vt_symbols失败"),
  //     ]),
  //   })
  // })
}
// init process
init()

</script>

<style scoped>

</style>