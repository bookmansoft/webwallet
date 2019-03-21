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
    } 
　},
  mounted () {

  },
  methods: {
    async initRemote() {
      //创建连接器对象
      let remote = new toolkit.gameconn(
        // CommMode = {
        //     ws: "webSocket",    //Web Socket
        //     get: "get",         //HTTP GET
        //     post: "post",       //HTTP POST
        // }
        toolkit.gameconn.CommMode.ws,      //连接方式
        {
          "UrlHead": "http",              //协议选择: http/https
          "webserver": {
            "host": "192.168.5.73",        //远程主机地址
            "port": 9901                //远程主机端口
          },
          "auth": {
            "openid": "18681223392",    //用户标识
            "openkey": "18681223392",   //和用户标识关联的用户令牌
            "domain": "tx.IOS",         //用户所在的域，tx是提供登录验证服务的厂商类别，IOS是该厂商下的服务器组别
          }
        }
      )
      this.GLOBAL.remote = remote
      console.log('remote', this.GLOBAL.remote)

      let msg = await remote.login({openid: 10005882});
      //console.log(remote.NotifyType.test)
      console.log('msg', msg)
      if(remote.isSuccess(msg)) { 
          await remote.watch(msg => {
              console.log(msg);
              console.log('收到消息了');
          }, '9999').fetching({func: "test.notify", id: 10005882});
      }

    }
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
    console.log(this.$route.path)
    this.initRemote()
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
