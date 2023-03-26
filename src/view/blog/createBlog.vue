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
        :touch-start-threshold="50" :fallback-tolerance="50" @start="onStartBlogType" @end="onSortWikiType" group="group1"
        :move="onMove">
        <template #item="{ element }">
          <div class="item">
            <label class="move"></label>
            <p class="bt-input" @click="onclickTypeTab(element)">{{ element.btName }}</p>
            <div>
              <el-button class="operate_button" :icon="Setting" size="small" v-show="showWikiTypeIcon(element)"
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
        <el-button class="item_header_button" :disabled="isclicked" @click="onCreateWiki">增加一个博客</el-button>
      </div>
      <draggable :list="checkedWikiType.blogs" ghost-class="ghost" handle=".move" animation="300" :force-fallback="true"
        itemKey="" filter=".forbid" chosen-class="chosenClass" :fallback-class="true" :fallback-on-body="true"
        :touch-start-threshold="50" :fallback-tolerance="50" @start="onStartBlog" @end="onSortWiki" group="group2"
        :move="onMove">
        <template #item="{ element }">
          <div class="item">
            <label class="move"></label>
            <p class="bt-input" @click="onclickBlogTab(element)">{{ element.title }}</p>
            <div>
              <el-button class="operate_button" v-show="showWikiIcon(element)" :icon="Delete" size="small"
                @click="deleteDialogVisible = true" />
            </div>
          </div>
        </template>
      </draggable>
    </div>


    <div class="c_section">
      <div class="title_style">
        <el-input v-model="checkedWiki.title" @keyup.enter.native="onUpdateTitle" @blur="onUpdateTitle">
        </el-input>
      </div>
      <div :style="cWholeStyle">
        <md-editor theme="light" v-model="checkedWiki.content" @save="onUpdateContent" @upload-img="onUploadImg"
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
          <el-button type="primary" @click="onCreateWikiType">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- edit and delete blogtype dialog -->
    <el-dialog v-model="blogTypeEditDialogVisible" title="博客分类 Setting" width="30%">
      你正在对「 {{ checkedWikiType.btName }}」进行操作
      <div style="display: flex; margin: 10px">
        <el-button type="primary" @click="onUpdateWikiType()">修改</el-button>
        <el-input v-model="checkedWikiType.btName">
        </el-input>
      </div>
      <div style="display: flex; margin: 10px">
        <el-button type="danger" @click="deleteWikiType()">删除</el-button>
        <el-input v-model="deleteBtName" :placeholder="'请输入 ' + checkedWikiType.btName + ' 进行删除'">
        </el-input>
      </div>
    </el-dialog>

    <!-- delete blog dialog -->
    <el-dialog v-model="deleteDialogVisible" title="删除博客" width="30%">
      你正在对 {{ checkedWiki.title }}
      <el-input v-model="btName" :placeholder="'请输入<删除>'">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onDeleteWiki">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import $moment from "moment"
import MdEditor from 'md-editor-v3'
import { CaretRight, CaretLeft, Setting, Delete } from "@element-plus/icons-vue"
import 'md-editor-v3/lib/style.css'
import { Wiki, WikiType, wiki, wikiType } from "../../entity"
import { setErrorMessage } from "../../utils/common"
import {
  createWikiType,
  removeWikiType,
  updateWikiType,
  getWikiType,
  sortWikiType,
  createWiki,
  deleteWiki,
  updateWiki,
  getWiki,
  sortWiki,
  listAll,
} from '../../api/blog'
import { copy } from '../../utils/copyutil'
import draggable from "vuedraggable"

const blogTypeCreateDialogVisible = ref(false)
const blogTypeEditDialogVisible = ref(false)
const deleteDialogVisible = ref(false)

let isclicked = ref(false)
let isReady = ref(false)
// tmp btName for create, edit, delete
let btName = ref("")
let deleteBtName = ref("")
const blogTypes = reactive<WikiType[]>([])
const checkedWikiType = reactive<WikiType>(wikiType({
  btId: "",
  btName: "",
  blogs: [],
  order: 0
}))
const checkedWiki = reactive<Wiki>(wiki(
  {
    bid: "",
    btId: "",
    title: "",
    content: "",
  }
))

// FUNCTION DEFINITION

