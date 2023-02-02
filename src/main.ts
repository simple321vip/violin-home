import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import { store } from './store'
import router from './router'
import '@/permission'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

import { setupMock } from '../mock'
if (process.env.NODE_ENV === 'development') {
  setupMock()
}

let app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(contentmenu)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')

