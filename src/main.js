// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts/lib/echarts';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
