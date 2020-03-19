// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
// eslint-disable-next-line
import Vue from 'vue'
import Layout from './layouts/Layout'
import router from './router'
import store from './store'
import { i18n } from './i18n'
import './vee-validate'
import './filters/date'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import 'nprogress/nprogress.css'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { Layout },
  template: '<Layout/>'
})
