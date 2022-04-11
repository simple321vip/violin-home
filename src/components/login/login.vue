<template>
  <div class="yuliu"></div>
  <el-card class="box-card">
    <el-form ref="ruleFormRef" :model="userForm" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="pass">
        <el-input v-model="userForm.user_id" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户凭证" prop="checkPass">
        <el-input v-model="userForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dologin">login</el-button>
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
import { authorize } from '../../api/user';

const userForm = reactive({
  user_id: '',
  password: ''
})


const dologin = (form: FormInstance | undefined) => {

  if (!form) return
  form.validate((valid) => {
    if (valid) {
      let validForm = {
      }
      authorize(validForm).then(response => {

      })
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
