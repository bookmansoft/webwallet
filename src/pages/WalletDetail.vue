<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <balance></balance>
    <div v-if="isLoadMore && items.length > 0">
      <box gap="8px 8px">
        <group title="交易流水">
            <cell :is-link="item.is_link" v-for="(item, index) in items" :key="index" :inline-desc="item.desc">
                <span slot="title">
                <span style="vertical-align:middle;">{{item.title}}</span>
                <badge :text="item.badge" v-if="item.badge > 0"></badge>
                </span>
                <img slot="icon" width="32" style="display:block;margin-right:15px;" :src="item.img">
            </cell>
        </group>
      </box>
    </div>

    <div v-if="isLoadMore && items.length == 0">
        <no-data src="static/img/default/no-walletdetail.png"></no-data>
    </div>

    <div v-if="!isLoadMore">
        <load-more tip="正在加载" style="position: relative; top:100px;" :show-loading="!isLoadMore"></load-more>
    </div>
  </div>
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Group, Box, Cell, LoadMore } from 'vux'
import NoData from '@/components/NoData.vue'
import { setTimeout } from 'timers';

export default {
  components: {
    XHeader, Group, Balance, Box, Cell, LoadMore, NoData
  },
  data () {
    return {
      headerTitle: '交易流水',
      gameGold: '游戏金',
      address: '',
      number: 0.0,
      isLoadMore: false,
      items: []
    }
  },
  methods: {
      onBack() {
        this.$router.go(-1)
      },
      //获取交易记录
      getTxLogs() {
          this.remote.fetching({func:'TxLogs', control: 'wallet',}).then(res => {
              for(var i=0; i<res.data.list.length; i++) {
                  var item = res.data.list[i];
                  if(item.amount != 0) {
                      item.is_link = false
                      item.link = {path:'/wallet'}
                      item.badge = 0
                      item.title = this.GLOBAL.formatDateStr(new Date(item.time*1000), 'MM-dd HH:mm:ss');
                      if(item.category=='receive') {
                        item.img = 'static/img/wallet/rec.png'
                        item.desc = '接收 ' + this.GLOBAL.formatGameGold(item.amount * 10000 * 10000) + '千克'
                      } else {
                        item.img = 'static/img/wallet/send.png'
                        item.desc = '发送 ' + this.GLOBAL.formatGameGold(item.amount * 10000 * 10000) + '千克'
                      }
                      this.items.push(item);
                  }
              }
              if(this.items.length >0 ) {
                  this.items.sort(function(a, b){
                      return  b.time - a.time;
                  });
              }
              this.isLoadMore = true
          }).catch(e => {
              console.log(e);
              this.isLoadMore = true
          })
      }
  },
  created() {
    setTimeout(()=>{
      this.getTxLogs()
    }, 800) 
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

