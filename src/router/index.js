import Vue from 'vue'
import Router from 'vue-router'

//页面
import Home from '../components/pages/Home';
import milk from '../components/pages/Home/Milk';
import order_manage from '../components/pages/Order/OrderManage';
import user_manage from '../components/pages/User/UserManage';
import milk_manage from '../components/pages/Milk/MilkManage';
import setting from '../components/pages/System/Setting';
import login_manage from '../components/pages/System/LoginManage';
import shop_detail from '../components/pages/System/ShopDetail';
import login from '../components/pages/Login';

//组件
import Table from '../components/common/Table';
import Pagination from "../components/common/Pagination";

Vue.use(Router);
Vue.component('sun-table', Table);
Vue.component('sun-pagination', Pagination);

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/milk',
      name: 'milk',
      component: milk
    }, {
      path: '/order_manage',
      name: 'order_manage',
      component: order_manage
    }, {
      path: '/user_manage',
      name: 'user_manage',
      component: user_manage
    }, {
      path: '/milk_manage',
      name: 'milk_manage',
      component: milk_manage
    }, {
      path: 'setting',
      name: 'setting',
      component: setting,
      children: [{
        path: '/login_manage',
        name: 'login_manage',
        component: login_manage
      }, {
        path: '/shop_detail',
        name: 'shop_detail',
        component: shop_detail
      }]
    }]
  }]
})
