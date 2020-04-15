// src/router/index.js
import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/Home';
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})
