<template>
  <md-editor v-model="text" previewOnly />
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { get_blog } from '../../api/blog'
let text = ref<string>('')
const route = useRoute()
get_blog(route.query).then(response => {
  text.value = response.data.blog_text
})

</script>

<style>
</style>