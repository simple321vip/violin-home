<template>
  <div class="4444">
    <el-container>
      <el-aside width="150px">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header
          style="border-bottom-style:solid; border-bottom-width: 0.5px; border-bottom-color:rgba(151, 151, 151, 0.3);">
          <NavBar></NavBar>
        </el-header>
        <el-main>
          <MainApp></MainApp>
        </el-main>
        <el-footer>
          <span>
            小管设计8
            <br />一个执着于小提琴学习的垃圾程序员1
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

console.log(window.innerHeight)
</script>

<style scoped>
/* .el-header,
.el-footer {

  color: rgb(51, 51, 51);
  text-align: center;
  line-height: 60px;
} */
/* 


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
