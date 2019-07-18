<template>
  <div>
    <div v-if="isLoadMore && gameList.length > 0">
      <scroller
        v-model="scrollerStatus"
        height="-100"
        lock-x
        scrollbar-y
        ref="scroller"
        :bounce="isbounce"
        :use-pulldown="showDown"
        :use-pullup="false"
        :pulldown-config="downobj"
        @on-pulldown-loading="selPullDown"
      >
        <div>
          <!--<swiper style="margin-top:0.6rem;" :list="hotList" v-model="hotListIndex" @on-index-change="hotListOnIndexChange"></swiper>-->
          <!--<panel header="热门游戏" :list="gameList" type="5" @on-img-error="onImgError"></panel>-->
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
                  <img :src="item.src" class="img-game-list">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p>
                    <span style="font-size:15px;">{{item.title}}</span>
                  </p>
                  <br>
                  <p>
                    <span style="color: #888; font-size:14px;">{{item.desc}}</span>
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
    <div v-if="isLoadMore && gameList.length == 0">
      <no-data src="static/img/default/no-games.png"></no-data>
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
    Swiper,
    Group,
    LoadMore,
    Panel,
    Flexbox,
    FlexboxItem,
    NoData
  },
  data() {
    return {
      isShow: true, //是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
      showloading: false,
      textloading: "加载中",
      showDown: true,
      isbounce: true,
      lists: [],
      downobj: {
        content: "请下拉刷新数据",
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        downContent: "请下拉刷新数据",
        upContent: "请下拉刷新数据",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pulldown-"
      },

      scrollerStatus: {
        pullupStatus: "default"
      },

      gameList: [],
      isLoadMore: false,
      // isLoadMore: true,
      hotListIndex: 0,
      recommendGame: {
        gameTitle: "奔跑的悟空",
        src: "static/img/game/game-3.jpg",
        gameProvider: "原石互娱"
      },
      cpFilter: [
        "xxxxxxxx-game-gold-boss-xxxxxxxxxxxx",
        "eb9d03c0-0ff9-11e9-a575-21541098fe6c",
        "324febe0-1246-11e9-865d-67171db95497",
        "b0a7c550-10b9-11e9-be28-7bc3b258896e"
      ]
    };
  },
  activated() {
    this.$refs.scroller.reset();
  },
  methods: {
    selPullDown() {
      console.log("selPullDown");
      this.getNewsList(false);
    },
    getNewsList(isEmpty) {
      let that = this;
      setTimeout(() => {
        that.scrollerReset();
      }, 1500);
    },

    scrollerReset() {
      this.$refs.scroller.donePulldown();
      this.$refs.scroller.reset({ top: 0 });
    },
    hotListOnIndexChange(index) {
      this.hotListIndex = index;
    },
    infinite(done) {
      console.log("infinite");
      this.$refs.myScroller.resize();
      setTimeout(() => {
        this.$refs.scroller.finishInfinite(2);
      });
    },
    //获取CP列表
    getCpList(page, num) {
      this.remote.fetching({
        func: "List", 
        control: "cp",
        page: page,
        num: num,
      }).then(res => {
        if (res.code == 0) {
          //清空
          if (this.GLOBAL.cplist.length > 0) {
            this.GLOBAL.cplist.splice(0, this.GLOBAL.cplist.length);
          }
          if (this.gameList.length > 0) {
            this.gameList.splice(0, this.gameList.length);
          }
          //填充
          let cpList = res.data.list;
          cpList.forEach(cpItem => {
            if (this.cpFilter.indexOf(cpItem.cid) == -1) {
              //从cp获取资源
              let url = encodeURI(cpItem.url);
              this.remote.fetching({
                func: "GetCpProxy",
                control: "cp",
                url: url,
              }).then(res => {
                  let result = res.data;
                  if (result.hasOwnProperty("game")) {
                    let game = result.game;
                    this.GLOBAL.cplist.push({
                      cpItem: cpItem,
                      cpInfo: result
                    });
                    this.fillGame(game);
                  }
              });
            }
          });
        }
        setTimeout(() => {
          this.isLoadMore = true;
        }, 500);
      });
    },

    gotoCpInfo(item, index) {
      console.log("goto cp info", index);
      let cpInfo = this.GLOBAL.cplist[index].cpInfo;
      let cpItem = this.GLOBAL.cplist[index].cpItem;
      //this.$router.push({ name: 'GameIntro', params: { cpInfo: cpInfo, cpItem: cpItem }})
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: cpInfo, cpItem: cpItem }
      });
    },

    //获取CP数量
    getCpCount(page, num) {
      this.remote.fetching({func: "CpCount", control: "cp"}).then(res => {
        if (res.code == 0) {
          if (res.data > this.GLOBAL.cpCount) {
            this.GLOBAL.cpCount = res.data;
            this.getCpList(1, 10000);
          }
        }
      });
    },

    getCpListFromLocal() {
      try {
        this.gameList.splice(0, this.gameList);
        this.GLOBAL.cplist.forEach(element => {
          let game = element.cpInfo.game;
          this.fillGame(game);
        });
      } catch (ex) {
        console.log(255,ex);
      }
    },

    //填充视图列表
    fillGame(game) {
      if (
        game != null &&
        game.hasOwnProperty("small_img_url") &&
        game.hasOwnProperty("game_title") &&
        game.hasOwnProperty("provider")
      ) {
        this.gameList.push({
          src: game.small_img_url,
          title: game.game_title,
          desc: game.provider
        });
      }
    },

    onImgError(item, $event) {
      console.log(item, $event);
    }
  },
  created() {
    if (this.GLOBAL.cplist.length > 0) {
      this.getCpListFromLocal();
      this.isLoadMore = true;
    } else {
      this.isShow = true;
      this.getCpList(1, 10000);
    }
    /* 
    this.getCpCount()
    */
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