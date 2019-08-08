<!-- 游戏列表
数据接口
1. state.cp.list
[
  {
    `category_id`  '游戏类别',
    `category_title`  '类别名',
    `provider_id`  '供应商ID',
    `provider_name`  '供应商名',
    `ad_title`  '推广标题',
    `ranking`  '排名',
    `star_level`  '星级',
    `player_count`  '玩家人数',
    `down_count`  '下载次数',
    `comment_count`  '评论数',
    `game_version`  '版本号',
    `developer`  '开发者',
    `create_time`  '创建时间',
    `update_time`  '更新时间',
    `store_status`  '状态',
    `cpid`  'cpid',
    `cpurl`  'cpurl',
    `cp_addr`  'cp地址',
    `cp_name`  'cp_name',
    `game_title`  '标题',
    `game_link_url`  '游戏链接'
    `game_ico_uri`  '图标URI',
    `update_desc`  '更新描述',
    `game_resource_uri`  '资源URI, 展示大图',
    `game_screenshots`  '游戏截图',
    `game_desc`  '描述',
    `small_img_url`  '展示小图',
    `stock_price`  '当前资产价格',
    `stock_sum`  '当前资产数量',
    `grate`  '媒体分成',
    `hHeight`  '初次高度',
    `hBonus`  '历史分红',
    `hAds`  '历史分成',
  }
]
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
            <div style="padding:10px 10px 0px 10px;" @click="gotoGame">
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
          <div v-for="(item, index) in cpList" :key="index" class="gameItem">
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
    </div>
    <div v-if="isLoadMore && cpList.length==0 && showNoData==true">
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
        content: "",
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
      recommendGame: {
        gameTitle: "奔跑的悟空",
        src: "/static/img/game/game-3.jpg",
        gameProvider: "原石互娱",
        cpid: 'chick',
      },
    };
  },
  computed:{
    cpList() { 
      return this.$store.getters['cp/list'];
    },
    userBase() {return this.$store.state.user.auth},
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
      this.getContent(true);
      setTimeout(()=>{
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
      setTimeout(()=>{
        this.showNoData = true;
        if(this.isActive) {
          this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    /**
     * 获取列表, flash 强制更新
     */
    getContent(flash) {
      this.isLoadMore = false;
      if(!!flash) {
        this.$store.dispatch('cp/clear');
      }

      return this.$store.dispatch('cp/pull').then(ret => {
        this.isLoadMore = true;

        if(!ret) {
          //没有新的数据了，禁止继续下拉
          this.scrollerStatus.pullupStatus = 'disabled';
        }
      });
    },
    gotoCpInfo(item, index) {
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: item },
      });
    },
    gotoGame() {
      window.location.href = `http://wallet.vallnet.cn:9701/test?cpid=${this.recommendGame.cpid}openid=${this.userBase.openid}&openkey=${this.userBase.openkey}`;
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else { 
      this.getContent();
    }
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