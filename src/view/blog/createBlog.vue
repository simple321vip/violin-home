<template>
  <div class="blog_editer" v-if="isReady">


    <div class="side_bar">
      <el-button class="operate_button" v-if="collapsible[0] == 1" :icon="CaretRight" @click="collapsible[0] = 0"
        size="small" />
      <el-button class="operate_button" v-if="collapsible[0] == 0" :icon="CaretLeft" @click="collapsible[0] = 1"
        size="small" />
    </div>
    <div class="bt_section" :style="btWholeStyle" v-show="collapsible[0] == 0">
      <div class="item_header">
        <el-button class="item_header_button" @click="blogTypeCreateDialogVisible = true">增加一个分类</el-button>
      </div>

      <draggable :list="blogTypes" ghost-class="ghost" handle=".move" animation="300" :force-fallback="true" itemKey=""
        filter=".forbid" chosen-class="chosenClass" :fallback-class="true" :fallback-on-body="true"
        :touch-start-threshold="50" :fallback-tolerance="50" @start="onStart" @end="onEnd" group="group1"
        :move="onMove">
        <template #item="{ element }">
          <div class="item">
            <label class="move"></label>
            <p class="bt-input" @click="onclickTypeTab(element.order)">{{ element.btName }}</p>
            <div>
              <el-button class="operate_button" :icon="Setting" size="small" v-show="checkedBlogIndex == element.order"
                @click="handleCreateBlogType()" />
            </div>
          </div>
        </template>
      </draggable>
    </div>


    <div class="side_bar">
      <el-button class="operate_button" v-if="collapsible[1] == 1" :icon="CaretRight" @click="collapsible[1] = 0"
        size="small" />
      <el-button class="operate_button" v-if="collapsible[1] == 0" :icon="CaretLeft" @click="collapsible[1] = 1"
        size="small" />
    </div>
    <div class="b_section" :style="bWholeStyle" v-show="collapsible[1] == 0">
      <div class="item_header">
        <el-button class="item_header_button" :disabled="isclicked" @click="insertBlog">增加一个博客</el-button>
      </div>
      <draggable :list="blogTypes[checkedBlogIndex].blogs" ghost-class="ghost" handle=".move" animation="300"
        :force-fallback="true" itemKey="" filter=".forbid" chosen-class="chosenClass" :fallback-class="true"
        :fallback-on-body="true" :touch-start-threshold="50" :fallback-tolerance="50" @start="onStart" @end="onEnd"
        group="group2" :move="onMove">
        <template #item="{ element }">
          <div class="item">
            <label class="move"></label>
            <p class="bt-input" @click="onclickBlogTab(element)">{{ element.title }}</p>
            <div>
              <el-button class="operate_button" v-show="checkedIndex == element.order" :icon="Edit" size="small"
                @click="deleteDialogVisible = true" />
            </div>
          </div>
        </template>
      </draggable>
    </div>


    <div class="c_section">
      <div class="title_style">
        <el-input v-model="blogTypes[checkedBlogIndex].blogs[checkedIndex].title" @keyup.enter.native="saveTitle"
          @blur="saveTitle">
        </el-input>
        <div style="width: 60px;">
          <span v-if="!updated">已保存</span>
          <span v-if="updated">更新中</span>
        </div>
      </div>
      <div :style="cWholeStyle">
        <md-editor theme="light" v-model="blogTypes[checkedBlogIndex].blogs[checkedIndex].content" @save="saveContent"
          :style="{ height: innerHeight }" />
      </div>
    </div>

    <!-- create blogtype dialog -->
    <el-dialog v-model="blogTypeCreateDialogVisible" title="新的博客分类" width="30%">
      <el-input v-model="btName">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="blogTypeCreateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="insertBlogType">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- edit and delete blogtype dialog -->
    <el-dialog v-model="blogTypeEditDialogVisible" title="博客分类 Setting" width="30%">
      你正在对「 {{ blogTypes[checkedBlogIndex].btName }}」进行操作
      <div style="display: flex; margin: 10px">
        <el-button type="primary" @click="saveBlogType()">修改</el-button>
        <el-input v-model="btName">
        </el-input>
      </div>
      <div style="display: flex; margin: 10px">
        <el-button type="danger" @click="deleteBlogType()">删除</el-button>
        <el-input v-model="deleteBtName" :placeholder="'请输入 ' + blogTypes[checkedBlogIndex].btName + ' 进行删除'">
        </el-input>
      </div>
    </el-dialog>

    <!-- delete blog dialog -->
    <el-dialog v-model="deleteDialogVisible" title="删除博客" width="30%">
      你正在对 {{ blogTypes[checkedBlogIndex].blogs[checkedIndex].title }}
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
import $moment from "moment"
import MdEditor from 'md-editor-v3'
import { Edit, CaretRight, CaretLeft, Setting } from "@element-plus/icons-vue"
import 'md-editor-v3/lib/style.css'
import {
  updateBtName,
  updateContent,
  listAll,
  putBlogType,
  removeBlogType,
  getContent,
  putBlog,
  deleteContent,
  sortBlogTypes,
  sortBlogs
} from '../../api/blog'
import draggable from "vuedraggable"

