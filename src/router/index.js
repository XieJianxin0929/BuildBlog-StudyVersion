import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由 前台
const index = () => import('../components/index.vue')
// const article = () => import('../components/article.vue')

// 导入路由 后台
const login = () => import('../components/login.vue')
const cms = () => import('../components/cms/cms.vue')
const editAsideLv = () => import('../components/cms/editAsideLv.vue')
const editContent = () => import('../components/cms/editContent.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/cms',
      component: cms,
      children: [
        {
          path: '/editAsideLv',
          component: editAsideLv
        },
        {
          path: '/editContent',
          component: editContent
        }
      ]
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index,
      children: []
    }
  ]
})

// 因为用户没有登录也可以访问别的网页，所以要设置路由导航的前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/cms') {
    // 如果访问页面cms 先判断token
    const token = sessionStorage.getItem('token')
    if (!token) return next('/login')
    next()
  } else {
    next()
  }
})

export default router
