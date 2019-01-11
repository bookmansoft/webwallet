<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <memberJoin v-if="vip_level==0"></memberJoin>
    <memberGold v-else gold="29.14" time="1547208162"></memberGold>
    
    <div><p style="text-align:center;width:100%;background-color: white;padding-top:5px; top:8px; position: relative;">
    <span style="color:#CC9900; font-size:16px;font-weight:620;">更多会员方案</span></p>
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
        <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="orderRePay">立即开通 (￥{{btnLabel}} )</x-button>
    </div>

  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import MemberJoin from '@/components/MemberJoin.vue'
import MemberGold from '@/components/MemberGold.vue'
import { XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem  } from 'vux'

const getVipDescItems = () => [{
  label: 'VIP1',
  price: '6',
  value: 1,
  memo: [
    'VIP 1会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '会员有效期内每秒可产出0.1克游戏金',
    '点亮VIP1会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
}, {
  label: 'VIP2',
  price: '66',
  value: 2,
  memo: [
    'VIP 2会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '会员有效期内每秒可产出1.1克游戏金',
    '点亮VIP2会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
},{
  label: 'VIP3',
  price: '166',
  value: 3,
  memo: [
    'VIP 3会员特权：',
    '首次开通会员立得价值188元游戏道具大礼包',
    '会员有效期内每秒可产出3.3克游戏金',
    '点亮VIP3会员专属勋章',
    '后续会员服务升级，已开通用户将自动更新服务'
  ]
}]

const vipBtns = () => [
  {
    index: 0,
    price: '6',
    src0: 'static/img/member/v1_no.png',
    src1: 'static/img/member/v1_yes.png',
    status: 1
  },{
    index: 1,
    price: '66',
    src0: 'static/img/member/v2_no.png',
    src1: 'static/img/member/v2_yes.png',
    status: 0
  },{
    index: 2,
    price: '166',
    src0: 'static/img/member/v3_no.png',
    src1: 'static/img/member/v3_yes.png',
    status: 0
  }
]

export default {
  components: {
    MemberJoin, MemberGold,
    XHeader, Flexbox, FlexboxItem, Group, Divider, XButton, Swiper, SwiperItem
  },
  data () {
    return {
      headerTitle: '会员服务',
      btnLabel: '6',
      vipDescItems: getVipDescItems(),
      btnItems: vipBtns(),
      vipDescIndex: 0,

      btnTab: 0,
      vip_level: -1,

    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },

      getMine(){
          let data = {func:'Mine', control: 'profile', openid: this.GLOBAL.openid, uid: this.GLOBAL.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log('mine', res.data)
              if(res.data.errcode == 'success' && res.data.mine != null) {
                  this.vip_level = res.data.mine.vip_level
              } else {
                  this.vip_level = 0
              }
          });
      },

      vipSelect(item, index) {
        item.status = 1
        this.btnLabel = item.price
        this.vipDescIndex = index
        this.btnItems.forEach(element => {
          if(element.index != index) {
            element.status = 0
          } 
        });
      },

      orderPay(tradeId) {   
        this.$router.push({name:'OrderPay', params: {tradeId: tradeId}})
      },

      orderRePay() {
         let product = this.vipDescItems[this.vipDescIndex]
         let data = {
          func:'CommonOrderRepay',
          control: 'order',
          uid: this.GLOBAL.uid,
          price: product.price,
          productId: product.value,
          productIntro: product.label,
          openid: this.GLOBAL.openid,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
              this.orderPay(res.data.tradeId)
            }
        });       
      }
  },
  created() {
    console.log('memberJoin created')
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    }
    this.getMine()
  }
}
</script>
<style lang="less" scoped>

.box2{
  text-align:center; 
}
.box2 img {
  width: 90px;
  height: 64px;
}

</style>