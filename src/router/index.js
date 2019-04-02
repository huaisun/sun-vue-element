import Vue from 'vue'
import Router from 'vue-router'

//页面
import Home from '../components/pages/Home'
import milk from '../components/pages/Home/Milk'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Home,
    children: [{
      path: '/milk',
      name: '预览',
      component: milk
    }]
  }]
})
