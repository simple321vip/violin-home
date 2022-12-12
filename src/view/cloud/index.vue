<template>
  <el-table :data="dirContexts" @row-contextmenu="showContext" @row-click="leftClickRow"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" width="200px">
    </el-table-column>
    <el-table-column prop="isDir" width="130px">
    </el-table-column>
    <el-table-column prop="size" width="130px">
    </el-table-column>
    <el-table-column prop="path" width="130px">
    </el-table-column>
  </el-table>

  <Contextmenu auto-ajust-placement ref="contextmenu">
    <ContextmenuItem v-if="isSelect" @click="createFolder">
      <el-icon class="contextmenu-icon">
        <FolderOpened />
      </el-icon>
      <label> _new folder</label>
    </ContextmenuItem>
    <ContextmenuItem v-if="isSelect" @click="createFolder">
      <el-icon class="contextmenu-icon">
        <FolderOpened />
      </el-icon>
      <label> _copy</label>
    </ContextmenuItem>
    <ContextmenuItem v-if="isSelect" @click="createFolder">
      <el-icon class="contextmenu-icon">
        <FolderOpened />
      </el-icon>
      <label> _rename</label>
    </ContextmenuItem>
    <ContextmenuItem v-if="isSelect" @click="createFolder">
      <el-icon class="contextmenu-icon">
        <FolderOpened />
      </el-icon>
      <label> _delete</label>
    </ContextmenuItem>

  </Contextmenu>

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { getFileList } from '../../api/cloud'
import { Contextmenu, ContextmenuDivider, ContextmenuItem } from "v-contextmenu";
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue";

import { ElTable } from 'element-plus'
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

interface DirContext {
  size: number
  isDir: number
  name: string
  path: string
}
const currentInstance = getCurrentInstance();
const dirContexts = reactive<DirContext[]>([])
let url = ""

const isSelect = ref(false)
const selection = ref()

const handleSelectionChange = (val: DirContext) => {
  selection.value = val
}
const createFolder = () => {

}



const toggleSelection = (row: DirContext) => {
  multipleTableRef.value.toggleRowSelection(row, true)
  // multipleTableRef.value!.clearSelection()
}


const leftClickRow = (row: any, column: any, event: any) => {
  isSelect.value = true
  console.log(1)
  toggleSelection(row)
}



getFileList(url).then(response => {

  response.data.forEach((element: any) => {
    const dirContext: DirContext = {
      size: element.size,
      isDir: element.isDir,
      name: element.server_filename,
      path: element.path
    }
    dirContexts.push(dirContext)
  });

})

const showContext = (row: any, column: any, event: any) => {
  let contextmenuRef: any = currentInstance?.proxy?.$refs.contextmenu

  event.preventDefault();
  contextmenuRef.show({
    top: event.clientY,
    left: event.clientX
  });
  console.log(row)
  console.log(column)
  console.log(event)
  window.onclick = () => {
    contextmenuRef.hide();
    // contextMenuTargetBlank.value = false;
    // contextMenuTargetFile.value = false;
  };

}

</script>


<style>

</style>