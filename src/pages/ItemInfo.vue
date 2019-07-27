<!-- 众筹详情页 -->
<template>
  <div style="margin-top:-0px" class="root">
    <div>
      <div class="crowd-car">
        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:6px;margin-bottom:8px;margin-right:30px">
              <span style="font-size:15px;">{{item.title}}</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';margin-top:20px">项目介绍</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="font-size:12px;line-height:20px;margin-top:20px;margin-right:18px">{{item.desc}}</div>
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

    let tp = item.id.split('.')[0];
    item.title = this.GLOBAL.ResType[tp];
    item.desc = `类型: ${tp[1]} / 当前数量: ${item.num}`;

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
