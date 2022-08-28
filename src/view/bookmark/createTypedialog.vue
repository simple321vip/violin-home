<template>
  <div class="dashboard">
    <el-input v-model="bookmark_type_name" placeholder="Please input" />
    <!-- <template #footer> -->
    <span class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
    </span>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { put_bookmark_type } from '../../api/bookmark_type'

const bookmark_type_name = ref<String>('')

const emit = defineEmits(['on-update'])
const submit = () => {
  const params = {
    bookmark_type_name: bookmark_type_name.value
  }

  put_bookmark_type(params).then(response => {
    emit('on-update')
    bookmark_type_name.value = ''
  })

}


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