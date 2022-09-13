<template>
  <div class="bookmark">
    <el-upload ref="upload" class="upload-demo" action="http://localhost:5000/trader/api/v1/strategy_file" :limit="1"
      :on-exceed="handleExceed" :auto-upload="false">
      <template #trigger>
        <el-button type="primary">添加策略文件</el-button>
      </template>
      ->
      <el-button class="ml-3" type="success" @click="on_upload">
        上传策略文件
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          一次只能上传一个文件
        </div>
      </template>
    </el-upload>

    <el-table ref="multipleTableRef" :data="strategy_file_list" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="index" width="80" />
      <el-table-column prop="file_name" label="策略文件名" width="200" />
      <el-table-column prop="class_name" label="策略类名" width="200" />
      <el-table-column prop="status" label="状态" width="60">
        <template #default="scope">
          <el-icon v-if="scope.row.status == 0" :size="20">
            <InfoFilled />
          </el-icon>
          <el-icon v-if="scope.row.status == 1" :size="20" color="green">
            <SuccessFilled />
          </el-icon>
          <el-icon v-if="scope.row.status == 2" :size="20" color="gold">
            <WarningFilled />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="加载" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 0" style="cursor: pointer">
            <el-icon :size="20" @click="on_remove(scope.row)" color="blue">
              <CirclePlusFilled />
            </el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="卸载" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 1" style="cursor: pointer">
            <el-icon :size="20" @click="on_remove(scope.row)" color="red">
              <RemoveFilled />
            </el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="删除" width="60">
        <template #default="scope">
          <span v-if="scope.row.status == 0" style="cursor: pointer">
            <el-icon :size="20" @click="on_remove(scope.row)" color="red">
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
  get_strategy_files,
  load_strategy_file,
  unload_strategy_file,
  remove_strategy_file
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


type StrategyFile = {
  file_name: string,
  class_name: string,
  status: string
}

const strategy_file_list = reactive<StrategyFile[]>([])

const on_list = () => {
  get_strategy_files().then(res => {
    strategy_file_list.length = 0
    res.data.forEach((item: StrategyFile, index: number) => {
      strategy_file_list.push(item)
    })
  })
}

const on_upload = () => {

  upload.value!.submit()
  on_list()
}

const on_load = (row: any) => {
  row.status = 2
  load_strategy_file(row.file_name).then(res => {
    if (res.status == 200) {
      row.status = 1
    }
    if (res.status == 500) {
      row.status = 0
    }
  })
}

const on_unload = (row: any) => {
  unload_strategy_file(row.class_name).then(res => {
    if (res.status == 200) {
      row.status = 0
    }
    if (res.status == 500) {
      row.status = 1
    }
  })
}

const on_remove = (row: any) => {
  remove_strategy_file(row.file_name).then(res => {
    on_list()
  }).catch(error => {
    ElMessage({
      message: h('p', null, [
        h('i', { style: 'color: teal' }, error),
      ]),
    })
  })
}

// init process
on_list()


</script>

<style scoped>

</style>