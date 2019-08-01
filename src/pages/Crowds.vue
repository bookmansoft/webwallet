<!-- 众筹首页 
数据接口：
1. stockMgr.getCrowdList: 
[
  {
    icon_url,           //游戏图标
    small_img_url,      //游戏小图
    large_img_url，     //游戏大图
    pic_urls,           //游戏截屏图数组
    funding_text,       //众筹描述
    provider,           //游戏开发商
    percent2,           //完成进度(Calc)
    price,              //众筹单价
    supply_people_num,  //众筹人数
    cp_name,            //游戏名称
    cp_desc,            //游戏描述
  },
]

跳转链接：
1. 众筹详情页面 { name: "CrowdInfo", params: { item: item } }
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
          <div style="margin-top:15px;">
            <flexbox>
              <flexbox-item :span="12">
                <div class="flex-left">
                  <img src="static/img/stock/hot_line.png" style="width:3px;height:13px">
                  <span style="font-size:15px;">热门众筹</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>

          <div style="margin-top:-30px">
            <div class="flex-left" style="position: relative;top:45px;left:-5px">
              <img src="static/img/stock/ren_qi.png" style="width:100px;height:27px">
            </div>
            <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
              <div style="padding: 10px;" v-on:click="crowdDetail(item)">
                <img :src="item.large_img_url" class="img-top">
                <flexbox>
                  <flexbox-item :span="12">
                    <div class="flex-left" style="margin-top:6px;margin-bottom:8px">
                      <span style="font-size:15px;">{{item.funding_text}}</span>
                    </div>
                  </flexbox-item>
                </flexbox>

                <flexbox>
                  <flexbox-item :span="1">
                    <div class="flex-left">
                      <span style="font-size:15px;">
                        <img src="static/img/stock/headimg.png" style="width:22px;height:22px">
                      </span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="11">
                    <div class="flex-left" style="margin-left:-8px;margin-top:-5px">
                      <span style="font-size:15px;">{{item.provider}}</span>
                    </div>
                  </flexbox-item>
                </flexbox>

                <flexbox>
                  <flexbox-item :span="12">
                    <box gap="10px">
                      <XXProgress :percent="item.percent2" :show-cancel="false"></XXProgress>
                    </box>
                  </flexbox-item>
                </flexbox>

                <flexbox style="height:40px;line-height:40px;">
                  <flexbox-item :span="4">
                    <div class="flex-left">
                      <img src="static/img/stock/stock_jiner.png" style="width:15px;hegith:15px">
                      <span style="color:coral; font-size:12px;">{{item.price}}千克</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="4">
                    <div class="flex-left">
                      <img src="static/img/stock/stock_renshu.png" style="width:15px;hegith:15px">
                      <span style="font-size:12px;">{{item.supply_people_num}}</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="4">
                    <div class="flex-left">
                      <img src="static/img/stock/stock_shichang.png" style="width:15px;hegith:15px">
                      <span style="font-size:12px;">{{`${item.percent2}%`}}</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <div v-if="isLoadMore && crowdItems.length==0 && showNoData==true">
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

      crowdItems: [],     //众筹项目列表
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
    //跳转至众筹详情
    crowdDetail(item) {
      console.log('crowdDetail', item);
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getcrowdlist(page, flash) {
      console.log(`query page: ${page}`);

      if(!!flash) {
        this.GLOBAL.crowdlist = [];
        this.crowdItems = [];
        this.curPage = 0;
      }

      let curPage = (this.crowdItems.length/10)|0 + 1;
      if(this.crowdItems.length%10==0) {
        curPage--;
      }
      if(curPage < page) {
        let totalPage = (this.GLOBAL.crowdlist.length/10)|0 + 1;
        if(this.GLOBAL.crowdlist.length%10==0) {
          totalPage--;
        }

        if(totalPage > page) {
          this.curPage++;

          let idx = 0;
          for(let element of this.GLOBAL.crowdlist) {
            if(idx < (page-1)*10) continue;
            if(idx > page*10) break;

            this.crowdItems.push(element);

            idx++;
          }
          this.isLoadMore = true;
        } else {
          this.remote.fetching({
            func: "stockMgr.getCrowdList", 
            page: page,
          }).then(res => {
            if (res.code == 0) {
              console.log('getCrowdList', res.data);
              let qryPage = Math.min(res.data.page, res.data.total); //数据修复：查询页数不能大于总页数
              if(this.curPage < qryPage) {
                this.curPage = qryPage;

                res.data.list.forEach(cpItem => {
                  cpItem.percent2 = ((cpItem.sum -cpItem.sum_left) * 100 / cpItem.sum) | 0;
                  cpItem.pic_urls = JSON.parse(cpItem.pic_urls);
                  this.crowdItems.push(cpItem);
                  this.GLOBAL.crowdlist.push(cpItem);
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
