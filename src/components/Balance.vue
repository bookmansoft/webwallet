<!-- 余额查询组件，被多个页面直接引用
数据来源：
state.user.balance -> balance
-->
<template>
  <div>
    <card :header="{title: assistant.gameGoldAccount}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r confirm">
          已确认:{{balance.confirmed}}{{this.assistant.gameGoldUnit}}
        </div>
        <div class="vux-1px-r unconfirm">
          待确认:{{balance.unconfirmed}}</countup>{{this.assistant.gameGoldUnit}}
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
  computed:{
    balance() {return this.$store.state.user.balance},
  },
}
</script>

<style scoped lang="less">
.confirm {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 1.1em;
  color: #04BE02;
}
.unconfirm {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 1.1em;
  color: #f74c31;
}
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
</style>