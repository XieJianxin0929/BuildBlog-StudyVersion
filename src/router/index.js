import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由
const index = () => import('../components/index.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    }
  ]
})

export default router
