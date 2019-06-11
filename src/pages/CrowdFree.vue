<template>
  <div class="root" style="background-color:white;margin-top:0px">
    <div v-if="isLoadMore">
      <div v-for="(item, index) in crowdFreeItems" :key="index">
        <flexbox @click.native="crowFreedDetail(item, index)">
          <flexbox-item :span="2">
            <div class="flex-demo-left">
              <img
                :src="item.src"
                style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
              >
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div style="padding-left:0px;">
              <p style="height:24px">
                <span style="color: #919191; font-size:15px;">{{item.title}}</span>
              </p>
              <p>
                <span style="font-size:13px;">{{item.sales}}</span>
              </p>
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div style="padding-left:0px;">
              <p style="height:24px">
                <span style="color: #919191; font-size:15px;">单价/份(千克)</span>
              </p>
              <div style="display:block;border-radius: 5px;text-align:center;line-height:30px;width:60px;height:30px;background-color:#ff7164;font-size:13px;color:white">
                {{item.gold}}
              </div>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:2px;background-color:#f3f3f3"></div>
          </flexbox-item>
        </flexbox>
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
    gold: 18.0,
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
.root {
  overflow-x: hidden;
}
</style>
