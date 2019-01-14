<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <memberJoin v-if="mine != null && mine.vip_level==0"></memberJoin>
    <memberGold v-if="mine != null && mine.vip_level>0" :mine="mine" ></memberGold>
    
    <div><p class="memberMore">
    <span>会员方案</span></p>
    </div>
    <div class="memberMoreDiv">
        <flexbox>
          <flexbox-item v-for="(item, index) in btnItems" :key="index">
            <div class="box2" @click="vipSelect(item, index)">
              <img :src="item.status==0 ? item.src0 : item.src1">
            </div>
          </flexbox-item>
        </flexbox>
    </div>

    <div class="vipDesc">
      <divider>.</divider>
      <div class="vipDescDiv">
        <swiper v-model="vipDescIndex" height="100px" :show-dots="false">
          <swiper-item v-for="(item, index) in vipDescItems" :key="index">
            <p v-for="(item1, index1) in item.memo" :key="index1">{{item1}}</p>
          </swiper-item>
        </swiper>
      </div>
    </div>
    
    <div class="memberBtn">
        <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="orderRePay" :disabled="!btnEnable">
          <span>{{btnTitle + btnTitleFee}}</span>
        </x-button>
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
      mine: null,
      btnTitle: '开通会员',
      btnEnable: true,
      btnTitleFee: ''
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },

      getFee() {
        if(this.mine.vip_level==null || this.mine.vip_level==3) {
          return ''
        }
        if(this.vipDescIndex == 0) {
          return '(￥6)'
        } else if(this.vipDescIndex == 1) {
          return '(￥66)'
        } else if(this.vipDescIndex == 2) {
          return '(￥166)'
        }
        return ''
      },

      getMine(){
          let data = {func:'Mine', control: 'profile', openid: this.GLOBAL.openid, uid: this.GLOBAL.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log('mine', res.data)
              if(res.data.errcode == 'success' && res.data.mine != null) {
                  this.mine = res.data.mine
                  if(this.mine.vip_level == 0) {
                    this.vipDescIndex = 0
                    this.btnTitle = '开通会员'
                    this.btnTitleFee = '(￥6)'
                  } else if(this.mine.vip_level == 3) {
                    this.btnTitle = '已升最高级VIP3'
                    this.btnEnable = false
                  } else {
                    this.btnTitle = '立即升级'
                  }
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
        if(this.mine.vip_level > 0) {
          console.log('this.vipDescItems[index].value', this.vipDescItems[index].value)
          console.log('this.mine.vip_level', this.mine.vip_level)
          if(this.vipDescItems[index].value <= this.mine.vip_level) {
            this.btnTitleFee = ''
          } else if(this.vipDescItems[index].value > this.mine.vip_level) {
            this.btnTitleFee = this.getFee()
          } 
        } else {
          this.btnTitleFee = this.getFee()
        }
      },

      orderPay(tradeId) {   
        this.$router.push({name:'OrderPay', params: {tradeId: tradeId}})
      },

      orderRePay() {
        let product = this.vipDescItems[this.vipDescIndex]
        if(this.mine.vip_level > 0) {
          if(product.value < this.mine.vip_level) {
            this.showPluginAuto('不能降级，当前已经是'+ product.label)
            return
          } else if(product.value == this.mine.vip_level) {
            this.showPluginAuto('当前已经是' + product.label)
            return
          }
        }
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
  width: 80px;
  height: 64px;
}
.vipDesc {
  background-color: white; padding:5px 25px 15px 25px;
}
.vipDescDiv {
  color:#CC9900; font-size:13px;
}
.memberMore {
  text-align:center;width:100%;background-color: white;padding-top:5px; top:8px; position: relative;
}
.memberMoreDiv {
  background-color: white; padding:15px;
}
.memberMore span {
  color:#CC9900; font-size:15px;font-weight:620;
}
.memberBtn {
  padding: 10px; 
  background-color: white; 
  top:8px; 
  position: relative;
}
</style>