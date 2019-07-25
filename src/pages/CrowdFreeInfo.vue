<!-- 众筹自由市场详情页 -->
<template>
  <div class="root">
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:6px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px;margin-bottom:14px;">
      <flexbox-item :span="3">
        <div style="display:block;margin-left:21px;">
          <img :src="item.icon_url" style="width:auto;height:auto;max-width:100%;max-height:100%">
        </div>
      </flexbox-item>
      <flexbox-item :span="9">
        <div style="display:block;margin-left:21px;">
          <div>
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >{{item.cp_text}}</span>
          </div>
          <div style="height:17px"></div>
          <div>
            <span
              style="color: #888; font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >{{item.provider}}</span>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';">当前交易价(游戏金)</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="5">
        <div style="display:block;margin-left:21px">
          <span style="color:red; font-size:18px;">{{parseInt(item.sell_stock_amount/100)/1000}}千克</span>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div>
          <span
            v-if="item.sell_stock_amount>=item.base_amount"
            style="color: red; font-size:13px;"
          >↑ {{parseInt(item.sell_stock_amount-item.base_amount/100)/1000}} (+ {{parseInt(item.sell_stock_amount*100/item.base_amount-100)}}%)</span>
          <span
            v-if="item.sell_stock_amount<item.base_amount"
            style="color: blue; font-size:13px;"
          >↓ {{parseInt(item.base_amount-item.sell_stock_amount/100)/1000}}(- {{parseInt(100-item.sell_stock_amount*100/item.base_amount)}}%)</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span
            style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);"
          >今日交易数据</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;">
          <span
            style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100)"
          >最高成交价：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{parseInt(stock_bulletin.stock_high/100)/1000}}千克</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >成交数量：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{stock_bulletin.total_num}}</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px;">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span
            style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(0,128,0)"
          >最低成交价：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="2">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{parseInt(stock_bulletin.stock_low/100)/1000}}千克</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >成交金额：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{parseInt(stock_bulletin.total_amount/100)/1000}}千克</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span
            style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);"
          >历史绩效数据</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span
            style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >持续分红时间：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >{{history_text[0]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >累计分红：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >{{history_text[1]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span
            style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >流通元宝总数：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{history_text[2]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px;margin-bottom:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >每个收益：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >{{history_text[3]}}</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span
            style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);"
          >最新出售列表</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4">
        <div style="display:block;text-align:center;margin-left:21px;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69)"
          >单价(千克)</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="4">
        <div style="display:block;text-align:center;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >数量(个)</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="4">
        <div style="display:block;text-align:center;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >操作</span>
        </div>
      </flexbox-item>
    </flexbox>

    <div v-for="(itemSale, index) in now_sale" :key="index">
      <flexbox style="margin-top:14px">
        <flexbox-item :span="4">
          <div style="display:block;text-align:center;margin-left:21px;">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69)"
            >{{itemSale.price}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="display:block;text-align:center;">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >{{itemSale.num}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:center;">
            <div
              style="display:block;margin-left:5px;margin-top:6px;border-radius: 15px;text-align:center;line-height:26px;width:50px;height:26px;background-color:#ff7164;font-size:13px;color:white"
              @click="crowdFreeOrder()"
            >购入</div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, TabItem, Group, Flexbox, FlexboxItem } from "vux";
import Navs from "@/components/Navs.vue";

export default {
  components: {
    Navs,
    Tab,
    XButton,
    TabItem,
    Group,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      msg: "众筹",
      item: {},
      history_text: {},
      now_sale: {},
      stock_bulletin: {}
    };
  },
  methods: {
    crowdFreeOrder() {
      this.$router.push({
        name: "CrowdFreeOrder",
        params: { item: this.item }
      });
    },
    stockBulletin(cid) {
      this.remote.fetching({
        func: "ListRecord",
        control: "stockbulletin",
        cid: cid
      }).then(res => {
        this.stock_bulletin = res.data.list[0];
      });
    }
  },
  created() {
    this.item = this.$route.params.item;
    if(!this.item) {
      this.$router.push('/mine');
    }

    //历史绩效数据
    this.history_text = this.item.history_text;
    if(typeof this.history_text == 'string') {
      this.history_text = JSON.parse(this.history_text) || {};
    }
    console.log('history_text', this.history_text);
    //最新出售列表数据
    this.now_sale = this.item.now_sale;
    if(typeof this.now_sale == 'string') {
      this.now_sale = JSON.parse(this.now_sale);
    }

    //获取股票行情；在该方法中设置最新的一行记录
    this.stockBulletin(this.item.cid);
  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  margin-left: 0px;
  margin-right: 0px;
}
</style>
