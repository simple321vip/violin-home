<template>
  <div>
    <el-container>
      <el-aside width="150px">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>
          <NavBar></NavBar>
        </el-header>
        <el-main>
          <MainApp></MainApp>
        </el-main>
        <el-footer>
          <span>
            小管设计
            <br />一个执着于小提琴学习的垃圾程序员
          </span>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
import MainApp from '../layout/MainApp.vue';
import NavBar from "../layout/NavBar.vue";
import SideBar from "../layout/SideBar.vue";
</script>

<style>
/* .el-header,
.el-footer {
  background-color: #b8d1b3;
  color: rgb(51, 51, 51);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* line-height: 450px; */
/* vertical-align: top;
  padding: 5px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
