import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import router from './router'
import { store } from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

let app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
app.use(contentmenu)

import { setupMock } from '../mock'

if (process.env.NODE_ENV === 'development') {
  setupMock()
}

app.use(router)
app.use(ElementPlus)
app.use(store)
import { getToken, getTenant, setToken, setTenant } from './utils/auth'
import { Tenant } from './entity/index'
import Cookies from 'js-cookie'
import { tenantStore } from './store/modules/tenant'
const whiteList = ['/login', '/register', '/sorryPage']
let url = window.location.href

async function checktoken(url: string) {

  if (url.search("register") != -1) {
    let arr = url.split('?')
    let parameters = arr[1].split('&')
    let query_data: { [key: string]: any } = {}
    parameters.forEach(parameter => {
      let parameter_list = parameter.split("=")
      query_data[parameter_list[0]] = parameter_list[1]
    })
    router.push({
      path: '/register',
      query: query_data
    })
    return
  }
  if (url.search("/home/") != -1) {
    let arr = url.split('?')
    let parameters = arr[1].split('&')
    let query_data: { [key: string]: any } = {}
    parameters.forEach(parameter => {
      let parameter_list = parameter.split("=")
      query_data[parameter_list[0]] = parameter_list[1]
    })
    const tenant = {
      tenant_id: query_data.tenantId,
      account: query_data.account
    }
    const tenant_store = tenantStore()
    await tenant_store.login(tenant, query_data.token).then(() => {
      const { href } = router.resolve({
        path: '/'
      });
      window.open(href, '_self');
    }).catch((error) => {
      const { href } = router.resolve({
        path: '/login'
      });
      window.open(href, '_self');
    })
  }
  if (url.search("sorryPage") != -1) {
    router.push({
      path: '/sorryPage',
    })
    return
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
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }

  }
})


app.mount('#app')

