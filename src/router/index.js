import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'navi',
      component: ()=> import('../pages/Navi.vue')
    },
    {
      path: '/alphasoul',
      name: 'navi',
      component: ()=> import('../pages/Navi.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('../pages/forums/Forums.vue')
    },
    {
      path: '/res',
      name: 'result',
      component: () => import('../pages/forums/Result.vue')
    }
  ]
})
