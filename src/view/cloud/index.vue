<template>
  <el-table :data="dirContexts" @cell-mouse-enter="rowMouseEnter" @cell-mouse-leave="rowMouseLeave"
    :row-style="handleRowStyle" @row-contextmenu="rightClickRow" @row-click="leftClickRow" ref="multipleTableRef">
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

// -- INTERFACE OR TYPE DEFINITION --
interface DirContext {
  size: number
  isDir: number
  name: string
  path: string
}

interface KeyBoard {
  isCtrl: boolean
  isShift: boolean
}


// -- REACTIVE OBJECT --
const dirContexts = reactive<DirContext[]>([])
const multipleSelection = reactive<Set<DirContext>>(new Set())
const keyBoard = reactive<KeyBoard>({
  isCtrl: false,
  isShift: false
})

// -- REF OBJECT --
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const hoverUnSelection = ref<DirContext>()
const isSelect = ref(true)
const selection = ref()
const isRightClick = ref(false)

// -- IMPORT DATA --
const currentInstance = getCurrentInstance()
let url = ""


// -- KEYBOARD AND MOUSE EVENT --
const rowMouseEnter = (row: any, column: any, cell: any, event: any) => {
  if (!multipleSelection.has(row)) {
    hoverUnSelection.value = row
  }
}

const rowMouseLeave = (row: any, column: any, cell: any, event: any) => {
  if (!multipleSelection.has(row)) {
    hoverUnSelection.value = undefined
  }
}

const leftClickRow = (row: any, column: any, event: any) => {

  // CTRL KEY + LEFT CLICK
  if (keyBoard.isCtrl) {
    if (multipleSelection.has(row)) {
      multipleSelection.delete(row)
    } else {
      multipleSelection.add(row)
    }

    // ONLY LEFT CLICK
  } else {
    multipleSelection.clear()
    multipleSelection.add(row)
  }
}

const rightClickRow = (row: any, column: any, event: any) => {
  isRightClick.value = true
  let contextmenuRef: any = currentInstance?.proxy?.$refs.contextmenu
  if (!multipleSelection.has(row)) {
    multipleSelection.clear()
    multipleSelection.add(row)
  }
  event.preventDefault()
  contextmenuRef.show({
    top: event.clientY,
    left: event.clientX
  })

  window.onclick = () => {
    contextmenuRef.hide()
    isRightClick.value = false
    // contextMenuTargetBlank.value = false;
    // contextMenuTargetFile.value = false;
  };

}

const createFolder = () => {

}


// -- STYLE --
const handleRowStyle = ({ row, rowIndex }: any) => {
  if (multipleSelection.has(row)) {
    return {
      "background": "#B4C7E7"
    }
  }

  if (toRaw(hoverUnSelection.value)?.name == toRaw(row).name) {
    return {
      "background": "#DAE3F3"
    }
  }
}

/**
 * AUTO INVOKE FUNCTION
 */
(() => {

  // MOUSE KEYDOWM EVENT
  document.onkeydown = (event) => {

    switch (event.key) {
      case 'Control':
        keyBoard.isCtrl = true
        break;
    }

  }

  // MOUSE KEYUP EVENT
  document.onkeyup = (event) => {

    switch (event.key) {
      case 'Control':
        keyBoard.isCtrl = false
        break
      case 'Escape':
        if (isRightClick.value) {
          let contextmenuRef: any = currentInstance?.proxy?.$refs.contextmenu
          contextmenuRef.hide()
          isRightClick.value = false
        } else {
          multipleSelection.clear()
        }

        keyBoard.isCtrl = true
        break
    }

  }

  // INITIALIZE DATA QUERY
  getFileList(url).then(response => {

    response.data.forEach((element: any) => {
      const dirContext: DirContext = {
        size: element.size,
        isDir: element.isDir,
        name: element.server_filename,
        path: element.path
      }
      dirContexts.push(dirContext)
    })

  })
})()
</script>


<style>
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: transparent !important;
}
</style>