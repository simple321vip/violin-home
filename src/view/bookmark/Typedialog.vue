<template>
  <div class="dashboard">
    <el-table ref="multipleTableRef" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="index" label="index" width="80" />
      <el-table-column prop="bk_type_name" label="分类名" width="100" />
      <el-table-column type="selection" width="55" />
      <el-table-column label="修改">
        <template #default="scope">
          <el-button class="click-icon" size="small" @click="handleEditType(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column class="click-icon" prop="删除" label="url">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDeleteType(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-form :model="dialog_form">
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="dialog_form.bk_type_id" placeholder>
          <el-option v-for="(item) in types" :key="item.bk_type_id" :value="item.bk_type_id"
            :label="item.bk_type_name" />
        </el-select>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="dialog_form.comment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="url" :label-width="formLabelWidth">
          <el-input v-model="dialog_form.url" autocomplete="off" />
        </el-form-item>
      </el-form-item>
    </el-form>
    <!-- <template #footer> -->
    <span class="dialog-footer">
      <el-button @click="concel">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </span>
    <!-- </template> -->

    <el-dialog v-model="deleteDialogVisible">
      <delete_dialog :delete_id="currentDialogData.bookmark_type_id" @on-submit="doDeleteType"></delete_dialog>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible">
      <delete_dialog :delete_id="currentDialogData.bookmark_type_id" @on-submit="doEditType"></delete_dialog>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { delete_bookmark_type, post_bookmark_type, get_bookmark_type } from '../../api/bookmark_type'
import type { FormInstance } from 'element-plus'
const formLabelWidth = '140px'

// 定义书签格式
type BookmarkType = {
  bookmark_type_id: string,
  bookmark_type_name: string,
  visiable: boolean,
}

const tableData = reactive<BookmarkType[]>([])
const currentDialogData = reactive<BookmarkType>({
  bookmark_type_id: '',
  bookmark_type_name: '',
  visiable: false,
})

const deleteDialogVisible = ref<Boolean>(false)
const editDialogVisible = ref<Boolean>(false)

const handleDeleteType = (index: number, bookmarkType: BookmarkType) => {
  Object.assign(currentDialogData, bookmarkType)
  deleteDialogVisible.value = true
}

const handleEditType = (index: number, bookmarkType: BookmarkType) => {
  Object.assign(currentDialogData, bookmarkType)
  editDialogVisible.value = true
}

const handleSelectionChange = () => {

}

const doDeleteType = () => {
  delete_bookmark_type(currentDialogData.bookmark_type_id).then(response => {
    deleteDialogVisible.value = false
    doSearchType()
  })
}

const doEditType = () => {
  post_bookmark_type(currentDialogData.bookmark_type_id).then(response => {
    deleteDialogVisible.value = false
    doSearchType()
  })
}

const doSearchType = () => {
  get_bookmark_type().then(response => {
    deleteDialogVisible.value = false
  })
}

type Props = {
  types: any[],
  dialog_form: any,
  operate_code: String
}
const props = defineProps<Props>()

const emit = defineEmits(['on-concel', 'on-submit'])
const concel = () => {
  emit('on-concel')
}
const submit = () => {
  const params = {
    bk_id: props.dialog_form.bk_id,
    bk_type_id: props.dialog_form.bk_type_id,
    comment: props.dialog_form.comment,
    url: props.dialog_form.url,
  }
}

doSearchType()
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>