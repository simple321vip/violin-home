<template>
  <md-editor v-model="content" @save="onUpdateContent" />
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import {
  get_profile,
  update_profile
} from '../../api/profile'


let content = ref<string>('')
let lastUpdateDatetime = ref<string>('')
const route = useRoute()
const params = route.query


const onUpdateContent = async () => {
  await update_profile({ content: content.value }).then(resp => {
    lastUpdateDatetime.value = resp.data.updateDatetime
  }).catch(() => {

  })
}


const onGetProfile = async () => {
  await get_profile().then(resp => {
    content.value = resp.data.content
    lastUpdateDatetime.value = resp.data.updateDatetime
  }).catch(() => {

  })
}

onGetProfile()

</script>

<style></style>