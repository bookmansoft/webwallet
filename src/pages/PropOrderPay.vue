<!-- 道具购买订单页面
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <div v-if="data != null">
      <form-preview header-label="用游戏金支付订单" header-value="" :body-items="data.list"></form-preview>
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
      data: {},
    }
  },
  computed: {
    userBase () { return this.$store.state.user.auth; },
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

    payNow() {
      this.remote.fetching({func:'wallet.NotifyOrderPay',
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
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      if(!this.$route.params.data) {
        this.$router.push('/Message')
      } else {
        this.data = this.$route.params.data;

        if(typeof this.data.body.content == 'string') {
          this.data.body.content = JSON.parse(this.data.body.content);
        }
        this.data.list = [
          {label: '发起地址',value: 'tb1q85plul700aev4xasad0525a777y04wjkpwh74r'},
          {label: '目标地址',value: 'tb1qy0rstn8egkgy3mu3hqs47dvk3ymtl4gd03ah9c'},
          {label: '游戏编号',value: this.data.body.content.cid},
          {label: '道具名称',value: this.data.body.content.props_name},
          {label: '销售价格',value: `${this.assistant.toKg(this.data.body.content.price)}千克`},
        ];
      }
    }
  }
}
</script>