import Vue from 'vue'
import Router from 'vue-router'

//页面
import Home from '../components/pages/Home'
import milk from '../components/pages/Home/Milk'
import order_management from '../components/pages/Order/OrderManagement'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Home,
    children: [{
      path: '/milk',
      name: '商品',
      component: milk
    }, {
      path: '/order_management',
      name: '订单管理',
      component: order_management
    }]
  }]
})
