<template>
  <h2>{{ title }}</h2>
  <md-editor v-model="text" previewOnly />
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { getBlog } from '../../api/blogView'
let text = ref<string>('')
let title = ref<string>('')
const route = useRoute()
const params = route.query

const init = () => {
  getBlog(params.bid as string).then(response => {
    text.value = response.data.content
    title.value = response.data.title
  })
}
init()
</script>

<style>

</style>