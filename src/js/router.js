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
        { path:'', component: ()=>import('../pages/wfwiki/Index.vue') },
        { path:'chara', component: ()=>import('../pages/wfwiki/chara/Character.vue') },
        { path:'chara/:id', name: 'chara', component: ()=>import('../pages/wfwiki/chara/CharacterDetail.vue') },
        { path:'equip', component: ()=>import('../pages/wfwiki/equip/Equipment.vue') },
        { path:'equip/:id', name: 'equip', component: ()=>import('../pages/wfwiki/equip/EquipmentDetail.vue') },
        { path:'simulator', component: ()=>import('../pages/wfwiki/simulator/Simulate.vue') },
        { path:'simulator/:id', name: 'simulator', component: ()=>import('../pages/wfwiki/simulator/Simulate.vue') },
        { path:'*', component: ()=>import('../pages/wfwiki/Building.vue') },
      ]
    },
    {
      path: '/evolve2',
      name: 'evolve',
      component: ()=> import('../pages/evolve/Evolve.vue')
    },
    {
      path: '/pcrwiki',
      name: 'pcrwiki',
      component: ()=> import('../pages/pcrwiki/PcrWiki.vue')
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
