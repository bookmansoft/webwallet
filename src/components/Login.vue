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

    wxAuthCode() {
        console.log('wxAuthod')
        let redirect_uri = this.GLOBAL.siteUri
        if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
          //arrSource = location.search.substring(1, this.location.search.length)
          redirect_uri = redirect_uri + location.search
        }
        console.log('redirect_uri', redirect_uri)
        redirect_uri = encodeURIComponent(redirect_uri)
        // let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
        // url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
        url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        window.location.href = url
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
        if(this.urlParamPath == null) {
          this.$router.push('/crowd')
        } else {
          this.$router.push(this.urlParamPath)
        }
    },

    afterLogin() {
      if(this.remote.status.check(this.remote.CommStatus.logined)) {
        this.GLOBAL.userBase.uid = this.remote.userInfo.id;
        this.GLOBAL.userBase.user_name = this.remote.userInfo.name;
        this.GLOBAL.userBase.openid = this.remote.userInfo.openid;

        this.GLOBAL.oemInfo = this.GLOBAL.oemInfo || {};
        this.GLOBAL.oemInfo.domain = this.remote.userInfo.domain;
        this.GLOBAL.oemInfo.openid = this.remote.userInfo.openid;
        this.GLOBAL.oemInfo.openkey = this.remote.userInfo.openkey;
        this.GLOBAL.oemInfo.token = this.remote.userInfo.token;

        //打印登录信息
        console.log(this.GLOBAL.oemInfo);

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
    this.urlParamPath = this.utils.getUrlKey('path');
    let userAgent = this.checkUserAgent();
    this.GLOBAL.userBase.userAgent = userAgent;
    console.log('userAgent', userAgent);

    //#region Modified by liub 2019.06.13
    try {
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
          throw new Error('lack auth info');
        }
      }
      //执行登录操作后续检验工作
      this.afterLogin();
    } catch(e) {
      console.log(e);
      setTimeout(()=>{ this.wxAuthCode(); }, 2000); //发生错误时，两秒后跳回微信授权页面，重新拉取授权码
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