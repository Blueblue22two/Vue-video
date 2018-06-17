// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './components/router/index'
import './common/stylus/reset.styl'
import axios from 'axios'
import './common/stylus/icon.styl'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
//
// Vue.use(VueLazyLoad, {
//   loadding: require('common/images/default.png')
// })

/* eslint-disable no-new */

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
