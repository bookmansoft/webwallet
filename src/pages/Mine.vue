<template>
  <div>
    <group>
      <flexbox style="padding:0.2rem;">
        <flexbox-item :span="4">
          <div class="flex-demo-left">
            <img :src="userProfile.avatar" class="avatar" />
          </div></flexbox-item>
        <flexbox-item><div class="flex-demo-right"><span>{{userProfile.nick}}</span></div></flexbox-item>
      </flexbox>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items0" :key="index" :link="item.link">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items1" :key="index" :link="item.link">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items2" :key="index" :link="item.link">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>
    <navs></navs>
  </div>
</template>
<script>
import Navs from '@/components/Navs.vue'
import { Cell, CellBox, CellFormPreview, Group, Badge, Flexbox, FlexboxItem } from 'vux'

const getItems0 = () => [
  {title: '会员', is_link: true, img: 'static/images/icon1/4.png', badge: 0, link: {path:'/member'}}
]
const getItems1 = () => [
  {title: '我的钱包', is_link: true, img: 'static/images/icon1/12.png', badge: 1, link: {path:'/wallet'}},
  {title: '我的道具', is_link: true, img: 'static/images/icon1/2.png', badge: 2, link: {path:'/props'}},
  {title: '我的交易', is_link: true, img: 'static/images/icon1/14.png', badge: 3, link: {path:'/wallet/detail'}},
  {title: '我的游戏', is_link: true, img: 'static/images/icon1/8.png', badge: 0, link: {path:'/wallet'}}
]
const getItems2 = () => [
  {title: '使用条款', is_link: true, img: 'static/images/icon1/3.png', badge: 0, link: {path:'/wallet'}},
  {title: '关于我们', is_link: true, img: 'static/images/icon1/9.png', badge: 0, link: {path:'/wallet'}}
]
export default {
  components: {
    Navs, Cell, CellBox, CellFormPreview, Group, Badge, Flexbox, FlexboxItem
  },
  data () {
    return {
      items0: getItems0(),
      items1: getItems1(),
      items2: getItems2(),
      hasProfile: false,
      userProfile: {
        nick: '未登录',
        avatar: 'static/images/icon3/mine1.png'
      }
    }
  },
  methods: {
      getUserProfil(){
          let data = {func:'Mine', control: 'profile', openid: this.GLOBAL.openid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.profile != null) {
                  this.userProfile = res.data.profile
                  this.userProfile.avatar = res.data.profile.avatar_uri
                  this.hasProfile = true
                  this.GLOBAL.uid = this.userProfile.uid
                  this.GLOBAL.propCount = this.userProfile.current_prop_count
                  this.GLOBAL.userProfile = this.userProfile
              } else {
                  this.gotoLogin();
              }
          });
      },
      gotoLogin() {
          const url = "/pages/login/login";
          //wx.miniProgram.navigateTo({ url: url });
          this.$wechat.miniProgram.navigateTo({ url: url })
      }
  },
  created() {
    if(this.GLOBAL.userProfile == null) {
      this.getUserProfil()
    } else {
      this.userProfile = this.GLOBAL.userProfile
    }
  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}
.flex-demo-left {
  text-align: center;
  color: #fff;
  border-radius: 4px;
  background-clip: padding-box;
}
.flex-demo-right {
  text-align: left;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>