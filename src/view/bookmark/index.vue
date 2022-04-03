<template>
  <div class="dashboard">
    <el-form>
      <el-row>
        <el-col :span="6">
          <!-- <el-form-item>
            <el-autocomplete
              v-model="search_data.drug"
              poper-class="my-autocomplete"
              :fetch-suggestions="query"
              placeholder="xxx"
              label=":"
              :poper-append-to-body="false"
            >
              <template slot-scope="{item}">
                <span class="value">{{ item.value }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>-->
        </el-col>
        <el-col>
          <el-button type="primary" @click="doSearch">检索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-tag class="ml-2 click-icon" type="success">Java</el-tag>
        <el-tag class="ml-2 click-icon" type="success">Xml</el-tag>
        <el-tag class="ml-2 click-icon" type="success">Html</el-tag>
        <el-tag class="ml-2 click-icon" type="success">ddo</el-tag>
        <el-button type="primary" @click="openDialog">添加</el-button>
      </el-row>
    </el-form>
    <div></div>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="index" width="180" />
      <el-table-column prop="type" label="分类" width="180" />
      <el-table-column prop="comment" label="名称" width="180" />
      <el-table-column class="click-icon" prop="url" label="url" />
      <el-table-column class="click-icon" prop label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">反选</el-button>
      <el-button @click="toggleSelection()">清除</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加书签">
      <bookmark_dialog
        :inputdata="currentDialogData"
        @on-concel="closeDialog"
        @on-submit="doSubmit"
      ></bookmark_dialog>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { query } from '../../service/search'
import { search_bookmark, put_bookmark } from '../../api/bookmark'
import bookmark_dialog from './dialog.vue'
import type { ElTable } from 'element-plus'

// 定义书签格式
type Bookmark = {
  id: number,
  type: String,
  comment: String,
  url: String
}

let dialogFormVisible = ref(false)
const search_data = reactive({
  drug: '1'
})
// 响应式table数据
const tableData = reactive<Bookmark[]>([])
// 响应式dialog数据
const currentDialogData = reactive<Bookmark>({
  id: -1,
  type: '',
  comment: '',
  url: ''
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Bookmark[]>([])
const toggleSelection = (rows?: Bookmark[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}

const handleEdit = (index: number, bookmark: Bookmark) => {
  Object.assign(currentDialogData, bookmark)
  openDialog()
}

const handleDelete = (index: number, bookmark: Bookmark) => {

}

const handleSelectionChange = (val: Bookmark[]) => {
  console.log(val)
  multipleSelection.value = val
}

const doSearch = () => {
  tableData.splice(0, tableData.length)
  search_bookmark(1).then(response => {
    console.log(response.data)
    response.data.forEach((item: Bookmark, index: number) => {
      const row = {
        id: index + 1,
        type: item.type,
        comment: item.comment,
        url: item.url
      }
      tableData.push(row)
    })
  })
}
const openDialog = () => {
  dialogFormVisible.value = true
}
const closeDialog = () => {
  dialogFormVisible.value = false
}
const doSubmit = (form: any) => {
  put_bookmark(form).then(response => {

  })
  dialogFormVisible.value = false
}
</script>

<style>
.dashboard {
  background-color: beige;
}
.click-icon {
  cursor: pointer;
}
</style>