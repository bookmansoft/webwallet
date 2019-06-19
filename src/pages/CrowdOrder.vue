<template>
  <div class="root">
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:6px;"></div>
        </flexbox-item>
      </flexbox>
    </div>
    <div style="background-color:white">
      <!-- 回报档 -->
      <div v-if="payType==0">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >回报档：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="3">
            <div style="display:block;text-align:right">
              <span
                style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >无偿支持</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <div v-if="payType==1 || payType==2 || payType==4 || payType==10">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >回报档：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="3">
            <div style="display:block;text-align:right">
              <span
                style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >￥{{this.payType*this.baseMultiple}}</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <!-- 购买数量及打赏金额 -->
      <div v-if="payType==0">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >打赏金额：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="2">
            <div style="display:block;text-align:center">
              <span
                style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >
                ￥
                <input type="text" style="width:30px" v-model="payYuanValue" @keyup="onPayYuan">
              </span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <div v-if="payType!=0">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >购买数量：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:right" @click="onBuyNumChange(-1)">
              <img src="static/img/stock/order/minus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:center">
              <span
                style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >&nbsp;{{buyNum}}&nbsp;</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:left" @click="onBuyNumChange(1)">
              <img src="static/img/stock/order/plus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <!-- 关键信息：支付总额 -->
      <flexbox class="cell">
        <flexbox-item :span="3">
          <div style="display:block;text-align:left">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >支付总额：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right">
            <span
              style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >￥{{realPay}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 支付方式：微信支付 -->
      <flexbox class="cell">
        <flexbox-item :span="3">
          <div style="display:block;text-align:left;">
            <img src="static/img/stock/order/wechat_logo.png" style="width:22px;height:19px">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);vertical-align:top;"
            >微信支付</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right">
            <img src="static/img/stock/order/wechat_ok.png" style="width:14px;height:14px">
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
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
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >免责协议：</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >1、点击“确认支付”，即表明您已阅并同意《支持者协议》、《法律声明及隐私权政策-项目众筹》，并自愿承担众筹风险。</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:45px" v-if="flagMore==false">
        <flexbox-item :span="12">
          <div style="height:40px;text-align:center;" @click="viewMore">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(72,93,172);"
            >查看更多▼</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px;" v-if="flagMore==true">
        <flexbox-item :span="12">
          <div style="display:block;margin-left:21px">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >2、众筹商户与本平台均不承诺任何形式的收益。</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px;" v-if="flagMore==true">
        <flexbox-item :span="12">
          <div style="display:block;margin-left:21px">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >3、请不要听信他人的建议。</span>
          </div>
          <div style="height:40px;"></div>
        </flexbox-item>
      </flexbox>
    </div>
    <br>
    <div>
      <flexbox
        style="margin:0px;padding:0px;border-style:outset none outset none;border-width:1px;"
      >
        <flexbox-item :span="7">
          <div style="width:100%;height:100%;align:center;text-align:center">
            <label style="font-weight:bold;font-size:16px;color:rgb(255,113,101);">&yen; {{realPay}}</label>
          </div>
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
//import { XHeader, Group, Cell } from 'vux'
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
import Navs from "@/components/Navs.vue";

export default {
  components: {
    Navs,
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
      msg: "众筹",
      headerTitle: "众筹购买",
      tabIndex: 0,
      quantity: 1,
      showLoading: false,

      baseMultiple: 50, //基数,不同的众筹可能是不同的，根据传入的参数决定
      item: {},
      payType: {}, //支付类型
      buyNum: 1, //购买数量，预设为1
      payYuanValue: 1, //捐赠金额，预设为1
      realPay: 1, //支付总额

      flagMore: false
    };
  },
  methods: {
    viewMore() {
      console.log("进入viewMore方法");
      this.flagMore = true;
    },
    onPayYuan() {
      console.log(317, this.payYuanValue);
      this.realPay = this.payYuanValue;
    },
    onBuyNumChange(value) {
      this.buyNum = this.buyNum + value;
      if (this.buyNum < 1) {
        this.buyNum = 1;
      }
      this.realPay = this.buyNum * this.payType * this.baseMultiple; //payType是倍数，分别为1,2,5,10倍;
    },
    onBack() {
      this.$router.push({ name: "CrowdInfo", params: { item: this.item } });
    },
    orderRePay() {
      let data = {
        func: "CommonOrderRepay",
        control: "order",
        price: this.item.price * this.quantity,
        productId: this.item.id,
        attach: this.item.cid,
        quantity: this.quantity,
        productIntro: this.item.cname,
        oemInfo: this.GLOBAL.oemInfo
      };
      console.log("order", data);
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log(res.data);
        if ((res.data.errcode = "success")) {
          //this.orderPay(res.data.tradeId)
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push({
              name: "WeChatPay",
              params: {
                order: res.data.order,
                tradeId: res.data.tradeId,
                retPath: "/my/stock"
              }
            });
          }, 1500);
        }
      });
    },
    crowdPay() {
      this.showLoading = true;
      // this.orderRePay();//暂时关闭支付方法
      let iNum=2;//parseInt(Math.random()*3);//0-2的整数
      switch (iNum) {
        case 0:
          this.$router.push({name:"BuySuccess"});
          break;
        case 1:
          this.$router.push({name:"BuyFail"});
          break;
        case 2:
          this.$router.push({name:"PaySuccess"});
          break;
      }
      
    }
  },

  created() {
    this.payType = this.$route.params.payType;
    this.item = this.$route.params.item;
    if (!!!this.item) {
      this.$router.push({ name: "Crowd" });
    }
    console.log("该元素 item", this.item);
    //初始化
    if (this.payType == 0) {
      this.realPay = this.payYuanValue;
    } else {
      this.realPay = this.buyNum * this.payType * this.baseMultiple; //payType是倍数，分别为1,2,5,10倍;
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
