import { BasicLayout } from '@/layouts'

export const routerMap = [
  {
    path: '/',
    name: 'root',
    component: BasicLayout,
    redirect: '/review',
    children: [
      {
        path: '/newFile',
        name: 'NewFile',
        component: () => import('@/views/newFile/NewFile.vue'),
        meta: { title: '新的笔记', keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: '/review',
        name: 'Review',
        component: () => import('@/views/review/Review'),
        meta: { title: '复习', keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: '/allFile',
        name: 'AllFile',
        component: () => import('@/views/allFile/AllFile'),
        meta: { title: '所有笔记', keepAlive: false, permission: [ 'dashboard' ] }
      }
    ]
  }
]