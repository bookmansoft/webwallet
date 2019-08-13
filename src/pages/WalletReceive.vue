<!-- 游戏金接收地址展示页面
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <balance :balance="balance"></balance>
    <box gap="8px 8px">
        <group title="接收二维码">
            <div style="text-align:center;padding: 20px 0px 20px 0px">
                <qrcode :value="address" type="img" @click.native="getAddress()"></qrcode>
            </div>
        </group>
        <group title="接收地址">
            <div style="text-align:center;padding: 20px 0px 20px 0px">
                <p><span class="tag-read">{{address}}</span></p>
            </div>
        </group>
        <group label-width="3.5em" label-margin-right="2em" label-align="right">
            <x-button type="primary" @click.native="copyAddr(address, $event)">复制地址</x-button>
        </group>
    </box>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Group, XButton, Box, Qrcode } from 'vux'
import Clipboard from 'clipboard'

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
  computed:{
    userBase() {return this.$store.state.user.auth},
    balance() {return this.$store.state.user.balance},
  },
  methods: {
      onBack() {
        this.$router.push('/wallet')
      },
      copyAddr(text, event){
        const clipboard = new Clipboard(event.target, {
          text: () => text
        })
        clipboard.on('success', e => {  
          // 释放内存  
          this.$vux.toast.show({text: '已复制到剪贴板'})
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {  
          // 不支持复制  
          // 释放内存  
          this.$vux.toast.show({text: '浏览器不支持复制'})
          clipboard.destroy()  
        })  
      },
      getAddress() {
        this.$store.dispatch('wallet/createaddress').then(res => {
            if(res.code == 0) {
              this.address = res.data;
            }
        })
      },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    } else {
      this.address = this.userBase.acaddr;
    }
  }
}
</script>

<style scoped lang="less">

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

