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
            本网站不涉及色情，赌博，毒品和政治宗教等内容，暂时为个人学习用途。
            考虑到法律风险，针对有敏感词汇还设有过滤功能，所以暂时不对外提供一切功能。
            <br />
            再次重申，本网站只作为学习网站。。。。。。
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
