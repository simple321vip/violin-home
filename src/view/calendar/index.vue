<template>
  <el-calendar v-model="value" v-if="isComponentActive" v-loading="isComponentLoading"
    element-loading-text="主人，别着急我在努力加载中^_^">
    <template #dateCell="{ data }" lo>
      <div class="date-cell-holiday" v-if="Object.keys(holidays).includes(toLocalDate(data.date))">
        <span style="color: red;" @click="onclick(data.date)"> {{ data.date.getDate() }}</span><br>
        <span>{{ holidays[toLocalDate(data.date)] }}</span>
      </div>
      <div class="date-cell" v-else>
        <span style="color: red;" v-if="data.date.getDay() == 0 || data.date.getDay() == 6" @click="onclick(data.date)">
          {{
            data.date.getDate()
          }}</span>
        <span v-else @click="onclick(data.date)"> {{ data.date.getDate() }}</span>
      </div>
      <div class="date-cell-event" v-if="Object.keys(eventDataObject).includes(toLocalDate(data.date))">
        <span>{{ eventDataObject[toLocalDate(data.date)] }}</span>
      </div>
    </template>
  </el-calendar>
  <span>待办事项</span>
  <el-table :data="eventDataList">
    <el-table-column property="event_date" label="Date" width="150" />
    <el-table-column property="title" label="title" width="200" />
    <el-table-column property="event_info" label="eventInfo" />
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="待办事项">
    <el-form :model="form">
      <el-form-item label="日期" :label-width="formLabelWidth">
        <span>{{ form.event_date }}</span>
      </el-form-item>
      <el-form-item label="title" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="eventInfo" :label-width="formLabelWidth">
        <el-input v-model="form.event_info" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="alert" :label-width="formLabelWidth">
        <el-checkbox-group v-model="checkedalerts" :min="0" :max="2">
          <el-checkbox v-for="city in alerts" :key="city" :label="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { get_holiday } from '@/service/calendar'
import { toLocalDate } from '@/utils/date'
import { get_event, put_event } from "@/api/calendar"
import { Event } from "@/entity/index"
import { settingsStore } from "@/store/modules/settings";


// -- IMPORT --
const useSettingsStore = settingsStore()

// -- REACTIVE OBJECT --
const holidays = reactive<any>({})

const eventDataList = reactive<Event[]>([])
const eventDataObject = reactive<any>({})
const form = reactive({
  event_date: '',
  title: '',
  event_info: '',
})
// -- REF OBJECT --
const value = ref(new Date())
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const isComponentActive = ref(false)
const isComponentLoading = ref(true)

const checkedalerts = ref([])
const alerts = ['email', 'messageBox', '手机短信', '微信通知']

// -- EVENT DEFINITION
const onclick = (date: Date) => {
  form.event_date = toLocalDate(date)
  dialogFormVisible.value = true
}

const confirm = async () => {
  await put_event(form).then(() => {

  })
  dialogFormVisible.value = false
  handleCommand('refresh')
}

const handleCommand = (command: string) => {
  if (command === 'refresh') {
    useSettingsStore.settings.isLoading = true
    useSettingsStore.settings.isRouterAlive = false
    nextTick(() => {
      useSettingsStore.settings.isRouterAlive = true
      useSettingsStore.settings.isLoading = false
    })
  } else if (command === 'closeOther') {
    // useSettingsStore.closeOther()
  } else {
    // useSettingsStore.closeLeftOrRight(command)
  }
}

/**
 * AUTO INVOKE FUNCTION
 */
onMounted(async () => {
  await get_holiday().then((resp) => {
    Object.keys(resp.data).forEach(element => {
      holidays[element] = resp.data[element]
    })
  })
  await get_event().then((response) => {
    eventDataList.length = 0
    response.data.forEach((record: Event) => {
      eventDataList.push(record)
      eventDataObject[record.event_date] = record.title
    })
  })
  isComponentActive.value = true
  isComponentLoading.value = false
})


</script>

<style lang="scss" scoped>
.date-cell-holiday {
  background: #dfd;
}

.date-cell-event {
  background: yellow;
}
</style>