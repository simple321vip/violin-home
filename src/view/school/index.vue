<template>
  <div class="one_note">
    <el-tabs class="demo-tabs" style="width: 80px;" tab-position="left">
      <el-tab-pane label="图书馆"></el-tab-pane>
      <el-tab-pane label="检索"></el-tab-pane>
      <el-tab-pane label="历史"></el-tab-pane>
    </el-tabs>
    <div class="section_tabs">
      <div>
        <SectionTab
          :row_key="item.section_id"
          @click="onclickSection(item.section_id, index)"
          :checked="item.section_id === section.section_id ? true : false"
          :section_data="item"
          v-for="(item, index) in data_sections"
        ></SectionTab>
      </div>
      <el-button @click="addSection">+</el-button>
    </div>

    <div class="page_tabs">
      <div>
        <PageTab
          :row_key="index"
          v-show="item.section_id == section.section_id ? true : false"
          @click="onclickPage(index)"
          :checked="index === page ? true : false"
          :page_data="item"
          v-for="(item, index) in current_page_list"
        ></PageTab>
      </div>

      <el-button @click="addPage">+</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTab from '../../components/layout/PageTab.vue'
import SectionTab from '../../components/layout/SectionTab.vue'
import { get_notes, insert_section, insert_page } from '../../api/onenote'
import { reactive, ref } from 'vue';

let page = ref(0)
let section = reactive<Section>(<Section>{})

const onclickPage = (index: number) => {
  page.value = index

}
const onclickSection = (section_id: string, index: number) => {
  section.section_id = section_id
  Object.assign(current_page_list, data_sections[index].page_list)
}
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

const data_sections = reactive<Section[]>([])
const current_page_list = reactive<Page[]>([])

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
  console.log(data_sections)
  Object.assign(current_page_list, data_sections[0].page_list)
});
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
    console.log(section.page_list)
  })
}
</script>

<style scoped>
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
  background-color: white;
}

.demo-tabs {
  display: flex;
  flex-direction: column;
  padding: 0px;
}
</style>