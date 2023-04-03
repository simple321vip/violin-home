<template>
  <div class="page">
    <div class="gva-card-box">
      <div class="gva-card gva-top-card">
        <div class="gva-top-card-left">
          <div class="gva-top-card-left-title">我的主人，我们又见面了，我有什么能帮助你么^_^</div>
          <div class="gva-top-card-left-dot">{{ weatherInfo }}</div>
          <div class="gva-top-card-left-rows">
            <el-row>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="dashboard-icon">
                    <sort />
                  </el-icon>
                  wiki数量 ({{ statistics.wiki_count }})
                </div>
              </el-col>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="dashboard-icon">
                    <avatar />
                  </el-icon>
                  bookmark数量 ({{ statistics.bookmark_count }})
                </div>
              </el-col>
              <!-- <el-col :span="8" :xs="24" :sm="8">
                <div class="flex-center">
                  <el-icon class="dashboard-icon">
                    <comment />
                  </el-icon>
                  好评率 (99%)
                </div>
              </el-col> -->
            </el-row>
          </div>
          <div class="gva-top-card-left-item">
            <div>
              {{ time }}
            </div>
          </div>
          <div class="gva-top-card-left-item">
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
        </div>
        <img src="../../assets/dashboard.png" class="gva-top-card-right">
      </div>
    </div>
    <div class="gva-card-box">
      <el-card class="gva-card quick-entrance">
        <template #header>
          <div class="card-header">
            <span>快捷入口</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="(card, key) in toolCards" :key="key" :span="4" :xs="8" class="quick-entrance-items"
            @click="toTarget(card.name)">
            <div class="quick-entrance-item">
              <div class="quick-entrance-item-icon" :style="{ backgroundColor: card.bg }">
                <el-icon>
                  <component :is="card.icon" :style="{ color: card.color }" />
                </el-icon>
              </div>
              <p>{{ card.label }}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <!-- <div class="quick-entrance-title"></div> -->
    </div>
    <div class="gva-card-box">
      <div class="gva-card">
        <div class="card-header">
          <span>数据统计</span>
        </div>
        <div class="echart-box">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="18">
              <echarts-line />
            </el-col>
            <el-col :xs="24" :sm="6">
              <dashboard-table />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
  <!-- create blogtype dialog -->
  <el-dialog v-model="profileNameCreateDialogVisible" title="发现主人还没有创建新的wiki个人主页, 来创建吧" width="30%"
    @close="onCloseProfileDialog">
    Profile name:
    <el-autocomplete v-model="profileName" :fetch-suggestions="querySearchAsync" />
    <el-input v-model="profileName">
    </el-input>
    <el-descriptions title="你的 wiki 主页将为">
      <el-icon>
        <Link />
      </el-icon>
      <el-descriptions-item>https://www.violin-home.cn/docs#/{{ profileName ? profileName : profileNameText
      }}/</el-descriptions-item>
      <!-- <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item> -->
    </el-descriptions>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloseProfileDialog">取消</el-button>
        <el-button type="primary" @click="onCreateProfile">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import $moment from "moment"
import { Link } from "@element-plus/icons-vue"
import EchartsLine from '@/view/dashboard/dashboardCharts/index.vue'
import DashboardTable from '@/view/dashboard/dashboardTable/index.vue'
import { useRouter } from 'vue-router'
import { useWeatherInfo } from '@/service/weather'
import { countWiki } from "@/api/blog"
import { bookmarks_count } from "@/api/bookmark"
import { get_profileName, create_profile, judge_profile } from "@/api/profile"
import { settingsStore } from "@/store/modules/settings"

// -- IMPORT --
const weatherInfo = useWeatherInfo()
const router = useRouter()
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --

// -- REF OBJECT --
let time = ref<String>($moment().format("YYYY年MM月DD日  HH:mm:ss"));
const profileNameCreateDialogVisible = ref(false)
const profileName = ref<string>()
const profileNameText = ref<string>("{Profile name}")

const statistics = ref({
  wiki_count: 0,
  bookmark_count: 0,
})

const toolCards = ref([
  {
    label: 'Jenkins',
    icon: 'camera',
    name: 'Jenkins',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  },
  {
    label: 'argo-cd',
    icon: 'monitor',
    name: 'argocd',
    color: '#69c0ff',
    bg: 'rgba(92, 219, 211,.3)'
  },
  {
    label: 'wiki',
    icon: 'document',
    name: 'wiki',
    color: '#b37feb',
    bg: 'rgba(185, 192, 255,.3)'
  },
  {
    label: 'scrum',
    icon: 'cpu',
    name: 'scrum',
    color: '#ffd666',
    bg: 'rgba(255, 214, 102,.3)'
  },
  {
    label: 'wiki主页编辑',
    icon: 'document-checked',
    name: 'profile',
    color: '#ff85c0',
    bg: 'rgba(255, 133, 192,.3)'
  },
  {
    label: '关于我们',
    icon: 'user',
    name: 'about',
    color: '#5cdbd3',
    bg: 'rgba(92, 219, 211,.3)'
  }
])


