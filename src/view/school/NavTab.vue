<template>
  <div
    class="nav_tab"
    style="display: flex;"
    @mouseover.native="onOver"
    @mouseleave.native="onLeave"
  >
    <div class="nav_before" :style="nav_back_color"></div>
    <el-button :id="'input_edit' + row_key" class="nav_button">{{ nav_name }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';


type Props = {
  row_key: number,
  checked: boolean,
  nav_name: string
}
const props = defineProps<Props>()
let nav_back_color = ref("blueviolet")
watch(props, (newValue, oldValue) => {
  if (props.checked) {
    nav_back_color.value = "background-color: blueviolet;"
  } else {
    nav_back_color.value = "background-color: white;"
  }
})
if (props.checked) {
  nav_back_color.value = "background-color: blueviolet;"
}

const onOver = (e: any) => {
  if (props.checked)
    return
  nav_back_color.value = "background-color: #FDF5E6;"
}
const onLeave = () => {
  if (props.checked)
    return
  nav_back_color.value = "background-color: white;"
}
</script>

<style scoped>
.nav_before {
  background-color: white;
  width: 5px;
  height: 40px;
}
.nav_button {
  border-radius: 0px;
  width: 50px;
  height: 40px;
}
</style>