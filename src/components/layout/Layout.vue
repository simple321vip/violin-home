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
            管祥玮的个人网站 ©Copyright 2022-2022
          </span>
          <span @click="openSiteQuery">辽ICP备2022003637号-2</span>
          <div>
            <el-avatar @click="openGithub" src="https://github.githubassets.com/favicons/favicon.svg" />
          </div>

        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
import MainApp from '../layout/MainApp.vue'
import NavBar from "../layout/NavBar.vue"
import SideBar from "../layout/SideBar.vue"

const openGithub = () => {
  let href = 'https://github.com/simple321vip'
  window.open(href, '_blank')
}

const openSiteQuery = () => {
  let href = 'https://beian.miit.gov.cn/#/Integrated/index'
  window.open(href, '_blank')
}


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
.el-footer {
  display: flex;
  justify-content: space-around;
}
</style>
