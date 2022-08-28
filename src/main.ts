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
import { getToken, getTenant, setToken, setTenant } from './utils/auth'
import { Tenant } from './entity/index'
import Cookies from 'js-cookie'
import { obtainUserInfo } from './api/user'
const whiteList = ['/login']
let url = window.location.href

async function checktoken(url: string) {
  if (url.search("token") != -1) {

    const list = url.split("?token=")

    let base_url = list[0]
    let authorizeToken = list[1]
    if (list.length < 2 || authorizeToken.length == 0) {
      router.push({
        path: '/illustration',
      })
      return
    }
    await obtainUserInfo(authorizeToken).then(response => {

      if (response.status == 200) {
        const tenant = {
          id: response.data.id,
          account: response.data.account
        }
        setToken(authorizeToken)
        setTenant(tenant)
        window.open(base_url, "_self")
      }
    })
  }
}
checktoken(url)

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
        const tenant = <Tenant>(JSON.parse(getTenant() as string))
        if (url.search("write") != -1) {
          next('/BlogEditer')
        } else if (url.search("view") != -1) {
          let bid = Cookies.get('bid')
          router.push({
            path: '/BlogViewer',
            query: { bid: bid }
          })
        } else {
          router.push({
            path: '/home',
            query: tenant
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

