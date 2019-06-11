<template>
  <div class="root" style="background-color:white;margin-top:0px">
    <div v-if="isLoadMore">
      <div v-for="(item, index) in crowdFreeItems" :key="index">
        <div style="display:block;margin-top:8px;margin-bottom:8px">
          <flexbox @click.native="crowFreedDetail(item, index)">
            <flexbox-item :span="2">
              <div class="flex-demo-left">
                <img
                  :src="item.icon_url"
                  style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
                >
              </div>
            </flexbox-item>
            <flexbox-item :span="6">
              <div style="margin-top:0px;">
                <span style="color: #919191; font-size:12px;">{{item.cp_text}}</span>
              </div>
              <div style="margin-top:6px;">
                <span style="font-size:15px;">{{item.sell_stock_num}}</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div style="margin-left:10px">
                <div style="height:24px;margin-top:10px;margin-bottom:-10px;">
                  <span style="color: #919191; font-size:12px;line-height:18px;">单价/份(千克)</span>
                </div>
                <div
                  style="margin-left:5px;display:block;margin-top:6px;border-radius: 5px;text-align:center;line-height:26px;width:60px;height:26px;background-color:#ff7164;font-size:13px;color:white"
                >{{item.sell_stock_amount}}</div>
                <div style="display:block;height:12px"></div>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:3px;background-color:#f3f3f3"></div>
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
      crowdFreeItems: this.crowdFreeList(),
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
    crowdFreeList() {
      return [
        {
          icon_url: "static/img/crowd/a.jpg",
          cp_text: "进击的兵长 代练宝宝",
          sell_stock_num: "15个挂单出售",
          sell_stock_amount: 52.222
        },
        {
          icon_url: "static/img/crowd/item1.jpg",
          cp_text: "Forza Horizon 代练宝宝 ",
          sell_stock_num: "20个挂单出售",
          sell_stock_amount: 18.0
        }
      ];
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
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
