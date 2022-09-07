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
      <div class="tag_list">
        <el-tag class="ml-2 click-icon" :type="item.clicked ? 'danger' : 'info'" v-for="(item) in bookmark_types"
          @click="handleTags(item)">{{ item.bk_type_name }}</el-tag>
        <el-button type="primary" @click="handleAddType" v-show="Tenant.account">增加</el-button>
        <el-button type="primary" @click="handleManageType" v-show="Tenant.account">自定义</el-button>
      </div>
    </el-form>
    <div class="create_dialog">
      <el-button type="primary" @click="handleInsert" v-show="Tenant.account">新建</el-button>
    </div>

    <el-table ref="multipleTableRef" :data="strategy_list" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="index" width="80" />
      <el-table-column prop="bk_type_name" label="分类" width="100" />
      <el-table-column prop="comment" label="名称" width="180" />
      <el-table-column prop="facvion" label="图标" width="60" />
      <el-table-column class="click-icon" prop="url" label="url">
        <template #default="scope">
          <span style="cursor: pointer" @click="openUrl(scope.row.url)">{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-icon :size="20" @click="copyNumber(scope.row)" class="click-icon">
            <CopyDocument />
          </el-icon>
          <el-button class="click-icon" size="small" @click="handleEdit(scope.$index, scope.row)"
            v-show="Tenant.account">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" v-show="Tenant.account">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">反选</el-button>
      <el-button @click="toggleSelection()">清除</el-button>
    </div> -->

    <!-- <el-dialog v-model="dialogFormVisible" title="添加书签">
      <bookmark_dialog :dialog_form="currentDialogData" :operate_code="operate" :types="bookmark_types"
        @on-concel="closeDialog" @on-submit="doSubmit"></bookmark_dialog>
    </el-dialog>

    <el-dialog v-model="dialogVisible">
      <delete_dialog :delete_id="currentDialogData.bk_id" @on-submit="doDelete"></delete_dialog>
    </el-dialog>

    <el-dialog v-model="createTypeDialogVisible">
      <createType_dialog @on-update="doUpdate"></createType_dialog>
    </el-dialog> -->

    <!-- <el-dialog v-model="typeDialogVisible">
      <bookmarkType_dialog :delete_id="currentDialogData.bk_id" @on-submit="doDelete"></bookmarkType_dialog>
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  get_strategy_list,
  upload_strategy,
  load_strategy,
  unload_strategy,
  start_strategy,
  stop_strategy,
  remove_strategy
} from '../../api/cta_strategy'


type Strategy = {
  strategy_id: string,
  strategy_name: string,
}

const strategy_list = reactive<Strategy[]>([])

const on_list = () => {
  get_strategy_list().then(res => {
    res.data.forEach((item: Strategy, index: number) => {
      strategy_list.push(item)
    })
  })
}

const on_upload = () => {
  upload_strategy().then(res => {

  })
}

const on_load = (strategy_id: string) => {
  load_strategy(strategy_id).then(res => {

  })
}

const on_unload = (strategy_id: string) => {
  unload_strategy(strategy_id).then(res => {

  })
}

const on_start = (strategy_id: string) => {
  start_strategy(strategy_id).then(res => {

  })
}

const on_stop = (strategy_id: string) => {
  stop_strategy(strategy_id).then(res => {

  })
}

const on_remove = (strategy_id: string) => {
  remove_strategy(strategy_id).then(res => {

  })
}


</script>

<style scoped>
</style>