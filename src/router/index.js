import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { routerMap } from '@/config/router.config'

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
    next();
  } else {  // 想要访问需要登陆的才能去的页面
    // 先从localStorage中看有没有token
    const token = window.localStorage.getItem("token");
    if (token != null) {  // 有token就直接给过, 就算token过期了, 也会在下次发起请求时处理
      console.log("根据localStorage验证, 不需要发送登录请求到后端");
      next();
    } else{  // 如果没有找到token, 则从cookie中找账号和密码, 如果找到了就直接登录
      console.log("没有找到token");
      next({path: '/login'});
    }
  }
});

export default router
