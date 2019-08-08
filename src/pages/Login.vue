<!-- 登录页面

-->
<template>
  <div>
    <div class="data-box">
        <inline-loading></inline-loading>
    </div>
  </div>
</template>

<script>
import { InlineLoading   } from 'vux'

export default {
  components: {
    InlineLoading 
  },
  data () {
    return {
      urlParamPath: '',
    }
  },
  methods: {
   checkUserAgent() {
      var browser = navigator.userAgent.toLowerCase();
      if(browser.match(/MicroMessenger/i)=="micromessenger"){
          return 1
      }else if(browser.match(/Alipay/i)=="alipay"){
          return 2
      }else{
          return 0
      }
    },

    showPlugin(msg) {
      this.$vux.alert.show({
        title: '提示',
        content: msg
      })
    },

    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    },

    isValidPath(path) {
      this.$router.options.routes.forEach(element => {
        console.log(element.path)
        if(element.path==path) {
          return true
        }
      })
      return false
    },

    gotoHome() {
      if(!!this.urlParamPath) {
        this.$router.push(this.urlParamPath)
      } else {
        this.$router.push('/home')
      }
    },

    async afterLogin() {
      if(this.remote.status.check(this.remote.CommStatus.logined)) {
        //#region 登录成功后，客户端缓存的、供客户端显性调用的认证信息对象
        this.remote.userInfo.uid = this.remote.userInfo.id;
        this.remote.userInfo.user_name = this.remote.userInfo.name;
        this.remote.userInfo.nickname = this.remote.userInfo.name;
        this.$store.dispatch('user/change', this.remote.userInfo);
        //#endregion

        this.ConfigMgr.get('base', (err, config)=>{ 
          if(!err) {
            this.assistant.unit = config;
          }
        });

        //监测账户余额变化
        this.remote.watch((info) => {
          this.$store.dispatch('user/change', {
            confirmed: info.confirmed,
            unconfirmed: info.unconfirmed,
          });
        }, 911001);
        
        //监测VIP等级变化
        this.remote.watch(info => {
          console.log('vip changed:', info.vl, info.vcur);
          if(!!this.$store.state.user.auth.uid) {
            this.$store.dispatch('user/change', {
              vl: info.vl,
              vst: info.vst,
              vet: info.vet,
              vlg: info.vlg,
              vcur: info.vcur || 0,
            });
          }
        }, 911002);

        //获取微信令牌
        let res = await this.remote.fetching({func: "wechat.WechatConfig", uri: this.remote.appConfig.siteUri});
        if (res.code == 0) {
          this.$wechat.config(res.data);
        } else {
          throw new Error(`WechatConfig Error: ${res.code}`);
        }
        
        console.log('after login', this.$store.state.user.auth);
        this.gotoHome();
      } else {
        throw(new Error('登录失败'));
      }
    },
  },

  /**
   * 创建时自动执行登录流程。目前支持三种登录模式：
   * 1. 通过微信授权页面，拉取并上行 code 执行登录，这种操作需要微信授权，中台转换验证码、负载均衡、远程校验，最耗时
   * 2. 通过URL携带 openid openkey 执行登录，这种操作略过了微信授权，但要经过中台负载均衡、远程校验
   * 3. 通过URL携带 openid token 执行登录，这种操作略过了微信授权和中台的远程校验，只要经过中台负载均衡即可直接登录
   */
  async created() {
    this.urlParamPath = this.utils.getUrlKey('path') || this.$route.params.path;

    //#region Modified by liub 2019.06.13
    try {
      let appConfig = await this.remote.getRequest({file: 'app'}, 'config');
      if(appConfig.code == 0) {
        this.remote.appConfig = Object.assign(this.remote.appConfig, appConfig.data);
      }
      console.log('appConfig', this.remote.appConfig);

      let code = this.utils.getUrlKey('code');
      if(!!code) {
        //以下流程采用 code 登录模式进行登录(OAUTH2.0)，登录细节(验证码转换、负载均衡、发送登录请求并处理应答)封装于 remote 组件中
        await this.remote.login({domain: 'authwx', openkey: code});
      } else  {
        //以下流程采用 openid/token 登录模式进行登录
        let openid = this.utils.getUrlKey('openid');
        let openkey = this.utils.getUrlKey('openkey');
        let token = this.utils.getUrlKey('token');
        if(!!openid && (!!token || !!openkey)) {
          //设置并使用负载均衡
          this.remote.loginMode.set(this.remote.CommStatus.reqLb);
          this.remote.status.unSet(this.remote.CommStatus.lb);
          await this.remote.setUserInfo({domain: 'authwx', openid: openid}).setLB(true);
          //登录验证
          await this.remote.setUserInfo({openkey: openkey, token: token}).getToken();
        } else {
          setTimeout(()=>{ 
            let redirect_uri = this.remote.appConfig.siteUri;
            if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
              redirect_uri = redirect_uri + location.search;
            }
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.remote.appConfig.wx_appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
            window.location.href = url;
          }, 2000); //发生错误时，两秒后跳回微信授权页面，重新拉取授权码
          return;
        }
      }

      //执行登录操作后续检验工作
      this.afterLogin();
    } catch(e) {
      console.log(e);
    }
    //#endregion
  }
}
</script>
<style scoped lang="less">

.data-box {
  margin: 0 auto;
  text-align: center;
  /*border: 1px solid #f00;*/

  width: 700px;
  height: 260px;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 11;
  /*设定这个div的margin-top的负值为自身的高度的一半,margin-left的值也是自身的宽度的一半的负值.*/ 
    /*高为400,那么margin-top为-200px*/ 
    /*宽为700那么margin-left为-350px;*/ 
  margin: -180px 0 0 -350px;
}

</style>