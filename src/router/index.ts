import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import('../components/layout/layout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../view/dashboard/index.vue'),
        meta: {
          name: '控制台'
        }
      },
      {
        path: '/blog',
        component: resolve => (require('@/view/blog/index.vue'), resolve),
        meta: {
          name: '博客'
        }
      },
      {
        path: '/bookmark',
        component: resolve => (require('@/view/bookmark/index.vue'), resolve),
        meta: {
          name: '书签'
        }
      },
      {
        path: '/onenote',
        component: resolve => (require('@/view/onenote/index.vue'), resolve),
        meta: {
          name: 'onenote'
        }
      },
      {
        path: '/calendar',
        component: resolve => (require('@/view/calendar/index.vue'), resolve),
        meta: {
          name: '日历'
        }
      },
      {
        path: '/cloud',
        component: resolve => (require('@/view/cloud/index.vue'), resolve),
        meta: {
          name: '个人云盘'
        }
      },
      {
        path: '/market',
        component: resolve => (require('@/view/recommend/index.vue'), resolve),
        meta: {
          name: '市场行情'
        }
      },
      {
        path: '/capital',
        component: resolve => (require('@/view/capital/index.vue'), resolve),
        meta: {
          name: '资金管理'
        }
      },
      {
        path: '/strategy',
        component: resolve => (require('@/view/trader/cta_strategy_file.vue'), resolve),
        meta: {
          name: '策略模板'
        }
      },
      {
        path: '/strategy_instance',
        component: resolve => (require('@/view/trader/cta_strategy.vue'), resolve),
        meta: {
          name: 'CTA策略'
        }
      },
      {
        path: '/settings',
        component: resolve => (require('@/view/settings/index.vue'), resolve),
        meta: {
          name: '设置'
        }
      },
    ]
  },
  {
    path: "/feedback",
    component: resolve => (require('@/view/blog/mdview.vue'), resolve),
  },
  {
    path: "/BlogEditer",
    component: resolve => (require('@/view/blog/createBlog.vue'), resolve),
  },
  {
    path: "/BlogViewer",
    component: resolve => (require('@/view/blog/mdview.vue'), resolve),
  },
  {
    path: "/login",
    component: () => import('@/components/login/login.vue')
  },
  {
    path: "/illustration",
    component: resolve => (require('../components/illustration/login.vue'), resolve)
  },
  {
    path: "/register",
    component: resolve => (require('../components/login/register.vue'), resolve)
  },
  {
    path: "/sorryPage",
    component: resolve => (require('../components/login/sorry.vue'), resolve)
  },
]


const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router