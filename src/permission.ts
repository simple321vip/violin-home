import router from './router'
import Cookies from 'js-cookie'
import { getToken, getTenant } from './utils/auth'
import { Tenant } from './entity/index'
import { tenantStore } from './store/modules/tenant'

const whiteList = ['/login', '/register', '/sorryPage']
let url = window.location.href

router.beforeEach(async (to, from, next) => {
  console.log(url)
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
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})