<template>
  <div class="unit_tag" style="margin-bottom: 10px;">
    <el-tag class="ml-2">from</el-tag>
    <div v-for="(item, index) in colorup.list">
      <el-tag
        class="ml-2"
        :style="item.style"
        style
        @click="onChange(item.binary, item.flg, index)"
      >{{ item.text }}</el-tag>
    </div>
  </div>
  <div class="unit_tag" style="margin-bottom: 10px; border-color: red;">
    <el-tag class="ml-2" style="width: 47.625px">to</el-tag>
    <div v-for="(item, index) in colordown.list">
      <el-tag
        class="ml-2"
        :style="item.style"
        @click="onChange(item.binary, item.flg, index)"
      >{{ item.text }}</el-tag>
    </div>
  </div>
  <div class="test" style="margin-bottom: 10px; border-color: red;" v-for="(index) in total">
    <Cal @on-clickplus="add" :data="t2t" :isPlus="total == index"></Cal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'
import Cal from './cal.vue'
import { from_static_data, to_static_data } from '../../const/const'
// 初期默认只有一个转换框，点击+号时增加一个转换框
let total = ref(1)
const add = () => {
  total.value++
}


// 相应式的 from 和 to，  
const t2t = reactive({
  from: 10,
  to: 2
})

const colorup = reactive(JSON.parse(JSON.stringify(from_static_data)))
colorup.list[2].style = 'background-color: gold'
const colordown = reactive(JSON.parse(JSON.stringify(to_static_data)))
colordown.list[0].style = 'background-color: gold'

//
const onChange = (binary: number, isFrom: boolean, index: number) => {
  if (isFrom) {
    t2t.from = binary
    colorup.list.forEach((value: any, i: any) => {
      if (i == index) {
        value.style = 'background-color: gold'
      } else {
        value.style = 'background-color: #F8F8FF'
      }
    })

  } else {
    t2t.to = binary
    colordown.list.forEach((value: any, i: any) => {
      if (i == index) {
        value.style = 'background-color: gold'
      } else {
        value.style = 'background-color: #F8F8FF'
      }
    })
  }
}
</script>

<style>
.unit_tag {
  display: flex;
}
.test {
  display: flex;
}
.ml-2 {
  margin-right: 10px;
  margin-left: 10px;
}
</style>