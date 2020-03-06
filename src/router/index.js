import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { routerMap } from '@/config/router.config'
import {loginFromCookie, cacheLoginStatus} from '@/network/api'

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerMap
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // 每一次切换路由都要判断
  if (store.state.isLogin || !to.meta.requireLogin) {  // 已经登陆了或访问不需要登陆的路由
    next()
  } else {  // 想要访问需要登陆的才能去的页面, 存在cookie里面用于解决刷新后要重新登录的问题
    // 先从sessionStorage中看有没有token
    const token = window.sessionStorage.getItem("token")
    if (token != null) {  // 有token就直接给过, 就算token过期了, 也会在下次发起请求时处理
      console.log("根据sessionStorage验证, 不需要发送登录请求到后端");
      next()
    } else{  // 如果因为关闭了浏览器而没有找到token, 则从cookie中找账号和密码, 如果找到了就直接登录
      console.log("没有token");
      loginFromCookie().then(data => {
        // 登录成功就放行
        // 存储登陆状态
        cacheLoginStatus(data.data)
        next();
      }).catch(err => {
        console.log(err)
        next({path: '/login'})
      });
    }
  }
});

export default router