// -- EVENT DEFINITION
const toTarget = (name: string) => {
  // router.push({ name })
  switch (name) {
    case 'Jenkins':
      window.open('https://www.violin-home.cn/jenkins/', '_blank')
      break;
    case 'argocd':
      window.open('https://www.violin-home.cn/argo-cd/', '_blank')
      break;
    case 'wiki':
      window.open('https://www.violin-home.cn/docs#/guan/', '_blank')
      break;
    case 'scrum':
      window.open('https://www.leangoo.com/kanban/board_list?#/home/list', '_blank')
      break;
    case 'profile':
      if (useSettingsStore.settings.profileName) {
        openTag()
        break;
      }
      profileNameCreateDialogVisible.value = true
      break;
  }
}

const onCreateProfile = async () => {

  if (!profileName.value) {
    return
  }

  await create_profile({ name: profileName.value }).then(() => {
    openTag()
  }).finally(() => {
    profileNameCreateDialogVisible.value = false
  })

}

const openTag = () => {
  const { href } = router.resolve({
    path: '/profile/'
  })
  window.open(href, '_blank')
}

const querySearchAsync = async (queryString: string, cb: any) => {
  judge_profile({ name: profileName.value }).then(() => {

  }).then(e => {

  })
}

const onCloseProfileDialog = () => {
  profileName.value = ""
  profileNameCreateDialogVisible.value = false
}

/**
 * AUTO INVOKE FUNCTION
 */
setInterval(() => {
  time.value = $moment().format("YYYY年MM月DD日  HH:mm:ss")
}, 1000)

countWiki().then((resp) => {
  const data = resp.data
  statistics.value.wiki_count = data.count
})
bookmarks_count().then((resp) => {
  const data = resp.data
  statistics.value.bookmark_count = data.count
})
get_profileName().then((resp) => {
  if (resp.data) {
    useSettingsStore.settings.profileName = resp.data.name
  }
})

</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
}

.page {
  background: #f0f2f5;
  padding: 0;

  .gva-card-box {
    padding: 12px 16px;

    &+.gva-card-box {
      padding-top: 0px;
    }
  }

  .gva-card {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 2px;
    height: auto;
    padding: 26px 30px;
    overflow: hidden;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.03);
  }

  .gva-top-card {
    height: 260px;
    @include flex-center;
    justify-content: space-between;
    color: #777;

    &-left {
      height: 100%;
      display: flex;
      flex-direction: column;

      &-title {
        font-size: 22px;
        color: #343844;
      }

      &-dot {
        font-size: 16px;
        color: #6B7687;
        margin-top: 24px;
      }

      &-rows {
        // margin-top: 15px;
        margin-top: 18px;
        color: #6B7687;
        width: 600px;
        align-items: center;
      }

      &-item {
        +.gva-top-card-left-item {
          margin-top: 24px;
        }

        margin-top: 14px;
      }
    }

    &-right {
      height: 600px;
      width: 600px;
      margin-top: 28px;
    }
  }

  ::v-deep(.el-card__header) {
    padding: 0;
    border-bottom: none;
  }

  .card-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
  }

  .quick-entrance-title {
    height: 30px;
    font-size: 22px;
    color: #333;
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .quick-entrance-items {
    @include flex-center;
    justify-content: center;
    text-align: center;
    color: #333;

    .quick-entrance-item {
      padding: 16px 28px;
      margin-top: -16px;
      margin-bottom: -16px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0px 0px 7px 0px rgba(217, 217, 217, 0.55);
      }

      cursor: pointer;
      height: auto;
      text-align: center;

      // align-items: center;
      &-icon {
        width: 50px;
        height: 50px !important;
        border-radius: 8px;
        @include flex-center;
        justify-content: center;
        margin: 0 auto;

        i {
          font-size: 24px;
        }
      }

      p {
        margin-top: 10px;
      }
    }
  }

  .echart-box {
    padding: 14px;
  }
}

.dashboard-icon {
  font-size: 20px;
  color: rgb(85, 160, 248);
  width: 30px;
  height: 30px;
  margin-right: 10px;
  @include flex-center;
}

.flex-center {
  @include flex-center;
}

//小屏幕不显示右侧，将登录框居中
@media (max-width: 750px) {
  .gva-card {
    padding: 20px 10px !important;

    .gva-top-card {
      height: auto;

      &-left {
        &-title {
          font-size: 20px !important;
        }

        &-rows {
          margin-top: 15px;
          align-items: center;
        }
      }

      &-right {
        display: none;
      }
    }

    .gva-middle-card {
      &-item {
        line-height: 20px;
      }
    }

    .dashboard-icon {
      font-size: 18px;
    }
  }
}
</style>