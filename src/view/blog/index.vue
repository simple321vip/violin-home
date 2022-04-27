<template>
  <el-button @click="openBlogEditer">进入博客小作坊</el-button>
  <el-button @click="test">获取博客内容</el-button>
  <el-button @click="test1">新增博客</el-button>
  <el-button @click="test2">更新博客</el-button>
  <el-button @click="test3">削除博客</el-button>

  <div class="blog_list" v-for="item in data_list">
    <h3 style="cursor: pointer;" @click="openBlog">{{ item.title }}</h3>
    <span style="font-size: 12px;">{{ item.blog_prex }}</span>
  </div>


</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { get_blogs, getContent, newBlog, updateContent, deleteContent } from '../../api/blog'
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
    path: '/write'
  });
  window.open(href, '_blank');
}
const test = () => {
  getContent('123456').then(response => {
    console.log(response)
  })
}
const test1 = () => {
  const params = {
    blog_type_id: "2808000",
    title: "dddddddd"
  }
  newBlog(params).then(response => {
    console.log(response)
  })
}
const test2 = () => {
  const params = {
    bid: "22222",
    title: "22222222222",
    content: "dddddddddddddddddddddddddddd"
  }
  updateContent(params).then(response => {
    console.log(response)
  })
}

const test3 = () => {
  deleteContent('22222').then(response => {
    console.log(response)
  })
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