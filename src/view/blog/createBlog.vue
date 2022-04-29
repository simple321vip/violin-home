<template>
  <div class="blog_editer" v-if="isReady">
    <div class="bt_section" :style="btWholeStyle">
      <el-button class="bt-input" @click="contentDialogVisible = true">增加</el-button>
      <el-button class="bt-input" v-for="(value, key) of blogTypes" :key="key" @click="onclickTypeTab(value[0])">
        <el-dropdown trigger="click">
          <el-icon v-show="checkedBlogIndex == value[0]">
            <edit />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogVisible = true">修改</el-dropdown-item>
              <el-dropdown-item @click="btdeleteDialogVisible = true">删除</el-dropdown-item>
              <el-dropdown-item @click="true">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        {{ value[1].btName }}
      </el-button>
    </div>
    <div class="b_section" :style="bWholeStyle">
      <el-button class="bt-input" @click="insertBlog">增加</el-button>
      <el-button class="bt-input" v-for="(blog, index) of blogTypes.get(checkedBlogIndex)?.blogs"
        @click="onclickBlogTab(blog[0])">
        {{ blog[1].title }}
      </el-button>
    </div>
    <div class="c_section">
      <div class="title_style">
        <el-input v-model="((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).title"
          @keyup.enter.native="saveTitle" @blur="saveTitle">
        </el-input>
      </div>
      <div :style="cWholeStyle">
        <md-editor theme="light"
          v-model="((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).content"
          @save="saveContent" :style="{ height: innerHeight }" />
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="修改博客分类名称" width="30%">
      <el-input v-model="(blogTypes.get(checkedBlogIndex) as BlogType).btName"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveType">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="contentDialogVisible" title="新的博客分类" width="30%">
      <el-input v-model="btName">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contentDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="insertBlogType">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="btdeleteDialogVisible" title="删除博客分类" width="30%">
      你正在对 {{ (blogTypes.get(checkedBlogIndex) as BlogType).btName }}
      <el-input v-model="btName" :placeholder="'请输入<' + (blogTypes.get(checkedBlogIndex) as BlogType).btName + '>'">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="btdeleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="insertBlogType">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import { Edit } from "@element-plus/icons-vue";
import 'md-editor-v3/lib/style.css'
import { updateBtName, updateContent, listAll, putBlogType, getContent, putBlog } from '../../api/blog'
import $moment from "moment";

type Blog = {
  bid: string,
  btId: string,
  btName: string,
  title: string,
  blog_prex: string,
  content: string
}

type BlogType = {
  btId: string,
  btName: string,
  blogs: Map<string, Blog>
}
const blogTypes = reactive<Map<string, BlogType>>(new Map())
const dialogVisible = ref(false)
const contentDialogVisible = ref(false)
const btdeleteDialogVisible = ref(false)

let checkedIndex = ref<string>("")
let checkedBlogIndex = ref<string>("")
let isReady = ref(false)

// 関数定義

/**
 * Blog一覧取得
 */
const getTestData = async () => {
  await listAll().then(response => {
    response.data.forEach((element: any) => {
      const blog_type: BlogType = {
        btId: element.btId,
        btName: element.btName,
        blogs: new Map<string, Blog>()
      }
      blogTypes.set(element.btId, blog_type)
      element.blog_list.forEach((item: any) => {
        const blog: Blog = {
          bid: item.bid,
          btId: item.btId,
          btName: item.btName,
          title: item.title,
          blog_prex: item.blog_prex,
          content: item.content
        }
        blog_type.blogs.set(item.bid, blog)
      })
    })
  })
  isReady.value = true
  checkedBlogIndex.value = blogTypes.keys().next().value
  checkedIndex.value = blogTypes.values().next().value.blogs.keys().next().value
}

/**
 * BlogTypeを選べる
 * @param key 
 */
const onclickTypeTab = (key: string) => {
  const bid = <string>blogTypes.get(key)?.blogs.values().next().value.bid
  getContent(bid).then(response => {
    ((blogTypes.get(key) as BlogType).blogs.get(bid) as Blog).content = response.data.content
    checkedBlogIndex.value = key
    checkedIndex.value = bid
  })

}
const onclickBlogTab = (key: string) => {
  checkedIndex.value = key
}
const handleEditBtName = (bt: BlogType) => {
  dialogVisible.value = true
}

/**
 * Blogタイプ名称修正
 */
const saveType = () => {
  const query = {
    btId: checkedBlogIndex.value,
    btName: (blogTypes.get(checkedBlogIndex.value) as BlogType).btName
  }
  updateBtName(query).then(response => {
    dialogVisible.value = false
  })

}
/**
 * Blogタイトル修正
 */
const saveTitle = () => {
  const query = {
    bid: checkedIndex.value,
    title: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).title
  }
  updateContent(query).then(response => {
  })
}
/**
 * Blog内容修正
 */
const saveContent = () => {
  const query = {
    bid: checkedIndex.value,
    content: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).content
  }
  updateContent(query).then(response => {

  })
}
/**
 * ブログ新規作成
 */
const insertBlog = () => {
  const data = {
    btId: checkedBlogIndex.value,
    title: $moment().format("YYYY-MM-DD")
  }
  putBlog(data).then(response => {
    const { bid, title, content } = response.data
    const blog = {
      bid: bid,
      btId: checkedBlogIndex.value,
      btName: "",
      title: title,
      blog_prex: "",
      content: content
    } as Blog
    (blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.set(bid, blog)
    checkedIndex.value = bid
  })
}
// Blogタイプ新規作成用、作成後、リセットする
let btName = ref("")
const insertBlogType = () => {
  const data = {
    btName: btName.value
  }
  putBlogType(data).then(response => {
    const blog_type: BlogType = {
      btId: response.data.btId,
      btName: response.data.btName,
      blogs: new Map<string, Blog>()
    }
    blogTypes.set(response.data.btId, blog_type)
    response.data.blog_list.forEach((item: any) => {
      const blog: Blog = {
        bid: item.bid,
        btId: item.btId,
        btName: item.btName,
        title: item.title,
        blog_prex: item.blog_prex,
        content: item.content
      }
      blog_type.blogs.set(item.bid, blog)
    })
    contentDialogVisible.value = false
    btName.value = ""
  })
}

const deleteBlogType = () => {

}

// Created　段階の関数呼び出す処理
getTestData()


// サイズ調整部分
type WholeStyle = {
  width: string
  height: string
}
let innerHeight = ref("")

const btWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let btWidth = 0.10 * window.innerWidth
btWholeStyle.width = btWidth + 'px'
btWholeStyle.height = window.innerHeight + 'px'
const bWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let bWidth = 0.23 * window.innerWidth
bWholeStyle.width = bWidth + 'px'
const cWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let contentWidth = 0.67 * window.innerWidth
cWholeStyle.width = contentWidth + 'px'
innerHeight.value = (window.innerHeight - 50) + 'px'
onMounted(() => {

})
</script>

<style scoped>
.b_section,
.bt_section,
.c_section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid royalblue;
}



.bt-input {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 0px;
  padding-left: 10px;
  font-size: 15px;
  overflow: hidden;
  height: 50px;
  border-radius: 0px;
  border-right: 0px;
}

.title_style :deep() .el-input__inner {
  height: 50px;
  font-size: 20px;
}

.el-dropdown {
  margin-right: 5px;
}

.blog_editer {
  display: flex;
}

.tab_list {
  display: flex;
  flex-direction: column;
}
</style>