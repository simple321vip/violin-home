<template>
  <el-button @click="openBlogEditer">++++++</el-button>
  <div class="blog_list" v-for="item in data_list">
    <h3 style="cursor: pointer;" @click="openBlog">{{ item.blog_title }}</h3>
    <span style="font-size: 12px;">{{ item.blog_prex }}</span>
  </div>


</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { get_blogs } from '../../api/blog'
import router from '../../router/index'

import { Blog, BlogType } from '../../entity/index'

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

const openBlogEditer = () => {
  const { href } = router.resolve({
    path: '/edit_blog=1'
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