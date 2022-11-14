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
        component: () => import('../view/blog/index.vue'),
        meta: {
          name: '博客'
        }
      },
      {
        path: '/bookmark',
        component: () => import('../view/bookmark/index.vue'),
        meta: {
          name: '书签'
        }
      },
      {
        path: '/school',
        component: () => import('../view/school/index.vue'),
        meta: {
          name: '学习'
        }
      },
      {
        path: '/thinking',
        component: () => import('../view/thinking/index.vue'),
        meta: {
          name: '感悟人生'
        }
      },
      {
        path: '/cloud',
        component: () => import('../view/cloud/index.vue'),
        meta: {
          name: '个人云盘'
        }
      },
      {
        path: '/market',
        component: () => import('../view/recommend/index.vue'),
        meta: {
          name: '市场行情'
        }
      },
      {
        path: '/capital',
        component: () => import('../view/capital/index.vue'),
        meta: {
          name: '资金管理'
        }
      },
      // {
      //   path: '/trader',
      //   component: () => import('../view/trader/index.vue'),
      //   meta: {
      //     name: 'trader'
      //   }
      // },
      {
        path: '/strategy',
        component: () => import('../view/trader/cta_strategy_file.vue'),
        meta: {
          name: '策略文件'
        }
      },
      {
        path: '/strategy_instance',
        component: () => import('../view/trader/cta_strategy.vue'),
        meta: {
          name: 'CTA策略'
        }
      },
    ]
  },
  {
    path: "/feedback",
    component: () => import('../view/blog/mdview.vue')
  },
  {
    path: "/BlogEditer",
    component: () => import('../view/blog/createBlog.vue')
  },
  {
    path: "/BlogViewer",
    component: () => import('../view/blog/mdview.vue')
  },
  {
    path: "/login",
    component: () => import('../components/login/login.vue')
  },
  {
    path: "/illustration",
    component: () => import('../components/illustration/index.vue')
  },
  {
    path: "/register",
    component: () => import('../components/login/register.vue')
  },
  {
    path: "/sorryPage",
    component: () => import('../components/login/sorry.vue')
  },
]


const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router