<template>
  <div class="section_tab" @mouseover.native="onOver" @mouseleave.native="onLeave" @dblclick="editSection"
    :style="back_color">
    <el-input :id="'tab_edit' + row_key" v-show="is_edit" v-model="tab_text" @blur="clickTap" @keyup.enter="doNothing">
    </el-input>
    <div :id="'tab_show' + row_key" v-show="!is_edit">{{ tab_text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type Props = {
  row_key: string,
  checked: boolean,
  checked_color: string,
  over_color: string,
  leave_color: string,
  tab_text: string
}
const props = defineProps<Props>()

const color = {
  checked_color: props.checked_color.length == 0 ? "grey" : props.checked_color,
  over_color: props.over_color.length == 0 ? "#FDF5E6" : props.over_color,
  leave_color: props.leave_color.length == 0 ? "white" : props.leave_color
}

let back_color = ref("white")
let is_edit = ref(false)

watch(props, () => {
  if (props.checked) {
    back_color.value = "background-color: " + color.checked_color + ";"
  } else {
    back_color.value = "background-color: " + color.leave_color + ";"
  }
})
if (props.checked) {
  back_color.value = "background-color: " + color.checked_color + ";"
}
const editSection = () => {
  is_edit.value = !is_edit.value
  const inputElement: any = document.getElementById("section_edit" + props.row_key)
  setTimeout(() => inputElement.focus())
}
const doNothing = (e: KeyboardEvent) => {
  (e.target as HTMLInputElement).blur()
}
const onOver = () => {
  if (props.checked)
    return
  is_edit.value ? "" : back_color.value = "background-color: " + color.over_color + ";"
}
const onLeave = () => {
  if (props.checked)
    return
  is_edit.value ? "" : back_color.value = "background-color: " + color.leave_color + ";"
}
const emit = defineEmits(['on-click'])
const clickTap = () => {
  is_edit.value = !is_edit.value
  const params = {
    id: props.row_key,
    name: props.tab_text
  }
  emit('on-click', params)
  onLeave()
}
</script>

<style scoped>
.tab_show {
  width: 90px;
}

.section_tab {
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