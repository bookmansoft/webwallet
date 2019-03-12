<template>
  <div id="app" style="height:100%;">
    <!--
    <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition>
    -->
    <view-box ref="viewBox">
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
export default {
  components: {
    ViewBox
  },
  name: 'app',
　data () {
    return {
      transitionName:'vux-pop-in',
      uid: "",
    } 
　},
  mounted () {

  },
  methods: {
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

    InitUserFromCode(code) {
        console.log('InitUserFromCode')
        let data = {func:'InitUserFromCode', control: 'wechat', code: code, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            if(res.data.errcode=='success') {
                this.uid = res.data.uid
                this.GLOBAL.uid = res.data.uid
                this.GLOBAL.openid = res.data.openid
                this.GLOBAL.userProfile = res.data.userProfile
                console.log('uid', this.GLOBAL.uid)
                console.log('userProfile', this.GLOBAL.userProfile)
            } else {
              this.showPlugin('登录失败')
            }
        });
    },

    wxAuthod() {
        console.log('wxAuthod')
        let redirect_uri = this.GLOBAL.siteUri
        //let redirect_uri = 'http://test.gamegold.xin/'
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a5e9d7ae34ad4b4'
        url += '&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        window.location.href = url
    },

  },

  //监听路由的路径，可以通过不同的路径去选择不同的切换效果 
  watch: {
  　　$route(to, from) {
        //console.log('to', to)
        //console.log('from', from)
        if(to.meta.index > from.meta.index){
          this.transitionName = 'vux-pop-out';
        }else{
          this.transitionName = 'vux-pop-in';
        }
      }
  },
  
  created() {
    let code = this.utils.getUrlKey('code')
    this.GLOBAL.openid = this.utils.getUrlKey('openid')
    this.GLOBAL.path = this.utils.getUrlKey('path')

    console.log(this.$route.path);
    console.log('code', code)
    if(code != null) {
      this.InitUserFromCode(code)

    } else if( this.GLOBAL.openid == null) {
      this.wxAuthod()

    } else {
      let path = this.GLOBAL.path
      this.$router.options.routes.forEach(element => {
        if(element.path==path) {
          console.log('path', path)
          if(path != '/') {
            console.log('push', path)
            this.$router.push(path)
          }
        }
      });
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: #FAFAFA;
}
#app {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100%;
  font-size: 0.6rem;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.router-view{
    width: 100%;
    position: absolute;
    -webkit-transition: all .3s cubic-bezier(.55,0,.1,1);
    -moz-transition: all .3s cubic-bezier(.55,0,.1,1);
    -ms-transition: all .3s cubic-bezier(.55,0,.1,1);
    -o-transition: all .3s cubic-bezier(.55,0,.1,1);
    transition: all .3s cubic-bezier(.55,0,.1,1);
    height:100%;
}

</style>
