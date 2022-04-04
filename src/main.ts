import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import router from './router'

// vue store
import { createPinia } from 'pinia'
const store = createPinia()

let app = createApp(App)


app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
