<template>
  <div class="nav-main">
    <div style="width: 800px;">
      <div>
        当前时间：{{ time }}
      </div>
      <div>
        期货交易时间&nbsp
        <el-icon color="yellow">
          <Sunrise />
        </el-icon>&nbsp 9:00-11:30 &nbsp
        <el-icon color="gold">
          <Sunny />
        </el-icon>&nbsp 13:30-15:00 &nbsp
        <el-icon color="blue">
          <Moon />
        </el-icon>&nbsp 21:00-23:00
      </div>
    </div>
    <el-dropdown trigger="click" v-show="tenant.account">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>profile</el-dropdown-item>
          <el-dropdown-item @click="dialogVisible = true">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  <span @click="doLogin" v-show="!tenant.account">登录</span>
</template>

<script setup lang='ts'>
import $moment from "moment";
import { reactive, ref } from "vue";
import router from '../../router'
import { useTenantStore } from '../../store/tenant'
import { logout } from '../../api/user'
// obtain user infomation 
const tenant = useTenantStore()
tenant.reflush()
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
  logout(tenant.id).catch(() => { console.log(1) }).finally(() => {
    tenant.logout()
    router.push({
      path: '/login'
    })
  })
}
</script>

<style>
.open_side {
  background: url("../../assets/logo.png") center no-repeat;
  background-size: cover;
}

.nav-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: bisque; */
}
</style>
