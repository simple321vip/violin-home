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
import { getToken, getUser } from './utils/auth'
import { User } from './entity/index'
const whiteList = ['/login']
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
  if (typeof token === 'string') {
    if (to.path === '/login') {
      if (token) {
        next('/')
      }
    } else if (to.path === '/') {
      const user = <User>(JSON.parse(getUser() as string))
      console.log(user)
      if (user) {
        router.push({
          path: '/home',
          query: user
        })
      }
    } else {
      next()
    }


  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }

  }

})


app.mount('#app')

