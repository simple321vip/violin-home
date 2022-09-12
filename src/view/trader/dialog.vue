<template>
  <div class="strategy_form">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px" class="strategy-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="strategy_name" prop="strategy_name">
        <el-input v-model="ruleForm.strategy_name" placeholder="demo_strategy_symbol" />
      </el-form-item>
      <el-form-item label="vt_symbol" prop="vt_symbol">
        <el-select v-model="ruleForm.vt_symbol" placeholder="select a vt_symbol">
          <el-option v-for="vt_symbol in store.vt_symbols" :value="vt_symbol" />
        </el-select>
      </el-form-item>
      <el-form-item label="class_name" prop="class_name">
        <el-select v-model="ruleForm.class_name" placeholder="select a class_name">
          <el-option v-for="name in store.class_names" :value="name" />
        </el-select>
      </el-form-item>
      <el-form-item label="setting:">
      </el-form-item>
      <el-form-item label="" prop="setting">
        <el-select v-model="ruleForm.setting.interval" placeholder="select a interval">
          <el-option label="interval:1DAILY" value=24 />
          <el-option label="interval:4HOUR" value=240 />
          <el-option label="interval:1HOUR" value=60 />
          <el-option label="interval:30MIN" value=30 />
          <el-option label="interval:15MIN" value=15 />
          <el-option label="interval:5MIN" value=5 />
          <el-option label="interval:1MIN" value=1 />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="" prop="name">
        <el-input v-model="ruleForm.name" placeholder="Please input">
          <template #prepend>interval:</template>
        </el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { create_strategy } from '../../api/cta_strategy'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { strategyStore } from '../../store/strategy'

const store = strategyStore()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  strategy_name: '',
  class_name: '',
  vt_symbol: '',
  setting: {
    interval: '',
  },

})

const clear_form = () => {
  ruleForm.strategy_name = ''
  ruleForm.class_name = ''
  ruleForm.vt_symbol = ''
  ruleForm.setting.interval = ''
}
defineExpose({
  clear_form
})


const rules = reactive<FormRules>({
  strategy_name: [
    { required: true, message: 'Please input strategy name', trigger: 'blur' },
    { min: 8, max: 30, message: 'Length should be 8 to 30', trigger: 'blur' },
  ],
  interval: [
    {
      required: true,
      message: 'Please select interval',
      trigger: 'change',
    },
  ],
  class_name: [
    {
      required: true,
      message: 'Please select class_name'
    },
  ],
  vt_symbol: [
    {
      required: true,
      message: 'Please select vt_symbol'
    },
  ],
})
const emit = defineEmits(['on-create'])
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      create_strategy(ruleForm).then(res => {
        emit('on-create')
      })
    } else {
      ElMessage({
        message: h('p', null, [
          h('i', { style: 'color: teal' }, 'error submit!' + fields),
        ]),
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>