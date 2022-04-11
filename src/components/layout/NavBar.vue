<template>
  <div class="nav-main">
    当前时间：{{ time }}
    <span>论一个程序员的寂寞与忧伤</span>

    <el-button icon="open_side" circle></el-button>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <!-- <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>-->
    </el-dropdown>
    <span @click="doLogin">登录</span>  </div>
</template>

<script setup lang='ts'>
import $moment from "moment";
import { ref } from "vue";
import router from '../../router'

const getTime = () => {
  return $moment().format("YYYY年MM月DD日　HH:mm:ss");
};

let time = ref<String>(getTime());

const timeChange = () => {
  time.value = getTime();
};
setInterval(timeChange, 1000);

const doLogin = () => {
  router.push({
    path: '/login'
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
