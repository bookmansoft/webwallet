<!-- 我的道具列表
数据接口：
1. prop.PropList -> propList 
[
  {
    "pid",
    "cid",
    "cpurl",
    "cp_name",
    "oid",
    "gold",
    "height",
    "large_icon",
    "more_icon": [],
    "props_type",
    "props_price",
    "props_createtime",
    "props_rank",
    "props_status",
    "state":,
    "props_extra": {
            "attr1": "属性1",
            "attr2": "属性2",
    },
    "icon",
    "props_name",
    "props_desc",
  }
]

跳转链接：
1. 道具详情页面 { name: 'PropDetail', params: { item: item }}

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
          <group>
            <panel :header="panelTitle" :list="propList" :type="panelType" @on-click-item="showPropDetail"></panel>        
          </group>
          <div style="padding: 10px 80px 20px 80px "><divider v-if="isBottom && propList.length > 0 && showNoData==true">到底了</divider></div>
        </div>
      </scroller>
    </div>

    <div v-if="isLoadMore && propList.length==0 && showNoData==true">
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
  LoadMore, Divider,
  XProgress,
  Panel,
  Box,
  Group,
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
    LoadMore, Divider, Panel,
    XXProgress,
    Box,
    Group,
  },
  data: function() {
    return {
      headerTitle: '我的道具',
      panelTitle: '',
      panelType: "1",
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
      propList: [],
      isBottom: false,
    };
  },
  methods: {
    selPullDown() {
      this.showNoData = false;
      
      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getPropList(1, true);
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
      this.getPropList(this.curPage+1);
      setTimeout(() => {
        this.showNoData = true;
        if(this.isActive) {
        this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    //跳转至众筹详情
    showPropDetail(item) {
      console.log(item);
      this.$router.push({ name: 'PropDetail', params: { item: item }})
    },
    /**
     * 获取列表, page 请求的页码 flash 强制更新
     */
    getPropList(page, flash) {
      console.log(`query page: ${page}`);

      if(!!flash) {
        this.GLOBAL.propList = [];
        this.propList = [];
        this.curPage = 0;
      }

      let curPage = (this.propList.length/10)|0 + 1;
      if(this.propList.length%10==0) {
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
                console.log('prop list', res.data);
                let qryPage = Math.min(res.data.cur, res.data.page); //数据修复：查询页数不能大于总页数
                if(this.curPage < qryPage) {
                  this.curPage = qryPage;

                  res.data.list.forEach(cpItem => {
                    this.remote.get(encodeURI(cpItem.cpurl + '/prop/' + cpItem.oid)).then(res => {
                      Object.assign(cpItem, res);
                      cpItem.src = cpItem.icon;
                      cpItem.title = cpItem.props_name;
                      cpItem.desc = cpItem.props_desc;

                      this.GLOBAL.cplist.push(cpItem);
                      this.propList.push(cpItem);
                    });
                  });
                } else {
                  //没有新的数据了，禁止继续下拉
                  this.scrollerStatus.pullupStatus = 'disabled';
                  this.isBottom = true;
                }
              }
          });
          setTimeout(() => {
            this.isLoadMore = true;
            this.panelTitle = `道具背包(${this.propList.length}})`;
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
    this.getPropList(1);
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
