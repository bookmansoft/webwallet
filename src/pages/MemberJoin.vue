<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group>

    </group>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, XButton, Grid, GridItem, Group, ButtonTab, ButtonTabItem, Divider, Swiper, SwiperItem, Card, Countup } from 'vux'
import { PopupHeader, Popup, TransferDom, Radio } from 'vux'

const getItems = () => [{
  label: 'VIP1',
  tag: '6元/月',
  value: 1,
  memo: 'VIP 1会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取10kg游戏金福利，点亮VIP1会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
}, {
  label: 'VIP2',
  tag: '66元/月',
  value: 2,
  memo: 'VIP 2会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取100kg游戏金福利，点亮VIP2会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
},{
  label: 'VIP3',
  tag: '166元/月',
  value: 3,
  memo: 'VIP 3会员特权：首次开通会员立得价值188元游戏道具大礼包，解锁XXX功能，该功能在会员到期后仍然可以使用，会员有效期内，每日可领取300kg游戏金福利，点亮VIP3会员专属勋章，开通会员方案，后续会员服务升级，已开通用户将自动更新服务',
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

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, XButton, Balance, Grid, GridItem, Group, Card,
    ButtonTab, ButtonTabItem, Divider, Swiper, SwiperItem,
    PopupHeader, Popup, Radio, Countup
  },
  data () {
    return {
      showCard: false,
      headerTitle: '会员服务',
      cancel: '取消',
      done: '确定',
      selectCard: '选择会员服务',
      items: getItems(),
      msg: '会员享受特权服务',
      btnTab: 0,
      vip_level: 1,
      vip_options: vipOptions(),
      vip_level_current: 0,
      getMemberLable: '立即开通',
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