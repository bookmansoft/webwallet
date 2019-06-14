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
      <div v-if="payType==1">
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
              >￥50</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <div v-if="payType==2">
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
              >￥100</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <div v-if="payType==3">
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
              >￥200</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <div v-if="payType==4">
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
              >￥500</span>
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
              >￥<input type="text" style="width:30px" v-model="payYuanValue" @keyup="onPayYuan"/></span>
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
              >￥100</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>
    </div>

    <div style="background-color: #f5f5f9; padding: 12px;">
      <div style="background-color: white; padding: 15px;">
        <flexbox>
          <flexbox-item :span="3" class="flex-left">
            <img src="static/img/crowd/gift.png" style="width:80px; height:80px">
          </flexbox-item>
          <flexbox-item :span="9" class="flex-left">
            <p>
              <span style="font-size:17px;">进击的兵长 代练宝宝</span>
            </p>
            <br>
            <p>
              <span style="color:coral; font-size:16px;">￥{{item.price}}</span>
            </p>
          </flexbox-item>
        </flexbox>
        <br>
        <flexbox>
          <flexbox-item :span="5" class="flex-left">
            <p>
              <span style="font-size:17px;">购买数量</span>
            </p>
          </flexbox-item>
          <flexbox-item class="flex-right">
            <p>
              <inline-x-number width="50px" v-model="quantity"></inline-x-number>
            </p>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div style="background-color: #f5f5f9; padding: 0px 0px 0px 0px">
      <div style="padding: 0px 12px 0px 12px">
        <group>
          <cell :is-link="true" value="微信支付">
            <span slot="title">
              <span style="vertical-align:middle;">支付方式</span>
            </span>
          </cell>
          <cell :is-link="true" value="无可用">
            <span slot="title">
              <span style="vertical-align:middle;">优惠券</span>
            </span>
          </cell>
        </group>

        <group>
          <cell :is-link="true" :value="item.price*quantity+'元'">
            <span slot="title">
              <span style="vertical-align:middle;">商品金额</span>
            </span>
          </cell>
        </group>
      </div>
    </div>
    <div>
      <br>
      <box gap="10px 10px">
        <x-button
          :gradients="['#FF5E3A', '#FF9500']"
          @click.native="crowdPay()"
          v-bind:show-loading="showLoading"
        >去支付</x-button>
      </box>
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

      item: {},
      payType: {}, //支付类型
      buyNum: 1, //购买数量，预设为1
      payYuanValue:1 //捐赠金额，预设为1
    };
  },
  methods: {
    onPayYuan() {
      console.log(317,this.payYuanValue);
    },
    onBuyNumChange(value) {
      this.buyNum = this.buyNum + value;
      if (this.buyNum < 1) {
        this.buyNum = 1;
      }
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
      this.orderRePay();
    }
  },

  created() {
    this.payType = this.$route.params.payType;
    this.item = this.$route.params.item;
    if (!!!this.item) {
      this.$router.push({ name: "Crowd" });
    }
    console.log("该元素 item", this.item);
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
