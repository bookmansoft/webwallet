// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import { WechatPlugin, AjaxPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin  } from 'vux'
import $global from './utils/global'
import utils from './utils/func'
import cfg from './config'
import gamegold from './utils/gamegold'
import VueWechatTitle from 'vue-wechat-title'
import store from './store/index'

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueWechatTitle)

Vue.prototype.global = $global;
Vue.prototype.utils = utils;
Vue.prototype.gamegold = gamegold;

//#region 通讯设置

const remote = new toolkit.gameconn({
  "UrlHead": cfg.UrlHead,
  "webserver": { 
      "host": cfg.Host,
      "authPort": 9601,           //签证主机端口
      "port": 9901
  },
});
remote.setmode(remote.CommMode.ws);
remote.appConfig = cfg;

Vue.prototype.remote = remote;
//#endregion

/**
 * 配置信息管理
 */
const ConfigMgr = {
  files: {},
  get: (file, callback) => {
    if(!ConfigMgr.files[file]) {
      remote.fetching({func:'config.get', file: file}).then(res => {
          if(res.code == 0) {
            //获得指定配置表，放入全局缓存
            ConfigMgr.files[file] = res.data;
            callback(null, res.data);
          } else {
            callback(new Error(`error: ${res.code}`));
          }
      }).catch(e => {
        callback(e);
      })
    } else {
      callback(null, ConfigMgr.files[file]);
    }
  }
};
Vue.prototype.ConfigMgr = ConfigMgr;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
