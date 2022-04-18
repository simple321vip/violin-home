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
if (url != 'http://localhost:3000/') {
  // if(url.search("blog=") != -1) {
  //   let blog = {
  //     blog_id: url.split("=")[1]
  //   }
  //   router.push({
  //     path: '/feedback',
  //     query: blog
  //   })
  // }
  if (url.search("edit_blog=") != -1) {
    let blog = {
      blog_id: url.split("=")[1]
    }
    router.push({
      path: '/BlogEditer',
      query: blog
    })
  }

}
router.beforeEach((to, from, next) => {
  console.log(from.path, to.path)

  const token = getToken()
  if (to.path === '/login') {
    if (token) {
      next('/home')
    } else {
      next()
    }
  }



  if (whiteList.includes(to.path)) {
    next()
  } else {
    next()
  }
})


app.mount('#app')

