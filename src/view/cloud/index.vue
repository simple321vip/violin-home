<template>
  <el-table :data="dirContexts" @cell-mouse-enter="rowMouseEnter" @cell-mouse-leave="rowMouseLeave"
    :row-style="handleRowStyle" @row-contextmenu="showContext" @row-click="leftClickRow"
    @selection-change="handleSelectionChange" ref="multipleTableRef">
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
import { reactive, toRaw } from 'vue';
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
const multipleSelection = reactive<DirContext[]>([])
const hoverUnSelection = ref<DirContext>()

const isSelect = ref(false)
const selection = ref()

const handleSelectionChange = (val: DirContext[]) => {
  // multipleSelection.value = val
}

const rowMouseEnter = (row: any, column: any, cell: any, event: any) => {
  if (!multipleSelection.includes(row)) {
    hoverUnSelection.value = row
  }
}

const rowMouseLeave = (row: any, column: any, cell: any, event: any) => {
  if (!multipleSelection.includes(row)) {
    hoverUnSelection.value = undefined
  }
}

const handleRowStyle = ({ row, rowIndex }: any) => {
  if (multipleSelection.includes(row)) {
    return {
      "background": "#B4C7E7"
    }
  }

  console.log(toRaw(hoverUnSelection.value))
  console.log(row)
  if (toRaw(hoverUnSelection.value)?.name == toRaw(row).name) {
    return {
      "background": "#DAE3F3"
    }
  }
}


const toggleSelection = (row: DirContext) => {
  multipleTableRef.value!.toggleRowSelection(row, true)
  isSelect.value = true
  // multipleTableRef.value!.clearSelection()
}


const leftClickRow = (row: any, column: any, event: any) => {
  if (multipleSelection.includes(row)) {
    multipleSelection.forEach(element => {
      if (element != row) {
        multipleTableRef.value?.toggleRowSelection(element, false)
      }
    })
  } else {
    multipleTableRef.value?.clearSelection()
    multipleSelection.length = 0
    multipleSelection.push(row)
    toggleSelection(row)
  }
}

const showContext = (row: any, column: any, event: any) => {
  let contextmenuRef: any = currentInstance?.proxy?.$refs.contextmenu
  if (!multipleSelection.includes(row)) {
    multipleSelection.length = 0
    multipleSelection.push(row)
    toggleSelection(row)
  }
  event.preventDefault();
  contextmenuRef.show({
    top: event.clientY,
    left: event.clientX
  });

  window.onclick = () => {
    contextmenuRef.hide();
    // contextMenuTargetBlank.value = false;
    // contextMenuTargetFile.value = false;
  };

}

const createFolder = () => {

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
</script>


<style>
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: transparent !important;
}
</style>