/**
 * FUNCTION DEFINITION LIST
 * {@link onCreateWikiType 创建 wiki Type}
 * {@link deleteWikiType 删除 wiki Type}
 * {@link onUpdateWikiType 更新 wiki Type}
 * {@link onCreateWiki 创建wiki}
 * {@link onDeleteWiki 删除wiki}
 * {@link onUpdateContent 修改Wiki文本内容}
 * {@link onUpdateTitle 修改Wikititle}
 * {@link onclickTypeTab 点击type Tag触发}
 * {@link onclickBlogTab 点击wiki Tag触发}
 * {@link handleCreateBlogType }
 * {@link getTestData 初始数据加载}
 * 
 */

const showWikiTypeIcon = (data: any) => {
  return checkedWikiType.btId == data.btId
}
const showWikiIcon = (data: any) => {
  return checkedWiki.bid == data.bid
}


/**
 * create blogType
 */
const onCreateWikiType = () => {
  if (btName.value == "") {
    blogTypeCreateDialogVisible.value = false
    return
  }
  const data = {
    btName: btName.value,
    order: blogTypes.length
  }
  createWikiType(data).then(response => {
    const blog_type = wikiType(response.data)
    blogTypes.push(blog_type)
    response.data.blog_list.forEach((item: any) => {
      const blog = wiki(item)
      blog_type.blogs.push(blog as Wiki)
    })
    copy(checkedWikiType, blog_type)
    copy(checkedWiki, blog_type.blogs[0])

  }).catch(() => {
    setErrorMessage("创建博客分类失败")
  }).finally(() => {
    btName.value = ""
    blogTypeCreateDialogVisible.value = false
  })
}

const deleteWikiType = async () => {
  if (deleteBtName.value == checkedWikiType.btName) {
    const data = {
      btId: checkedWikiType.btId
    }
    await removeWikiType(data).then((response) => {
      blogTypes.length = 0
      response.data.forEach((element: any) => {
        const wiki_Type = wikiType(element)
        blogTypes.push(wiki_Type)
      })
      response.data[0].blog_list.forEach((item: any) => {
        const blog = wiki(item)
        blogTypes[0].blogs.push(blog)
      })

      copy(checkedWikiType, blogTypes[0])
      copy(checkedWiki, blogTypes[0].blogs[0])
      blogTypeEditDialogVisible.value = false
    })
  } else {
    blogTypeEditDialogVisible.value = false
  }
}

/**
 * edit blogType
 */
const onUpdateWikiType = () => {
  if (checkedWikiType.btName == "") {
    blogTypeEditDialogVisible.value = false
    return
  }
  const query = {
    btId: checkedWikiType.btId,
    btName: checkedWikiType.btName,
  }
  updateWikiType(query).then(() => {
    blogTypes.forEach((item) => {
      if (item.btId == checkedWikiType.btId) {
        item.btName = checkedWikiType.btName
      }
    })
  }).catch(() => {
    setErrorMessage("文章保存失败")
  }).finally(() => {
    blogTypeEditDialogVisible.value = false
  })
}

/**
 * ブログ新規作成
 */
const onCreateWiki = () => {
  isclicked.value = true
  const data = {
    btId: checkedWikiType.btId,
    title: $moment().format("YYYY-MM-DD"),
  }
  createWiki(data).then(response => {
    const blog = wiki(response.data)
    checkedWikiType.blogs.push(blog)
    copy(checkedWiki, blog)
  }).finally(() => {
    isclicked.value = false
  })
}

/**
 * ブログ削除
 */
const onDeleteWiki = async () => {
  if (btName.value == "删除") {
    let delete_data = {
      bid: checkedWiki.bid,
      btId: checkedWiki.btId
    }
    await deleteWiki(delete_data).then(response => {
      checkedWikiType.blogs.length = 0
      response.data.blog_list.forEach((item: any) => {
        const blog = wiki(item)
        checkedWikiType.blogs.push(blog)
      })
      copy(checkedWiki, checkedWikiType.blogs[0])
    }).finally(() => {
      deleteDialogVisible.value = false
      btName.value = ""
    })
  }
}

/**
 * Blog内容修正
 */
const onUpdateContent = async () => {
  const query = {
    bid: checkedWiki.bid,
    content: checkedWiki.content
  }
  updateWiki(query).catch(() => {
    setErrorMessage("文章保存失败")
  })
}


/**
 * Blogタイトル修正
 */
