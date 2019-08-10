<!-- 交易对发布界面
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <balance ref="balance" :balance="balance"></balance>

    <box gap="8px 8px">
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="出让的游戏金(千克)">
        <!-- todo x-input 这个控件使用 number 类型时就会报错，疑为控件本身缺陷，暂时以 text 取代 -->
        <x-input type="text" name="num" ref="num" placeholder="输入游戏金数量" v-model="num" required ></x-input>
      </group>
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="比特币收款地址">
        <x-input type="text" name="address" ref="address" placeholder="输入您的比特币地址" v-model="address" required ></x-input>
      </group>
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="希望交换的比特币数量(BTC)">
        <x-input type="text" name="btc" ref="btc" placeholder="输入比特币数量" v-model="btc" required ></x-input>
      </group>
      <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <x-button type="primary" @click.native="transPub">发布</x-button>
      </group>
    </box>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, XInput, Group, XButton, Box, } from 'vux'

export default {
  components: {
    XHeader, XInput, Group, Balance, XButton, Box,
  },
  data () {
    return {
      headerTitle: '发布交易对',
      gameGold: '游戏金',
      msg1: "输入地址或者扫描地址二维码",
      msg2: "输入游戏金数量",
      address: '',
      num: 0,
      btc: 0,
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
        this.checkSend() && this.contractCreate();
      },
      checkSend() {
        let sendGold = parseFloat(this.num || 0).toFixed(3);
        let btcGold = parseFloat(this.btc || 0).toFixed(3);

        if(!sendGold) {
          this.utils.myAlert(this.$vux.alert, '请输入游戏金数量(千克)')
          return false
        }
        
        if(sendGold > this.balance.confirmed) {
          this.utils.myAlert(this.$vux.alert, '错误: 输入数量大于当前拥有量')
          return false
        }

        if(!this.address) {
          this.utils.myAlert(this.$vux.alert, '请输入比特币收款地址')
          return false
        }
        
        if(this.utils.checkAddr(this.address)==false) {
          this.utils.myAlert(this.$vux.alert, '错误: 无效的收款地址')
          return false
        }

        if(btcGold == 0) {
          this.utils.myAlert(this.$vux.alert, '请输入希望交换的比特币数量(BTC)')
          return false
        } 
        
        return true;
      },
      /**
       * 提交交易请求
       */
      contractCreate() {
        this.$store.dispatch('contract/create', {
            ntype: 1,
            num: this.assistant.toAtom(this.num), //转化为尘
            btc: this.btc * 100000000, //转化为聪
            addr: this.address,
        }).then(res => {
            if (res.code == 0) {
                this.utils.myAlert(this.$vux.alert, '交易发布成功', null, () => {
                  this.$router.push('/wallet/detail')
              })
            } else {
              throw new Error(`交易发布失败${res.code}`);
            }
          }).catch(e => {
              this.utils.myAlert(this.$vux.alert, "交易发布失败");
              this.$router.push('/wallet');
          })
      }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
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
