import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'

const login = () => import('@/components/login/login.vue')
const home = () => import('@/view/dashboard/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import('@/components/layout/layout.vue'),
    children: [
      {
        path: '/home',
        component: home,
        meta: {
          name: '控制台'
        }
      },
      {
        path: '/blog',
        component: () => import('@/view/blog/index.vue'),
        meta: {
          name: '博客'
        }
      },
      {
        path: '/bookmark',
        component: () => import('@/view/bookmark/index.vue'),
        meta: {
          name: '书签'
        }
      },
      {
        path: '/onenote',
        component: () => import('@/view/onenote/index.vue'),
        meta: {
          name: 'onenote'
        }
      },
      {
        path: '/calendar',
        component: () => import('@/view/calendar/index.vue'),
        meta: {
          name: '日历'
        }
      },
      {
        path: '/cloud',
        component: () => import('@/view/cloud/index.vue'),
        meta: {
          name: '个人云盘'
        }
      },
      {
        path: '/market',
        component: () => import('@/view/recommend/index.vue'),
        meta: {
          name: '市场行情'
        }
      },
      {
        path: '/capital',
        component: () => import('@/view/capital/index.vue'),
        meta: {
          name: '资金管理'
        }
      },
      {
        path: '/strategy',
        component: () => import('@/view/trader/cta_strategy_file.vue'),
        meta: {
          name: '策略模板'
        }
      },
      {
        path: '/strategy_instance',
        component: () => import('@/view/trader/cta_strategy.vue'),
        meta: {
          name: 'CTA策略'
        }
      },
      {
        path: '/settings',
        component: () => import('@/view/settings/index.vue'),
        meta: {
          name: '设置'
        }
      },
    ]
  },
  {
    path: "/feedback",
    component: () => import('@/view/blog/mdview.vue'),
  },
  {
    path: "/BlogEditer",
    component: () => import('@/view/blog/createBlog.vue'),
  },
  {
    path: "/BlogViewer",
    component: () => import('@/view/blog/mdview.vue'),
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/illustration",
    component: () => import('@/components/illustration/login.vue')
  },
  {
    path: "/register",
    component: () => import('@/components/login/register.vue')
  },
  {
    path: "/sorryPage",
    component: () => import('@/components/login/sorry.vue')
  },
]


const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router