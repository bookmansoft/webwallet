<!-- 我的凭证页面
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <MyStock :showType="1"></MyStock>
    <!-- 导航 -->
    <navs></navs>
  </div>
</template>
<script>
import { XHeader, XButton } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'
import MyStock from '@/components/MyStock.vue'

export default {
  components: {
    Navs, XHeader, XButton, NoData, MyStock,
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
    }
  },
  methods: {
        onBack() {
            this.$router.push('/mine')
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
