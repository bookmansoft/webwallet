<!-- 交易对发布界面
-->
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
  computed:{
    balance() {return this.$store.state.user.balance},
  },
  methods: {
      onBack() {
        this.$router.push('/wallet')
      },
      transPub() {
        if(this.checkSend() == false) {
          return
        }
        this.contractCreate()
      },
      checkSend() {
        let sendGold = !!this.number ? this.number : 0
        let btcGold = !!this.btc ? this.btc : 0
        if(sendGold == 0) {
          this.utils.myAlert(this.$vux.alert, '输入参与交换的游戏金数量(单位千克)')
          return false
        } else if(sendGold > this.balance.confirmed) {
          this.utils.myAlert(this.$vux.alert, '出售数量大于你当前拥有量')
          return false
        }
        if(this.address == '') {
          this.utils.myAlert(this.$vux.alert, '请输入比特币收款地址')
          return false
        } else if(this.utils.checkAddr(this.address)==false) {
          this.utils.myAlert(this.$vux.alert, '无效的收款地址')
          return false
        }
        if(btcGold == 0) {
          this.utils.myAlert(this.$vux.alert, '输入希望交换的比特币数量(单位BTC)')
          return false
        } 
        return true
      },
      /**
       * 提交交易请求
       */
      contractCreate() {
          this.remote.fetching({
            func:'contract.ContractCreate', 
            ntype: 1,
            num: this.assistant.toAtom(this.number), //转化为尘
            btc: this.btc * 100000000, //转化为聪
            addr: this.address,
          }).then(res => {
            if (res.code != 0) {
                this.utils.myAlert(this.$vux.alert, "交易发布失败");
            } else {
                this.utils.myAlert(this.$vux.alert, '交易发布成功', null, function() {
                that.$router.push('/wallet/detail')
              })
            }
          }).catch(e => {
              console.log(e);
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

