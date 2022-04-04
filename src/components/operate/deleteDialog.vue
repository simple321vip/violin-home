<template>
  <span class="dialog-footer">
    <el-button @click="concel">取消</el-button>
    <el-button type="primary" @click="submit">确认</el-button>
  </span>
</template>

<script setup lang="ts">

type Props = {
  delete_id: any
}
const props = defineProps<Props>()

const emit = defineEmits(['on-concel', 'on-submit'])
const concel = () => {
  emit('on-concel')
}
const submit = () => {
  emit('on-submit', props.delete_id)
}

</script>

<style>
.dashboard {
  background-color: beige;
}
</style>