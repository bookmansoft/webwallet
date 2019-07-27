<!-- 众筹详情页 -->
<template>
  <div style="margin-top:-0px" class="root">
    <div>
      <div class="crowd-car">
        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:6px;margin-bottom:8px;margin-right:30px">
              <span style="font-size:15px;">{{item.id}}/{{item.num}}</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div
              class="flex-left"
              style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';margin-top:20px"
            >项目介绍</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div
              class="flex-left"
              style="font-size:12px;line-height:20px;margin-top:20px;margin-right:18px"
            >类型{{item.id}} 数量{{item.num}}</div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <box gap="0px 0px">
      <x-button  style="border-radius:0px;" type="warn" @click.native="itemUse()">立即使用</x-button>
    </box>
    <br>
    <br>
  </div>
</template>
<script>
import {
  XButton,
  Tab,
  XHeader,
  TabItem,
  Flexbox,
  FlexboxItem,
  Group,
  Divider,
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
    XHeader,
    XButton,
    TabItem,
    Flexbox,
    FlexboxItem,
    Group,
    Divider,
    Box,
    XXProgress,
    swiper,
    swiperSlide
  },
  data() {
    return {
      headerTitle: "众筹详情",
      item: null,
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
      }

      // swiperSlides: [1, 2, 3, 4]
    };
  },
  methods: {
    onBack() {
      this.$router.push({ name: "Crowd" });
    },
    itemUse() {
      this.remote.fetching({
        func: "item.useItem", 
        id: this.item.id,
        num: this.item.num,
      }).then(res => {
        console.log(`${res.code}`);
        setTimeout(() => {
          this.$router.push({ name: "Pocket" });
        }, 500);
      });
    },
  },
  created() {
    this.item = this.$route.params.item;
    if(!this.item) {
      this.$router.push("/mine")
    }

    console.log('ItemInfo', this.item);
  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
}
.img-top {
  width: 100%;
  height: 220px;
}
.flex-left {
  text-align: left;
  margin-left: 20px;
}
.flex-right {
  text-align: right;
  margin-right: 40px;
}
.flex-center {
  text-align: center;
  margin: 5px;
}
</style>
