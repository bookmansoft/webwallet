<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <balance ref="balance"></balance>
    <box gap="8px 8px">
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="出售游戏金">
        <x-input type="number" name="number" ref="number" placeholder="输入出售数量" v-model="number" required ></x-input>
      </group>
      <br/>
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="接收地址">
        <x-input type="text" name="address" ref="address" placeholder="输入BTC地址" v-model="address" required ></x-input>
      </group>
      <br/>
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="BTC/游戏金(1千克)">
        <x-input type="number" name="btc" ref="btc" placeholder="输入BTC数量" v-model="btc" required ></x-input>
      </group>
      <br/>
      <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <x-button type="primary" @click.native="transPub">发布</x-button>
      </group>
    </box>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, XInput, Group, XButton, Box } from 'vux'

export default {
  components: {
    XHeader, XInput, Group, Balance, XButton, Box
  },
  data () {
    return {
      headerTitle: '发布BTC交易对',
      gameGold: '游戏金',
      msg1: "输入地址或者扫描地址二维码",
      msg2: "输入游戏金数量",
      address: '',
      number: '',
      btc: ''
    }
  },
  methods: {
      onBack() {
        this.$router.push('/wallet')
      },
      transPub() {
        if(this.chenkSend() == false) {
          return
        }
        this.contractCreate()
      },
      chenkSend() {
        const confirmed = this.$refs.balance.getConfirmed()
        let sendGold = !!this.number ? this.number : 0
        let btcGold = !!this.btc ? this.btc : 0
        if(sendGold == 0) {
          this.GLOBAL.myAlert(this.$vux.alert, '输入出售数量')
          return false
        } else if(sendGold > confirmed) {
          this.GLOBAL.myAlert(this.$vux.alert, '出售游戏金大于你当前可用总数')
          return false
        }
        if(this.address == '') {
          this.GLOBAL.myAlert(this.$vux.alert, '请输入BTC地址')
          return false
        } else if(this.GLOBAL.checkAddr(this.address)==false) {
          this.GLOBAL.myAlert(this.$vux.alert, '无效接收地址')
          return false
        }
        if(btcGold == 0) {
          this.GLOBAL.myAlert(this.$vux.alert, '输入BTC数量')
          return false
        } 
        return true
      },
      // 发送请求 获取数据
      contractCreate() {
          let data = {
            //  ntype, num, btc, addr
            func:'ContractCreate', 
            control: 'contract',
            oemInfo: this.GLOBAL.oemInfo,
            ntype: 1,
            num: this.GLOBAL.gameGoldOrigin(this.number),
            btc: this.btc * 100000000,
            addr: this.address,
            openid: this.GLOBAL.openid
          };
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if (res.data.ret == null) {
              this.GLOBAL.myAlert(this.$vux.alert, "发布失败，请确认BTC接收地址是否正确");
            } else {
              this.GLOBAL.myAlert(this.$vux.alert, '发布成功', null, function() {
                that.$router.push('/wallet/detail')
              })
            }
          }).catch(res => {
              console.log(res);
          })
      }
  },
  created() {

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

