<template>
  <div>
      <div v-if="orderPre==true">
            <br><br>
            <p style="text-align:center;">
            <inline-loading></inline-loading>
            </p>
      </div>
      <div v-else-if="payResult==false">
        <group>
            <cell title="商品" :value="order.product_info"></cell>
            <cell title="价格" :value="order.order_num"></cell>
         </group>
         <div style="padding:15px;">
            <x-button @click.native="jsSDK()" type="primary" v-bind:show-loading="showLoading"> 确定支付</x-button>
         </div>
       </div>
       <div v-else>
           <br/>
           <msg :title="payTitle" :icon="payIcon"></msg>
       </div>
    <br>
  </div>
</template>

<script>
import { InlineLoading, Cell, Group, XButton, Msg  } from 'vux'
import { setTimeout } from 'timers';
//import { setTimeout } from 'timers';

export default {
  components: {
    InlineLoading, Cell, Group, XButton, Msg 
  },
  data () {
    return {
      order: null,
      tradeId: '',
      orderPre: true,
      showLoading: false,
      orderParams: null,
      payResult: false,
      payIcon: 'waiting',
      payTitle: '支付中'
    }
  },
  methods: {
    getWxConfig() {
        const url = location.href.split("#")[0]
        let data = {func:'WechatConfig', control: 'wechat', url: url, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            this.$wechat.config(res.data.wxconfig)
        }).catch(res => {
            console.log(res)
        })
    },
    unifiedOrder() {
        let data = {
            func:'UnifiedOrder',
            control: 'wechat',
            appId: 'wx4a5e9d7ae34ad4b4',
            uid: this.GLOBAL.userBase.uid,
            tradeId: this.tradeId,
            openid: this.GLOBAL.userBase.openid,
            price: this.order.order_num,
            productInfo: this.order.product_info,
            oemInfo: this.GLOBAL.oemInfo
        }
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            if(res.data.errcode=='success') {
                this.orderParams = res.data.unifiedOrder
                console.log(this.orderParams)
                this.orderPre = false
                //this.jsSDK(unifiedOrder)
            }
        })   
    },

    jsSDK() {
        let params = this.orderParams
        this.showLoading = true
        if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params) }, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params) })
                document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params) })
            }
        } else {
            this.onBridgeReady(params)
        }
    },

    onBridgeReady (params) {
        let that = this
        that.payResult = true
        window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': params.appId, // 公众号名称，由商户传入
                'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
                'nonceStr': params.nonceStr, // 随机串
                'package': params.package,
                'signType': params.signType, // 微信签名方式：
                'paySign': params.paySign // 微信签名
            },
            function (res) {
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    that.payTitle = '支付成功'
                    that.payIcon = 'success'
                    that.orderNotify()
                } else {
                    that.payTitle = '支付失败'
                    that.payIcon = 'warn'
                    setTimeout(()=>{
                        that.$router.go(-1)
                    }, 1000)
                }
            }
        )
    },

    orderNotify() {
        let data = {
            func: 'OrderPayResutl',         //action
            uid: this.GLOBAL.userBase.uid,
            tradeId: this.tradeId,
            status: 1,
            msg: 'success',
            control: 'order',               //控制器
            oemInfo: this.GLOBAL.oemInfo
        }
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            if(res.data.errcode=='success') {
                setTimeout(()=>{
                    this.$router.go(-1)
                }, 1000)
            }
        }) 
    }

  },

  created() {
    console.log('created')
    if(this.GLOBAL.userBase.uid == 0 || this.$route.params.tradeId == null) {
      this.$router.push('/mine')
    }

    this.tradeId = this.$route.params.tradeId
    this.order = this.$route.params.order
    this.unifiedOrder()
    
  }
}
</script>