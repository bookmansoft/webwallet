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
            <cell title="商品" :value="order.desc + '/' + order.num "></cell>
            <cell title="价格" :value="order.price"></cell>
         </group>
         <div style="padding:15px;">
            <x-button @click.native="wxPay()" type="primary" v-bind:show-loading="showLoading">确定支付</x-button>
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
      order: null,          //客户端组织的原始订单信息，用于向用户展示信息、向服务端申请 prepay
      orderParams: null,    //客户端向服务端 prepay 后获得的订单信息，用于发起微信支付
      orderPre: true,       //表示正在发起 prepay
      showLoading: false,   //表示正在发起微信支付
      payResult: false,     //表示在 prepay 之后、 微信支付之前，此期间展示商品信息
      retPath: '',          //特定的返回路径
      payIcon: 'waiting',
      payTitle: '支付中',
    }
  },
  methods: {
    /**
     * 预生成订单 - 通过这一步提交订单号、价格、用户编号等要素
     * 调用微信统一下单接口，获取prepay_id，这是调用微信支付接口的前置步骤
     */
    prepay() {
        this.remote.fetching({
            func:'order.prepay',
            order: this.order,
        }).then(res => {
            if(res.code == 0) {
                this.orderParams = res.data;
                this.orderPre = false;
            }
        });
    },

    /**
     * 调用微信支付接口，只需要提交上一步获得的预生成订单号即可
     */
    wxPay() {
        let params = this.orderParams;
        this.showLoading = true;

        let self = this;
        if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () { self.onBridgeReady(params) }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function () { self.onBridgeReady(params) });
                document.attachEvent('onWeixinJSBridgeReady', function () { self.onBridgeReady(params) });
            }
        } else {
            self.onBridgeReady(params);
        }
    },

    /**
     * 调用微信支付接口(微信接口就绪时自动触发)
     */
    onBridgeReady (params) {
        this.payResult = true;

        let that = this;
        window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': params.appId,          //公众号id String(16) 商户注册具有支付权限的公众号成功后即可获得
                'timeStamp': params.timeStamp,  //时间戳 String(32) 自1970年以来的秒数
                'nonceStr': params.nonceStr,    //随机字符串 String(32) 随机字符串，不长于32位
                'package': params.package,      //订单详情扩展字符串 String(128) 统一下单接口返回的prepay_id参数值，提交格式如：prepay_id=***
                'signType': params.signType,    //签名方式 String(32) 签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
                'paySign': params.sign          //签名 String(64)
            },
            function (res) {
                // get_brand_wcpay_request:ok       支付成功
                // get_brand_wcpay_request:cancel	支付过程中用户取消
                // get_brand_wcpay_request:fail	    支付失败
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    that.payTitle = '支付成功';
                    that.payIcon = 'success';
                    
                    that.remote.fetching({
                        func: 'order.OrderPayResult',
                        tradeId: params.tradeId,
                        status: 1,
                    }).then(res => {
                        if(res.code == 0) {
                            setTimeout(()=>{
                                if(!!that.retPath) {
                                    that.$router.push(that.retPath);
                                } else {
                                    that.$router.go(-1);
                                }
                            }, 1000);
                        }
                    });
                } else {
                    that.payTitle = '支付失败';
                    that.payIcon = 'warn';
                }
            }
        )
    },
  },

  //#region 生命周期函数
  created() {
    if(!this.GLOBAL.userBase.uid) {
      this.$router.push('/login');
    }

    if(!this.$route.params.order) {
      this.$router.push('/mine')
    }

    this.order = this.$route.params.order;
    this.retPath = this.$route.params.retPath;
    this.prepay();
  }
  //#endregion
}
</script>