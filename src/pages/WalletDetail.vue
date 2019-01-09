<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <balance></balance>
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
</template>

<script>
import Balance from '@/components/Balance.vue'
import { XHeader, Group, Box, Cell } from 'vux'
const getItems = () => [
  {title: '2018-12-24', is_link: false, img: 'static/img/icon1/1.png', badge: 0, desc: '接收 1021', link: {path:'/wallet'}},
  {title: '2018-12-25', is_link: false, img: 'static/img/icon1/7.png', badge: 0, desc: '发送 1022', link: {path:'/wallet'}},
  {title: '2018-12-26', is_link: false, img: 'static/img/icon1/1.png', badge: 0, desc: '接收 1023', link: {path:'/wallet'}},
  {title: '2018-12-27', is_link: false, img: 'static/img/icon1/7.png', badge: 0, desc: '发送 1024', link: {path:'/wallet'}}
]
export default {
  components: {
    XHeader, Group, Balance, Box, Cell
  },
  data () {
    return {
      headerTitle: '交易流水',
      gameGold: '游戏金',
      address: '',
      number: 0.0,
      items: []//getItems()
    }
  },
  methods: {
      onBack() {
        //this.$router.push('/wallet')
        this.$router.go(-1)
      },
      //获取交易记录
      getTxLogs() {
          let data = {func:'TxLogs', control: 'wallet', openid: this.GLOBAL.openid, oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              //this.txLogs = res.data.list;
              console.log(res.data);
              for(var i=0; i<res.data.list.length; i++) {
                  var item = res.data.list[i];
                  //var _item = {};
                  if(item.amount != 0) {
                      //item.title = formatDateStr(new Date(item.time*1000), 'yyyy-MM-dd HH:mm:ss');
                      item.is_link = false
                      item.link = {path:'/wallet'}
                      item.badge = 0
                      item.title = this.GLOBAL.formatDateStr(new Date(item.time*1000), 'MM-dd HH:mm:ss');
                      if(item.category=='receive') {
                        item.img = 'static/img/icon1/1.png'
                        item.desc = '接收 ' + this.GLOBAL.formatGameGold(item.amount * 10000 * 10000) + '千克'
                      } else {
                        item.img = 'static/img/icon1/7.png'
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
              this.items.forEach(element => {
                console.log(element.amount)
              });
              
          }).catch(res => {
              console.log(res);
          })
      }
  },
  created() {
    this.getTxLogs()
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

