import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/views/Dashboard'
import ProductMenu from '@/components/views/pages/ProductMenu'
import Men from '@/components/views/pages/Men'
import Women from '@/components/views/pages/Women'
import Kid from '@/components/views/pages/Kid'
import Sale from '@/components/views/pages/Sale'
import Product from '@/components/views/pages/Product'
import Cart from '@/components/views/pages/cart'
import Order from '@/components/views/pages/Order'
import Checkout from '@/components/views/pages/Checkout'
import Home from '@/components/views/pages/Home'
import Login from '@/components/back/pages/Login'
import BackDashboard from '@/components/back/Dashboard'
import Products from '@/components/back/pages/Products'
import Orders from '@/components/back/pages/Orders'
import Coupon from '@/components/back/pages/Coupon'
import CustomerOrder from '@/components/back/pages/CustomerOrder'
import CustomerCheckout from '@/components/back/pages/CustomerCheckout'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '*',
    redirect: '/Home'
  }, {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [{
      path: 'productmenu',
      name: 'productmenu',
      component: ProductMenu
    }, {
      path: 'productmenu/men',
      name: 'Men',
      component: Men
    }, {
      path: 'productmenu/women',
      name: 'Women',
      component: Women
    }, {
      path: 'productmenu/kid',
      name: 'Kid',
      component: Kid
    }, {
      path: 'productmenu/sale',
      name: 'Sale',
      component: Sale
    }, {
      path: 'product/:productId',
      name: 'product',
      component: Product
    }, {
      path: 'cart',
      name: 'cart',
      component: Cart
    }, {
      path: 'order',
      name: 'order',
      component: Order
    }, {
      path: 'checkout/:orderId',
      name: 'checkout',
      component: Checkout
    }, {
      path: 'Home',
      name: 'Home',
      component: Home
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/admin',
    name: 'BackDashboard',
    component: BackDashboard,
    meta: { requiresAuth: true },
    children: [{
      path: 'products',
      name: 'Products',
      component: Products,
      meta: { requiresAuth: true }
    }, {
      path: 'orders',
      name: 'Orders',
      component: Orders,
      meta: { requiresAuth: true }
    }, {
      path: 'coupon',
      name: 'Coupon',
      component: Coupon,
      meta: { requiresAuth: true }
    }]
  }, {
    path: '/',
    name: 'BackDashboard',
    component: BackDashboard,
    children: [{
      path: 'customer_order',
      name: 'CustomerOrder',
      component: CustomerOrder
    }, {
      path: 'customer_checkout/:orderId',
      name: 'CustomerCheckout',
      component: CustomerCheckout
    }]
  }]
})