type Blog = {
  bid: string,
  btId: string,
  btName: string,
  title: string,
  blog_prex: string,
  autosave_control: string,
  content: string,
  order: number
}

type BlogType = {
  btId: string,
  btName: string,
  blogs: Blog[],
  order: number
}
const blogTypes = reactive<BlogType[]>([])
const blogTypeCreateDialogVisible = ref(false)
const blogTypeEditDialogVisible = ref(false)
const deleteDialogVisible = ref(false)

let checkedIndex = ref<number>(0)
let checkedBlogIndex = ref<number>(0)
let isclicked = ref(false)
let isReady = ref(false)
let updated = ref(false)
let startTime = reactive($moment());
// tmp btName for create, edit, delete
let btName = ref("")
let deleteBtName = ref("")

/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组 
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
const state = reactive({
  modules: {
    group1: [

    ]
  },
})

// 関数定義
/**
 * Blog一覧取得
 */
const getTestData = async () => {
  await listAll().then(response => {
    response.data.sort((x: any, y: any) => { x.order - y.order })
    response.data.forEach((element: any) => {
      const blog_type: BlogType = {
        btId: element.btId,
        btName: element.btName,
        blogs: [],
        order: element.order
      }
      element.blog_list.forEach((item: any) => {
        const blog: Blog = {
          bid: item.bid,
          btId: item.btId,
          btName: item.btName,
          title: item.title,
          blog_prex: item.blog_prex,
          autosave_control: item.autosave_control,
          content: item.content,
          order: item.order
        }
        blog_type.blogs.push(blog)
      })
      blogTypes.push(blog_type)
    })
  })
  isReady.value = true
  checkedBlogIndex.value = blogTypes[0].order
  checkedIndex.value = 0
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
        saveContent()
      }
    }, 1000)

  })
}

/**
 * BlogTypeを選べる
 * @param order
 */
const onclickTypeTab = (order: number) => {
  checkedBlogIndex.value = order
  const bid = blogTypes[order].blogs[0].bid
  getContent(bid).then(response => {
    blogTypes[order].blogs[0].content = response.data.content
    checkedBlogIndex.value = order
    checkedIndex.value = 0
  })
}

const onclickBlogTab = (blog: Blog) => {
  checkedIndex.value = blog.order
  getContent(blog.bid).then(response => {
    blogTypes[checkedBlogIndex.value].blogs[checkedIndex.value].content = response.data.content
    checkedIndex.value = blog.order
  }).catch(() => {
    checkedIndex.value = blog.order
  })
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
    content: blogTypes[checkedBlogIndex.value].blogs[checkedIndex.value].content
  }
  updateContent(query).then(response => {
    if (response.status == 200) {
      updated.value = false
      // blogTypes.get(checkedBlogIndex.value)?.blogs.get(checkedIndex.value)?.content =
    }
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
    title: blogTypes[checkedBlogIndex.value].blogs[checkedIndex.value].title
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
    title: $moment().format("YYYY-MM-DD"),
    order: blogTypes[checkedBlogIndex.value].blogs.length
  }
  putBlog(data).then(response => {
    const { bid, btid, title, content, order, autosave_control } = response.data
    const blog = {
      bid: bid,
      btId: btid,
      btName: "",
      title: title,
      blog_prex: "",
      content: content,
      autosave_control: autosave_control,
      order: order
    } as Blog

    blogTypes[checkedBlogIndex.value].blogs.push(blog)
    checkedIndex.value = bid
    isclicked.value = false
  })
}

