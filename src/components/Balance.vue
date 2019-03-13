<template>
  <div>
    <card :header="{title: gameGold}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>
            <!--
            <countup :end-val="balance.confirmed" :duration="1" :start="doStart" :decimals=3></countup>
            -->
            {{balance.confirmed}}
            {{this.GLOBAL.gameGoldUnit}}
          </span><br/>已确认
        </div>
        <div class="vux-1px-r">
           <span>
             <!--
             <countup :end-val="balance.unconfirmed" :duration="1" :start="doStart" :decimals=3></countup>
             -->
            {{balance.unconfirmed}}
            {{this.GLOBAL.gameGoldUnit}}
          </span><br/>未确认
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Card, Countup } from 'vux'

export default {
  components: {
    Card, Countup
  },
  data () {
    return {
      gameGold: '游戏金',
      balance: {
        confirmed: 0,
        unconfirmed: 0
      },
      doStart: false
    }
  },
  methods: {
      // 账户余额
      balanceAll() {
          let data = {func:'BalanceAll', control: 'wallet', uid: this.GLOBAL.userBase.uid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              this.balance.confirmed = this.GLOBAL.formatGameGold(res.data.balance.confirmed)
              this.balance.unconfirmed = this.GLOBAL.formatGameGold(res.data.balance.unconfirmed-res.data.balance.confirmed)
              //this.balance.unconfirmed = this.balance.unconfirmed - this.balance.confirmed
              this.doStart = true
          }).catch(res => {
              console.log(res)
          })
      },
      getConfirmed() {
        return this.balance.confirmed
      },
      getUnConfirmed() {
        return this.balance.unconfirmed
      }
  },
  created() {
      this.balanceAll()
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