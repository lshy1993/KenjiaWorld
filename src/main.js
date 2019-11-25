import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);

import moment from 'vue-moment';
Vue.use(moment);

import data from './js/data.js';
Vue.prototype.Common = data;
import func from './js/func.js';
Vue.prototype.Func = func;

//import '/style/main.css';
import './style/main.scss';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
