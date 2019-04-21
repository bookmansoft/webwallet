<template>
  <div>
    <group>
      <flexbox style="padding:5px;">
        <flexbox-item :span="4">
          <div class="flex-demo-left">
            <img :src="userProfile.avatar_uri " class="avatar" />
          </div></flexbox-item>
        <flexbox-item><div class="flex-demo-right"><span>{{userProfile.nick}}</span></div></flexbox-item>
      </flexbox>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items0" :key="index" :link="item.link" :value="item.value">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
          <img src="static/img/member/shot.png" style="width: 8px; height:8px; position: relative; left:-2px; top:0px;" v-if="item.showDot==true" />
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>    
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items1" :key="index" :link="item.link" :value="item.value">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
          <img src="static/img/member/shot.png" style="width: 8px; height:8px; position: relative; left:-2px; top:0px;" v-if="item.showDot==true" />
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
    <br/>
    <navs></navs>
  </div>
</template>
<script>
import Navs from '@/components/Navs.vue'
import { Cell, CellBox, CellFormPreview, Group, Badge, Flexbox, FlexboxItem } from 'vux'

const getItems0 = () => [
  {title: '会员', is_link: true, img: 'static/img/icon1/4.png', badge: 0, link: '/member', value: '普通会员', showDot: false},
  {title: '红包活动', is_link: true, img: 'static/img/icon3/market3.png', badge: 0, link: '/redpack/act', value: '游戏金抽红包', showDot: false}
]
const getItems1 = () => [
  {title: '我的钱包', is_link: true, img: 'static/img/mine/wallet.png', badge: 0, link: {path:'/wallet'}, value: '', showDot: false},
  {title: '我的道具', is_link: true, img: 'static/img/mine/prop.png', badge: 0, link: {path:'/props'}, value: '', showDot: false},
  {title: '我的消息', is_link: true, img: 'static/img/mine/msg.png', badge: 0, link: {path:'/message'}, value: '', showDot: false},
  {title: '我的交易', is_link: true, img: 'static/img/mine/trans.png', badge: 0, link: {path:'/wallet/detail'}, value: '', showDot: false},
  {title: '我的游戏', is_link: true, img: 'static/img/mine/game.png', badge: 0, link: {path:'/mygame'}, value: '', showDot: false},
  {title: '我的代练宝宝', is_link: true, img: 'static/img/mine/stock.png', badge: 0, link: {path:'/my/stock'}, value: '', showDot: false}
]
const getItems2 = () => [
  /*{title: '使用条款', is_link: true, img: 'static/img/icon1/3.png', badge: 0, link: ''},*/
  /*{title: '红包测试', is_link: true, img: 'static/img/mine/about.png', badge: 0, link: {path:'/redpack'}, value: ''},*/
  {title: '关于我们', is_link: true, img: 'static/img/mine/about.png', badge: 0, link: {path:'/about'}, value: ''}
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
        avatar: 'static/img/icon3/mine1.png'
      }
    }
  },
  methods: {
      getUserProfile(){
          let data = {func:'Info', control: 'profile', uid: this.GLOBAL.userBase.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.profile != null) {
                  this.GLOBAL.propCount = res.data.profile.current_prop_count
                  this.GLOBAL.userProfile = res.data.profile
                  this.userProfile = res.data.profile
                  this.hasProfile = true
                  this.getMine()
              } 
          });
      },
      getMine(){
          let data = {func:'Mine', control: 'profile', uid: this.GLOBAL.userBase.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log('mine', res.data)
              if(res.data.errcode == 'success' && res.data.mine != null) {
                  let mine = res.data.mine
                  let vip = mine.vip
                  if(vip != null && vip.vip_level>0) {
                    this.items0[0].value = '产币加速中' //'未提' + this.GLOBAL.formatGameGold(mine.vip_usable_count) + '千克'
                    this.items0[0].img = 'static/img/member/Vip' + vip.vip_level + '.png'
                    let current_time = parseInt(new Date().getTime() / 1000);
                    if(this.GLOBAL.formatGameGold(vip.vip_usable_count) >= 10) {
                      this.items0[0].showDot = true
                    } else {
                      this.items0[0].showDot = false
                    }

                  } 
                  if(mine.current_prop_count > mine.prop_count) {
                    this.items1[1].badge = mine.current_prop_count - mine.prop_count
                  }
                  this.GLOBAL.userProfile.mine = mine
              }
              this.getNotify()
          });
      },
      getNotify() {
          let data = {func:'GetNotify', control: 'wallet', uid: this.GLOBAL.userBase.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log('GetNotify', res.data)
              if(res.data.errcode == 'success') {
                if(res.data.count > 0) {
                  this.items1[2].badge = res.data.count
                  this.items1[2].value = '有待支付订单'
                }
              }
          })
      },
      showPlugin(msg) {
        this.$vux.alert.show({
          title: '提示',
          content: msg
        })
      },

      showPluginAuto(msg) {
        this.showPlugin(msg)
        setTimeout(() => {
          this.$vux.alert.hide()
        }, 3000)
      },
  },
  created() {
    console.log('this.GLOBAL.userProfile', this.GLOBAL.userProfile)
    console.log('this.GLOBAL.openid', this.GLOBAL.userBase.openid)
    if(this.GLOBAL.userProfile == null) {
      this.getUserProfile()
    } else {
      this.userProfile = this.GLOBAL.userProfile
      this.getMine()
      //this.getNotify()
    }
    console.log('this.GLOBAL.hasTx', this.GLOBAL.hasTx)
    if(this.GLOBAL.hasTx == true) {
      this.items1[0].showDot = true
    }
    if(this.GLOBAL.hasPropAuction == true) {
      this.showPluginAuto('您发布的道具已被成功拍卖')
      this.GLOBAL.hasPropAuction = false
    }
  }
}
</script>
<style lang="less" scoped>

.vux-1px { 
  border: 1px solid #ffffff;
  box-shadow: 0 0 1px 0 #ffffff;
  &::before{
    border-radius: 1px;
    box-shadow: 0 0 1px 0 #ffffff;
    border: 1px solid #ffffff;
  }

}

.sub-item {
  color: #888;
}

.weui-group {
  border-top:none;
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
    /*border-radius: 50%;*/
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