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
      name: 'alphasoul',
      component: ()=> import('../pages/alphasoul/AlphaSoul.vue')
    },
    {
      path: '/wfwiki',
      name: 'worldflipper',
      component: ()=> import('../pages/wfwiki/WorldFlipper.vue'),
      children:[
        { path:'', component: ()=>import('../pages/wfwiki/Character.vue') },
        { path:'/Character', component: ()=>import('../pages/wfwiki/Character.vue') },
        { path:'/Equipment', component: ()=>import('../pages/wfwiki/Character.vue') }
      ]
    },
    {
      path: '/evolve2',
      name: 'evolve2',
      component: ()=> import('../pages/evolve/Evolve.vue')
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
