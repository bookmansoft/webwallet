<template>
  <div>
    <div v-if="isLoadMore">
      <!-- <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
        <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
          <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
        </tab-item>
      </tab> -->
      <div>
        <div v-for="(item, index) in crowdFreeItems" :key="index" class="crowdItem2">
          <flexbox @click.native="crowFreedDetail(item, index)">
            <flexbox-item :span="2" style="padding:0.1rem;">
              <div class="flex-demo-left">
                <img :src="item.src" class="img-game-list2">
              </div>
            </flexbox-item>
            <flexbox-item :span="6">
              <div style="padding-left:0px;">
                <p style="height:24px">
                  <span style="font-size:15px;">{{item.title}}</span>
                </p>
                <p>
                  <flexbox>
                    <flexbox-item :span="6">
                      <p>
                        <span style="color: #888; font-size:13px;">{{item.sales}}</span>
                      </p>
                    </flexbox-item>
                    <flexbox-item :span="6">
                      <p>
                        <span style="font-size:13px;">{{item.gold}}</span>
                      </p>
                    </flexbox-item>
                  </flexbox>
                </p>
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div style="padding-left:0px;">
                <p>
                  <span v-if="item.gold>=item.baseGold" style="color: red; font-size:15px;">+ {{parseInt(item.gold*100/item.baseGold-100)}}%</span>
                  <span v-if="item.gold<item.baseGold" style="color: blue; font-size:15px;">- {{parseInt(100-item.gold*100/item.baseGold)}}%</span>
                </p>
              </div>
            </flexbox-item>>
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
import { XButton, Tab, TabItem, Flexbox, FlexboxItem, LoadMore } from "vux";
import Navs from "@/components/Navs.vue";

const tabList = () => [
  {
    label: "众筹大厅"
  },
  {
    label: "自由市场"
  }
];

const crowdList = () => [
  {
    src: "static/img/crowd/item1.jpg",
    title: "Forza Horizon 3",
    desc: "￥ 25元起售",
    support: "60人支持",
    remainder: "剩余13天"
  },
  {
    src: "static/img/crowd/item2.jpg",
    title: "Forza Horizon 3",
    desc: "￥ 47元起售",
    support: "52人支持",
    remainder: "剩余8天"
  },
  {
    src: "static/img/crowd/item3.jpg",
    title: "Forza Horizon 3",
    desc: "￥ 47元起售",
    support: "139人支持",
    remainder: "剩余5天"
  }
];

const crowdFreeList = () => [
  {
    src: "static/img/crowd/a.jpg",
    title: "进击的兵长 代练宝宝",
    sales: "15个挂单出售",
    gold: 52.222,
    baseGold: 10,
    group: "Vallnet Co., Ltd"
  },
  {
    src: "static/img/crowd/item1.jpg",
    title: "Forza Horizon 代练宝宝 ",
    sales: "20个挂单出售",
    gold: 18.000,
    baseGold: 20,
    group: "Vallnet Co., Ltd"
  }
];

export default {
  components: {
    Navs,
    Tab,
    XButton,
    TabItem,
    Flexbox,
    FlexboxItem,
    LoadMore
  },
  data() {
    return {
      msg: "众筹",
      tabIndex: 0,
      tabItems: tabList(),
      topItem: null,
      crowdItems: [],
      crowdFreeItems: crowdFreeList(),
      isLoadMore: false
    };
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex);
    },
    crowdDetail(item, index) {
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
    crowFreedDetail(item, index) {
      this.$router.push({ name: "CrowdFreeInfo", params: { item: item } });
    },
    getStocks() {
      let data = {
        func: "Stocks",
        control: "stock",
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("mine", res.data);
        this.isLoadMore = true;
        if (res.data.errcode == "success") {
          //this.crowdItems = res.data.data
          this.topItem = res.data.data[0];
          let index = 0;
          res.data.data.forEach(element => {
            if (index > 0) {
              this.crowdItems.push(element);
            }
            index++;
          });
        }
      });
    }
  },
  created() {
    this.getStocks();
  }
};
</script>

<style scoped>
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem p {
  height: 30px;
  line-height: 30px;
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
  width: 45px;
  height: 45px;
  border-radius: 10%;
  margin-left: 4px;
}

.img-top {
  width: 100%;
  height: 180px;
  /*border-radius: 4%;*/
  border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em;
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
