<!-- 众筹首页 -->
<template>
  <div class="root" style="background-color:white;margin-top:-8px">
    <div v-if="isLoadMore">
      <div>
        <box gap="18px">
          <div class="scroll" style="margin-top:3px">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide>
                <img src="static/img/stock/banner.png" style="width:100%">
              </swiper-slide>
              <swiper-slide>
                <img src="static/img/stock/banner2.png" style="width:100%">
              </swiper-slide>
              <swiper-slide>
                <img src="static/img/stock/banner3.png" style="width:100%">
              </swiper-slide>
            </swiper>
          </div>
        </box>

        <div style="margin-top:-40px">
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
          <div class="flex-left" style="position: relative;top:47px;left:-5px">
            <img src="static/img/stock/ren_qi.png" style="width:100px;height:27px">
          </div>
          <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
            <div class="crowd-car" v-on:click="crowdDetail(item, 0)">
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
                    <span style="font-size:15px;">土豆先生</span>
                  </div>
                </flexbox-item>
              </flexbox>

              <flexbox>
                <flexbox-item :span="12">
                  <box gap="10px">
                    <XXProgress :percent="percent2" :show-cancel="false"></XXProgress>
                  </box>
                  <!-- 无法设置颜色，需要更换实现方式 -->
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
                    <span
                      style="font-size:12px;"
                    >￥ {{parseInt(item.funding_done_amount*100/item.funding_target_amount) + '%'}}</span>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
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
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

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
    Box,
    swiper,
    swiperSlide
  },
  data: function() {
    return {
      crowdItems: [],
      isLoadMore: false,
      percent2: 50,

      swiperOption: {
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: true,
        // 设置轮播
        // effect: "fade",
        cubeEffect: {
          slideShadows: true
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function() {
            //  console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          }
        },
        //左右点击
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "swiper-pagination-bullet",
          clickable: true
        }
      },

      // swiperSlides: [1, 2, 3, 4]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted: function() {
    //可以使用swiper这个对象去使用swiper官网中的那些方法
    console.log("这里！！this is current swiper instance object");
    // this.swiper.slideTo(0, 0, false);
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex);
    },
    crowdDetail(item, index) {
      console.log(136);
      console.log(item);
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
    crowFreedDetail(item, index) {
      this.$router.push({ name: "CrowdFreeInfo", params: { item: item } });
    },
    getStocks() {
      let data = {
        func: "ListRecord",
        control: "stockbase",
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("返回结果", res.data);
        this.isLoadMore = true;
        if (res.data.total > 0) {
          res.data.list.forEach(element => {
            this.crowdItems.push(element);
          });
        }
      });
    }
  },
  created() {
    this.getStocks();
  }
};
</script>

<style scoped>
.root {overflow-x:hidden}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.swiper-slide {
  height: 200px;
}

/* 无效 */
.swiper-pagination-bullet {
  color: red;
}

.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem p {
  height: 30px;
  line-height: 30px;
}

.crowdItem2 {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem2 p {
  height: 40px;
  line-height: 40px;
}

.crowd-car {
  padding: 10px;
  /*background-color: white; */
  /*border-radius: 4%;*/
}

.img-game-list {
  width: 75px;
  height: 75px;
  border-radius: 12%;
  margin-left: 3px;
}

.img-game-list2 {
  width: 45px;
  height: 45px;
  border-radius: 10%;
  margin-left: 4px;
}

.img-top {
  width: 100%;
  height: 180px;
  /*border-radius: 4%;*/
  /* border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em; */
}
.imgDemo {
  width: 100%;
  height: auto;
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
