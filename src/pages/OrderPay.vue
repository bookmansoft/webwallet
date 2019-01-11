<template>
  <div>
    <msg :title="title" :icon="icon">
    <template slot="buttons">
        <x-button type="primary" :disabled="btnDisabled" :show-loading="showLoading" @click.native="btnClick">{{btnLabel}}</x-button>
     </template>
    </msg>
  </div>
</template>

<script>
import { Msg, Divider, XButton } from 'vux'
//import { setTimeout } from 'timers';

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {
    getOrderStatus() {
        let data = {
        func:'OrderStatus',
        control: 'order',
        uid: this.GLOBAL.uid,
        tradeId: this.tradeId,
        openid: this.GLOBAL.openid,
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          if(res.data.errcode=='success') {
            console.log('getOrderStatus', res.data.order);
            this.title = '支付中...'
            this.order = res.data.order
            if(this.order.pay_status == 0) {
              if(this.wePay==false) {
                this.gotoWePay()
                this.wePay = true
              } 
              if(this.payTimeCount < 15) {
                setTimeout(()=> {
                  this.payTimeCount++
                  this.showLoading = true
                  if(this.isDestroy==false) {
                    this.getOrderStatus()
                  }
                }, 3000)
              } else {
                this.title = '支付超时'
                this.btnDisabled = false
                this.showLoading = false
              }

            } else if(this.order.pay_status == 1) {
              this.title = '已支付成功'
              this.btnDisabled = false
              this.showLoading = false
            } else {
              this.title = '支付失败'
              this.btnDisabled = false
              this.showLoading = false
            }
          }
      });    
    },

    gotoWePay() {
        const url = '/pages/wepay/order?price=' + this.order.order_num + '&productInfo=' + this.order.product_info + '&tradeId=' + this.order.order_sn
          + '&returl=/member/order/pay&uid=' + this.GLOBAL.uid;
        console.log(url)
        this.$wechat.miniProgram.navigateTo({ url: url })
        this.wePay = true
    },

    btnClick() {
      this.$router.go(-1)
    }

  },

  data () {
    return {
      title: '准备支付',
      description: 'msg description',
      icon: 'waiting',
      order: null,
      tradeId: '',
      wePay: false,
      payTimeCount: 0,
      isDestroy: false,
      showLoading: false,
      btnLabel: '确定',
      btnDisabled: true,
      buttons: [{
        type: 'default',
        text: '好的',
        link: '/mine'
      }]
    }
  },
  beforeDestroy() {
    this.isDestroy = true
    console.log('beforeDestroy')
  },
  destroyed() {
    this.isDestroy = true
    console.log('destroyed')
  },
  created() {
    console.log('created')
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    }

    if(this.$route.params.tradeId == null) {
      this.$router.push('/member/join')
    } else {
      this.tradeId = this.$route.params.tradeId
      setTimeout(()=> {
        this.getOrderStatus()
      }, 1500)
    }
  }
}
</script>