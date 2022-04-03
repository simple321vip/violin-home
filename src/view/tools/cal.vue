<template>
  <div style="display: flex; align-items:center;">
    <el-input
      class="text_input"
      v-model="input.in"
      v-on:input="handle(data.from, data.to)"
      :maxlength="20"
      placeholder="请输入"
    />
    <el-icon :size="10" style="margin-left: 10px;">
      <Right />
    </el-icon>
    <div class="text_output">
      <span>{{ input.out }}</span>
      <el-icon :size="20" @click="copyNumber" class="click-icon">
        <CopyDocument />
      </el-icon>
    </div>

    <el-tag
      class="ml-2 click-icon"
      v-show="isPlus"
      type="success"
      @click="clickPlus"
      :data-clipboard-text="input.out"
    >+</el-tag>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument, Right } from "@element-plus/icons-vue";
import { reactive } from 'vue'
import copy from 'copy-to-clipboard';
import { h } from 'vue'
import { ElNotification } from 'element-plus'

// 从父组件接受参数
type Props = {
  data: {
    from: number,
    to: number
  },
  isPlus: boolean
}
const tt = defineProps<Props>()

// 对输入框进行响应式
let input = reactive({
  in: '',
  out: ''
})

// 进制转换控制器
const handle = (from: number, to: number) => {
  if (from == 10) {
    convert10to(input.in, to)
  }
  if (to == 10) {
    input.out = parseInt(input.in, from) + ""
  }
}

// 进制转换函数1
const convert10to = (value: number | string, binary: number) => {
  if (value == '' || value == undefined) {
    input.out = ''
    return
  }
  let space = ' '
  // if (false == false) {
  //   space = ''
  // }
  const tmp = Number(value).toString(binary)
  let firstByte = tmp.length > 3 ? tmp.substring(0, 4) : tmp.substring(0, tmp.length)
  for (let a = 4; a < tmp.length; a = a + 4) {
    firstByte = tmp.substring(a, a + 4) + space + firstByte
  }
  input.out = firstByte
}

// 复制转换成功的数值，并提示 复制成功 信息
const copyNumber = () => {
  copy(input.out)
  ElNotification({
    title: '',
    message: h('i', { style: 'color: teal' }, '复制成功'),
  })
}

// 通知父组件增加一行，并提示 增加成功 信息
const emit = defineEmits(['on-clickplus'])
const clickPlus = () => {
  emit('on-clickplus')
  ElNotification({
    title: '',
    message: h('i', { style: 'color: teal' }, '增加成功'),
  })
}
</script>

<style scoped>
.text_input {
  width: 300px;
  font-size: 12px;
}
.text_output {
  width: 300px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid rgba(151, 151, 151, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
span {
  font-size: 12px;
}
.click-icon {
  cursor: pointer;
}
</style>