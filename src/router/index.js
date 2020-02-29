import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerMap } from '@/config/router.config'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerMap
})

export default router
