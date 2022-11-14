<template>
  該当システムのご利用はシステム管理者に許可する必要があります。<br>
  許可がなければ、ユーザー情報を登録しても、システムのご利用はできませんので、ご注意ください。
  <el-form :model="register_form" label-width="120px">

    <el-form-item label="phone_number">
      <el-input v-model="register_form.phone_number" />
    </el-form-item>

    <el-form-item label="auth_code">
      <el-input v-model="register_form.code" />
    </el-form-item>

    <el-form-item label="tenantId">
      <el-input v-model="register_form.tenant_id" :disabled="true" />
    </el-form-item>

    <el-form-item label="account">
      <el-input v-model="register_form.account" :disabled="true" />
    </el-form-item>

    <el-form-item label="token">
      <el-input v-model="register_form.token" :disabled="true" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Register</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router';
import { register_user } from "./../../api/user";
import router from '../../router/index'
import { setTenant, setToken } from '../../utils/auth';

const route = useRoute()
const params = route.query


// use phone number to register user(tenant)
const register_form = reactive({
  phone_number: '',
  code: '',
  tenant_id: params.tenantId as string,
  account: params.account as string,
  token: params.token as string
})

const onSubmit = () => {
  register_user(register_form).then((response) => {

    if (response.status == 200) {
      const tenant = {
        id: params.tenantId,
        account: params.account
      }

      setToken(params.token as string)
      setTenant(tenant)

      const { href } = router.resolve({
        path: '/'
      });
      window.open(href, '_self');
    }
  })
}


</script>
<style scoped>

</style>
