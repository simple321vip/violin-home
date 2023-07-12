<template>
  <div class="ttt">
    <div class="yuliu" :style="style">
    </div>
    <el-card class="box-card">

      <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules" status-icon label-width="120px"
        class="demo-ruleForm">
        <div class="title-container">
          <h3>秘密基地</h3>
        </div>
        <div>
          <el-avatar :size="28" :src="baiduCloudImage" @click="scan(qrcode)" />
        </div>
        <el-form-item>
          其他登录方式暂时还没有哦
        </el-form-item>
      </el-form>
      ------------------------------------------------------------
      <div>
        微信/支付宝
      </div>
    </el-card>
    <div class="footer">
      <span>
        管祥玮的个人网站 ©Copyright 2022-2022
      </span>
      <span @click="openSiteQuery">辽ICP备2022003637号-2</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { tenantStore } from '../../store/modules/tenant'
import router from '../../router'
import baiduCloudImage from "../../assets/baiducloud.png"
import { config, scan } from '../../const/config'


let qrcode = config.BAIDU_CLOUD_URL + config.RESPONSE_TYPE + config.CLIENT_ID + config.REDIRECT_URI + config.SCOPE + config.DEVICE_ID + config.QR_CODE + config.DISPLAY

const useTenantStore = tenantStore()

const ruleFormRef = ref<FormInstance>()
const loginForm = reactive({
  user_id: '',
  password: ''
})

const validateUserName = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error("请输入的用户名"))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error("请输入密码"))
  } else {
    callback()
  }
}
const loginRules = reactive({
  user_id: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})


const dologin = (form: any) => {

  if (!form)
    return
  // form.validate((valid: any) => {
  //   if (valid) {
  //     useTenantStore.login(loginForm.user_id, loginForm.password).then(res => {
  //       console.log(1)
  //       router.push({
  //         path: '/home'
  //       })
  //     })

  //   } else {
  //     return false
  //   }
  // })
}

const openSiteQuery = () => {
  let href = 'https://beian.miit.gov.cn/#/Integrated/index'
  window.open(href, '_blank')
}

const style = reactive({} as any)
style.width = window.innerWidth * 0.7 + 'px'

</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.ttt {
  display: flex;
  flex-direction: column;
}

.yuliu {
  /* width: 600px; */
  height: 300px;
  float: left;
  /* background-color: antiquewhite; */
  background: url('../../assets/have_a_nice_day.jpeg') center top no-repeat;
  background-size: cover;
}
</style>
