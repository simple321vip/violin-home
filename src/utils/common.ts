import { h } from 'vue'
import { ElMessage } from 'element-plus'

const setErrorMessage = (msg: string) => {
  ElMessage({
    message: h('p', null, [
      h('i', { style: 'color: teal' }, msg),
    ]),
  })
}

export { setErrorMessage }
