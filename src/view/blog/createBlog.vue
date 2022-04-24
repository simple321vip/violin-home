<template>
  <div class="blog_editer">
    <div class="tab_list">
      <Tab :row_key="item.btId" :checked="handleCheck(item.btId)" :tab_text="item.btName" checked_color="" over_color=""
        leave_color="" @on-click="saveType" @click="onclickTypeTab(item.btId, index)"
        v-for="(item, index) in blog_type_list">
      </Tab>
    </div>
    <div>
      <Tab :row_key="item.bid" :checked="handleCheck(item.bid)" :tab_text="item.title" checked_color="" over_color=""
        leave_color="" @on-click="saveTitle" @click="onclickBlogTab(item.bid, index)"
        v-for="(item, index) in blog_type_list[checkedIndex].blog_list">
      </Tab>
    </div>
    <div>
      <md-editor v-model="blog_type_list[checkedIndex].blog_list[checkedBlogIndex].content" @save="saveContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { Blog, BlogType } from '../../entity/index'
import { updateBtName, updateContent, insert_blog_type, listAll } from '../../api/blog'
import Tab from '../../components/common/Tab.vue'

let text = ref<string>("")
type Tab = {
  id: string
}

let type_tab = reactive<Tab>(<Tab>{
  id: '1'
})
let bid = ref("")

let checkedIndex = ref<number>(0)
let checkedBlogIndex = ref<number>(0)

const blog_type_list = reactive<BlogType[]>([])
listAll().then(response => {
  console.log(response)
  response.data.forEach((element: any) => {
    const blog_type: BlogType = {
      btId: element.btId,
      btName: element.btName,
      blog_list: []
    }
    element.blog_list.forEach((item: any) => {
      const blog: Blog = {
        bid: item.bid,
        btId: item.btId,
        btName: item.btName,
        title: item.title,
        blog_prex: item.blog_prex,
        content: item.content
      }
      blog_type.blog_list.push(blog)
    });
    blog_type_list.push(blog_type)
  });
  bid.value = blog_type_list[0].blog_list[0].bid
  text.value = blog_type_list[0].blog_list[0].content
}).then(() => {
  if (blog_type_list.length == 0) {
    const data = {
      blog_type_name: '未分类'
    }
    insert_blog_type(data).then(response => {
      if (response.data) {
        blog_type_list.push({
          btId: response.data.btId,
          btName: response.data.btNmae,
          blog_list: []
        })
      }
    })
  }
})
const handleCheck = (id: string) => {
  return type_tab.id == id
}
const saveType = (params: any) => {
  const query = {
    btId: params.id,
    btName: params.name
  }
  updateBtName(query).then(response => {

  })
}
const saveTitle = (params: any) => {
  const query = {
    bid: params.id,
    title: params.name
  }
  updateContent(query).then(response => {

  })
}
const saveContent = () => {
  const query = {
    bid: bid.value,
    content: text.value
  }
  updateContent(query).then(response => {

  })
}
const onclickTypeTab = (id: string, index: number) => {
  checkedIndex.value = index
  type_tab.id = id
}
const onclickBlogTab = (id: string, index: number) => {
  bid.value = id
  checkedBlogIndex.value = index
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