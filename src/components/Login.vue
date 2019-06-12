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
        //this.showPlugin(this.urlParamPath)
        let that = this
        this.GLOBAL.initRemote(this.GLOBAL.userBase.uid, function(msg) {
          console.log('收到消息', msg);
          if(msg.msgType=='balance.account.client') {
            console.log('balance.account.client')
            that.GLOBAL.hasTx = true
          } else if(msg.msgType=='prop/receive') {
            console.log('prop/receive')
            that.GLOBAL.hasProp = true
          } else if(msg.msgType=='prop/auction') {
            console.log('prop/auction')
            that.GLOBAL.hasPropAuction = true
          }
        })
        
        if(this.urlParamPath == null) {
          // this.$router.push('/home')
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
      this.GLOBAL.oemInfo.domain = 'authwx';
      this.GLOBAL.oemInfo.openkey = code;
      let data = {func:'login', control: 'index', oemInfo: this.GLOBAL.oemInfo}
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          if(res.data.errcode == 'success') {
              this.GLOBAL.userBase.uid = res.data.id;
              this.GLOBAL.userBase.user_name = res.data.name;
              this.GLOBAL.userBase.openid = res.data.openid;
              this.GLOBAL.oemInfo.token = res.data.token;
              this.gotoHome();
          } else {
            this.showPlugin('登录失败')
          }
      });
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