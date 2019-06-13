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
    }

  },

  created() {
    this.urlParamPath = this.utils.getUrlKey('path');
    let userAgent = this.checkUserAgent();
    this.GLOBAL.userBase.userAgent = userAgent;
    console.log('userAgent', userAgent);

    //if(userAgent == 1) { 微信浏览器
    let code = this.utils.getUrlKey('code');
    if(!!code) {
      this.GLOBAL.oemInfo = this.GLOBAL.oemInfo || {};
      this.GLOBAL.oemInfo.domain = 'authwx';
      this.GLOBAL.oemInfo.openkey = code;
      let data = {func:'login', oemInfo: this.GLOBAL.oemInfo}

      //#region Modified by liub 2019.06.13

      //原先的写法 - Start
      // this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
      //     if(res.status == 200 && res.data.code == 0) {
      //         let ret = res.data.data;
      //         this.GLOBAL.userBase.uid = ret.id;
      //         this.GLOBAL.userBase.user_name = ret.name;
      //         this.GLOBAL.userBase.openid = ret.openid;
      //         this.GLOBAL.oemInfo.openid = ret.openid;
      //         this.GLOBAL.oemInfo.token = ret.token;
      //         this.gotoHome();
      //     } else {
      //       this.showPlugin('登录失败')
      //     }
      // });
      //原先的写法 - End

      //新的写法 - Start
      //创建连接器对象
      let remote = new toolkit.gameconn({
          "UrlHead": "http",
          "webserver": { 
              "host": "127.0.0.1",
              "port": 9901
          },
      });

      //设置用户基本信息
      remote.setUserInfo({
          domain: 'authwx',
          openkey: code,
      }, remote.CommStatus.reqLb);

      remote.login().then(() => {
          if(remote.status.check(remote.CommStatus.logined)) {
            this.GLOBAL.userBase.uid = remote.userInfo.id;
            this.GLOBAL.userBase.user_name = remote.userInfo.name;
            this.GLOBAL.userBase.openid = remote.userInfo.openid;

            this.GLOBAL.oemInfo.openid = remote.userInfo.openid;
            this.GLOBAL.oemInfo.token = remote.userInfo.token;

            this.gotoHome();
          } else {
            this.showPlugin('登录失败')
          }
      }).catch(e=>{
        console.log(e);
      });
      //新的写法 - End

      //#endregion
    } else  {
      this.wxAuthCode()
    }
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