<template>

  <div class="category_card-box" v-show="isshowCategorys">
    <el-card v-for="(card, key) in categoryCards" shadow="hover" @click="showCategory(card)"
      class="onenote_category_card">
      <template #header>
        <div class="category_card__header">
          <el-icon :size="40">
            <component :is="card.category_icon" :style="{ color: card.category_color }" />
          </el-icon>
        </div>

      </template>
      <template #default>
        <div class="category_card__body">
          {{ card.category_theme }}
        </div>
      </template>
    </el-card>
    <el-card shadow="hover" @click="categoryDrawer = true" class="onenote_category_card">
      <template #header>
        <div class="category_card__header">
          <el-icon :size="40">
            <component is="Management" :style="{ color: '#5cdbd3' }" />
          </el-icon>
        </div>

      </template>
      <template #default>
        <div class="category_card__body">
          管理
        </div>
      </template>
    </el-card>
  </div>

  <div class="onenote_card-box" v-show="isShowCard">
    <el-page-header @back="onBack">
      <template #content>
        <div class="flex items-center">
          <span class="category_theme"> {{ current_category.category_theme }} </span>
          <el-button size="default" :icon="Plus" round @click="onAddItem"></el-button>
        </div>
      </template>
    </el-page-header>
    <el-card v-for="(item, key) in itemCards" shadow="hover" class="onenote_item_card" @dblclick="oNEditItem(item)">
      <template #header>
        <div class="onenote_card__header">
          {{ item.item_name }}
        </div>
      </template>
      <template #default>
        <div class="onenote_card__body">
          {{ item.item_value }}
        </div>
      </template>
    </el-card>
  </div>

  <el-drawer v-model="categoryDrawer" title="I am the title" :with-header="false">

    <span>Pick a icon!</span>
    <el-alert title="you can pick a icon on the website!" type="success" />
    <el-link type="success" @click="to_element_ui_icon">{{ element_ui_icon }}</el-link>
    <el-input v-model="category_form.category_icon" class="category_icon" size="large" placeholder="">
      <template #prepend>el-icon:</template>
    </el-input>

    <span>Pick a color!</span>
    <el-alert title="you can pick a icon on the website!" type="success" />
    <el-link type="success" @click="to_cainiao_color">{{ cainiao_color }}</el-link>
    <el-input v-model="category_form.category_color" class="category_icon" size="large" placeholder="">
      <template #prepend>color:</template>
    </el-input>

    <span>Pick a theme!</span>
    <el-input v-model="category_form.category_theme" class="category_icon" size="large" placeholder="">
      <template #prepend>theme:</template>
    </el-input>

    <el-button size="large" :icon="Check" round @click="addCategory">确认</el-button>
  </el-drawer>

  <el-drawer v-model="itemDrawer" title="I am the title" :with-header="false">
    <el-input v-model="item_form.item_name" class="category_icon" size="large" placeholder="">
      <template #prepend>name:</template>
    </el-input>

    <el-input v-model="item_form.item_value" class="category_icon" size="large" type="textarea" :rows="10">
      <template #prepend>text:</template>
    </el-input>

    <el-button v-if="isEditItemMode == true" size="large" :icon="Check" round @click="deleteItem">删除</el-button>
    <el-button v-if="isEditItemMode == false" size="large" :icon="Check" round
      @click="itemDrawer = false">取消</el-button>
    <el-button v-if="isEditItemMode == false" size="large" :icon="Check" round @click="addItem">确认</el-button>
    <el-button v-if="isEditItemMode == true" size="large" :icon="Check" round @click="editItem">确认</el-button>
  </el-drawer>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Check, Plus } from '@element-plus/icons-vue'
import { get_categorys, get_items, put_category, put_item, delete_item, post_item } from '@/api/onenote'


// -- IMPORT --

// -- INTERFACE OR TYPE DEFINITION --
type CategoryCard = {
  category_id: string,
  category_color: string,
  category_icon: string,
  category_theme: string
}

type CategoryItem = {
  item_id: string,
  item_name: string,
  item_value: string,
  category_id: string
}

// -- REACTIVE OBJECT --
const itemCards = reactive<CategoryItem[]>([])
const categoryCards = reactive<CategoryCard[]>([])

