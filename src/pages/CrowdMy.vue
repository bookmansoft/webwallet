<template>
  <div>
      <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
      </tab-item>
    </tab>
    <div v-if="tabIndex==0">
      <div v-if="isLoadMore && crowdItems.length == 0">
        <no-data src="static/img/default/no-walletdetail.png"></no-data>
      </div>
      <div v-if="isLoadMore" class="crowdItem">
        <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
              <flexbox @click.native="crowdDetail(item, index)">
                <flexbox-item :span="2.5" style="padding:0.3rem;">
                  <div class="flex-demo-left">
                    <img :src="item.src" class="img-game-list" />
                  </div></flexbox-item>
                <flexbox-item>
                  <div style="padding-left:6px;">
                    <p><span style="font-size:15px;">{{item.title}}</span></p>
                    <p><span style="color: coral; font-size:14px;">持有 {{item.quantity}} 个</span></p>
                  </div>
                </flexbox-item>
              </flexbox>
        </div>
      </div>

    </div>

    <div v-else>
      <div v-if="isLoadMore && crowdFreeItems.length == 0">
        <no-data src="static/img/default/no-walletdetail.png"></no-data>
      </div>
      <div v-if="isLoadMore">
        <div v-for="(item, index) in crowdFreeItems" :key="index" class="crowdItem2">
              <flexbox @click.native="crowFreeDetail(item, index)">
                <flexbox-item :span="2.5" style="padding:0.3rem;">
                  <div class="flex-demo-left">
                    <img :src="item.src" class="img-game-list2" />
                  </div></flexbox-item>
                <flexbox-item>
                  <div style="padding-left:0px;">
                    <p><span style="font-size:15px;">{{item.title}}</span></p>
                    <p>
                      <flexbox>
                      <flexbox-item :span="8"><p><span style="color: #888; font-size:13px;">{{item.sales}}</span></p></flexbox-item>
                      <flexbox-item :span="4"><p><span style="color: red; font-size:13px;">{{item.gold}}</span></p></flexbox-item>
                      </flexbox>
                    </p>
                  </div>
                </flexbox-item>
              </flexbox>
        </div>
      </div>
    </div>
    
    <div v-if="!isLoadMore">
        <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>

    <navs></navs>

  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XHeader, XButton, Tab, TabItem, Flexbox, FlexboxItem, LoadMore } from 'vux'
import Navs from '@/components/Navs.vue'
import NoData from '@/components/NoData.vue'

const tabList = () => [
  {
    label:'当前持有'
  },{
    label:'挂单出售中'
}]

const crowdList = () => [
  {
    src: 'static/img/crowd/item1.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 25元起售',
    support: '60人支持',
    remainder: '剩余13天'
  },{
    src: 'static/img/crowd/item2.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 47元起售',
    support: '52人支持',
    remainder: '剩余8天'
  },{
    src: 'static/img/crowd/item3.jpg',
    title: 'Forza Horizon 3',
    desc: '￥ 47元起售',
    support: '139人支持',
    remainder: '剩余5天'
  }
]

const crowdFreeList = () => [
  {
    src: 'static/img/crowd/a.jpg',
    title: '进击的兵长 代练宝宝',
    sales: '15个挂单出售',
    gold: '11000.000',
    group: 'Vallnet Co., Ltd'
  },{
    src: 'static/img/crowd/item1.jpg',
    title: 'Forza Horizon 代练宝宝 ',
    sales: '20个挂单出售',
    gold: '800.00',
    group: 'Vallnet Co., Ltd'
  }
]

export default {
  components: {
    Navs, XHeader, Tab, XButton, TabItem, Flexbox, FlexboxItem, NoData, LoadMore
  },
  data () {
    return {
      headerTitle: '我的代练宝宝',
      msg: '众筹',
      tabIndex: 0,
      tabItems: tabList(),
      crowdItems: [], //crowdList(),
      crowdFreeItems: [], //crowdFreeList(),
      isLoadMore: false
    }
  },
  methods: {
        onBack() {
            this.$router.push('/mine')
        },
        onItemClick(index) {
          console.log(this.tabIndex)
        },
        crowdDetail(item, index) {
          this.$router.push({ name: 'CrowdMyInfo', params: { item: item }})
        },
        crowFreeDetail(item, index) {
          this.$router.push({ name: 'CrowdFreeInfo', params: { item: item }})
        },
        getUserStocks(){
            this.remote.fetching({func:'UserStocks', control: 'stock'}).then(res => {
                this.isLoadMore = true;
                this.crowdItems = res.data;
            });
        },
  },
  created() {
    this.getUserStocks()
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
