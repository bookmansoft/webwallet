<!-- 我的道具列表
数据接口：
1. prop.PropList: 
[
  {
    "pid",
    "cid",
    "oid",
    "gold",
    "current": {
      "hash",
      "index",
      "address"
    },
    "height",
    "pst",
        propStatus {
            Sale: 2,        //拍卖中    - 发起了拍卖交易，等待竞价结束
            Borrow: 3,      //已借出    - 道具已经借出
            Delete: 4,      //已删除    - 道具已经彻底失效、不可恢复
            Ready: 9,       //已确认    - 道具处于确认状态
        }
    "wid",
    "account",
    "bid": {
      "raw",
      "fixed",
      "period",
      "hash",
      "value",
      "address"
    }
  }
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
                  <span style="font-size:15px;">热门游戏</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>

          <group :title="groupTitle">
            <div v-for="(item, index) in propList" :key="index" class="propItem">
              <flexbox @click.native="gotoPropDetail(item, index)">
                <flexbox-item :span="2.5" style="padding:0.3rem;">
                  <div class="flex-demo-left">
                    <img :src="item.icon" class="img-prop-list" />
                  </div></flexbox-item>
                <flexbox-item>
                  <div style="padding-left:15px;">
                    <p><span style="font-size:16px;">{{item.props_name}}</span></p>
                    <br />
                    <p><span style="color: #888; font-size:14px;">{{item.desc}}</span></p>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </group>
          <div style="padding: 10px 80px 20px 80px "><divider v-if="isBottom">到底了</divider></div>
        </div>
      </scroller>
    </div>

    <div v-if="isLoadMore && propItems.length==0 && showNoData==true">
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
      headerTitle: '我的道具',
      propList: [],
      groupTitle: '道具数量：0',
      type: '1',
      isBottom: false,
      PageIndex: 1,//页码从第一页开始
      PageSize: 5,//煤业显示的条数
      isShow: false,//是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
      showLoading: false,
      showUp: true,
      isbounce: false,
      lists: [],
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
      textLoading: '加载中',
      propItems: [],
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
      this.$router.push({ name: 'PropDetail', params: { item: item }})
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getcrowdlist(page, flash) {
      console.log(`query page: ${page}`);

      if(!!flash) {
        this.GLOBAL.propList = [];
        this.propList = [];
        this.curPage = 0;
      }

      let curPage = (this.propList.length/10)|0 + 1;
      if(this.propItems.length%10==0) {
        curPage--;
      }
      if(curPage < page) {
        let totalPage = (this.GLOBAL.propList.length/10)|0 + 1;
        if(this.GLOBAL.propList.length%10==0) {
          totalPage--;
        }

        if(totalPage > page) {
          this.curPage++;

          let idx = 0;
          for(let element of this.GLOBAL.propList) {
            if(idx < (page-1)*10) continue;
            if(idx > page*10) break;

            this.propList.push(element);

            idx++;
          }
          this.isLoadMore = true;
        } else {
          this.remote.fetching({func: 'prop.PropList', page: page}).then(res => {
              if(res.code == 0) {
                this.groupTitle = '道具数量：'+ res.data.count;
                let qryPage = Math.min(res.data.cur, res.data.page); //数据修复：查询页数不能大于总页数
                if(this.curPage < qryPage) {
                  this.curPage = qryPage;

                  res.data.list.forEach(cpItem => {
                    this.GLOBAL.cplist.push(cpItem);
                    this.gameList.push(cpItem);
                  });
                } else {
                  //没有新的数据了，禁止继续下拉
                  this.scrollerStatus.pullupStatus = 'disabled';
                  that.isBottom = true;
                }
              }
          });
          setTimeout(() => {
            this.isLoadMore = true;
          }, 500);
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
