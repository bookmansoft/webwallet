<!-- 众筹首页 -->
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
          <panel :header="Title" :list="pocketItems" :type="type" @on-click-item="itemDetail" @on-img-error="onImgError"></panel>        
        </div>
      </scroller>
    </div>

    <div v-if="isLoadMore && pocketItems.length==0 && showNoData==true">
      <no-data src="static/img/default/no-games.png"></no-data>
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
      curPage: 0,
      isLoadMore: false,
      showNoData: false,
      isActive: false,

      pocketItems: [],
    };
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    selPullDown() {
      this.showNoData = false;
      
      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getPocketList(1, true);
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
      this.getPocketList(this.curPage+1);
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
        this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    itemDetail(item) {
      console.log('goto ItemInfo', item);
      this.$router.push({ name: "ItemInfo", params: { item: item } });
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getPocketList(page, flash) {
      console.log(`query pocket: ${page}`);

      if(!!flash) {
        this.GLOBAL.pocketlist = [];
        this.pocketItems = [];
        this.curPage = 0;
      }

      let curPage = (this.pocketItems.length/10)|0 + 1;
      if(this.pocketItems.length%10==0) {
        curPage--;
      }
      if(curPage < page) {
        let totalPage = (this.GLOBAL.pocketlist.length/10)|0 + 1;
        if(this.GLOBAL.pocketlist.length%10==0) {
          totalPage--;
        }

        console.log(`totalPage: ${totalPage}`);
        console.log(`page: ${page}`);
        if(totalPage > page) {
          this.curPage++;

          let idx = 0;
          for(let element of this.GLOBAL.pocketlist) {
            if(idx < (page-1)*10) continue;
            if(idx > page*10) break;

            let game = element.cpInfo.game;
            this.pocketItems.push({
              src: game.small_img_url,
              title: game.game_title,
              desc: game.provider
            });

            idx++;
          }
          this.isLoadMore = true;
        } else {
          console.log(`item.list`);
          this.remote.fetching({
            func: "item.list", 
            page: page,
          }).then(res => {
            if (res.code == 0) {
              let qryPage = Math.min(res.data.page, res.data.total); //数据修复：查询页数不能大于总页数
              if(this.curPage < qryPage) {
                this.curPage = qryPage;

                res.data.list.forEach(item => {
                  let tps = item.id.split('.');
                  this.pocketItems.push({
                    type: tps[0],
                    id: tps[1],
                    num: item.num,
                    title: `${this.GLOBAL.ResType[tps[0]]}`,
                    desc: `类型: ${item.id} / 当前数量: ${item.num}`,
                  });
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
    this.getPocketList(1, true);
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
