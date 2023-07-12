<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="关键字搜索">
      <el-col :span="7">
        <el-input v-model="form.key_word" />
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="10">
        <span>分类搜索</span>
        <el-select v-model="form.btId" placeholder="选择分类">
          <el-option v-for="item in btNameList" :key="item.btId" :label="item.btName" :value="item.btId" />
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="创作时间">
      <el-col :span="7">
        <el-date-picker v-model="form.start_day" type="date" placeholder="开始时间" style="width: 100%" />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="7">
        <el-time-picker v-model="form.end_day" placeholder="结束时间" style="width: 100%" />
      </el-col>
      <el-col :span="6" style="text-align: center;">
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <el-button @click="openBlogEditer">创作</el-button>
  <el-button @click="publishbyBids">重新发布Wiki</el-button>
  <el-button @click="publishProfile">重新发布profile</el-button>

  <div class="blog_list" v-for="item in data_list">
    <h3 style="cursor: pointer; width: min-content;white-space:nowrap" @click="openBlog(item.bid)">{{ item.title }}</h3>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <p style="font-size: 12px; height: 16px;line-height: 16px;overflow: hidden;text-overflow: ellipsis;">{{
        item.content
      }}</p>
      <el-button size="small" type="success" @click="publishbyBid(item.bid)">重新发布
      </el-button>
    </div>
    <!-- <span style="font-size: 12px;">{{ item.blog_prex }}</span> -->
  </div>
  <div class="page_style">
    <!-- <el-pagination small layout="prev, pager, next" :total="50" /> -->
    <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import { reactive } from 'vue'
import { getBlogs, getBtName, publish, publishAll } from '../../api/blogView'
import { publish_profile } from '../../api/profile'
import router from '../../router/index'

// -- INTERFACE OR TYPE DEFINITION --
interface Blog {
  bid: string
  btId: string
  btName: string
  title: string
  blog_prex: string
  content: string
}
interface Blog_Type {
  btId: string
  btName: string
}

// -- REACTIVE OBJECT --
const form = reactive({
  key_word: '',
  btId: '',
  start_day: '',
  end_day: '',
  page_number: 1,
  page_size: 5,
  total: 1
})
const data_list = reactive<Blog[]>([])
const btNameList = reactive<Blog_Type[]>([])

// -- EVENT DEFINITION
const onSearch = () => {
  getBlogs(form).then(response => {
    data_list.splice(0, data_list.length);
    response.data.forEach((item: Blog) => {
      data_list.push(item)
    })
  })
}

const openBlog = (bid: string) => {
  const { href } = router.resolve({
    path: '/view',
    query: {
      bid: bid
    }
  });
  window.open(href, '_blank');
}

const openBlogEditer = () => {
  const { href } = router.resolve({
    path: '/write/'
  });
  window.open(href, '_blank');
}

const publishbyBids = () => {
  publishAll()
}

const publishProfile = () => {
  publish_profile()
}

const publishbyBid = (bid: string) => {
  publish(bid)
}

/**
 * AUTO INVOKE FUNCTION
 */
(() => {

  getBlogs(form).then(response => {
    response.data.forEach((item: Blog) => {
      data_list.push(item)
    })
  })
  getBtName().then(response => {
    btNameList.push({ btId: "", btName: "选择分类" })
    response.data.forEach((item: any) => {
      const bts = {
        btId: item.btId,
        btName: item.btName
      }
      btNameList.push(bts)
    })
  })

})()
</script>

<style>
.blog_list {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  padding-top: 10px;
  padding-bottom: 10px;
}

.page_style {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>