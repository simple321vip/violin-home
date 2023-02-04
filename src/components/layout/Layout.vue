<template>
  <div class="homeWrap">
    <el-container class="main_container">
      <el-aside width="180px">
        <SideBar></SideBar>
      </el-aside>
      <el-container style="margin-left: 180px;">
        <el-header>
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
import { settingsStore } from "@/store/modules/settings"

// -- IMPORT --
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --

// -- REF OBJECT --

// -- EVENT DEFINITION
const iniPage = () => {
  const screenWidth = document.body.clientWidth
  if (screenWidth < 1000) {
    useSettingsStore.settings.isMobile = true
    // isSider.value = false
    // isCollaps.value = true
  } else if (screenWidth >= 1000 && screenWidth < 1200) {
    useSettingsStore.settings.isMobile = false
    // isSider.value = false
    // isCollaps.value = true
  } else {
    useSettingsStore.settings.isMobile = false
    // isSider.value = true
    // isCollaps.value = false
  }
}

const openGithub = () => {
  let href = 'https://github.com/simple321vip'
  window.open(href, '_blank')
}

const openSiteQuery = () => {
  let href = 'https://beian.miit.gov.cn/#/Integrated/index'
  window.open(href, '_blank')
}

/**
 * AUTO INVOKE FUNCTION
 */
iniPage()

</script>

<style scoped>
.el-header {
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(151, 151, 151, 0.3);
}

.el-main {
  padding: 16px;
  overflow: hidden;
  height: 100%;
}

.el-aside {
  margin-left: -10px;
  background: #191a23;
  position: fixed;
}

.el-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.main_container {
  /* height: 100%; */
}

.homeWrap {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
