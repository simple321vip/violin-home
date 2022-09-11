<template>
  <div class="bookmark">
    <!-- <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="search_form.comment" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="doSearch">检索</el-button>
        </el-col>
      </el-row>
    </el-form> -->
    <div class="create_dialog">
      <el-button type="primary" @click="on_create">新建</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  get_strategies,
  create_strategy,
  start_strategy,
  stop_strategy,
  get_strategy_status,
} from '../../api/cta_strategy'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { h } from 'vue'
import { ElMessage } from 'element-plus'

const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}


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

const on_create = () => {


}

const on_start = (row: any) => {
  start_strategy(row.strategy_name).then(res => {

  })
}

const on_stop = (row: any) => {
  stop_strategy(row.strategy_name).then(res => {

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

// init process
on_list()


</script>

<style scoped>

</style>