const onUpdateTitle = () => {
  const query = {
    bid: checkedWiki.bid,
    title: checkedWiki.title
  }
  updateWiki(query).then(() => {
    checkedWikiType.blogs.forEach((e) => {
      if (e.bid == checkedWiki.bid) {
        e.title = checkedWiki.title
      }
    })
  }).catch(() => {
    setErrorMessage("文章标题保存失败")
  })
}


/**
 * 点击 【博客分类】
 * @param wikiType BlogType 
 */
const onclickTypeTab = async (wikiType: WikiType) => {

  if (wikiType.btId == checkedWikiType.btId) {
    return
  }
  deleteBtName.value = ""
  await getWikiType(wikiType.btId).then(response => {
    wikiType.blogs.length = 0
    response.data.blog_list.forEach((item: any) => {
      const blog = wiki(item)
      wikiType.blogs.push(blog)
    })
    copy(checkedWikiType, wikiType)
    copy(checkedWiki, wikiType.blogs[0])
  }).catch(err => {
    console.log(err)
  })
}

/**
* 点击 【博客】
* @param w Blog 
*/
const onclickBlogTab = (w: Wiki) => {
  deleteBtName.value = ""
  if (w.bid == checkedWiki.bid) {
    return
  }
  getWiki(w.bid).then(response => {
    copy(checkedWiki, wiki(response.data))
  }).catch((err) => {
    setErrorMessage(err)
  })
}

/**
 * @desc wiki 分类排序
 * 
 */
const onSortWikiType = async () => {

  const sortData: string[] = []
  blogTypes.forEach((blogType: WikiType) => {
    sortData.push(blogType.btId)
  })

  sortWikiType({ btIds: sortData }).catch(() => {
    setErrorMessage("分类排序失败")
  })
}

/**
 * @desc wikiソート機能
 * 
 */
const onSortWiki = async () => {

  const sortData: string[] = []

  checkedWikiType.blogs.forEach((blog: Wiki) => {
    sortData.push(blog.bid)
  })

  sortWiki({ bIds: sortData }, checkedWikiType.btId).catch(() => {
    setErrorMessage("blog排序失败")
  })
}


const handleCreateBlogType = () => {
  blogTypeEditDialogVisible.value = true
}

/**
 * Blog一覧取得
 */
const getTestData = async () => {
  await listAll().then(response => {
    response.data.forEach((element: any) => {
      const blog_type = wikiType(element)
      blogTypes.push(blog_type)
    })
    response.data[0].blog_list.forEach((item: any) => {
      const blog = wiki(item)
      blogTypes[0].blogs.push(blog)
    })
    isReady.value = true
    copy(checkedWikiType, blogTypes[0])
    copy(checkedWiki, blogTypes[0].blogs[0])
  })

  // TODO 需要优化部分
  /**
   * 延迟执行一秒
   * 获取当前时间，current
   * 获取上一次修改时间，startTime
   * 
   */
  let old_blog = {
    bid: checkedWiki.bid,
    content: checkedWiki.content,
  }
  setInterval(async () => {
    if (checkedWiki.bid == old_blog.bid) {
      if (old_blog.content == checkedWiki.content) {
        return
      }
      await updateWiki({
        bid: checkedWiki.bid,
        content: checkedWiki.content
      }).then(() => {
        old_blog.content = checkedWiki.content
      })
    } else {
      old_blog.bid = checkedWiki.bid
      old_blog.content = checkedWiki.content
    }
  }, 5000)
}


// Created　段階の関数呼び出す処理
getTestData()
//js监听键盘ctrl+s快捷键保存
window.addEventListener('keydown', async function (event) {
  if (event.ctrlKey && event.key == "s") {
    event.preventDefault();
    onUpdateContent()
  }
})

const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('img', file)
        // onUploadImg(formData,)
      })
    })
  )
  callback(res.map((item: any) => item.data.data))
}

const onUploadProcess = (e: number) => {
  if (e == 100) {
    setTimeout(() => { }, 1000)
  }
}

// サイズ調整部分
//拖拽开始的事件
const id = ref("")
const onStartBlogType = () => {
  console.log("开始拖拽");
  // id.value = blogTypes[checkedWikiTypeIndex.value].btId
};

const onStartBlog = () => {
  // id.value = blogTypes[checkedWikiTypeIndex.value].blogs[checkedWikiIndex.value].bid
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