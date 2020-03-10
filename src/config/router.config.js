import { BasicLayout, Login } from '@/layouts'

export const routerMap = [
  {
    path: '/',
    name: 'root',
    redirect: '/home/allFile',
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
    redirect: '/home/allFile',
    meta: { title: '首页', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] },
    children: [
      {
        path: 'newFile',
        name: 'NewFile',
        component: () => import('@/views/newFile/NewFile.vue'),
        meta: { title: '新的笔记', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'allFile',
        name: 'AllFile',
        component: () => import('@/views/allFile/AllFile'),
        meta: { title: '所有笔记', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile'),
        meta: { title: '个人中心', requireLogin: true, keepAlive: false, permission: [ 'dashboard' ] }
      }
    ]
  }
];
