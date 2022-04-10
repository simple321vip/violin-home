<template>
  <div
    class="page_tab"
    @mouseover.native="onOver"
    @mouseleave.native="onLeave"
    @dblclick="editPage(row_key)"
    :style="back_color"
  >
    <div class="input_prex" :style="prex_back_color"></div>
    <el-input
      :id="'input_edit' + row_key"
      class="input_edit"
      v-show="is_edit"
      v-model="page_data.page_name"
      @blur="savePage"
      @keyup.enter="doNothing"
    ></el-input>
    <div :id="'input_show' + row_key" class="input_show" v-show="!is_edit">{{ page_data.page_name }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { update_page } from '../../api/onenote'

type Props = {
  row_key: string,
  checked: boolean,
  page_data: any
}
const props = defineProps<Props>()

let back_color = ref("aliceblue")
let prex_back_color = ref("aliceblue")
let is_edit = ref(false)

watch(props, (newValue, oldValue) => {
  if (props.checked) {
    back_color.value = "background-color: #d0d0d0;"
    prex_back_color.value = "background-color: blueviolet;"
  } else {
    back_color.value = "background-color: white;"
    prex_back_color.value = "background-color: white;"
  }
})
if (props.checked) {
  back_color.value = "background-color: #d0d0d0;"
  prex_back_color.value = "background-color: blueviolet;"
}
const editPage = (row_key: string) => {
  is_edit.value = !is_edit.value
  const inputt: any = document.getElementById("input_edit" + row_key)
  setTimeout(() => inputt.focus())
}
const savePage = () => {
  is_edit.value = !is_edit.value
  const params = {
    page_id: props.page_data.page_id,
    page_name: props.page_data.page_name
  }
  update_page(params).then(response => {

  })
  onLeave()
}
const doNothing = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement).blur()
}
const onOver = (e: any) => {
  if (props.checked)
    return
  is_edit.value ? "" : back_color.value = "background-color: #FDF5E6;"
}
const onLeave = () => {
  if (props.checked)
    return
  is_edit.value ? "" : back_color.value = "background-color: white;"
}
</script>

<style scoped>
.input_prex {
  width: 2px;
  height: 35px;
}
.input_edit,
.input_show {
  margin-left: 5px;
}
.page_tab {
  display: flex;
  align-items: center;
  width: 90px;
  height: 35px;
  padding-left: 15px;
}
.page_title {
  font-size: 14px;
  font-family: "Meiryo", Courier, monospace;
}
</style>