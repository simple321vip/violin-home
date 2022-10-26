<template>
  <div class="yuliu"></div>
  <el-card class="box-card">

    <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules" status-icon label-width="120px"
      class="demo-ruleForm">
      <div class="title-container">
        <h3>秘密基地</h3>
      </div>
      <!-- <el-form-item label="用户名" prop="pass">
        <el-input v-model="loginForm.user_id" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户凭证" prop="checkPass">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item> -->
      <p class="tang-pass-qrcode-title">百度网盘扫码登陆<a class="pass-link" :href="qrcode" target="_self">请使用微信扫一扫登录</a></p>
      <!-- <el-button @click="loginWithBaiDu">
        百度App
      </el-button> -->
      <el-avatar :size="28" :src="baiduCloudImage" />
      <el-form-item>
        其他登录方式
        <!-- <el-button type="primary" @click="dologin(ruleFormRef)">login</el-button> -->
      </el-form-item>
    </el-form>
    ------------------------------------------------------------
    <div>
      微信/支付宝
    </div>
  </el-card>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { tenantStore } from '../../store/tenant'
import router from '../../router'
import baiduCloudImage from "../../assets/baiducloud.png"
import config from '../../const/config'


let qrcode = config.BAIDU_CLOUD_URL + config.RESPONSE_TYPE + config.CLIENT_ID + config.REDIRECT_URI + config.SCOPE + config.DEVICE_ID + config.QR_CODE + config.DISPLAY

const tenant = tenantStore()

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
  form.validate((valid: any) => {
    if (valid) {
      tenant.login(loginForm.user_id, loginForm.password).then(res => {
        console.log(1)
        router.push({
          path: '/home'
        })
      })

    } else {
      return false
    }
  })
}



</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
}

.yuliu {
  width: 600px;
  height: 600px;
  background-color: antiquewhite;
}
</style>
