<!-- 众筹详情页 -->
<template>
  <div style="margin-top:-0px" class="root">
    <div>
      <div class="crowd-car">
        <img :src="item.large_img_url" class="img-top">
        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:6px;margin-bottom:8px;margin-right:30px">
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
            <div class="flex-left" style="margin-left:8px;margin-top:-5px">
              <span style="font-size:15px;">{{item.provider}}</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <box gap="20px">
              <div style="margin-top:-10px">
                <XXProgress :percent="percent2" :show-cancel="false"></XXProgress>
              </div>
            </box>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="4">
            <div class="flex-left" style="margin-top:-10px">
              <span style="color:coral; font-size:12px;">￥ {{item.stock_money}}</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-center" style="margin-top:-10px">
              <span style="font-size:12px;">￥{{item.supply_people_num}}</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-right" style="margin-top:-10px">
              <span style="font-size:12px;">{{item.funding_residue_day}}天</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="4">
            <div class="flex-left" style="margin-top:-6px">
              <span
                style="color:#999999; font-size:12px;"
              >已筹{{parseInt(item.funding_done_amount*100/item.funding_target_amount) + '%'}}</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-center" style="margin-top:-6px">
              <span style="color:#999999; font-size:12px;">目标金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-right" style="margin-top:-6px">
              <span style="color:#999999; font-size:12px;">剩余时间</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="8"></flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-right" style="margin-top:15px;margin-bottom:20px;margin-right:30px">
              <span style="color:#999999; font-size:12px;">{{item.supply_people_num}}人支持</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div style="height:12px;background-color:#f3f3f3"></div>
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
            >{{item.funding_project_text}}</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div
              class="flex-left"
              style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';margin-top:28px"
            >游戏简介</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="3">
            <img :src="item.icon_url" style="width:60px;height:60px;margin-top:22px;margin-left:20px;">
          </flexbox-item>
          <flexbox-item :span="9">
            <flexbox orient="vertical" :gutter="10">
              <flexbox-item :span="2">
                <span>&nbsp;</span>
              </flexbox-item>
              <flexbox-item :span="4">
                <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';margin-left:-10px;">{{item.cp_text}}</span>
              </flexbox-item>
              <flexbox-item :span="4">
                <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';margin-left:-10px;">{{item.provider}}</span>
              </flexbox-item>
              <flexbox-item :span="2">
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div
              class="flex-left"
              style="font-size:12px;line-height:20px;margin-top:20px;margin-right:18px"
            >{{item.cp_desc}}</div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <box gap="18px">
      <div class="scroll" style="margin-top:3px">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide>
            <img :src="pic_urls[0]" style="width:100%;">
          </swiper-slide>
          <swiper-slide>
            <img :src="pic_urls[1]" style="width:100%;">
          </swiper-slide>
          <swiper-slide>
            <img :src="pic_urls[2]" style="width:100%;">
          </swiper-slide>
        </swiper>
      </div>
    </box>

    <box gap="0px 0px">
      <x-button  style="border-radius:0px;" type="warn" @click.native="crowdPrePay()">&yen; 立即支持</x-button>
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
      msg: "众筹",
      headerTitle: "众筹详情",
      item: null,
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
      }

      // swiperSlides: [1, 2, 3, 4]
    };
  },
  methods: {
    onBack() {
      this.$router.push({ name: "Crowd" });
    },
    crowdDetail(item, index) {},
    // crowdOrder() {
    //   this.$router.push({
    //     name: "CrowdOrder",
    //     params: { item: this.item }
    //   });
    // },
    crowdPrePay() {
      this.$router.push({
        name: "CrowdPrePay",
        params: { item: this.item }
      });
    },
    userToken() {
      if (this.GLOBAL.uid == 0) {
        return;
      }
      let data = {
        func: "UserToken",
        control: "cp",
        oemInfo: this.GLOBAL.oemInfo,
        account: this.GLOBAL.userBase.uid,
        user_id: this.GLOBAL.userBase.uid,
        cid: this.item.cid,
        pic_urls: [],//图片数组
      };
      console.log(146, data);
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("cpAddr", res.data);
        this.cpAddr = res.data.ret.data.addr;
        console.log(this.cpAddr);
      });
    }
  },
  created() {
    this.item = this.$route.params.item;
    if(!this.item) {
      this.$router.push("/mine")
    }

    console.log(this.item);
    this.pic_urls=JSON.parse(this.item.pic_urls);
    this.percent2 = parseInt(
      (this.item.funding_done_amount * 100) / this.item.funding_target_amount
    );
    this.userToken();
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
