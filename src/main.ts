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

import { getToken } from './utils/auth'
const whiteList = ['/', '/blog']
let url = window.location.href
console.log(url)
if (url != 'http://localhost:3000/' && url.search("blog=") != -1) {
  let blog = {
    blog_id: url.split("=")[1]
  }
  router.push({
    path: '/feedback',
    query: blog
  })
}
router.beforeEach((to, from, next) => {
  console.log(to.path, from.path)
  if (to.path === '/login') {
    next()
  }



  if (whiteList.includes(to.path)) {
    next()
  } else {
    next()
  }
})


app.mount('#app')

