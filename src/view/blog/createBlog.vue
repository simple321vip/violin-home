<template>
  <div class="blog_editer" v-if="isReady">
    <div class="bt_section" :style="btWholeStyle">
      <el-button @click="insertBlogType">增加</el-button>
      <el-button class="bts" v-for="(value, key) of blogTypes" :key="key" @click="onclickTypeTab(value[0])">
        <el-dropdown trigger="click">
          <el-icon>
            <edit />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEditBtName(value[1])">修改</el-dropdown-item>
              <el-dropdown-item @click="true">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        {{ value[1].btName }}
      </el-button>
    </div>
    <div class="b_section" :style="bWholeStyle">
      <el-button @click="insertBlog">增加</el-button>
      <el-button v-for="(blog, index) of blogTypes.get(checkedBlogIndex)?.blogs" @click="onclickBlogTab(blog[0])">
        {{ blog[1].title }}
      </el-button>
    </div>
    <div :style="cWholeStyle">
      <md-editor theme="light"
        v-model="((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).content"
        @save="saveContent" />
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-input v-model="(blogTypes.get(checkedBlogIndex) as BlogType).btName"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveType">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="contentDialogVisible" title="Tips" width="30%">
      <el-input v-model="((blogTypes.get(checkedBlogIndex) as BlogType).blogs.get(checkedIndex) as Blog).title">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contentDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveTitle">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import { Edit } from "@element-plus/icons-vue";
import 'md-editor-v3/lib/style.css'
import { updateBtName, updateContent, listAll, insert_blog_type, getContent, newBlog } from '../../api/blog'
import $moment from "moment";

// const MD_SETTING = () => {
//   return {
//     tools: [{ title: 'bold' }]
//   }
// }
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

let checkedIndex = ref<string>("")
let checkedBlogIndex = ref<string>("")
let isReady = ref(false)
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
  console.log(checkedIndex.value)
}
getTestData()
// watch(blogTypes, (newValue, oldValue) => {
//   console.log(newValue, '新值', oldValue, '旧值')
// }, { deep: true })
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

const saveType = () => {
  const query = {
    btId: checkedBlogIndex.value,
    btName: (blogTypes.get(checkedBlogIndex.value) as BlogType).btName
  }
  updateBtName(query).then(response => {
    dialogVisible.value = false
  })

}
const saveTitle = () => {
  const query = {
    bid: checkedIndex.value,
    title: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).title
  }
  updateContent(query).then(response => {
    contentDialogVisible.value = false
  })
}
const saveContent = () => {
  const query = {
    bid: checkedIndex.value,
    content: ((blogTypes.get(checkedBlogIndex.value) as BlogType).blogs.get(checkedIndex.value) as Blog).content
  }
  updateContent(query).then(response => {

  })
}
const insertBlogType = () => {
  dialogVisible.value = true
}
const insertBlog = () => {
  const data = {
    btId: checkedBlogIndex.value,
    title: $moment().format("YYYY-MM-DD")
  }
  newBlog(data).then(response => {
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
console.log(window.innerWidth)
type WholeStyle = {
  width: string
}
const btWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let btWidth = 0.10 * window.innerWidth
btWholeStyle.width = btWidth + 'px'
const bWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let bWidth = 0.23 * window.innerWidth
bWholeStyle.width = bWidth + 'px'
const cWholeStyle = reactive<WholeStyle>({} as WholeStyle)
let contentWidth = 0.67 * window.innerWidth
cWholeStyle.width = contentWidth + 'px'
</script>

<style scoped>
.b_section {
  display: flex;
  flex-direction: column;
  width: 100px;
}

.bts {
  margin-left: 0px;
  padding-left: 0px;

}

.el-button {
  font-size: 15px;
}

.el-dropdown {
  margin-right: 5px;
}

.bt_section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
}

.blog_editer {
  display: flex;
}

.tab_list {
  display: flex;
  flex-direction: column;
}
</style>