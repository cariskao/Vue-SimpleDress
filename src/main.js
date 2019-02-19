// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './bus'
import Vue from 'vue'
import App from './App'
import 'bootstrap'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import currencyFilter from './filters/currency'
import VeeValidate from 'vee-validate'
import zhTWValidte from 'vee-validate/dist/locale/zh_TW'
import timestampFormat from './filters/timestampFormat'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('timeFormat', timestampFormat)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_TW', zhTWValidte)
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
router.beforeEach((to, from, next) => { // Navigation Guards
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) { // 要到達的頁面(to)，如果有requiresAuth，會被Guards擋住
    console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else { // 要達到的頁面(to)，如果沒有requiresAuth，直接next().
    next()
  }
})
