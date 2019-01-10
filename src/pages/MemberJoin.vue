<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <div style="padding:15px 15px 0px 15px;">
            <img src="static/img/member/vip_6yuan.png" style="width:100%;height:auto;" />
    </div>
    <div><p style="text-align:center;width:100%;background-color: white;padding-top:5px;">
        <span style="color:#CC9900; font-size:16px;font-weight:620;">会员特权</span></p>
    </div>
    <div style="background-color: white; padding:15px;">
        <flexbox>
          <flexbox-item v-for="(item, index) in vipAuthoritysItems" :key="index">
            <div class="box">
            <img :src="item">
            </div>
          </flexbox-item>
        </flexbox>
    </div>

    <div><p style="text-align:center;width:100%;background-color: white;padding-top:5px; top:8px; position: relative;">
    <span style="color:#CC9900; font-size:16px;font-weight:620;">开通会员方案</span></p>
    </div>
    <div style="background-color: white; padding:15px;">
        <flexbox>
          <flexbox-item v-for="(item, index) in btnItems" :key="index">
            <div class="box2" @click="vipSelect(item, index)">
              <img :src="item.status==0 ? item.src0 : item.src1">
            </div>
          </flexbox-item>
        </flexbox>
    </div>
    <div style="background-color: white; padding:5px 25px 15px 25px;">
      <divider>.</divider>
      <div style="color:#CC9900; font-size:13px;">
        <swiper v-model="vipDescIndex" height="100px" :show-dots="false">
          <swiper-item v-for="(item, index) in vipDescItems" :key="index">
            <p v-for="(item1, index1) in item.memo" :key="index1">{{item1}}</p>
          </swiper-item>
        </swiper>
      </div>
    </div>
    
    <div style="padding: 10px; background-color: white; top:8px; position: relative;">
        <x-button :gradients="['#FF5E3A', '#FF9500']">立即开通</x-button>
    </div>

  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem  } from 'vux'

const getVipDescItems = () => [{
  label: 'VIP1',
  price: '6元/月',
  value: 1,
  memo: [
    'VIP 1会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '解锁XXX功能，该功能在会员到期后仍然可以使用',
    '会员有效期内每日可领取10kg游戏金福利',
    '点亮VIP1会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
}, {
  label: 'VIP2',
  price: '66元/月',
  value: 2,
  memo: [
    'VIP 2会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '解锁XXX功能，该功能在会员到期后仍然可以使用',
    '会员有效期内每日可领取100kg游戏金福利',
    '点亮VIP2会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
},{
  label: 'VIP3',
  price: '166元/月',
  value: 3,
  memo: [
    'VIP 3会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '解锁XXX功能，该功能在会员到期后仍然可以使用',
    '会员有效期内每日可领取300kg游戏金福利',
    '点亮VIP3会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
}]

const vipOptions = () => [{
    key: '1',
    value: 'VIP1/6元',
    price: 6,
  }, {
    key: '2',
    value: 'VIP2/66元',
    price: 66,
  }, {
    key: '3',
    value: 'VIP3/166元',
    price: 166,
}]

const vipBtns = () => [
  {
    index: 0,
    src0: 'static/img/member/v1_no.png',
    src1: 'static/img/member/v1_yes.png',
    status: 1
  },{
    index: 1,
    src0: 'static/img/member/v2_no.png',
    src1: 'static/img/member/v2_yes.png',
    status: 0
  },{
    index: 2,
    src0: 'static/img/member/v3_no.png',
    src1: 'static/img/member/v3_yes.png',
    status: 0
  }
]

const memberAuthoritys = () => [
  'static/img/member/medal1.png','static/img/member/lock1.png','static/img/member/gift1.png','static/img/member/fl1.png'
]

export default {
  components: {
    XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem
  },
  data () {
    return {
      showCard: false,
      headerTitle: '会员服务',
      cancel: '取消',
      done: '确定',
      selectCard: '选择会员服务',
      msg: '会员享受特权服务',
      getMemberLable: '立即开通',

      vipDescItems: getVipDescItems(),
      vip_options: vipOptions(),
      vipAuthoritysItems: memberAuthoritys(),
      btnItems: vipBtns(),
      vipDescIndex: 0,

      btnTab: 0,
      vip_level: 1,
      vip_level_current: 0,
      
      memberDisabled: false,
      doStart: false,
      vip_last_get_count: 0,
      vip_get_all_count: 0
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },
      getMember() {
          this.showCard = true
      },
      change (value, label) {
        console.log('change:', value, label)
      },
      vipSelect(item, index) {
        item.status = 1
        this.vipDescIndex = index
        this.btnItems.forEach(element => {
          if(element.index != index) {
            element.status = 0
          } 
        });
      },
      userVip() {
        this.showCard = false
        console.log('vip_level', this.vip_level)
        let price = 0
        let productInfo = ''
        this.vip_options.forEach((element, i) => {
          if(element.key == this.vip_level) {
            price = element.price
            productInfo = element.value
          }
        });
        console.log(price, productInfo)
        const url = "/pages/wepay/order?price=" + price + "&productInfo=" + productInfo + "&returl=dsfdsf&uid=" + this.GLOBAL.uid+"&vip="+this.vip_level;
        this.$wechat.miniProgram.navigateTo({ url: url })
      }
  },
  created() {
     /*
     if(this.GLOBAL.userProfile != null && this.GLOBAL.userProfile.mine != null ) {
       this.vip_level_current = this.GLOBAL.userProfile.mine.vip_level
       this.vip_last_get_count = this.GLOBAL.userProfile.mine.vip_last_get_count
       this.vip_get_all_count = this.GLOBAL.userProfile.mine.vip_get_all_count
       this.doStart = true
      console.log('vip_level', this.vip_level_current)
      this.getMemberLable = this.vip_level_current == 0 ? '立即开通' : '升级VIP'
      if(this.vip_level_current==3) {
        this.memberDisabled = true
      }
      
      if(this.vip_level_current > 0) {
        console.log('remove', this.vip_level_current)
        let k = this.vip_options.splice(0, this.vip_level_current)
        console.log(k)
      }
     
     } else {
       this.$router.push('/mine')
     }
     */

  }
}
</script>
<style lang="less" scoped>

.box{
  text-align:center; 
}
.box img {
  width: 50px;
  height: 65px;
}

.box2{
  text-align:center; 
}
.box2 img {
  width: 90px;
  height: 64px;
}

.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 1em;
  color: #04BE02;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.divMember {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
}
.divMember2 {
    padding: 0.8rem;
}
.imgMember {
  width: 100%;
  height: auto;
}
</style>