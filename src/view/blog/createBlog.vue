<template>
  <div class="blog_editer">
    <div class="tab_list">
      <Tab :row_key="item.blog_type_id" :checked="handleCheck(item.blog_type_id)" :tab_text="item.blog_type_name"
        checked_color="" over_color="" leave_color="" @on-click="saveType"
        @click="onclickTypeTab(item.blog_type_id, index)" v-for="(item, index) in data_type_list">
      </Tab>
    </div>
    <div>
      <Tab :row_key="item.blog_type_id" :checked="handleCheck(item.blog_type_id)" :tab_text="item.blog_type_name"
        checked_color="" over_color="" leave_color="" @on-click="saveBlog"
        @click="onclickBlogTab(item.blog_type_id, index)"
        v-for="(item, index) in data_type_list[checkedIndex].blog_list">
      </Tab>
    </div>
    <div>
      <md-editor v-model="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { get_user_blogs } from '../../api/blog'
import { Blog, BlogType } from '../../entity/index'
import { update_blog_type } from '../../api/blog'
import Tab from '../../components/common/Tab.vue'

let text = ref<string>("")
type Tab = {
  id: string
}

let type_tab = reactive<Tab>(<Tab>{
  id: '1'
})
let blog_tab = reactive<Tab>(<Tab>{
  id: '1'
})

const data_type_list = reactive<BlogType[]>([])
let checkedIndex = ref<number>(0)

data_type_list.push({
  blog_type_id: '1',
  blog_type_name: 'xxx',
  blog_list: []
})
// data_type_list[0].blog_list.push({})
data_type_list.push({
  blog_type_id: '2',
  blog_type_name: 'yyy',
  blog_list: []
})
data_type_list.push({
  blog_type_id: '3',
  blog_type_name: 'zzz',
  blog_list: []
})


const blog_type_list = reactive<BlogType[]>([])
get_user_blogs({}).then(response => {

  response.data.forEach((element: any) => {
    const blog_type: BlogType = {
      blog_type_id: element.blog_type_id,
      blog_type_name: element.blog_type_id,
      blog_list: []
    }
    element.blog_list.forEach((item: any) => {
      const blog: Blog = {
        blog_id: item.blog_id,
        blog_type_id: item.blog_type_id,
        blog_type_name: item.blog_type_name,
        blog_title: item.blog_title,
        blog_prex: item.blog_prex
      }
      blog_type.blog_list.push(blog)
    });
    blog_type_list.push(blog_type)
  });
})
const handleCheck = (id: string) => {
  return type_tab.id == id
}
const saveType = (params: any) => {
  console.log(params)
  update_blog_type(1).then(response => {

  })
}
const saveBlog = (params: any) => {
  console.log(params)
  update_blog_type(1).then(response => {

  })
}
const onclickTypeTab = (id: string, index: number) => {
  checkedIndex.value = index
  type_tab.id = id
}
const onclickBlogTab = (id: string, index: number) => {
  blog_tab.id = id
}
</script>


<style>
.blog_editer {
  display: flex;
}

.tab_list {
  display: flex;
  flex-direction: column;
}
</style>