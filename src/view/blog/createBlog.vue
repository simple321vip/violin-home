<template>
  <div class="blog_editer" v-if="isReady">
    <div class="bt_section" :style="btWholeStyle">
      <el-button class="bt-input" @click="contentDialogVisible = true">增加一个分类</el-button>
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
      <el-button class="bt-input" :disabled="isclicked" @click="insertBlog">增加一个博客</el-button>
      <el-button class="bt-input" v-for="(blog, index) of blogTypes.get(checkedBlogIndex)?.blogs"
        @click="onclickBlogTab(blog[0])">
        <el-dropdown trigger="click">
          <el-icon v-show="checkedIndex == blog[0]">
            <edit />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="deleteDialogVisible = true">删除</el-dropdown-item>
              <el-dropdown-item>顶置</el-dropdown-item>
              <el-dropdown-item @click="true">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        {{ blog[1].title }}
      </el-button>
    </div>
    <div class="c_section">
      <div class="title_style">
        <el-input v-model="((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).title">
        </el-input>
        <div style="width: 60px;">
          <span v-if="!updated">已保存</span>
          <span v-if="updated">更新中</span>
        </div>
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
          <el-button type="primary" @click="deleteBlogType">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="deleteDialogVisible" title="删除博客" width="30%">
      你正在对 {{ ((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).title }}
      <el-input v-model="btName" :placeholder="'请输入<删除>'">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteBlog">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import $moment from "moment";
import MdEditor from 'md-editor-v3'
import { Edit } from "@element-plus/icons-vue";
import 'md-editor-v3/lib/style.css'
import { updateBtName, updateContent, listAll, putBlogType, removeBlogType, getContent, putBlog, deleteContent } from '../../api/blog'

type Blog = {
  bid: string,
  btId: string,
  btName: string,
  title: string,
  blog_prex: string,
  autosave_control: string,
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
const deleteDialogVisible = ref(false)

let checkedIndex = ref<string>("")
let checkedBlogIndex = ref<string>("")
let isclicked = ref(false)
let isReady = ref(false)
let updated = ref(false)
let startTime = reactive($moment());


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
      element.blog_list.forEach((item: any) => {
        const blog: Blog = {
          bid: item.bid,
          btId: item.btId,
          btName: item.btName,
          title: item.title,
          blog_prex: item.blog_prex,
          autosave_control: item.autosave_control,
          content: item.content
        }
        blog_type.blogs.set(item.bid, blog)
      })
      blogTypes.set(element.btId, blog_type)
    })
  })
  isReady.value = true
  checkedBlogIndex.value = blogTypes.keys().next().value
  checkedIndex.value = blogTypes.values().next().value.blogs.keys().next().value
  // TODO 需要优化部分
  /**
   * 延迟执行一秒
   * 获取当前时间，current
   * 获取上一次修改时间，startTime
   * 
   */
  watch(blogTypes, (newVal, oldVal) => {
    let current = $moment() // 获取当前时间，current 09:00:00 09:00:00.500
    const tmp = startTime // 获取开始时间，将值赋给tmp 8:30:00 09:00:00
    startTime = current // 更新开始时间为当前 09:00:00 09:00:00.500
    setTimeout(() => {
      if ($moment(current).diff($moment(tmp), 'seconds') >= 1) {
        console.log(current)
        console.log(startTime)
        saveContent()
      }
    }, 1000)

  })
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
  getContent(key).then(response => {
    ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).content = response.data.content

  })
}
const handleEditBtName = (bt: BlogType) => {
  dialogVisible.value = true
}

/**
 * Blog内容修正
 */
const saveContent = () => {
  if (updated.value) {
    return
  }
  updated.value = true
  const query = {
    bid: checkedIndex.value,
    content: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).content
  }
  updateContent(query).then(response => {
    if (response.status == 200) {
      updated.value = false
      // blogTypes.get(checkedBlogIndex.value)?.blogs.get(checkedIndex.value)?.content = 
    }
  })
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
  if (updated.value) {
    return
  }
  updated.value = true
  const query = {
    bid: checkedIndex.value,
    title: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).title
  }
  updateContent(query).then(response => {
    updated.value = false
  })
}
/**
 * ブログ新規作成
 */
const insertBlog = () => {
  isclicked.value = true
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
    isclicked.value = false
  })
}
/**
 * ブログ削除 
 */
const deleteBlog = () => {
  if (btName.value == "删除") {
    deleteContent(checkedIndex.value).then(response => {
      if (response.status == 200) {
        const deleteKey = checkedIndex.value
        checkedIndex.value = blogTypes.get(checkedBlogIndex.value)?.blogs.keys().next().value
        blogTypes.get(checkedBlogIndex.value)?.blogs.delete(deleteKey)
        deleteDialogVisible.value = false
      }
    })
    btName.value = ""
  }

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
    response.data.blog_list.forEach((item: any) => {
      const blog: Blog = {
        bid: item.bid,
        btId: item.btId,
        btName: item.btName,
        title: item.title,
        blog_prex: item.blog_prex,
        autosave_control: item.autosave_control,
        content: item.content
      }
      blog_type.blogs.set(item.bid, blog)
    })
    blogTypes.set(response.data.btId, blog_type)
    checkedBlogIndex.value = response.data.btId
    checkedIndex.value = blog_type.blogs.keys().next().value
    contentDialogVisible.value = false
    btName.value = ""
  })
}

const deleteBlogType = () => {
  if (btName.value == (blogTypes.get(checkedBlogIndex.value) as BlogType).btName) {
    const data = {
      btId: checkedBlogIndex.value
    }
    removeBlogType(data).then((response) => {
      if (response.status == 200) {
        blogTypes.delete(checkedBlogIndex.value)
        checkedBlogIndex.value = blogTypes.keys().next().value
        checkedIndex.value = blogTypes.values().next().value.blogs.keys().next().value
      } else {

      }
      btdeleteDialogVisible.value = false
    })
    btName.value = ""
  } else {

  }


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
  border-left: 0px;
  border-top: 1px solid royalblue;
  border-bottom: 1px solid royalblue;
}

.title_style {
  display: flex;
}

.title_style :deep() .el-input__inner {
  flex-direction: row;
  height: 50px;
  font-size: 20px;
  border-right: 0px;
  border-left: 0px;
  border-radius: 0px;
  border-top: 1px solid royalblue;
  border-bottom: 1px solid royalblue;
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