/**
 * ブログ削除
 */
const deleteBlog = () => {
  if (btName.value == "删除") {
    let delete_data = {
      btId: blogTypes[checkedBlogIndex.value].btId
    }
    deleteContent(blogTypes[checkedBlogIndex.value].blogs[checkedIndex.value].bid, delete_data).then(response => {
      if (response.data.process_status) {
        const deleteKey = checkedIndex.value
        checkedIndex.value = blogTypes[checkedBlogIndex.value].blogs.keys().next().value
        blogTypes[checkedBlogIndex.value].blogs.splice(checkedIndex.value, 1)
        deleteDialogVisible.value = false
      }
      deleteDialogVisible.value = false
      btName.value = ""
    }).catch(() => {
      deleteDialogVisible.value = false
      btName.value = ""
    })

  }
}

const handleCreateBlogType = () => {
  btName.value = blogTypes[checkedBlogIndex.value].btName
  blogTypeEditDialogVisible.value = true
}

/**
 * create blogType
 */
const insertBlogType = () => {
  if (btName.value == "") {
    blogTypeCreateDialogVisible.value = false
    return
  }
  const data = {
    btName: btName.value,
    order: blogTypes.length
  }
  putBlogType(data).then(response => {
    const blog_type: BlogType = {
      btId: response.data.btId,
      btName: response.data.btName,
      blogs: [],
      order: response.data.order
    }
    response.data.blog_list.forEach((item: any) => {
      const blog: Blog = {
        bid: item.bid,
        btId: item.btId,
        btName: item.btName,
        title: item.title,
        blog_prex: item.blog_prex,
        autosave_control: item.autosave_control,
        content: item.content,
        order: item.order
      }
      blog_type.blogs.push(blog)
    })
    blogTypes.push(blog_type)
    checkedBlogIndex.value = response.data.order
    checkedIndex.value = blog_type.blogs[0].order
    blogTypeCreateDialogVisible.value = false
    btName.value = ""
  })
}

/**
 * edit blogType
 */
const saveBlogType = () => {
  if (btName.value == "") {
    blogTypeEditDialogVisible.value = false
    return
  }
  const query = {
    btId: blogTypes[checkedBlogIndex.value].btId,
    btName: btName.value,
  }
  updateBtName(query).then(() => {
    console.log(blogTypes)
    blogTypes[checkedBlogIndex.value].btName = btName.value
    blogTypeEditDialogVisible.value = false
    btName.value = ""
  }).catch(() => {
    btName.value = ""
    blogTypeEditDialogVisible.value = false
  })
}

const deleteBlogType = () => {
  if (deleteBtName.value == blogTypes[checkedBlogIndex.value].btName) {
    const data = {
      btId: checkedBlogIndex.value
    }
    removeBlogType(data).then((response) => {
      blogTypes.length = 0
      response.data.sort((x: any, y: any) => { x.order - y.order })
      response.data.forEach((element: any) => {
        const blog_type: BlogType = {
          btId: element.btId,
          btName: element.btName,
          blogs: [],
          order: element.order
        }
        element.blog_list.forEach((item: any) => {
          const blog: Blog = {
            bid: item.bid,
            btId: item.btId,
            btName: item.btName,
            title: item.title,
            blog_prex: item.blog_prex,
            autosave_control: item.autosave_control,
            content: item.content,
            order: item.order
          }
          blog_type.blogs.push(blog)
        })
        blogTypes.push(blog_type)
      })
      checkedBlogIndex.value = 0
      checkedIndex.value = 0
      blogTypeEditDialogVisible.value = false
    })
  } else {
    blogTypeEditDialogVisible.value = false
  }
  deleteBtName.value = ""
}

