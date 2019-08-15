<!-- 我持有的指定凭证的详情
数据接口
1. stock.UserStockLogs -> userStockLogs
[
  {
    "height",      //交易高度
    "txid",        //交易哈希
    "type",        //交易类型
        {
          1: '发行凭证', sum 发行数量 addr 凭证发行者(交易发起者) to 没有意义   price 发行价格
          2: '购买凭证', sum 买入数量 addr 凭证买入者(交易发起者) to 凭证拥有者 price 无意义
          3: '转让凭证', sum 转让数量 addr 凭证拥有者(交易发起者) to 凭证接收者 price 无意义
          4: '凭证分成', sum 没有意义 addr 分成受益者(分成诉求方) to 没有意义   price 分成数量
          5: '媒体分成', sum 没有意义 addr 分成受益者(分成诉求方) to 没有意义   price 分成数量
          6: '拍卖凭证', sum 拍卖数量 addr 凭证拍卖者(交易发起者) to 无意义     price 拍卖价格
          7: '竞买凭证', sum 买入数量 addr 凭证买入者(交易发起者) to 凭证拥有者 price 买入价格
        }
    "cid",         //CP编号
    "sum",         //交易数量
    "addr,         //交易相关地址
    "to",          //目标地址
    "price",       //交易价格
    "sn",          //交易流水号
  }
]
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <group>
        <flexbox class="crowdItem">
            <flexbox-item :span="2.5" style="padding:0.3rem;">
                <div class="flex-demo-left"><img :src="crowdItem.src" class="img-game-list" /></div>
            </flexbox-item>
            <flexbox-item>
                <div style="padding-left:6px;">
                  <p>
                    <div style="font-size:15px;">{{crowdItem.title}}</div>
                    <div style="color: coral; font-size:14px;">持有 {{crowdItem.sum}} 个</div>
                    <span style="color: coral; font-size:14px;">成本 {{parseFloat(crowdItem.price / unit.kg).toFixed(3)}} 千克</span>
                  </p>
                </div>
                <div v-if="crowdItem.sell_sum>0">
                  <p><span style="color: #888; font-size:13px;">挂单量 {{crowdItem.sell_sum}} 挂单价 {{parseFloat(crowdItem.sell_price/unit.kg).toFixed(3)}} 千克</span></p>
                  <p><span style="color: #888; font-size:13px;">截止时间 {{crowdItem.validtime}}</span></p>
                </div>
                <div v-if="crowdItem.sell_sum==0">
                  <x-button mini :gradients="['#FF5E3A', '#FF9500']" @click.native="sale()">挂单出售</x-button>
                </div>
            </flexbox-item>
        </flexbox>
    </group>


    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
        <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
          <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
        </tab-item>
    </tab>

    <div v-if="tabIndex==0">
        <div style="padding:10px;">
            <flexbox>
                <flexbox-item class="flex-center">
                    <p>累计收益</p>
                    <p>+{{bonus}}千克</p>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
    <div v-else>
        <group>
          <cell 
            v-for="(item, index) in userStockLogs" :key="index" is-link
            :title="item.type==3 ? '转出': '买入'" 
            link="" 
            :inline-desc="item.time"
            :value="(item.type==3 ? '-': '+') + item.sum"
          ></cell>
        </group>
    </div>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XHeader, XButton, Tab, TabItem, Flexbox, Group, FlexboxItem, LoadMore, Cell } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'

const tabList = () => [
  {
    label:'收益情况'
  },{
    label:'交易记录'
}]

export default {
  components: {
    Navs, XHeader, Tab, XButton, TabItem, Flexbox, FlexboxItem, NoData, Group, LoadMore, Cell
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
      crowdItem: null,
      tabItems: tabList(),
      tabIndex: 0
    }
  },
  computed: {
    userStockLogs() { return this.$store.state.stockMine.logs; },
    bonus() { return this.$store.state.stockMine.bonus; },
    unit() {return this.$store.state.config.dict['base'];},
  },
  methods: {
        onBack() {
          this.$router.push('/crowd/my')
        },
        onItemClick() {
        },
        sale() {
          this.$router.push({ name: 'MyStockSale', params: { item: this.crowdItem }})
        },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else { 
      this.crowdItem = this.$route.params.item;
      console.log('MyStockInfo', this.crowdItem);

      this.$store.dispatch('stockMine/UserStockLogs', {
        cid: this.crowdItem.cid, 
        addr: this.crowdItem.addr
      });
    }
  }
}
</script>

<style scoped>
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem p {
  height: 45px;
  line-height: 45px;
}

.crowdItem2 {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem2 p {
  height: 40px;
  line-height: 40px;
}

.crowd-car {
  padding: 10px; 
  /*background-color: white; */ 
  /*border-radius: 4%;*/
}

.img-game-list {
    width: 75px;
    height: 75px;
    border-radius: 12%;
    margin-left: 3px;
}

.img-game-list2 {
    width: 65px;
    height: 65px;
    border-radius: 10%;
    margin-left: 4px;
}

.img-top {
  width:100%;
  height:180px;
  /*border-radius: 4%;*/
  border-top-left-radius:1.5em; 
  border-top-right-radius:1.5em; 
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
.flex-center {
  font-size: 15px;
  text-align: center;
  padding: 5px;
}
.flex-center p {
  height: 30px;
  line-height: 30px;
}
</style>
