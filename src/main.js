/**
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */
import Vue from 'vue'
import { WechatPlugin, AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin  } from 'vux'
import VueWechatTitle from 'vue-wechat-title'

Vue.config.productionTip = false
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueWechatTitle)

import utils from './utils/func'
import assistant from './utils/assistant'
import remote from './utils/remote'
import ConfigMgr from './utils/ConfigMgr'

Vue.prototype.utils = utils;
Vue.prototype.assistant = assistant;
Vue.prototype.remote = remote;
Vue.prototype.ConfigMgr = ConfigMgr;

import FastClick from 'fastclick'
FastClick.attach(document.body)

import router from './router/index'
import store from './store/index'
import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
