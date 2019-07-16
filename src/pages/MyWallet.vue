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
      <img
        src="static/img/stock/mywallet/top.png"
        style="width:auto;height:auto;max-width:100%;max-height:100%"
      >
    </div>
    <flexbox :gutter="0" class="nospace" style="margin-top:-3px;margin-bottom:-3px">
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="static/img/stock/mywallet/left.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="send">
          <img src="static/img/stock/mywallet/send.png" style="width:32px;height:32px;">
        </div>
        <div style="display:block" align="center" @click="send">
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">发送</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click="receive">
          <img src="static/img/stock/mywallet/receive.png" style="width:32px;height:32px;">
        </div>
        <div style="display:block" align="center" @click="receive">
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">接收</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block" align="center" @click='sendPack'>
          <img src="static/img/stock/mywallet/red.png" style="width:30px;height:32px;">
        </div>
        <div style="display:block" align="center" @click='sendPack'>
          <span style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(51,51,51);">发红包</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block">
          <img src="static/img/stock/mywallet/right.png" style="width:100%;height:100px;">
        </div>
      </flexbox-item>
    </flexbox>

    <div style="display:block" class="nospace">
      <img src="static/img/stock/mywallet/bottom.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
    </div>

    <div style="background-color:white;">
      <flexbox :gutter="0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <flexbox class="content underline">
            <flexbox-item :span="12"></flexbox-item>
          </flexbox>
          <div @click="transList">
            <flexbox class="content underline">
              <flexbox-item :span="1">
                <img
                  src="static/img/stock/mywallet/list1.png"
                  style="width:20px;height:25px;"
                  @click="transList"
                >
              </flexbox-item>
              <flexbox-item :span="3">
                <div style="display:block;margin-top:-8px">
                  <span
                    style="font-size:16px;line-height:25px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
                    @click="transList"
                  >收支明细</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="7">
                <div style="display:block;"></div>
              </flexbox-item>
              <flexbox-item :span="1">
                <div style="display:block;">
                  <img src="static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <flexbox class="content underline">
            <flexbox-item :span="1">
              <img src="static/img/stock/mywallet/list2.png" style="width:21px;height:22px;">
            </flexbox-item>
            <flexbox-item :span="3">
              <div style="display:block;margin-top:-8px">
                <span
                  style="font-size:16px;line-height:25px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
                >红包管理</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <div style="display:block;"></div>
            </flexbox-item>
            <flexbox-item :span="1">
              <div style="display:block;">
                <img src="static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
              </div>
            </flexbox-item>
          </flexbox>
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
      mine: {},
      balance: {
        confirmed: 0,
        unconfirmed: 0
      },
    };
  },
  methods: {
    /**
     * 账户余额
     */
    balanceAll() {
        let data = {func:'BalanceAll', control: 'wallet', oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            this.balance.confirmed = this.GLOBAL.formatGameGold(res.data.balance.confirmed)
            this.balance.unconfirmed = this.GLOBAL.formatGameGold(res.data.balance.unconfirmed-res.data.balance.confirmed)
            this.doStart = true
        }).catch(res => {
            console.log(res)
        })
    },
    send() {
      this.$router.push({ name: "WalletSend" });
    },
    sendPack() {
      this.$router.push('/redPack');
    },
    receive() {
      this.$router.push('/wallet/receive');
    },
    transList() {
      console.log("transList");
      this.$router.push({ name: "TransList" });
    }
  },
  created() {
    if(!this.GLOBAL.userBase.uid) {
      this.$router.push('/login');
    }
    this.balanceAll();
  },
  mounted() {
    this.mine = this.GLOBAL.userBase;
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