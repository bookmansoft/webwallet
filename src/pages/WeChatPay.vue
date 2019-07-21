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
            <x-button @click.native="jsSDK()" type="primary" v-bind:show-loading="showLoading">确定支付</x-button>
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
      payTitle: '支付中',
      retPath: ''
    }
  },
  methods: {
    getWxConfig() {
        const url = location.href.split("#")[0]
        this.remote.fetching({func:'wechat.WechatConfig', uri: url,}).then(res => {
            if(res.code == 0) {
                this.$wechat.config(res.data);
            }
        }).catch(res => {
            console.log(res)
        })
    },
    /**
     * 从微信的统一下单接口获取prepay_id
     */
    unifiedOrder() {
        this.remote.fetching({
            func:'wechat.UnifiedOrder',
            appId: 'wx4a5e9d7ae34ad4b4',
            tradeId: this.tradeId,
            openid: this.GLOBAL.userBase.openid,
            price: this.order.order_num*100,
            productInfo: this.order.product_info,
        }).then(res => {
            if(res.code == 0) {
                this.orderParams = res.data.unifiedOrder;
                this.orderPre = false;
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
                'signType': params.signType, // 微信签名方式
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
                }
            }
        )
    },

    orderNotify() {
        let that = this;
        this.remote.fetching({
            func: 'order.OrderPayResult',
            tradeId: this.tradeId,
            status: 1,
            msg: 'success',
        }).then(res => {
            if(res.code == 0) {
                setTimeout(()=>{
                    if(!!that.retPath) {
                        that.$router.push(that.retPath)
                    } else {
                        that.$router.go(-1)
                    }
                }, 1000)
            }
        }) 
    }

  },

  created() {
    if(!this.GLOBAL.userBase.uid) {
      this.$router.push('/login');
    }

    if(this.$route.params.tradeId == null) {
      this.$router.push('/mine')
    }

    this.tradeId = this.$route.params.tradeId
    this.order = this.$route.params.order
    this.retPath = this.$route.params.retPath
    this.unifiedOrder()
    
  }
}
</script>