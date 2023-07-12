import { h } from 'vue'
import { ElMessage } from 'element-plus'

export const setErrorMessage = (msg: string) => {
  ElMessage({
    message: h('p', null, [
      h('i', { style: 'color: teal' }, msg),
    ]),
  })
}
