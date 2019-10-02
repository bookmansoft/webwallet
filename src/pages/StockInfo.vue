<!-- 二级市场凭证详情页 
-->
<template>
  <div class="root">
    <div v-if="!!item">
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
            <span style="color:red; font-size:18px;">{{parseFloat(item.sell_price/100000).toFixed(3)}}千克</span>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div>
            <span v-if="item.sell_price>=item.price" style="color: red; font-size:13px;">↑ {{(item.sell_price-item.price)/100/1000}} (+ {{100*(item.sell_price/item.price-1)}}%)</span>
            <span v-if="item.sell_price<item.price" style="color: blue; font-size:13px;">↓ {{(item.price-item.sell_price/100)/1000}}(- {{100*(1-item.sell_price/item.price)}}%)</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px">
        <flexbox-item :span="12">
          <div style="display:block;margin-left:21px">
            <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);">今日交易数据</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px">
        <flexbox-item :span="4" style="text-align:right">
          <div style="display:block;">
            <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100)">最高成交价：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="2">
          <div style="display:block;">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{parseFloat(stock_bulletin.stock_high/100000).toFixed(3)}}千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3" style="text-align:right">
          <div style="display:block;">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">成交数量：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{stock_bulletin.total_num}}</span>
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox style="margin-top:14px;">
        <flexbox-item :span="4" style="text-align:right">
          <div style="display:block;margin-left:21px;">
            <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(0,128,0)">最低成交价：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="2">
          <div style="display:block;">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{parseFloat(stock_bulletin.stock_low/100000).toFixed(3)}}千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3" style="text-align:right">
          <div style="display:block;">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">成交金额：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;">
            <span
              style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >{{parseFloat(stock_bulletin.total_amount/100000).toFixed(3)}}千克</span>
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
            <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(50,58,69);">历史绩效数据</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px">
        <flexbox-item :span="4" style="text-align:right">
          <div style="display:block;margin-left:21px;">
            <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">流通总数：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="8">
          <div style="display:block;">
            <span
              style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >{{stock_bulletin.sum}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:14px">
        <flexbox-item :span="4" style="text-align:right">
          <div style="display:block;margin-left:21px;">
            <span style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">平均成本：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="8">
          <div style="display:block;">
            <span
              style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >{{parseFloat(stock_bulletin.price/100000).toFixed(3)}}千克</span>
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
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">{{parseFloat((stock_bulletin.bonus||0)/100000).toFixed(3)}}千克</span>
          </div>
        </flexbox-item>
      </flexbox>
      <box gap="0px 0px">
        <x-button  style="border-radius:0px;" type="warn" @click.native="crowdFreeOrder()">购入</x-button>
      </box>
    </div>
  </div>
</template>
<script>
import { Box, XButton, Tab, TabItem, Group, Flexbox, FlexboxItem } from "vux";
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Box,
    Nav,
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
      stock_bulletin: {}
    };
  },
  methods: {
    crowdFreeOrder() {
      this.$router.push({
        name: "StockOrder",
        params: { item: this.item }
      });
    },
    stockBulletin(cid) {
      this.$store.dispatch('stock/bulletin', {
        cid: cid,
      }).then(res => {
        console.log('stockbulletin item', res.data);
        if(res.code == 0) {
          this.stock_bulletin = res.data;
        }
      });
    }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
    }

    this.item = this.$route.params.item;
    if(!this.item) {
      this.$router.push('/mine');
    } else {
      console.log('show StockInfo', this.item);
      //获取看板信息
      this.stockBulletin(this.item.cid);
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
</style>
