<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group>
        <flexbox class="crowdItem">
            <flexbox-item :span="2.5" style="padding:0.3rem;">
                <div class="flex-demo-left">
                <img :src="crowdItem.src" class="img-game-list" />
                </div></flexbox-item>
            <flexbox-item>
                <div style="padding-left:6px;">
                <p><span style="font-size:15px;">{{crowdItem.title}}</span></p>
                <p><span style="color: coral; font-size:14px;">持有 {{crowdItem.quantity}} 个</span>
                    <x-button mini :gradients="['#FF5E3A', '#FF9500']" style="margin-left:50px;" @click.native="sale()">挂单出售</x-button>
                </p>
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
                <flexbox-item :span="6" class="flex-center">
                    <p>昨日收益</p>
                    <p>+0千克</p>
                </flexbox-item>
                <flexbox-item class="flex-center">
                    <p>累计收益</p>
                    <p>+0千克</p>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
    <div v-else>
        <!--
        <no-data src="static/img/default/no-walletdetail.png" style="margin-top:0px;"></no-data>
        -->
        <group>
          <cell :title="item.status==1 ? '买入': '卖出'" link="" 
            :inline-desc="GLOBAL.formatDateStr(new Date(item.pay_at*1000), 'yyyy-MM-dd HH:mm:ss')"
            :value="(item.status==1 ? '+': '-') + item.quantity"
            v-for="(item, index) in userStockLogs" :key="index" is-link>
          </cell>
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
      crowdItem: null, //crowdList(),
      tabItems: tabList(),
      userStockLogs: [],
      tabIndex: 0
    }
  },
  methods: {
        onBack() {
            this.$router.push('/my/stock')
        },
        onItemClick() {

        },
        sale() {
          this.$router.push({ name: 'CrowdMySale', params: { item: this.crowdItem }})
        },
        getUserStockLogs(){
            this.remote.fetching({ 
              func:'UserStockLogs', 
              control: 'stock', 
              cid: this.crowdItem.cid,
            }).then(res => {
                if(res.code == 0) {
                    this.userStockLogs = res.data;
                }
            });
        },
  },
  created() {
    this.crowdItem = this.$route.params.item
    this.getUserStockLogs()
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
