import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
