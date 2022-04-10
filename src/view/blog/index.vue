<template>
  <div class="blog_list" v-for="item in data_list">
    <span style="cursor: pointer;" @click="openBlog">{{ item.blog_title }}</span>
    <span style="font-size: 12px;">{{ item.blog_prex }}</span>
  </div>
  <!-- <md-editor v-model="text" previewOnly /> -->
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { reactive, ref } from 'vue';
import { get_blogs } from '../../api/blog'
import router from '../../router/index'


type Blog = {
  blog_id: number,
  blog_type_id: number,
  blog_type_name: string,
  blog_title: string,
  blog_prex: string
}

const data_list = reactive<Blog[]>([])

const query = () => {
  get_blogs(1).then(response => {
    response.data.forEach((item: Blog) => {
      data_list.push(item)
    });
  })
}
query()

let text = ref<string>('')
text.value = "开始吧肿瘤"


const openBlog = () => {
  const { href } = router.resolve({
    path: '/blog=1'
  });
  window.open(href, '_blank');
}

</script>

<style>
.blog_list {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>