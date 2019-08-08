<!-- 我的凭证
数据接口
1. stockMgr.MyStock -> localItems
[
  {
    src,          //图片
    cid,          //CP编号
    addr,         //凭证存储地址
    sum,          //凭证存储总量
    price,        //凭证持有成本，单位 尘
    cp_desc,      //游戏描述
  },
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
        <div style="margin-top:10px">
          <div v-for="(item, index) in localItems" :key="index" class="crowdItem">
            <group>
                <flexbox class="crowdItem"  @click.native="showDetail(item, index)">
                    <flexbox-item :span="2.5" style="padding:0.3rem;">
                        <div class="flex-demo-left">
                          <img :src="item.src" class="img-game-list" />
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div style="padding-left:6px;">
                          <p><span style="font-size:15px;">{{item.title}}</span></p>
                          <p><span style="color: coral; font-size:14px;">持有 {{item.sum}} 个, 平均成本 {{parseFloat(item.price/assistant.unit.kg).toFixed(3)}} 千克</span></p>
                        </div>
                        <div style="padding-left:6px;" v-if="item.sell_sum>0">
                          <p><span style="color: #888; font-size:13px;">挂单量 {{item.sell_sum}} 挂单价 {{parseFloat(item.sell_price/assistant.unit.kg).toFixed(3)}} 千克</span></p>
                          <p><span style="color: #888; font-size:13px;">截止时间 {{item.validtime}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
          </div>
        </div>
      </scroller>
    </div>

    <div v-if="isLoadMore && localItems.length==0 && showNoData==true">
      <no-data src="/static/img/default/no-walletdetail.png"></no-data>
    </div>

    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:250px;" :show-loading="!isLoadMore"></load-more>
    </div>
  </div>
</template>
<script>
import {
  Scroller,
  XButton,
  Flexbox,
  FlexboxItem,
  LoadMore,
  Group,
} from "vux";
import { setTimeout } from "timers";
import NoData from "@/components/NoData.vue";

export default {
  name: 'Crowd',
  components: {
    Scroller,
    NoData,
    XButton,
    Flexbox,
    FlexboxItem,
    LoadMore,
    Group,
  },
  props: [
    'showType',
  ],
  data: function() {
    return {
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
        content: "向上滑动获取更多数据...",
        upContent: "向上滑动获取更多数据...",
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
    localItems() {
      return this.$store.state.stockMine.list;
    }
  },
  methods: {
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
    /**
     * 跳转至详情页
     */
    showDetail(item) {
      console.log('showDetail', item);
      this.$router.push({ name: 'MyStockInfo', params: { item: item }});
    },
    /**
     * 获取列表, flash 强制更新
     */
    getContent(flash) {
      this.isLoadMore = false;
      if(!!flash) {
        this.$store.dispatch('crowd/clear');
      }

      return this.$store.dispatch('crowd/pull').then(ret => {
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
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else { 
      this.getContent();
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

