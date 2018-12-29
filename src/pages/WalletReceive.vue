<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <balance></balance>
    <box gap="8px 8px">
        <group title="接收二维码">
            <div style="text-align:center;padding: 20px 0px 20px 0px">
                <qrcode :value="address" type="img"></qrcode>
            </div>
        </group>
        <group title="接收地址">
            <div style="text-align:center;padding: 20px 0px 20px 0px">
                <p><span>{{address}}</span></p>
            </div>
        </group>
        <group label-width="3.5em" label-margin-right="2em" label-align="right">
            <x-button type="primary">复制地址</x-button>
        </group>
    </box>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Group, XButton, Box, Qrcode } from 'vux'

export default {
  components: {
    XHeader, Group, Balance, XButton, Box, Qrcode
  },
  data () {
    return {
      headerTitle: '接收游戏金',
      gameGold: '游戏金',
      address: '',
      number: 0.0
    }
  },
  methods: {
      onBack() {
        this.$router.push('/wallet')
      },
  },
  created() {
    console.log('this.GLOBAL.userProfile', this.GLOBAL.userProfile)
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    } else {
      this.address = this.GLOBAL.userProfile.block_addr
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

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
</style>

