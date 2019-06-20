import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, initStore } from './store/index'
import './plugins'
import * as filters from './filters'
import './assets/styles/index.scss'

Vue.config.productionTip = false

/* 定义全局过滤器 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    initStore()
  }
}).$mount('#app')
