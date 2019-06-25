// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import Vuex from 'vuex'
import { WechatPlugin, AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin  } from 'vux'
import axios from 'axios'
import global_ from './Global'
import utils from './assets/scripts/utils'
import VueWechatTitle from 'vue-wechat-title'

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueWechatTitle)

Vue.prototype.axios = axios
Vue.prototype.GLOBAL = global_
Vue.prototype.utils = utils

//创建连接器对象
const remote = new toolkit.gameconn({
  "UrlHead": "http",
  "webserver": { 
      "host": "127.0.0.1",
      "authPort": 9601,           //签证主机端口
      "port": 9901
  },
});
Vue.prototype.remote = remote

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
