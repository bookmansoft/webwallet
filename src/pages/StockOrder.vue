<!-- 二级市场凭证购买页 
--> 
<template>
  <div class="root">
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12"><div style="height:6px;"></div></flexbox-item>
      </flexbox>
    </div>
    <div v-if="!!item" style="background-color:white">
      <div>
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;padding:8px">
              <img src="/static/img/stock/orderfree/head.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
            </div>
          </flexbox-item>
          <flexbox-item :span="9">
            <div style="display:block;margin-left:5px;line-height:30px">
              <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{item.desc}}</span><br />
              <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">{{parseFloat(item.sell_price/100000).toFixed(3)}}千克</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 购买数量 -->
      <div>
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">购买数量：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:right" @click="onBuyNumChange(-1)">
              <img src="/static/img/stock/order/minus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:center">
              <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">&nbsp;{{buyNum}}&nbsp;</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:left" @click="onBuyNumChange(100)">
              <img src="/static/img/stock/order/plus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 支付方式 -->
      <flexbox class="cell">
        <flexbox-item :span="4">
          <div style="display:block;text-align:left;">
            <img src="/static/img/stock/orderfree/buy.png" style="width:22px;height:19px">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);vertical-align:top;">游戏金支付</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right"><img src="/static/img/stock/order/wechat_ok.png" style="width:14px;height:14px"></div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12"><div style="height:2px;background-color:#f3f3f3"></div></flexbox-item>
      </flexbox>

      <!-- 关键信息：支付总额 -->
      <flexbox class="cell">
        <flexbox-item :span="3">
          <div style="display:block;text-align:left">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">商品总金额：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right"><span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{realPay}}千克</span></div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </div>

    <!-- 免责协议区 -->
    <div style="margin-right:15px;background-color:white">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:40px;"></div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;height:40px;">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">免责协议：</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">1、点击“确认支付”，即表明您已阅并同意《支持者协议》、《法律声明及隐私权政策-项目众筹》，并自愿承担众筹风险。</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:45px" v-if="flagMore==false">
        <flexbox-item :span="12">
          <div style="height:40px;text-align:center;" @click="viewMore">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(72,93,172);">查看更多▼</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px;" v-if="flagMore==true">
        <flexbox-item :span="12">
          <div style="display:block;margin-left:21px">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">2、众筹商户与本平台均不承诺任何形式的收益。</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px;" v-if="flagMore==true">
        <flexbox-item :span="12">
          <div style="display:block;margin-left:21px">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">3、请不要听信他人的建议。</span>
          </div>
          <div style="height:40px;"></div>
        </flexbox-item>
      </flexbox>
    </div>
    <br>
    <div>
      <flexbox style="margin:0px;padding:0px;border-style:outset none outset none;border-width:1px;">
        <flexbox-item :span="7">
          <div  style="width:100%;height:100%;align:center;text-align:center"><label style="font-weight:bold;font-size:16px;color:rgb(255,113,101);" >{{realPay}}千克</label></div>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-button
            style="border-radius:0px;background-color:rgb(255,113,101)"
            type="warn"
            @click.native="crowdPay()"
            v-bind:show-loading="showLoading"
          >确认支付</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import {
  XButton,
  XHeader,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Group,
  Divider,
  Box,
  InlineXNumber,
  Cell,
  CellBox,
  CellFormPreview,
  Badge
} from "vux";

export default {
  components: {
    Tab,
    XButton,
    XHeader,
    TabItem,
    Flexbox,
    FlexboxItem,
    Group,
    Divider,
    Box,
    InlineXNumber,
    Cell,
    CellBox,
    CellFormPreview,
    Badge
  },
  data() {
    return {
      headerTitle: "凭证购买",
      tabIndex: 0,
      item: {},
      buyNum: 100,  //购买数量
      realPay: 0,   //支付总额 - 千克
      showLoading: false,
      flagMore: false,
    };
  },
  methods: {
    viewMore() {
      console.log("进入viewMore方法");
      this.flagMore = true;
    },
    onBuyNumChange(value) {
      //todo 这里暴露一个问题：余额不足100将无法卖出
      this.buyNum = this.buyNum + value;
      if (this.buyNum < 100) {
        this.buyNum = 100;
      }
      this.buyNum = Math.min(this.item.sell_sum, this.buyNum);
      this.realPay = this.buyNum * parseFloat(this.item.sell_price/100000).toFixed(3);
    },
    onBack() {
      this.$router.push({ name: "CrowdInfo", params: { item: this.item } });
    },
    crowdPay() {
      this.$store.dispatch('stock/auction', {
          addr: this.item.addr,
          cid: this.item.cid,
          price: this.item.sell_price,
          num: this.buyNum,
      }).then(res => {
          if(res.code == 0) {
            this.$vux.alert.show({
              title: '购买成功',
              content: '购买成功',
            })
          } else {
            this.$vux.alert.show({
              title: '购买失败',
              content: res.msg,
            })
          }
      }).catch(e => {
        console.log(e);
      });  

      setTimeout(() => {
          this.showLoading = false
          this.$router.push({ name: "StockInfo", params: { item: this.item } });
      }, 2000);
    }
  },

  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
    }

    this.item = this.$route.params.item;
    if (!this.item) {
      this.$router.push({ name: "Crowds" });
    } else {
      console.log("StockOrder item", this.item);
      this.realPay = this.buyNum * parseFloat(this.item.sell_price/100000).toFixed(3);
    }
  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  margin-left: 0px;
  margin-right: 0px;
}
.cell {
  margin-left: 25px;
  margin-right: 5px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.content {
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 5px;
  margin-bottom: 15px;
}

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
  /*border-radius: 4%;*/
  /*border-top-left-radius:1.5em;*/
  /*border-top-right-radius:1.5em; */
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 10px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
.flex-center {
  text-align: center;
  padding: 5px;
}
</style>
