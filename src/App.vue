<template>
  <div id="app" style="height:100%;">
    <!--
    <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition>
    -->
    <view-box ref="viewBox">
      <router-view v-wechat-title='$route.meta.title'></router-view>
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
  }
  
}
</script>

<style lang="less">
// @import '~vux/src/styles/reset.less';
// @import '~vux/src/styles/1px.less';

html, body {
  height: 100%;
  width: 100%;
  margin-top:0px;
  margin-left:0px;
  margin-bottom: 0px;
  margin-right:0px;
  overflow-x: hidden;
  // background-color: #FAFAFA;
  background-color: white;
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
