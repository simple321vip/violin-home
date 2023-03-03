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
        <el-dropdown class="item">
          <div class="dp-flex justify-content-center align-items height-full width-full">
            <el-button v-show="!useSettingsStore.isMobile" type="success" round>appStatus</el-button>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="dropdown-group">
              <el-dropdown-item v-for="status in appStatus">
                <el-icon v-if="status.status" color="green">
                  <CircleCheck />
                </el-icon>
                <el-icon v-if="!status.status" color="red">
                  <Warning />
                </el-icon>
                {{ status.appName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-badge :value="messageCount" class="item">
          <el-button round @click="drawer = true">
            <template #icon>
              <el-icon>
                <Message />
              </el-icon>
              <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                <span>站内信呢</span>
                <div v-for="msg in messageList">

                </div>
              </el-drawer>
            </template>
          </el-button>
        </el-badge>
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
import { Message } from "@element-plus/icons-vue"
import { reactive, ref } from "vue";

// -- IMPORT --
const useTenantStore = tenantStore()
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --
const appStatus = reactive([
  {
    appName: "wiki",
    status: true,
  },
  {
    appName: "bookmark",
    status: true,
  },
  {
    appName: "calendar",
    status: false,
  },
])

// -- REF OBJECT --
const messageCount = ref()
const drawer = ref(false)
const messageList = reactive<any[]>([
  {
    title: "过期通知",
    type: "",
    message: "尊敬的用户，你的账号余额已不足，请充值",
    Unread: true,
  }
])

// -- EVENT DEFINITION
const toPerson = () => {
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

.item {
  margin-top: 5px;
  margin-right: 30px;
}

.header-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
