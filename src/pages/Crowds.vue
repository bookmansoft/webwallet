<!-- 众筹首页 
数据接口：
1. crowd/pull: 
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
    <!-- 使用滚动列表组件 -->
    <ScrollList :config="config">
      <!-- 为组件的具名插槽书写模板，并引入具名插槽的数据集 props.content -->
      <template v-slot:default="props">
        <div>
          <div style="margin-top:15px;">
            <flexbox>
              <flexbox-item :span="12">
                <div class="flex-left">
                  <img src="/static/img/stock/hot_line.png" style="width:3px;height:13px">
                  <span style="font-size:15px;">热门众筹</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>

          <div style="margin-top:-30px">
            <div class="flex-left" style="position: relative;top:45px;left:-5px">
              <img src="/static/img/stock/ren_qi.png" style="width:100px;height:27px">
            </div>
            <!-- 来自具名插槽的数据集 props.content -->
            <div v-for="(item, index) in props.content" :key="index" class="crowdItem">
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
                        <img src="/static/img/stock/headimg.png" style="width:22px;height:22px">
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
                      <img src="/static/img/stock/stock_jiner.png" style="width:15px;hegith:15px">
                      <span style="color:coral; font-size:12px;">{{parseFloat(item.price/100000).toFix(3)}}千克/个</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="4">
                    <div class="flex-left">
                      <img src="/static/img/stock/stock_renshu.png" style="width:15px;hegith:15px">
                      <span style="font-size:12px;">{{item.supply_people_num}}</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="4">
                    <div class="flex-left">
                      <img src="/static/img/stock/stock_shichang.png" style="width:15px;hegith:15px">
                      <span style="font-size:12px;">{{`${item.percent2}%`}}</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ScrollList>

    <navs></navs>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Box,
} from "vux";
import Navs from "@/components/Navs.vue";
import XXProgress from "@/components/XXProgress.vue";
import ScrollList from "@/components/ScrollList.vue";

export default {
  name: 'Crowd',
  components: {
    Flexbox,
    FlexboxItem,
    Box,
    Navs,
    XXProgress,
    ScrollList,
  },
  data: function() {
    return {
      config: {
        store: 'crowd',                                 //引用的数据仓库
        nodata: '/static/img/default/no-product.png',   //列表为空时的占位图片
      },
    };
  },
  methods: {
    /**
     * 跳转至众筹详情
     */
    crowdDetail(item) {
      console.log('crowdDetail', item);
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
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
