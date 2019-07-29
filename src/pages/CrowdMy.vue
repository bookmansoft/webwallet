<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <!-- 标签1：我的凭证 -->
      <MyStock></MyStock>
    </div>
    <div v-else>
      <!-- 标签2：我的挂单 -->
      <MyBid></MyBid>
    </div>

    <!-- 导航 -->
    <navs></navs>
  </div>
</template>
<script>
import { XHeader, XButton, Tab, TabItem } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'
import MyStock from '@/components/MyStock.vue'
import MyBid from '@/components/MyBid.vue'

const tabList = () => [
  {
    label:'当前持有'
  },
  {
    label:'挂单出售中'
}];

export default {
  components: {
    Navs, XHeader, Tab, XButton, TabItem, NoData, MyStock, MyBid,
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
      tabIndex: 0,
      tabItems: tabList(),
    }
  },
  methods: {
        onBack() {
            this.$router.push('/mine')
        },
        onItemClick(index) {
          console.log(this.tabIndex)
        },
  },
  created() {
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
</style>
