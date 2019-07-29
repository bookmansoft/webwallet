<!-- 我的凭证挂单 -->
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
            <flexbox @click.native="showDetail(item, index)">
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
      </scroller>
    </div>

    <div v-if="isLoadMore && localItems.length==0 && showNoData==true">
      <no-data src="static/img/default/no-walletdetail.png"></no-data>
    </div>
    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:250px;" :show-loading="!isLoadMore"></load-more>
    </div>

    <navs></navs>
  </div>
</template>
<script>
import {
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
  name: 'Crowd',
  components: {
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
      curPage: 0,
      isLoadMore: false,
      showNoData: false,
      isActive: false,

      localItems: [],     //众筹项目列表
    };
  },
  methods: {
    selPullDown() {
      this.showNoData = false;
      
      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getcrowdlist(1, true);
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
      this.getcrowdlist(this.curPage+1);
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
        this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    showDetail(item) {
      console.log('crowdDetail', item);
      this.$router.push({ name: 'CrowdFreeInfo', params: { item: item }});
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getcrowdlist(page, flash) {
      console.log(`query page: ${page}`);

      if(!!flash) {
        this.GLOBAL.bidlist = [];
        this.localItems = [];
        this.curPage = 0;
      }

      let curPage = (this.localItems.length/10)|0 + 1;
      if(this.localItems.length%10==0) {
        curPage--;
      }
      if(curPage < page) {
        let totalPage = (this.GLOBAL.bidlist.length/10)|0 + 1;
        if(this.GLOBAL.bidlist.length%10==0) {
          totalPage--;
        }

        if(totalPage > page) {
          this.curPage++;

          let idx = 0;
          for(let element of this.GLOBAL.bidlist) {
            if(idx < (page-1)*10) continue;
            if(idx > page*10) break;

            let game = element.cpInfo.game;
            this.localItems.push({
              src: game.small_img_url,
              title: game.game_title,
              desc: game.provider
            });

            idx++;
          }
          this.isLoadMore = true;
        } else {
          this.remote.fetching({
            func: "stockMgr.MyStock", 
            page: page,
            type: 1, //查询我的挂单
          }).then(res => {
            // src: 'static/img/crowd/a.jpg',
            // title: '进击的兵长 代练宝宝',
            // sales: '15个挂单出售',
            // gold: '11000.000',
            if (res.code == 0) {
              let qryPage = Math.min(res.data.page, res.data.total); //数据修复：查询页数不能大于总页数
              if(this.curPage < qryPage) {
                this.curPage = qryPage;

                res.data.list.forEach(cpItem => {
                  this.localItems.push(cpItem);
                });
              } else {
                //没有新的数据了，禁止继续下拉
                this.scrollerStatus.pullupStatus = 'disabled';
              }

              setTimeout(() => {
                this.isLoadMore = true;
              }, 500);
            }
          });
        }
      }      
    }
  },

  mounted() {
    this.isActive = true;
  },
  beforeDestroy() {
    this.isActive = false;
  },
  created() {
    this.getcrowdlist(1);
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
