<template>
  <div>
    <card :header="{title: gameGold}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>
            <!-- <countup :end-val="balance.confirmed" :duration="1" :start="doStart" :decimals=3></countup> -->
            {{balance.confirmed}}{{this.GLOBAL.gameGoldUnit}}
          </span>
          <br/>已确认
        </div>
        <div class="vux-1px-r">
          <span>
             <!-- <countup :end-val="balance.unconfirmed" :duration="1" :start="doStart" :decimals=3></countup> -->
            {{balance.unconfirmed}}{{this.GLOBAL.gameGoldUnit}}
          </span>
          <br/>未确认
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
    getConfirmed() {
      return this.balance.confirmed
    },
    getUnConfirmed() {
      return this.balance.unconfirmed
    },
    balanceChanged(info) {
      console.log('balance changed', info);
      this.GLOBAL.userBase.confirmed = info.confirmed;
      this.GLOBAL.userBase.unconfirmed = info.unconfirmed;

      this.balance = {
        confirmed: this.GLOBAL.formatGameGold(this.GLOBAL.userBase.confirmed),
        unconfirmed: this.GLOBAL.formatGameGold(this.GLOBAL.userBase.unconfirmed - this.GLOBAL.userBase.confirmed),
      }
    }
  },
  mounted() {
    //#region 根据全局数据仓库更新state，再通过消息订阅感知后续变化
    this.balanceChanged({confirmed: this.GLOBAL.userBase.confirmed, unconfirmed: this.GLOBAL.userBase.unconfirmed});
    this.remote.watch(this.balanceChanged, 911001);
    //#endregion
  },
  beforeDestroy() {
    //不再监听事件，也为了避免不当持有造成的内存泄漏
    delete this.remote.notifyHandles[911001];
  },
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