<template>
  <div class="root" style="background-color:white;">
    <div style="position:absolute;width:100%;margin-top:60px">
      <div align="center">
        <!-- 相对于父容器定位 -->
        <div style="display:block;postion:relative">
          <img src="static/img/stock/mine/head.png" style="width:61px;height:61px;">
        </div>
        <div style="display:block;postion:relative;margin-top:-61px">
          <img src="static/img/stock/mine/star.png" style="width:61px;height:61px;">
        </div>
        <div style="display:block">
          <span style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,255,255);">王小明</span>
        </div>
      </div>
    </div>
    <!-- 正常代码区域 -->
    <div style="display:block" class="nospace">
      <img src="static/img/stock/mine/top.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
    </div>
    <flexbox :gutter="0" class="nospace" style="margin-top:-3px;margin-bottom:-3px">
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="static/img/stock/mine/left.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="mywallet()">
          <img src="static/img/stock/mine/mywallet.png" style="width:51px;height:56px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="mystock()">
          <img src="static/img/stock/mine/dingding.png" style="width:51px;height:56px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="about()">
          <img src="static/img/stock/mine/about.png" style="width:51px;height:56px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="static/img/stock/mine/right.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
    </flexbox>

    <div style="display:block" class="nospace">
      <img
        src="static/img/stock/mine/bottom.png"
        style="width:auto;height:auto;max-width:100%;max-height:100%"
      >
    </div>

    <navs></navs>
  </div>
</template>
    <!-- <group>
      <flexbox style="padding:5px;margin-top:5px">
        <flexbox-item :span="4">
          <div class="flex-demo-left">
            <img :src="userBase.avatar_uri " class="avatar" />
          </div></flexbox-item>
        <flexbox-item><div class="flex-demo-right"><span>{{userBase.nickname}}</span></div></flexbox-item>
      </flexbox>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items0" :key="index" :link="item.link" :value="item.value">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
          <img src="static/img/member/shot.png" style="width: 8px; height:8px; position: relative; left:-2px; top:0px;" v-if="item.showDot==true" />
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>    
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items1" :key="index" :link="item.link" :value="item.value">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
          <img src="static/img/member/shot.png" style="width: 8px; height:8px; position: relative; left:-2px; top:0px;" v-if="item.showDot==true" />
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group>
    <group>
      <cell :is-link="item.is_link" v-for="(item, index) in items2" :key="index" :link="item.link">
        <span slot="title">
          <span style="vertical-align:middle;">{{item.title}}</span>
          <badge :text="item.badge" v-if="item.badge > 0"></badge>
        </span>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.img">
      </cell>
    </group> -->
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

const getItems0 = () => [
  {
    title: "会员",
    is_link: true,
    img: "static/img/icon1/4.png",
    badge: 0,
    link: "/member",
    value: "",
    showDot: false
  },
  {
    title: "红包活动",
    is_link: true,
    img: "static/img/icon3/market3.png",
    badge: 0,
    link: "/redpack/act",
    value: "限时抽红包",
    showDot: false
  }
];
const getItems1 = () => [
  {
    title: "我的钱包",
    is_link: true,
    img: "static/img/mine/wallet.png",
    badge: 0,
    link: { path: "/wallet" },
    value: "",
    showDot: false
  },
  {
    title: "我的道具",
    is_link: true,
    img: "static/img/mine/prop.png",
    badge: 0,
    link: { path: "/props" },
    value: "",
    showDot: false
  },
  {
    title: "我的消息",
    is_link: true,
    img: "static/img/mine/msg.png",
    badge: 0,
    link: { path: "/message" },
    value: "",
    showDot: false
  },
  // {title: '我的交易', is_link: true, img: 'static/img/mine/trans.png', badge: 0, link: {path:'/wallet/detail'}, value: '', showDot: false},
  {
    title: "我的游戏",
    is_link: true,
    img: "static/img/mine/game.png",
    badge: 0,
    link: { path: "/mygame" },
    value: "",
    showDot: false
  },
  {
    title: "我的代练宝宝",
    is_link: true,
    img: "static/img/mine/stock.png",
    badge: 0,
    link: { path: "/my/stock" },
    value: "",
    showDot: false
  }
];
const getItems2 = () => [
  /*{title: '使用条款', is_link: true, img: 'static/img/icon1/3.png', badge: 0, link: ''},*/
  /*{title: '红包测试', is_link: true, img: 'static/img/mine/about.png', badge: 0, link: {path:'/redpack'}, value: ''},*/
  {
    title: "关于我们",
    is_link: true,
    img: "static/img/mine/about.png",
    badge: 0,
    link: { path: "/about" },
    value: ""
  }
];
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
      items0: getItems0(),
      items1: getItems1(),
      items2: getItems2(),
      userBase: null,
    };
  },
  methods: {
    mywallet() {
      this.$router.push({ name: "MyWallet" });
    },
    mystock() {
      this.$router.push({ name: "MyStock" });
    },
    about() {
      this.$router.push({ name: "About" });
    },
    getNotify() {
      if (!!this.userBase && this.userBase.vip_level > 0) {
        this.items0[0].value = "产币加速中"; //'未提' + this.GLOBAL.formatGameGold(this.userBase.vip_usable_count) + '千克'
        this.items0[0].img =
          "static/img/member/Vip" + this.userBase.vip_level + ".png";
        let current_time = parseInt(new Date().getTime() / 1000);
        if (this.GLOBAL.formatGameGold(this.userBase.vip_usable_count) >= 10) {
          this.items0[0].showDot = true;
        } else {
          this.items0[0].showDot = false;
        }
      }
      if (this.userBase.current_prop_count > this.userBase.prop_count) {
        this.items1[1].badge = this.userBase.current_prop_count - this.userBase.prop_count;
      }

      let data = {
        func: "GetNotify",
        control: "wallet",
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("GetNotify", res.data);
        if (res.data.errcode == "success") {
          if (res.data.count > 0) {
            this.items1[2].badge = res.data.count;
            this.items1[2].value = "有待支付订单";
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
    if(!this.GLOBAL.userBase.uid) {
      this.$router.push('/login');
    } else {
      this.userBase = this.GLOBAL.userBase;
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