// -- REF OBJECT --
let element_ui_icon = "https://element-plus.gitee.io/zh-CN/component/icon.html"
let cainiao_color = "https://www.runoob.com/html/html-colornames.html"
const categoryDrawer = ref(false)
const itemDrawer = ref(false)
let isEditItemMode = ref(false)
let isShowCard = ref(false)
let isshowCategorys = ref(true)
let current_category = ref<CategoryCard>({
  category_id: '',
  category_color: '',
  category_icon: '',
  category_theme: ''
})
let item_form = ref<CategoryItem>({
  item_id: '',
  item_name: '',
  item_value: '',
  category_id: ''
})
let category_form = ref<CategoryCard>({
  category_id: '',
  category_color: '',
  category_icon: '',
  category_theme: 'Sample'
})

// -- EVENT DEFINITION
const onBack = () => {
  isshowCategorys.value = true
  isShowCard.value = false
}

const onAddItem = () => {
  clearItemForm()
  isEditItemMode.value = false
  itemDrawer.value = true
}

const oNEditItem = (item: CategoryItem) => {
  itemDrawer.value = true
  isEditItemMode.value = true
  item_form.value.item_id = item.item_id
  item_form.value.item_name = item.item_name
  item_form.value.item_value = item.item_value
}

const showCategory = (card: CategoryCard) => {
  get_items(card.category_id).then((response) => {
    itemCards.length = 0
    response.data.forEach((item: CategoryItem) => {
      itemCards.push(item)
    })
    current_category.value.category_id = card.category_id
    current_category.value.category_icon = card.category_icon
    current_category.value.category_color = card.category_color
    current_category.value.category_theme = card.category_theme
    isshowCategorys.value = false
    isShowCard.value = true
  })
}

const addCategory = () => {
  put_category(category_form.value).then(resp => {
    categoryCards.push({
      category_id: resp.data.category_id,
      category_color: category_form.value.category_color,
      category_icon: category_form.value.category_icon,
      category_theme: category_form.value.category_theme
    })
    categoryDrawer.value = false
    clearCategoryForm()
  })
}

const addItem = () => {
  put_item(item_form.value).then(resp => {
    itemCards.push({
      item_id: resp.data.item_id,
      item_name: item_form.value.item_name,
      item_value: item_form.value.item_value,
      category_id: current_category.value.category_id
    })
    itemDrawer.value = false
  })
}

const editItem = () => {
  post_item(item_form.value).then((resp) => {
    let index = itemCards.findIndex((record) => record.item_id == item_form.value.item_id)
    itemCards[index].item_name = item_form.value.item_name
    itemCards[index].item_value = item_form.value.item_value
    itemDrawer.value = false
  })
}

const deleteItem = () => {
  delete_item(item_form.value.item_id).then(resp => {
    let index = itemCards.findIndex((record) => record.item_id == item_form.value.item_id)
    itemCards.splice(index, 1)
    itemDrawer.value = false
  })
}

const clearItemForm = () => {
  item_form.value.item_id = ''
  item_form.value.item_name = ''
  item_form.value.item_value = ''
  item_form.value.category_id = current_category.value.category_id
}

const clearCategoryForm = () => {
  category_form.value.category_color = ''
  category_form.value.category_id = ''
  category_form.value.category_icon = ''
  category_form.value.category_theme = ''
}

const to_element_ui_icon = () => {
  window.open(element_ui_icon, '_blank')
}

const to_cainiao_color = () => {
  window.open(cainiao_color, '_blank')
}


/**
 * AUTO INVOKE FUNCTION
 */
get_categorys().then((resp) => {
  resp.data.forEach((record: CategoryCard) => {
    categoryCards.push(record)
  })
})
clearItemForm()

</script>

<style  scoped>
.category_card-box {
  display: flex;
  flex-wrap: wrap;
}

.category_card__header {
  text-align: center;
  width: 100px;
  line-height: 100px;
  height: 100px;
}

.category_card__body {
  text-align: center;
}

.onenote_card__header {
  width: 120px;
}

/* 
.onenote_card__body {} */

.onenote_card-box {
  display: flex;
  flex-direction: column;
}

.onenote_item_card {
  display: flex;
  margin: 10px;
}

.onenote_category_card {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
}

.category_icon {
  margin-bottom: 50px;
}

.category_theme {
  margin-right: 30px;
}
</style>
