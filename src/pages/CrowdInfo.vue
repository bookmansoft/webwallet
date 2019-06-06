<!-- 众筹详情页 -->
<template>
  <div>
    <div style="margin-top:-0px">

      <div class="crowd-car">
        <img :src="item.large_img_url" class="img-top">
        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left">
              <span style="font-size:15px;">{{item.funding_text}}</span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left">
              <span style="font-size:15px;">
                <img src="static/img/stock/headimg.png" style="width:22px;height:22px">
                土豆先生
              </span>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <box gap="10px">
              <x-progress :percent="percent2" :show-cancel="false"></x-progress>
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
          <flexbox-item :span="4">
            <div class="flex-right">
              <x-button
                mini
                :gradients="['#FF5E3A', '#FF9500']"
                @click.native="crowdDetail(item, 0)"
              >立即支持</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <navs></navs>

    <box gap="10px 10px">
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="crowdOrder()">立即购买</x-button>
    </box>
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
  Box,
  XProgress
} from "vux";
import Navs from "@/components/Navs.vue";

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
    Box
  },
  data() {
    return {
      msg: "众筹",
      headerTitle: "众筹详情",
      item: null
    };
  },
  methods: {
    onBack() {
      this.$router.push({ name: "Crowd" });
    },
    onItemClick(index) {
      console.log(this.tabIndex);
    },
    crowdDetail(item, index) {},
    crowdOrder() {
      this.$router.push({
        name: "CrowdOrder",
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
        uid: this.GLOBAL.userBase.uid,
        account: this.GLOBAL.userBase.uid,
        user_id: this.GLOBAL.userBase.uid,
        cid: this.item.cid
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        this.cpAddr = res.data.ret.data.addr;
        console.log("cpAddr", this.cpAddr);
      });
    }
  },
  created() {
    this.item = this.$route.params.item;
    console.log(this.item);
    this.userToken();
  }
};
</script>

<style scoped>
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowd-info {
  padding: 15px;
  background-color: #f5f5f9;
  border-radius: 4%;
  font-size: 14px;
}

.img-game-list {
  width: 75px;
  height: 75px;
  border-radius: 12%;
  margin-left: 3px;
}

.img-top {
  width: 100%;
  height: 220px;
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
  padding-right: 30px;
}
.flex-center {
  text-align: center;
  padding: 5px;
}
</style>
