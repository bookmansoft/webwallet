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
    <div v-if="isLoadMore">
      <scroller
        v-model="scrollerStatus"
        height="-100"
        lock-x
        scrollbar-y
        ref="scroller"
        :bounce="true"
        :use-pulldown="true"
        :pulldown-config="downobj"
        @on-pulldown-loading="selPullDown"
        :use-pullup="true"
        :pullup-config="upobj"
        @on-pullup-loading="selPullUp"
      >
        <div>
          <div v-for="(item, index) in stockItems" :key="index">
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
                    <div style="margin-left:5px;display:block;margin-top:6px;border-radius: 5px;text-align:center;line-height:26px;width:60px;height:26px;background-color:#ff7164;font-size:13px;color:white">{{item.sell_price}}</div>
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
      </scroller>
    </div>

    <div v-if="isLoadMore && stockItems.length==0 && showNoData==true">
      <no-data src="/static/img/default/no-games.png"></no-data>
    </div>
    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:250px;" :show-loading="!isLoadMore"></load-more>
    </div>

    <navs></navs>
  </div>
</template>

<script>
import {
  Panel,
  Scroller,
  XButton,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  LoadMore,
  XProgress,
  Box
} from "vux";
import Navs from "@/components/Navs.vue";
import XXProgress from "@/components/XXProgress.vue";
import { setTimeout } from "timers";
import NoData from "@/components/NoData.vue";

export default {
  name: 'Pocket',
  components: {
    Panel,
    Scroller,
    NoData,
    Navs,
    Tab,
    XButton,
    TabItem,
    Flexbox,
    FlexboxItem,
    LoadMore,
    XXProgress,
    Box
  },
  data: function() {
    return {
      type: '2',
      Title: '背包一览',
      downobj: {
        content: "下拉刷新数据...",
        downContent: "下拉刷新数据...",
        upContent: "释放刷新数据",
        loadingContent: "加载中...",
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        clsPrefix: "xs-plugin-pulldown-"
      },
      upobj: {
        content: "",
        upContent: "",
        downContent: "释放获取数据",
        loadingContent: "加载中...",
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        clsPrefix: "xs-plugin-pullup-"
      },
      scrollerStatus: {
        pullupStatus: "default"
      },
      isLoadMore: false,
      showNoData: false,
      isActive: false,
    };
  },
  computed: {
    stockItems () {
      return this.$store.state.stock.list;
    },
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    selPullDown() {
      this.showNoData = false;
      
      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getContent(true);
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.reset({ top: 0 });
        }
      }, 1000);
    },
    selPullUp() {
      this.showNoData = false;

      //用户选择上滑获取新数据，更新当前页码
      this.getContent();
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
        this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    itemDetail(item) {
      this.$router.push({ name: "StockInfo", params: { item: item } });
    },
    /**
     * 获取列表, flash 强制更新
     */
    getContent(flash) {
      this.isLoadMore = false;
      if(!!flash) {
        this.$store.dispatch('stock/clear');
      }

      return this.$store.dispatch('stock/pull').then(ret => {
        this.isLoadMore = true;

        if(!ret) {
          //没有新的数据了，禁止继续下拉
          this.scrollerStatus.pullupStatus = 'disabled';
        }
      });
    },
  },
  mounted() {
    this.isActive = true;
  },
  beforeDestroy() {
    this.isActive = false;
  },
  created() {
    this.getContent();
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
