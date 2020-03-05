import { BasicLayout, Login } from '@/layouts'

export const routerMap = [
  {
    path: '/',
    name: 'root',
    redirect: '/home/review',
    meta: { title: '首页', requireLogin: false, keepAlive: false, permission: [ 'dashboard' ] }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录', requireLogin: false, keepAlive: false, permission: [ 'dashboard' ] }
  },
  {
    path: '/home',
    name: 'Home',
    component: BasicLayout,
    redirect: '/home/review',
    meta: { title: '首页', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] },
    children: [
      {
        path: 'newFile',
        name: 'NewFile',
        component: () => import('@/views/newFile/NewFile.vue'),
        meta: { title: '新的笔记', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'review',
        name: 'Review',
        component: () => import('@/views/review/Review'),
        meta: { title: '复习', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'allFile',
        name: 'AllFile',
        component: () => import('@/views/allFile/AllFile'),
        meta: { title: '所有笔记', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      }
    ]
  }
];
