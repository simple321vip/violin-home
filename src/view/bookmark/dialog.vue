<template>
  <div class="dashboard">
    <el-form :model="form">
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="Java" value="Java" />
          <el-option label="Python" value="Python" />
        </el-select>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.comment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="url" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off" />
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
import { reactive, ref, watch } from 'vue'
const formLabelWidth = '140px'

const form = reactive({
  type: '',
  comment: '',
  url: ''
})

// type Props = {
//   id: number,
//   type: string,
//   comment: string,
//   url: string
// }

// const ttt = defineProps<Props>()
// form.comment = ttt.comment
// form.type = ttt.type
// form.url = ttt.url

const emit = defineEmits(['on-concel', 'on-submit'])
const concel = () => {
  emit('on-concel')
}
const submit = () => {
  emit('on-submit', form)
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