const sortBlogType = () => {

  const sortData: BlogType[] = []
  blogTypes.forEach((blogType: BlogType) => {
    sortData.push({
      btId: blogType.btId,
      btName: blogType.btName,
      blogs: [],
      order: blogType.order
    })
  })

  sortBlogTypes(sortData).then(response => {

  }).catch()
}

const sortBlog = () => {

  const sortData: any[] = []
  blogTypes[checkedBlogIndex.value].blogs.forEach((blog: Blog) => {
    sortData.push({
      bid: blog.btId,
      order: blog.order
    })
  })

  sortBlogs(sortData, blogTypes[checkedBlogIndex.value].btId).then(response => {

  }).catch()
}

// Created　段階の関数呼び出す処理
getTestData()


// サイズ調整部分
//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  blogTypes.forEach((blogType, index) => {
    blogType.order = index
  })
  sortBlogType()
}

const onMove = (e: any) => {
  //不允许停靠
  if (e.relatedContext.element.disabledPark == true) return false;
  return true;
}

type WholeStyle = any
const btWholeStyle = reactive<WholeStyle>({} as WholeStyle)
const bWholeStyle = reactive<WholeStyle>({} as WholeStyle)
const cWholeStyle = reactive<WholeStyle>({} as WholeStyle)
const collapsible = reactive([0, 0])
const whole_width = reactive([0.15, 0.15])
let innerHeight = ref("")
const selected_style = {
  "background-color": "#EBEBEB"
}

const unselected_style = {
  "background-color": "#FFFFFF"
}

const setup_size = () => {
  btWholeStyle.width = whole_width[0] * window.innerWidth + 'px'
  bWholeStyle.width = whole_width[1] * window.innerWidth + 'px'
  cWholeStyle.width = ((1 - whole_width[0] - whole_width[1]) * window.innerWidth - 44) + 'px'
  innerHeight.value = (window.innerHeight - 50) + 'px'
  btWholeStyle.height = window.innerHeight + 'px'
}
setup_size()

watch(collapsible, async () => {
  if (collapsible[0] == 0) {
    whole_width[0] = 0.15
  } else {
    whole_width[0] = 0
  }
  if (collapsible[1] == 0) {
    whole_width[1] = 0.15
  } else {
    whole_width[1] = 0
  }
  btWholeStyle.width = whole_width[0] * window.innerWidth + 'px'
  bWholeStyle.width = whole_width[1] * window.innerWidth + 'px'
  cWholeStyle.width = ((1 - whole_width[0] - whole_width[1]) * window.innerWidth - 44) + 'px'
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

.blog_editer {
  display: flex;
}

.item_header {
  display: flex;
  align-items: center;
  border-top: 1px solid royalblue;
  border-bottom: 1px solid royalblue;
}

.item_header_button {
  border: 0px;
  height: 50px;
}

.side_bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20px;
}

.item {
  padding: 0px;
  margin-top: 3px;
  margin-bottom: 3px;
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  user-select: none;
  border: 0px;
  border-bottom: 1px;
}

.item>label {
  color: #333;
  height: 50px;
  width: 15px;
}

.item>label:hover {
  cursor: move;
}

.item>div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border: 0px;
}

.operate_button {
  border-color: #FFFFFF;
  width: 20px;
  border: 0px;
}

.bt-input {
  margin: 0px;
  border: 0px;
  padding-left: 0px;
  padding-right: 5px;
  font-size: 15px;
  overflow: hidden;
  line-height: 50px;
  height: 50px;
  width: 100px;
  flex-grow: 1;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bt-input:hover {
  background-color: #EBEBEB;
}

.item>p {
  padding: 6px 10px;
  color: rgb(142, 51, 51);
}

.chosenClass {
  opacity: 1;
  border: solid 1px red;
}

.ghost {
  border: solid 1px rgb(19, 41, 239) !important;
}
</style>