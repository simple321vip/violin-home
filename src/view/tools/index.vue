<template>
  <div class="tools">
    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>-->
    <el-tabs type="border-card">
      <el-tab-pane label="进制转换">
        <frame />
      </el-tab-pane>
      <el-tab-pane label="JSON格式化">JSON格式化</el-tab-pane>
      <el-tab-pane label="SQL格式化">SQL格式化</el-tab-pane>
      <el-tab-pane label="SQL生成器">SQL生成器</el-tab-pane>
      <el-tab-pane label="XML格式化">XML生成器</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import frame from './frame.vue'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>