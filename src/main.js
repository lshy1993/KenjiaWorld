import Vue from 'vue'
import App from './App.vue'
import router from './js/router'

//import '/style/main.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
