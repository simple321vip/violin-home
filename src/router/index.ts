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
        path: '/recommend',
        component: () => import('../view/recommend/index.vue'),
        meta: {
          name: '推荐中'
        }
      },
      {
        path: '/download',
        component: () => import('../view/download/index.vue'),
        meta: {
          name: '一键打包'
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
  }
]


const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router