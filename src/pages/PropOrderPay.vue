<!-- 道具购买订单页面
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
    <div v-if="data != null">
      <form-preview header-label="支付游戏金" header-value="" :body-items="data.list"></form-preview>
    </div>
    <br>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
      <div style="padding:15px;background-color:white;">
        <x-button type="primary" @click.native="payNow()">立即支付</x-button>
      </div>
    </group>
  </div>
</template>

<script>
import { FormPreview, XHeader, XButton, Group } from 'vux'

export default {
  components: {
    FormPreview, XHeader, XButton, Group
  },
  data () {
    return {
      headerTitle: '订单支付',
      list: [{
        label: '道具',
        value: '电动打蛋机'
      }],
      buttons: [{
        style: 'primary',
        text: '点击事件',
        onButtonClick: () => {
          this.payOrder()
        }
      }],
      data: null
    }
  },
  methods: {
    onBack() {
        this.$router.go(-1)
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
          }, 2000)
    },

    payOrder() {
      alert('ddd')
    },

    payNow() {
      if(this.data == null || this.global.openid == '') {
        return
      }
      let order = this.data.order
      if(order == null) {
        return
      }

      this.remote.fetching({func:'NotifyOrderPay', control: 'wallet',
        openid: this.global.openid,
        sn: this.data.sn,
      }).then(res => {
          if(res.code == 0) {
            this.showPluginAuto('支付成功')
          } else {
            this.showPluginAuto('支付异常')
          }
          
          setTimeout(() => {
              this.$router.push('/Message')
          }, 2000);
      });
    }
  },

  created() {
    if(!!!this.$route.params.data) {
      this.$router.push('/Message')
    } else {
      this.data = this.$route.params.data;
      let obj = JSON.parse(this.data.content);
      if(!!obj && obj.hasOwnProperty('cid') && obj.hasOwnProperty('price') && obj.hasOwnProperty('sn')) { 
        console.log(obj)
        this.data.order = obj
        this.data.list = new Array()
        this.data.list.push({
          label: '道具名称',
          value: '屠龙刀'
        })
        this.data.list.push({
          label: '价格',
          value: this.gamegold.toKg(obj.price) + '千克'
        })
      } else {
        this.$router.push('/Message')
      }
    }
  }
}
</script>