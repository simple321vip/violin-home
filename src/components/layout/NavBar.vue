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
        <el-icon class="dashboard-icon" @click="open">
          <avatar />
        </el-icon>
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
</template>

<script setup lang='ts'>
import CustomPic from "@/components/customPic/index.vue";
import { tenantStore } from '@/store/modules/tenant'
import { settingsStore } from '@/store/modules/settings'
import { Action, ElMessage, ElMessageBox } from "element-plus";

// -- IMPORT --
const useTenantStore = tenantStore()
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --

// -- REF OBJECT --

// -- EVENT DEFINITION
const toPerson = () => {

}
const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

useTenantStore.reflush()

</script>

<style lang="scss" scoped>
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
