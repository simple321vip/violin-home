<template>
  <div class="one_note">
    <div class="nav_tabs common_box">
      <NavTab
        :row_key="index"
        :checked="nav == index ? true : false"
        :nav_name="item"
        @click="onclickNav(index)"
        v-for="(item, index) in nav_list"
      ></NavTab>
    </div>
    <div class="section_tabs common_box">
      <div>
        <SectionTab
          :row_key="item.section_id"
          @click="onclickSection(item.section_id, index)"
          :checked="item.section_id === section.section_id ? true : false"
          :section_data="item"
          v-for="(item, index) in data_sections"
        ></SectionTab>
      </div>
      <el-button class="plus_button" @click="addSection">+</el-button>
    </div>

    <div class="page_tabs common_box">
      <div>
        <PageTab
          :row_key="item.page_id"
          v-show="item.section_id == section.section_id ? true : false"
          @click="onclickPage(item.page_id)"
          :checked="item.page_id === page ? true : false"
          :page_data="item"
          v-for="(item, index) in current_page_list"
        ></PageTab>
      </div>

      <el-button class="plus_button" @click="addPage">+</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTab from './PageTab.vue'
import SectionTab from './SectionTab.vue'
import NavTab from './NavTab.vue'
import { get_notes, insert_section, insert_page } from '../../api/onenote'
import { reactive, ref } from 'vue';
// type 定義
type Section = {
  section_id: string,
  section_name: string,
  page_list: Page[]
}

type Page = {
  page_id: string,
  section_id: string,
  page_name: string
}
// 変数定義
let nav = ref(0)
let page = ref("")
let section = reactive<Section>(<Section>{})
const data_sections = reactive<Section[]>([])
const current_page_list = reactive<Page[]>([])
const nav_list = reactive<any>(["图书馆", "检索", "历史"])
// API 呼び出す
get_notes({}).then(response => {
  response.data.forEach((item: any) => {
    const section: Section = {
      section_id: item.section_id,
      section_name: item.section_name,
      page_list: []
    }
    item.page_list.forEach((pageItem: any) => {
      const page: Page = {
        page_id: pageItem.page_id,
        section_id: pageItem.section_id,
        page_name: pageItem.page_name
      }
      section.page_list.push(page)
    });
    data_sections.push(section)
  });
}).then(() => {
  Object.assign(current_page_list, data_sections[0].page_list)
});

// アクション
const onclickNav = (index: number) => {
  nav.value = index
}
const onclickPage = (index: string) => {
  page.value = index
}
const onclickSection = (section_id: string, index: number) => {
  section.section_id = section_id
  Object.assign(current_page_list, data_sections[index].page_list)
}
const addSection = () => {
  insert_section().then(response => {
    const data = response.data
    const section: Section = {
      section_id: data.section_id,
      section_name: data.section_name,
      page_list: data.page_list
    }
    data_sections.push(section)
  }).then(() => {
    let index = data_sections.length - 1
    onclickSection(data_sections[index].section_id, index)
  })
}
const addPage = () => {
  const params = {
    section_id: section.section_id
  }
  insert_page(params).then(response => {
    const data = response.data
    const page: Page = {
      page_id: data.page_id,
      section_id: data.section_id,
      page_name: data.page_name
    }
    current_page_list.push(page)
  })
}
</script>

<style  scoped>
.one_note {
  display: flex;
  align-items: stretch;
}
.section_tabs,
.page_tabs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90px;
}

.nav_tabs {
  display: flex;
  flex-direction: column;
  width: 70px;
  padding: 0px;
}

.common_box {
  background-color: white;

  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: antiquewhite;
}
.plus_button {
  border-top: 1px solid antiquewhite;
  border-bottom: 1px solid antiquewhite;
  border-left: 0px solid antiquewhite;
  border-right: 0px solid antiquewhite;
  border-radius: 0px;
}
</style>
