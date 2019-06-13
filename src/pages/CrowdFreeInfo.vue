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
    <!-- <p>
      <span>分时K线(用单独的iframe填充)</span>
    </p>-->
    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);">今日交易数据</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100)">最高成交价：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[0]}}</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">成交数量：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[2]}}</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(0,128,0)">最低成交价：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[1]}}</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3" style="text-align:right">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">成交金额：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[3]}}</span>
        </div>
      </flexbox-item>
    </flexbox>


    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);">历史绩效数据</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">持续分红时间：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">{{history_text[0]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">累计分红：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">{{history_text[1]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;margin-left:21px;">
          <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">流通元宝总数：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[2]}}</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="4" style="text-align:right">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">每个收益：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{history_text[3]}}</span>
        </div>
      </flexbox-item>
    </flexbox>







    <flexbox>
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
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
      item: null,
      history_text: null,
      now_sale: null
    };
  },
  methods: {},
  created() {
    this.item = this.$route.params.item;
    //历史绩效数据
    this.history_text = eval(this.item.history_text);
    console.log(133, this.history_text);
    //最新出售列表数据
    this.now_sale = eval(this.item.now_sale);
    console.log(136, this.now_sale);

    //获取股票行情；在该方法中设置最新的一行记录
    // this.stockBullet();
  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  margin-left: 0px;
  margin-right: 0px;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
