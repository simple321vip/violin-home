<template>
  <el-row class="pd-0">
    <el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1" style="z-index:100">
      <!-- <div class="menu-total" @click="totalCollapse">
        <div v-if="isCollapse" class="gvaIcon gvaIcon-arrow-double-right" />
        <div v-else class="gvaIcon gvaIcon-arrow-double-left" />
      </div> -->
    </el-col>
    <el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14" :pull="1">
      <!-- 修改为手机端不显示顶部标签 -->
      <!-- <el-breadcrumb v-show="!isMobile" class="breadcrumb">
        <el-breadcrumb-item
          v-for="item in matched.slice(1,matched.length)"
          :key="item.path"
        >{{ fmtTitle(item.meta.title,route) }}</el-breadcrumb-item>
      </el-breadcrumb> -->
    </el-col>
    <el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9">
      <div class="right-box">
        <!-- <Search /> -->
        <el-dropdown>
          <div class="dp-flex justify-content-center align-items height-full width-full">
            <span class="header-avatar" style="cursor: pointer">
              <CustomPic />
              <span v-show="!useSettingsStore.isMobile" style="margin-left: 5px">{{
                useTenantStore.tenant.account
              }}</span>
              <el-icon>
                <arrow-down />
              </el-icon>
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="dropdown-group">
              <el-dropdown-item>
                <span style="font-weight: 600;">
                  当前角色：{{ useTenantStore.tenant.account }}
                </span>
              </el-dropdown-item>
              <template v-if="useTenantStore.tenant.account">
                <!-- <el-dropdown-item v-for="item in userStore.userInfo.authorities.filter(i=>i.authorityId!==userStore.userInfo.authorityId)" :key="item.authorityId" @click="changeUserAuth(item.authorityId)">
                  <span>
                    切换为：{{ item.authorityName }}
                  </span>
                </el-dropdown-item> -->
              </template>
              <el-dropdown-item icon="avatar" @click="toPerson">个人信息</el-dropdown-item>
              <el-dropdown-item icon="reading-lamp" @click="useTenantStore.logout">登 出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <!-- <div class="nav-main">
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
    <el-dropdown trigger="click" v-show="useTenantStore.tenant.account">
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
  <span @click="doLogin" v-show="!useTenantStore.tenant.account">登录</span> -->
</template>

<script setup lang='ts'>
import { reactive, ref } from "vue"
import $moment from "moment"
import router from '@/router/index'
import CustomPic from "@/components/customPic/index.vue";
import { tenantStore } from '@/store/modules/tenant'
import { settingsStore } from '@/store/modules/settings'
import { logout } from '@/api/user'

// -- IMPORT --
const useTenantStore = tenantStore()
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --

// -- REF OBJECT --
const dialogVisible = ref(false)


// obtain user infomation 

useTenantStore.reflush()

// -- EVENT DEFINITION
const toPerson = () => {

}

const doLogin = () => {
  router.push({
    path: '/login'
  })
}
const doLogout = () => {
  dialogVisible.value = false
  logout(useTenantStore.tenant.id).catch(() => { console.log(1) }).finally(() => {
    useTenantStore.logout()
    router.push({
      path: '/login'
    })
  })
}


// show time 
let time = ref<String>($moment().format("YYYY年MM月DD日  HH:mm:ss"));
setInterval(() => {
  time.value = $moment().format("YYYY年MM月DD日  HH:mm:ss");
}, 1000);


</script>

<style lang="scss" scoped>
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

.right-box {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
}

.header-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
