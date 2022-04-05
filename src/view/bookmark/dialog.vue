<template>
  <div class="dashboard">
    <el-form :model="dialog_form">
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="dialog_form.bk_type_id" placeholder>
          <el-option
            v-for="(item) in types"
            :key="item.bk_type_id"
            :value="item.bk_type_id"
            :label="item.bk_type_name"
          />
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { update_bookmark, put_bookmark } from '../../api/bookmark'
import type { FormInstance } from 'element-plus'
const formLabelWidth = '140px'

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

  if (props.operate_code == '0') {
    put_bookmark(params).then(response => {
      emit('on-submit')
    })
  } else if (props.operate_code == '1') {
    update_bookmark(params).then(response => {
      emit('on-submit')
    })
  } else if (props.operate_code == '2') {
    update_bookmark(params).then(response => {
      emit('on-submit')
    })
  }
}


</script>
<style scoped>.el-button--text {
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