/**
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */
import Vue from 'vue'
import FastClick from 'fastclick'
import { WechatPlugin, AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin  } from 'vux'
import VueWechatTitle from 'vue-wechat-title'

import router from './router/index'
import App from './App'
import store from './store/index'

import utils from './utils/func'
import assistant from './utils/assistant'
import remote from './utils/remote'
import ConfigMgr from './utils/ConfigMgr'

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueWechatTitle)

Vue.prototype.utils = utils;
Vue.prototype.assistant = assistant;
Vue.prototype.ConfigMgr = ConfigMgr;
Vue.prototype.remote = remote;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
