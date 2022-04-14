<template>
  <div class="nav-main">
    当前时间：{{ time }}
    <span>论一个程序员的寂寞与忧伤</span>
    <el-dropdown trigger="click" v-show="user.owner">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>profile</el-dropdown-item>
          <el-dropdown-item @click="dialogVisible = true">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span @click="doLogin" v-show="!user.owner">登录</span>
  </div>
  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>确认你的登出操作么？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doLogout">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import $moment from "moment";
import { reactive, ref } from "vue";
import router from '../../router'
import { useUserStore } from '../../store/user'
// obtain user infomation 
const user = useUserStore()
user.reflush()
const dialogVisible = ref(false)

// show time 
let time = ref<String>($moment().format("YYYY年MM月DD日  HH:mm:ss"));
setInterval(() => {
  time.value = $moment().format("YYYY年MM月DD日  HH:mm:ss");
}, 1000);

// login logout function
const doLogin = () => {
  router.push({
    path: '/login'
  })
}
const doLogout = () => {
  dialogVisible.value = false
  user.logout()
  router.push({
    path: '/home'
  })
}
</script>

<style>
.open_side {
  background: url("../../assets/logo.png") center no-repeat;
  background-size: cover;
}

.nav-main {
  float: right;
}
</style>
