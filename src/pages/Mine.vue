<!-- 个人中心页面
-->
<template>
  <div class="root" style="background-color:white;">
    <!-- 个人信息 -->
    <div style="position:absolute;width:100%;margin-top:60px"  @click="member()">
      <div align="center">
        <!-- 相对于父容器定位 -->
        <div style="display:block;postion:relative"><img :src="userBase.avatar_uri" style="width:61px;height:61px;"></div>
        <div style="display:block;postion:relative;margin-top:-61px"><img src="/static/img/stock/mine/star.png" style="width:61px;height:61px;"></div>
        <div style="display:block"><span style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,255,255);">{{this.userBase.name}}</span></div>
      </div>
    </div>

    <!-- 主功能链接 -->
    <div style="display:block" class="nospace"><img src="/static/img/stock/mine/top.png" style="width:auto;height:auto;max-width:100%;max-height:100%"></div>
    <flexbox :gutter="0" class="nospace" style="margin-top:-3px;margin-bottom:-3px">
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="/static/img/stock/mine/left.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="wallet()"><img src="/static/img/stock/mine/mywallet.png" style="width:51px;height:56px;"></div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="mystock()"><img src="/static/img/stock/mine/dingding.png" style="width:51px;height:56px;"></div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="about()"><img src="/static/img/stock/mine/about.png" style="width:51px;height:56px;"></div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block"><img src="/static/img/stock/mine/right.png" style="width:100%;height:100px;"></div>
      </flexbox-item>
    </flexbox>

    <div style="display:block" class="nospace"><img src="/static/img/stock/mine/bottom.png" style="width:auto;height:auto;max-width:100%;max-height:100%"></div>

    <!-- 辅助功能链接 -->
    <div>
      <group>
        <cell :is-link="item.is_link" v-for="(item, index) in items" :key="index" :link="item.link" :value="item.value">
          <span slot="title">
            <span style="vertical-align:middle;">{{item.title}}</span>
            <badge :text="item.badge" v-if="item.badge > 0"></badge>
            <img src="/static/img/member/shot.png" style="width: 8px; height:8px; position: relative; left:-2px; top:0px;" v-if="item.showDot==true" />
          </span>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
        </cell>
      </group>    
    </div>

    <navs></navs>
  </div>
</template>
<script>
import Navs from "@/components/Navs.vue";
import {
  Scroller,
  Cell,
  CellBox,
  CellFormPreview,
  Group,
  Badge,
  Flexbox,
  FlexboxItem
} from "vux";

export default {
  components: {
    Scroller,
    Navs,
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Badge,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
    };
  },
  computed: {
    userBase() {return this.$store.state.user.auth},
    items() {return this.$store.state.user.menu},
  },
  methods: {
    member() {
      this.$router.push({ name: "Member" });
    },
    wallet() {
      this.$router.push({ name: "Wallet" });
    },
    mystock() {
      this.$router.push({ name: "StocksMine" });
    },
    about() {
      this.$router.push({ name: "About" });
    },
    getNotify() {
      if (!!this.userBase && this.userBase.vl > 0) {
        this.items[0].value = "产币加速中";
        this.items[0].img = "/static/img/member/Vip" + this.userBase.vl + ".png";
        let current_time = parseInt(new Date().getTime() / 1000);
        if (this.assistant.toKg(this.userBase.vcur) >= 10) {
          this.items[0].showDot = true;
        } else {
          this.items[0].showDot = false;
        }
      }
      if (this.userBase.current_prop_count > this.userBase.prop_count) {
        this.items[2].badge = this.userBase.current_prop_count - this.userBase.prop_count;
      }

      this.remote.fetching({
        func: "wallet.GetNotify",
      }).then(res => {
        if (res.code == 0) {
          if (res.data.count > 0) {
            this.items[4].badge = res.data.count;
            this.items[4].value = "有待支付订单";
          }
        }
      });
    },
    showPlugin(msg) {
      this.$vux.alert.show({
        title: "提示",
        content: msg
      });
    },

    showPluginAuto(msg) {
      this.showPlugin(msg);
      setTimeout(() => {
        this.$vux.alert.hide();
      }, 3000);
    }
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    } else {
      this.getNotify();
    }
  }
};
</script>
<style lang="less" scoped>
.root {
  overflow-x: hidden;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.nospace {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>