<!-- 游戏列表
数据接口
1. cp.List
-->
<template>
  <div>
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
          <div style="height:5px;"></div>
          <div style="background-color: white">
            <div style="padding:10px 10px 0px 10px;">
              <img :src="recommendGame.src" class="img-top">
            </div>
            <div>
              <p style="font-size:15px;padding: 5px 0px 0px 10px;">
                <span style="color:red;">推荐</span>
                <span style="margin-left:5px;">{{recommendGame.gameTitle}}</span>
              </p>
            </div>
            <div>
              <p
                style="font-size:13px; color: #888;padding: 5px 0px 10px 10px;"
              >{{recommendGame.gameProvider}}</p>
            </div>
          </div>
          <div v-for="(item, index) in gameList" :key="index" class="gameItem">
            <flexbox @click.native="gotoCpInfo(item, index)">
              <flexbox-item :span="4" style="padding:0.3rem;">
                <div class="flex-demo-left">
                  <img :src="item.small_img_url" class="img-game-list">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p>
                    <span style="font-size:15px;">{{item.game_title}}</span>
                  </p>
                  <br>
                  <p>
                    <span style="color: #888; font-size:14px;">{{item.game_desc}}</span>
                  </p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <br>
        </div>
      </scroller>
      <br>
    </div>
    <div v-if="isLoadMore && gameList.length==0 && showNoData==true">
      <no-data src="/static/img/default/no-games.png"></no-data>
    </div>
    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>
  </div>
</template>
<script>
import {
  Scroller,
  Swiper,
  Group,
  Panel,
  Flexbox,
  FlexboxItem,
  LoadMore
} from "vux";
import { setTimeout } from "timers";
import NoData from "@/components/NoData.vue";

export default {
  name: "Games",
  components: {
    Scroller,
    NoData,
    Swiper,
    Group,
    LoadMore,
    Panel,
    Flexbox,
    FlexboxItem,
  },
  data() {
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

      gameList: [],
      curPage: 0,
      isLoadMore: false,
      showNoData: false,
      isActive: false,
      recommendGame: {
        gameTitle: "奔跑的悟空",
        src: "/static/img/game/game-3.jpg",
        gameProvider: "原石互娱"
      },
    };
  },
  mounted() {
    this.isActive = true;
  },
  beforeDestroy() {
    this.isActive = false;
  },
  methods: {
    selPullDown() {
      this.showNoData = false;

      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getCpList(1, true);
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
      this.getCpList(this.curPage+1);
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
          this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getCpList(page, flash) {
      console.log(`query page: ${page}`);
      if(!!flash) {
        this.global.cplist = [];
        this.gameList = [];
        this.curPage = 0;
      }

      let curPage = (this.gameList.length/10)|0 + 1;
      if(this.gameList.length%10==0) {
        curPage--;
      }
      if(curPage < page) {
        let totalPage = (this.global.cplist.length/10)|0 + 1;
        if(this.global.cplist.length%10==0) {
          totalPage--;
        }

        if(totalPage > page) {
          this.curPage++;

          let idx = 0;
          for(let element of this.global.cplist) {
            if(idx < (page-1)*10) continue;
            if(idx > page*10) break;

            this.gameList.push(element);

            idx++;
          }
          this.isLoadMore = true;
        } else {
          this.remote.fetching({
            func: "cp.List", 
            page: page,
          }).then(res => {
            if (res.code == 0) {
              let qryPage = Math.min(res.data.cur, res.data.page); //数据修复：查询页数不能大于总页数
              if(this.curPage < qryPage) {
                this.curPage = qryPage;

                res.data.list.forEach(cpItem => {
                  this.global.cplist.push(cpItem);
                  this.gameList.push(cpItem);
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
    },
    gotoCpInfo(item, index) {
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: item },
      });
    },
  },
  created() {
    this.getCpList(1);
  }
};
</script>
<style lang="less" scoped>
.gameItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}
.img-game-list {
  width: 110px;
  height: 75px;
  border-radius: 12%;
  margin-left: 3px;
}
.img-top {
  width: 100%;
  height: 200px;
  border-radius: 4%;
}
.xs-plugin-pulldown-container {
  line-height: 40px;
  font-size: 18px;
  color: red;
}
.xs-plugin-pullup-container {
  line-height: 40px;
  font-size: 18px;
  color: red;
}
</style>