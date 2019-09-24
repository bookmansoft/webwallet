<!-- 二级市场首页
数据接口
1. stockMgr.BidList -> stockItems
[
  {
      cid           CP编码
      addr          持有地址
      sum           持有总量
      price         持有成本，单位尘
      sell_price    拍卖价格，单位尘
      sell_sum      拍卖数量
      period        截至日期，单位块高度
  }
]
-->
<template>
  <div class="root" style="background-color:white;margin-top:-8px">
    <ScrollViewer :config="config">
      <template v-slot:default="props">
          <div v-for="(item, index) in props.content" :key="index">
            <div style="display:block;margin-top:8px;margin-bottom:8px">
              <flexbox @click.native="itemDetail(item, index)">
                <flexbox-item :span="2">
                  <div class="flex-demo-left"><img :src="item.icon_url" style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"></div>
                </flexbox-item>
                <flexbox-item :span="6" style="padding-left:5px">
                  <div style="margin-top:0px;">
                    <span style="color: #919191; font-size:12px;">{{item.cp_text}}</span>
                  </div>
                  <div style="margin-top:6px;">
                    <span style="font-size:15px;">{{item.sell_sum}}份在售</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="4">
                  <div style="margin-left:10px">
                    <div style="height:24px;margin-top:10px;margin-bottom:-10px;">
                      <span style="color: #919191; font-size:12px;line-height:18px;">单价/份(千克)</span>
                    </div>
                    <div style="margin-left:5px;display:block;margin-top:6px;border-radius: 5px;text-align:center;line-height:26px;width:60px;height:26px;background-color:#ff7164;font-size:13px;color:white">
                      {{parseFloat(item.sell_price/100000).toFixed(3)}}
                    </div>
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
      </template>
    </ScrollViewer>

    <navs></navs>
  </div>
</template>

<script>
import {
  XButton,
  Flexbox,
  FlexboxItem,
} from "vux";
import ScrollViewer from "@/components/ScrollViewer.vue";
import Navs from "@/components/Navs.vue";

export default {
  name: 'Stocks',
  components: {
    XButton,
    Flexbox,
    FlexboxItem,
    ScrollViewer,
    Navs,
  },
  data: function() {
    return {
      config: {
        store: `stock`,
        nodata: '/static/img/default/no-games.png',   //列表为空时的占位图片
      }
    };
  },
  methods: {
    itemDetail(item) {
      this.$router.push({ name: "StockInfo", params: { item: item } });
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
}
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}
.img-top {
  width: 100%;
  height: 180px;
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
