<template>
  <div class="blog_editer" v-if="isReady">
    <div class="bt_section">
      <el-button>增加</el-button>
      <el-button class="bts" v-for="(value, key) of blogTypes" :key="key" @click="onclickBlogTab(value[0])">
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
    <div class="b_section">
      <el-button @click="insertBlogType">增加</el-button>
      <el-button v-for="(blog, index) of blogTypes.get(checkedBlogIndex)?.blogs" @click="onclickTypeTab(blog[0])">
        {{ blog[1].title }}
      </el-button>
    </div>
    <div>
      <md-editor theme="light" v-model="blog.content" @save="saveContent" />
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
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import { Edit } from "@element-plus/icons-vue";
import 'md-editor-v3/lib/style.css'
import { Blog, BlogType } from '../../entity/index'
import { updateBtName, updateContent, listAll, insert_blog_type } from '../../api/blog'

// const MD_SETTING = () => {
//   return {
//     tools: [{ title: 'bold' }]
//   }
// }

const blogTypes = reactive<Map<string, BlogType>>(new Map())
const blog = reactive<Blog>({} as Blog)
let bid = ref("")
const dialogVisible = ref(false)

let checkedIndex = ref<string>("")
let checkedBlogIndex = ref<string>("")
let isReady = ref(false)
const getTestData = async () => {
  await listAll().then(response => {
    console.log(response)
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
    console.log(blogTypes)
  })
  isReady.value = true
  checkedBlogIndex.value = blogTypes.keys().next().value
}
getTestData()
// watch(blogTypes, (newValue, oldValue) => {
//   console.log(newValue, '新值', oldValue, '旧值')
// }, { deep: true })
const onclickTypeTab = (key: string) => {
  checkedIndex.value = key
}
const onclickBlogTab = (key: string) => {
  checkedBlogIndex.value = key
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
    content: blog.content
  }
  updateContent(query).then(response => {

  })
}
const insertBlogType = () => {
  dialogVisible.value = true
}

</script>

<style scoped>
.b_section {
  display: flex;
  flex-direction: column;
  width: 80px;
}

.bts {
  margin-left: 0px;
  padding-left: 0px;

}

.el-dropdown {
  margin-right: 5px;
}

.bt_section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80px;
}

.blog_editer {
  display: flex;
}

.tab_list {
  display: flex;
  flex-direction: column;
}
</style>