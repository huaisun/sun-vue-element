import Vue from 'vue'
import Router from 'vue-router'

//页面
import Home from '../components/pages/Home'
import milk from '../components/pages/Home/Milk'
import order_manage from '../components/pages/Order/OrderManage'
import user_manage from '../components/pages/User/UserManage'
import milk_manage from '../components/pages/Milk/MilkManage'
import setting from '../components/pages/System/Setting'
import login_manage from '../components/pages/System/LoginManage'
import shop_detail from '../components/pages/System/ShopDetail'

//组件
import Table from '../components/common/Table'

Vue.use(Router);
Vue.component('sun-table', Table);

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
      path: '/order_manage',
      name: '订单管理',
      component: order_manage
    }, {
      path: '/user_manage',
      name: '用户管理',
      component: user_manage
    }, {
      path: '/milk_manage',
      name: '奶茶管理',
      component: milk_manage
    }, {
      path: 'setting',
      name: '系统设置',
      component: setting,
      children: [{
        path: '/login_manage',
        name: '登陆管理',
        component: login_manage
      }, {
        path: '/shop_detail',
        name: '店铺详情',
        component: shop_detail
      }]
    }]
  }]
})
