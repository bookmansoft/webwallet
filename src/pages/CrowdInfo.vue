<!-- 众筹详情页 -->
<template>
  <div>
    <div style="margin-top:-0px">
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
            <div class="flex-left" style="margin-top:4px;">
              <span style="font-size:15px;">
                <img src="static/img/stock/headimg.png" style="width:22px;height:22px">
              </span>
            </div>
          </flexbox-item>
          <flexbox-item :span="11">
            <div class="flex-left" style="margin-left:-8px;margin-top:-2px">
              <span style="font-size:15px;">土豆先生</span>
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
            <!-- 无法设置颜色，需要更换实现方式 -->
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
          <flexbox-item :span="8">
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-right" style="margin-top:15px">
              <span style="color:#999999; font-size:12px;">105人支持</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:20px">项目介绍</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:20px">{{item.funding_project_text}}</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:20px">游戏简介</div>
          </flexbox-item>
        </flexbox>

        <flexbox>
          <flexbox-item :span="12">
            <div class="flex-left" style="margin-top:20px">{{item.cp_desc}}</div>
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
  Box
} from "vux";
import Navs from "@/components/Navs.vue";
import XXProgress from "@/components/XXProgress.vue";

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
    XXProgress
  },
  data() {
    return {
      msg: "众筹",
      headerTitle: "众筹详情",
      item: null,
      percent2: 50
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
    console.log(this.item);
    this.percent2 = parseInt(
      (this.item.funding_done_amount * 100) / this.item.funding_target_amount
    );
    this.userToken();
  }
};
</script>

<style scoped>
/* .crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowd-info {
  padding: 15px;
  background-color: #f5f5f9;
  border-radius: 4%;
  font-size: 14px;
} */

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
  padding-left: 20px;
}
.flex-right {
  text-align: right;
  padding-right: 40px;
}
.flex-center {
  text-align: center;
  padding: 5px;
}
</style>
