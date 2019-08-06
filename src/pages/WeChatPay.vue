<!-- 微信支付页面
数据接口
1. order.prepay 提交订单号、价格、用户编号等要素，调用微信统一下单接口，预生成订单并返回 tradeId prepay_id 等信息
    {
        appId,
        timeStamp,
        nonceStr,
        package: `prepay_id=${data.prepay_id}`,
        signType: 'MD5',
        tradeId,
    }
2. WeixinJSBridge/getBrandWCPayRequest 发起微信支付
3. order.OrderPayResult 微信支付成功后调用，向服务端发送支付成功通知 - 注意: 服务端将其视为一种状态改变，支付依据则以服务端收到的微信回调为准
-->
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
  computed:{
    userBase() {return this.$store.state.user.auth},
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

        //test only
        self.payTitle = '支付成功';
        self.payIcon = 'success';
        
        self.remote.fetching({
            func: 'order.OrderPayResult',
            tradeId: params.tradeId,
            status: 1,
        }).then(res => {
            if(res.code == 0) {
                setTimeout(()=>{
                    if(!!self.retPath) {
                        self.$router.push(self.retPath);
                    } else {
                        self.$router.go(-1);
                    }
                }, 1000);
            }
        });
        return;
        //end

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

        let self = this;
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
                    self.payTitle = '支付成功';
                    self.payIcon = 'success';
                    
                    self.remote.fetching({
                        func: 'order.OrderPayResult',
                        tradeId: params.tradeId,
                        status: 1,
                    }).then(res => {
                        if(res.code == 0) {
                            setTimeout(()=>{
                                if(!!self.retPath) {
                                    self.$router.push(self.retPath);
                                } else {
                                    self.$router.go(-1);
                                }
                            }, 1000);
                        }
                    });
                } else {
                    self.payTitle = '支付失败';
                    self.payIcon = 'warn';
                }
            }
        )
    },
  },

  //#region 生命周期函数
  mounted() {
  },
  beforeDestroy() {
    //在此集中取消不再需要的监听事件，避免不当持有造成的内存泄漏
  },
  created() {
    if(!this.userBase.uid) {
        this.$router.push('/login');
    } else if(!this.$route.params.order) {
        this.$router.push('/mine')
    } else {
        this.order = this.$route.params.order;
        console.log('wechatpay', this.order);
        this.retPath = this.$route.params.retPath;
        this.prepay();
    }
  }
  //#endregion
}
</script>