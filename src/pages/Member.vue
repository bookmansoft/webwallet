<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group>
        <div class="divMember" v-if="vip_level_current==0"><img src="static/images/member/m1.png" class="imgMember" /></div>
        <div class="divMember2" v-else >
          <p class="demo1">已领取游戏币：<countup :start-val="1" :end-val="vip_last_get_count" :start="doStart" :duration="1" ></countup></p>
          <p><span class="demo1">总共可领取游戏币：{{vip_get_all_count}}千克</span></p>
        </div>
    </group>
    <group>
        <div class="divMember">
            <divider>{{ msg }}</divider>
            <br>
            <button-tab v-model="btnTab">
                <button-tab-item v-for="(item, index) in items" :key="index">{{item.label}}</button-tab-item>
            </button-tab>
            <swiper v-model="btnTab" height="220px" :show-dots="false">
                <swiper-item v-for="(item, index) in items" :key="index">
                    <card>
                    <div slot="content" class="card-padding">
                        <p style="color:#999;font-size:16px;">{{item.tag}}</p>
                        <br/>
                        <p style="font-size:15px;line-height:1.2;color:#C46E43;">{{item.memo}}</p>
                    </div>
                    </card>
                </swiper-item>
            </swiper>
        </div>
    </group>

    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div class="divMember"><x-button type="primary" @click.native="getMember" :disabled="memberDisabled">{{getMemberLable}}</x-button></div>
    </group>

    <div v-transfer-dom>
      <popup v-model="showCard">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="cancel"
        :right-text="done"
        :title="selectCard"
        :show-bottom-border="false"
        @on-click-left="showCard = false"
        @on-click-right="userVip"></popup-header>
        <group gutter="0">
          <radio :options="vip_options" v-model="vip_level" @on-change="change"></radio>
        </group>
      </popup>
    </div>
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
        /*
        let data = {func:'UserVipBuy', control: 'profile', uid: this.GLOBAL.uid, vip_level: this.vip_level, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
        });
        */
       /*
        let data = {func:'UnifiedOrder', control: 'wechat', openid: this.GLOBAL.openid, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
        });
        */
        const url = "/pages/wepay/order?price=" + price + "&productInfo=" + productInfo + "&returl=dsfdsf&uid=" + this.GLOBAL.uid+"&vip="+this.vip_level;
        this.$wechat.miniProgram.navigateTo({ url: url })
        
      }
  },
  created() {
     if(this.GLOBAL.userProfile != null && this.GLOBAL.userProfile.mine != null ) {
       this.vip_level_current = this.GLOBAL.userProfile.mine.vip_level
       this.vip_last_get_count = this.GLOBAL.userProfile.mine.vip_last_get_count
       this.vip_get_all_count = this.GLOBAL.userProfile.mine.vip_get_all_count
       this.doStart = true
       /*
                       vip_level: userProfile.orm.vip_level,
                vip_start_time:  userProfile.orm.vip_start_time,
                vip_end_time:  userProfile.orm.vip_end_time,
                vip_last_get_time:  userProfile.orm.vip_last_get_time,
                vip_last_get_count:  userProfile.orm.vip_last_get_count,
                vip_usable_count:  userProfile.orm.vip_usable_count,
                vip_get_all_count: get_all_count
                */

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
     

  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
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