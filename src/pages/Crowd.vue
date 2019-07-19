<!-- 众筹首页 -->
<template>
  <div class="root" style="background-color:white;margin-top:-8px">
    <div v-if="isLoadMore">
      <div>
        <div style="margin-top:15px">
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
                    <span style="color:coral; font-size:12px;">￥ {{item.stock_money}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="4">
                  <div class="flex-left">
                    <img src="static/img/stock/stock_renshu.png" style="width:15px;hegith:15px">
                    <span style="font-size:12px;">￥{{item.supply_people_num}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="4">
                  <div class="flex-left">
                    <img src="static/img/stock/stock_shichang.png" style="width:15px;hegith:15px">
                    <span style="font-size:12px;">￥ {{`${item.percent2}%`}}</span>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:250px;" :show-loading="!isLoadMore"></load-more>
    </div>

    <navs></navs>
  </div>
</template>
<script>
import {
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

export default {
  components: {
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
      crowdItems: [],     //众筹项目列表
      isLoadMore: false,  //众筹项目拉取成功标志
    };
  },
  methods: {
    //跳转至众筹详情
    crowdDetail(item) {
      console.log('crowdDetail', item);
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
  },
  created() {
    //拉取众筹项目列表
    this.remote.fetching({
      func: "ListRecord", 
      control: "stockbase",
    }).then(res => {
      if(res.code == 0) {
        this.isLoadMore = true;
        res.data.list.forEach(item => {
          item.percent2 = ((parseInt(item.funding_done_amount) * 100) / parseInt(item.funding_target_amount))|0;
          this.crowdItems.push(item);
        });
      }
    });
  },
  mounted: function() {
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
