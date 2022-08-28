<template>
  <div class="bookmark">
    <el-form>
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

    <el-table ref="multipleTableRef" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
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
    </div>

    <el-dialog v-model="dialogFormVisible" title="添加书签">
      <bookmark_dialog :dialog_form="currentDialogData" :operate_code="operate" :types="bookmark_types"
        @on-concel="closeDialog" @on-submit="doSubmit"></bookmark_dialog>
    </el-dialog>

    <el-dialog v-model="dialogVisible">
      <delete_dialog :delete_id="currentDialogData.bk_id" @on-submit="doDelete"></delete_dialog>
    </el-dialog>

    <el-dialog v-model="createTypeDialogVisible">
      <createType_dialog @on-update="doUpdate"></createType_dialog>
    </el-dialog>

    <!-- <el-dialog v-model="typeDialogVisible">
      <bookmarkType_dialog :delete_id="currentDialogData.bk_id" @on-submit="doDelete"></bookmarkType_dialog>
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { search_bookmark, delete_bookmark } from '../../api/bookmark'
import { get_bookmark_type } from '../../api/bookmark_type'
import bookmark_dialog from './dialog.vue'
import bookmarkType_dialog from './Typedialog.vue'
import createType_dialog from './createTypedialog.vue'
import delete_dialog from '../../components/operate/deleteDialog.vue'
import type { ElTable } from 'element-plus'
import { CopyDocument } from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'
import copy from 'copy-to-clipboard';
import { h } from 'vue'
import { useTenantStore } from '../../store/tenant'
// obtain user infomation 
const Tenant = useTenantStore()

// 定义书签格式
type Bookmark = {
  bk_id: string,
  bk_type_id: number,
  bk_type_name: String,
  comment: String,
  url: String
}
// 定义 表单格式
type Searchform = {
  bk_type_ids: number[],
  comment: String
}

// 操作code
let operate = ref<String>('')
const search_form = reactive<Searchform>({
  bk_type_ids: [],
  comment: ''
})
// 响应式table数据
const tableData = reactive<Bookmark[]>([])
// 响应式dialog数据
const currentDialogData = reactive<Bookmark>({
  bk_id: "-1",
  bk_type_id: 1,
  bk_type_name: '未分类',
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

// dialog表示flag
let dialogFormVisible = ref(false)
let dialogVisible = ref(false)
let typeDialogVisible = ref(false)
let createTypeDialogVisible = ref(false)

/* click 自定义 */
const handleManageType = () => {
  typeDialogVisible.value = true
}

/* click 增加 */
const handleAddType = () => {
  createTypeDialogVisible.value = true
}

/* callback after we add bookmark_type */
const doUpdate = () => {
  createTypeDialogVisible.value = false
  doSearch()
  dearchBookmarkType()
}

const bookmark_types = reactive<any[]>([])
const dearchBookmarkType = () => {
  get_bookmark_type().then(response => {
    bookmark_types.splice(0, bookmark_types.length)
    response.data.forEach((element: String) => {
      const item = element.split("|")
      const row = {
        bk_type_id: Number(item[0]),
        bk_type_name: item[1],
        clicked: false
      }
      bookmark_types.push(row)
    })
  })
}


// 操作-》添加
const handleInsert = () => {
  operate.value = '0'
  currentDialogData.bk_id = "-1"
  currentDialogData.bk_type_id = 1
  currentDialogData.bk_type_name = '未分类'
  currentDialogData.comment = ''
  currentDialogData.url = ''
  dialogFormVisible.value = true
}
// 操作-》删除
const handleDelete = (index: number, bookmark: Bookmark) => {
  Object.assign(currentDialogData, bookmark)
  operate.value = '2'
  dialogVisible.value = true
}
// 操作-》编辑
const handleEdit = (index: number, bookmark: Bookmark) => {
  Object.assign(currentDialogData, bookmark)
  operate.value = '1'
  dialogFormVisible.value = true
}

// 
const handleTags = (tag: any) => {
  if (tag.clicked) {
    tag.clicked = false
    search_form.bk_type_ids.forEach(function (item, index, arr) {
      if (item == tag.bk_type_id) {
        arr.splice(index, 1);
      }
    });
  } else {
    tag.clicked = true
    search_form.bk_type_ids.push(tag.bk_type_id)
  }

}
const handleSelectionChange = (val: Bookmark[]) => {
  multipleSelection.value = val
}

const openUrl = (url: string) => {
  window.open(url);
}

const doSearch = () => {
  const param = {
    comment: search_form.comment,
    type_id: search_form.bk_type_ids
  }
  tableData.splice(0, tableData.length)
  search_bookmark(param).then(response => {
    response.data.forEach((item: Bookmark, index: number) => {
      const row = {
        bk_id: item.bk_id,
        bk_type_id: item.bk_type_id,
        bk_type_name: item.bk_type_name,
        comment: item.comment,
        url: item.url
      }
      tableData.push(row)
    })
  })
}

const doDelete = (delete_id: any) => {
  let query = delete_id
  delete_bookmark(query).then(response => {
    dialogVisible.value = false
    doSearch()
  })
}

const closeDialog = () => {
  dialogFormVisible.value = false
}
const doSubmit = () => {
  dialogFormVisible.value = false
  doSearch()
}
// 复制转换成功的数值，并提示 复制成功 信息
const copyNumber = (record: Bookmark) => {
  copy(record.url + "")
  ElNotification({
    title: '',
    message: h('i', { style: 'color: teal' }, '复制成功'),
  })
}
doSearch()
dearchBookmarkType()
</script>

<style scoped>
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

.create_dialog {
  margin: 10px;
}
</style>