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

    GetUserFromMapCode(code) {
        console.log('GetUserFromMapCode')
        let data = {func:'GetUserFromMapCode', control: 'wechat', code: code, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            if(res.data.errcode=='success') {
                let user = res.data.user
                this.GLOBAL.userBase.uid = user.id
                this.GLOBAL.userBase.user_name = user.user_name
                this.GLOBAL.userBase.openid = res.data.openid
                if(user.id == 0 ) {
                  this.$router.push('/user/bind')
                } else {
                  this.gotoHome()
                }
            } else {
              this.showPlugin('登录失败')
            }
        });
    },

    wxAuthCode() {
        console.log('wxAuthod')
        let redirect_uri = this.GLOBAL.siteUri
        //let redirect_uri = 'http://test.gamegold.xin/'
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
        url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        window.location.href = url
    },

    isValidPath(path) {
      this.$router.options.routes.forEach(element => {
        if(element.path==path) {
          return true
        }
      })
      return false
    },

    gotoHome() {
        let path = this.utils.getUrlKey('path')
        if(path==null || this.isValidPath(path)==false) {
          this.$router.push('/home')
        } else {
          this.$router.push(path)
        }
    }

  },
  created() {
    let userAgent = this.checkUserAgent()
    this.GLOBAL.userBase.userAgent = userAgent
    console.log('userAgent', userAgent)

    //微信浏览器
    if(userAgent == 1) {
      if(this.GLOBAL.userBase.uid == 0) {
        let code = this.utils.getUrlKey('code')
        if(code != null) {
          this.GetUserFromMapCode(code)
        } else  {
          this.wxAuthCode()
        }
      } else {
          this.gotoHome()
      }
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