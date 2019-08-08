<!-- 游戏分类页面
1. 数据接口 gameCategory: 获取服务端类别配置表
-->
<template>
  <div>
    <div v-if="showCategory">
      <grid :show-lr-borders="false" :show-vertical-dividers="true" :cols="3" style="top:5px;">
        <grid-item v-for="(item, index) in gameCategory" :key="index" :label="item.label" @on-item-click="onItemClick(item)">
          <img slot="icon" :src="item.icon">
        </grid-item>
      </grid>
    </div>
    <x-button v-if="isLoadMore" plain style="border-radius:5px;color:rgb(255,113,101)" type="warn" @click.native="viewCategory()">返回目录</x-button>
    <div v-if="isLoadMore && !showCategory">
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
  XButton,
  Grid, 
  GridItem,
  Scroller,
  Swiper,
  Group,
  Panel,
  Flexbox,
  FlexboxItem,
  LoadMore,
} from "vux";
import NoData from "@/components/NoData.vue";

export default {
  name: 'GameSort',
  components: {
    XButton,
    Grid, 
    GridItem,
    Scroller,
    Swiper,
    Group,
    Panel,
    Flexbox,
    FlexboxItem,
    LoadMore,
    NoData,
  },
  data () {
    return {
      showCategory: true,
      category: 1,
      gameCategory: [],
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
    }
  },
  computed:{
    cpList() { 
      return this.$store.getters['cp/list'];
    },
  },
  methods: {
    viewCategory() {
      this.showCategory = true;
      this.showNoData = false;
    },
    onItemClick(item) {
        this.showCategory = false;  //隐藏分类列表，显示游戏列表
        this.showNoData = false;
        this.category = item.index; //设定当前游戏分类
        this.getContent(true);
    },
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

      return this.$store.dispatch('cp/pull', {category:this.category}).then(ret => {
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
  },
  mounted() {
    this.isActive = true;
  },
  beforeDestroy() {
    this.isActive = false;
  },
  created() {
    this.ConfigMgr.get('gameCategory', (err, config)=>{
      if(!err) {
        this.gameCategory = config;
      }
    });
  },
}
</script>
<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
</style>