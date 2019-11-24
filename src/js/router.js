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
      component: ()=> import('../components/Navi.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('../components/HelloWorld.vue')
    },
    {
      path: '/res',
      name: 'result',
      component: () => import('../components/Result.vue')
    }
  ]
})
