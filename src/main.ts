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

/**
 * ルーター監視
 * １、トーケン取得
 * ２、トーケンなし場合はログイン画面に遷移
 * ３、トーケンあり場合：
 * 　既にログイン場合はデフォルト　/ 　に遷移
 * 　
 */
router.beforeEach((to, from, next) => {
  console.log(from.path, to.path)

  const token = getToken()


  if (typeof token === 'string') {
    switch (to.path) {
      case '/login':
        next('/')
        break;
      case '/':
        const user = <User>(JSON.parse(getUser() as string))
        if (url.search("write") != -1) {
          next('/BlogEditer')
        } else {
          router.push({
            path: '/home',
            query: user
          })
        }
        break;
      default:
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

