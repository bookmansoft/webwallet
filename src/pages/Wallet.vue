<!-- 我的钱包
-->
<template>
  <div class="root" style="background-color:white;">
    <div style="position:absolute;width:100%;margin-top:30px">
      <div align="center">
        <!-- 相对于父容器定位 -->
        <div style="display:block;">
          <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,255,255);">钱包余额(千克)</span>
        </div>
        <div style="display:block;margin-top:10px">
          <span style="font-size:32px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,255,255);">{{balance.confirmed}}</span>
        </div>
        <div style="display:block;margin-top:15px">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,255,255);">未入账 {{balance.unconfirmed}}</span>
        </div>
      </div>
    </div>
    <!-- 正常代码区域 -->
    <div style="display:block" class="nospace">
      <img src="/static/img/stock/mywallet/top.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
    </div>

    <flexbox :gutter="0" class="nospace" style="margin-top:-3px;margin-bottom:-3px">
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="/static/img/stock/mywallet/left.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
      
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="send">
          <img src="/static/img/stock/mywallet/send.png" style="width:32px;height:32px;">
        </div>
        <div style="display:block" align="center" @click="send">
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">发送</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="receive">
          <img src="/static/img/stock/mywallet/receive.png" style="width:32px;height:32px;">
        </div>
        <div style="display:block" align="center" @click="receive">
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">接收</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click='sendRedPack'>
          <img src="/static/img/stock/mywallet/red.png" style="width:30px;height:32px;">
        </div>
        <div style="display:block" align="center" @click='sendRedPack'>
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">发红包</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="/static/img/stock/mywallet/right.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
    </flexbox>

    <div style="display:block" class="nospace">
      <img src="/static/img/stock/mywallet/bottom.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
    </div>

    <div style="background-color:white;">
      <flexbox :gutter="0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <flexbox class="content underline">
            <flexbox-item :span="12"></flexbox-item>
          </flexbox>
          <div v-for="(item, index) in items" :key="index">
            <flexbox class="content underline" @click.native="onItemClick(item)">
              <flexbox-item :span="1">
                <img :src="item.icon" style="width:20px;height:25px;">
              </flexbox-item>
              <flexbox-item :span="4">
                <div style="display:block;margin-top:-8px">
                  <span style="font-size:16px;line-height:25px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{item.label}}</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="5">
                <div style="display:block;"></div>
              </flexbox-item>
              <flexbox-item :span="1">
                <div style="display:block;">
                  <img src="/static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>
      <!-- 内容区 -->
    </div>

    <!-- <navs></navs> -->
  </div>
</template>
<script>
import Navs from "@/components/Navs.vue";
import {
  Grid, GridItem,
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
    Grid, GridItem,
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
    balance() {return this.$store.state.user.balance},
    userBase() {return this.$store.state.user.auth},
    items() {return this.$store.state.wallet.menu},
  },
  methods: {
    onItemClick(item) {
      console.log(item);
      this.$router.push(item.link);
    },
    send() {
      this.$router.push({ name: "WalletSend" });
    },
    sendRedPack() {
      this.$router.push('/redpack');
    },
    receive() {
      this.$router.push('/wallet/receive');
    },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
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
.content {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 60px;
}
.underline {
  border-style: solid;
  border-color: rgb(230, 230, 230);
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}
</style>