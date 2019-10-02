<!-- 个人中心页面
-->
<template>
  <div class="root" style="background-color:white;">
    <!-- 主功能链接 -->
    <div style="display:block;margin-top:-90px;" class="nospace">
      <div style="position:relative;width:100%;top:150px;"  @click="member()">
        <div align="center">
          <div style="display:block;postion:relative"><img :src="userBase.avatar_uri" style="width:61px;height:61px;"></div>
          <div style="display:block;postion:relative;margin-top:-61px"><img src="/static/img/stock/mine/star.png" style="width:61px;height:61px;"></div>
          <div style="display:block"><span style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,255,255);">{{this.userBase.name}}</span></div>
        </div>
      </div>
      <img src="/static/img/stock/mine/top.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
    </div>
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

    <nav></nav>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
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
    Nav,
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
      //@warning 当菜单项目数量、顺序发生变化时，红点标注需要同步调整 2019.08.22
      if (!!this.userBase && this.userBase.vl > 0) {
        //标签0 - 会员
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
        //标签1 - 我的道具
        this.items[1].badge = this.userBase.current_prop_count - this.userBase.prop_count;
      }
      this.$store.dispatch('message/clear');
      this.$store.dispatch('message/pull').then(()=>{
        //标签2 - 我的消息
        if (this.$store.state.message.list.length > 0) {
          this.items[2].badge = this.$store.state.message.list.length;
          this.items[2].value = "有新的消息";
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