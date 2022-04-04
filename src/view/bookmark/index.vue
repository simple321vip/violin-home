<template>
  <div class="dashboard">
    <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <!-- <el-autocomplete
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
            </el-autocomplete>-->
          </el-form-item>
        </el-col>
        <el-col>
          <el-button type="primary" @click="doSearch('')">检索</el-button>
          <el-button type="primary" @click="handleInsert">添加</el-button>
        </el-col>
      </el-row>
      <div class="tag_list">
        <el-tag
          class="ml-2 click-icon"
          type="success"
          v-for="(item) in bookmark_types"
          @click="doSearch(item.id)"
        >{{ item.type }}</el-tag>
      </div>
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
      <el-table-column prop="bk_type_name" label="分类" width="180" />
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
        :dialog_form="currentDialogData"
        :operate_code="operate"
        :types="bookmark_types"
        @on-concel="closeDialog"
        @on-submit="doSubmit"
      ></bookmark_dialog>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { search_bookmark } from '../../api/bookmark'
import { bookmark_type } from '../../api/master'
import bookmark_dialog from './dialog.vue'
import type { ElTable } from 'element-plus'


const bookmark_types = reactive<any[]>([])
bookmark_type().then(response => {
  response.data.forEach((element: String) => {
    const item = element.split("|")
    const row = {
      bk_type_id: item[0],
      bk_type_name: item[1]
    }
    bookmark_types.push(row)
  })
})

// 定义书签格式
type Bookmark = {
  id: number,
  bk_type_id: number,
  bk_type_name: String,
  comment: String,
  url: String
}

// dialog表示flag
let dialogFormVisible = ref(false)
// 操作code
let operate = ref<String>('')
const search_data = reactive({
  drug: '1'
})
// 响应式table数据
const tableData = reactive<Bookmark[]>([])
// 响应式dialog数据
const currentDialogData = reactive<Bookmark>({
  id: 0,
  bk_type_id: 0,
  bk_type_name: '',
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


const handleInsert = () => {
  operate.value = '0'
  // currentDialogData
  dialogFormVisible.value = true
}
const handleDelete = (index: number, bookmark: Bookmark) => {
  operate.value = '2'
  dialogFormVisible.value = true
}
const handleEdit = (index: number, bookmark: Bookmark) => {
  Object.assign(currentDialogData, bookmark)
  operate.value = '1'
  dialogFormVisible.value = true
}

const handleSelectionChange = (val: Bookmark[]) => {
  console.log(val)
  multipleSelection.value = val
}


const doSearch = (type_id: String) => {
  console.log(type_id)
  const param = {
    type_id: type_id
  }
  tableData.splice(0, tableData.length)
  search_bookmark(param).then(response => {
    response.data.forEach((item: Bookmark, index: number) => {
      console.log(item)
      const row = {
        id: index + 1,
        bk_type_id: item.bk_type_id,
        bk_type_name: item.bk_type_name,
        comment: item.comment,
        url: item.url
      }
      tableData.push(row)
    })
  })
}

const closeDialog = () => {
  dialogFormVisible.value = false
}
const doSubmit = (form: any) => {
  dialogFormVisible.value = false
}
</script>

<style>
/* .dashboard {
  background-color: beige;
} */
.tag_list {
  display: flex;
  border-top: 1px solid rgba(151, 151, 151, 0.3);
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
}
.click-icon {
  width: 40px;
  margin: 10px;
  cursor: pointer;
}
</style>