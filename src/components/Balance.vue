<!-- 余额查询组件，被多个页面直接引用

2. 事件订阅
911001
-->
<template>
  <div>
    <card :header="{title: gameGold}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r confirm">
          已确认:{{balance.confirmed}}{{this.gamegold.gameGoldUnit}}
        </div>
        <div class="vux-1px-r unconfirm">
          待确认:{{balance.unconfirmed}}</countup>{{this.gamegold.gameGoldUnit}}
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
    }
  },
  computed:{
    balance() {return this.$store.state.gamegold.balance},
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
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