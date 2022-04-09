<template>
  <div
    class="section_tab"
    @mouseover.native="onOver"
    @mouseleave.native="onLeave"
    @dblclick="editSection(row_key)"
    :style="back_color"
  >
    <el-input
      :id="'section_edit' + row_key"
      v-show="is_edit"
      v-model="section_data.section_name"
      @blur="saveSection"
      @keyup.enter="doNothing"
    ></el-input>
    <div :id="'section_show' + row_key" v-show="!is_edit">{{ section_data.section_name }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { update_section } from '../../api/onenote'

type Props = {
  row_key: string,
  checked: boolean,
  section_data: any
}
const props = defineProps<Props>()

let back_color = ref("aliceblue")
let is_edit = ref(false)

watch(props, (newValue, oldValue) => {
  if (props.checked) {
    back_color.value = "background-color: #d0d0d0;"
  } else {
    back_color.value = "background-color: white;"
  }
})
if (props.checked) {
  back_color.value = "background-color: #d0d0d0;"
}
const editSection = (row_key: string) => {
  is_edit.value = !is_edit.value
  const inputt: any = document.getElementById("section_edit" + row_key)
  setTimeout(() => inputt.focus())
}
const saveSection = () => {
  is_edit.value = !is_edit.value
  const params = {
    section_id: props.section_data.section_id,
    section_name: props.section_data.section_name
  }
  update_section(params).then(response => {

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
.section_show {
  width: 90px;
}
.section_tab {
  display: flex;
  align-items: center;
  width: 90px;
  height: 35px;
}
.page_title {
  font-size: 14px;
  font-family: "Meiryo", Courier, monospace;
}
</style>