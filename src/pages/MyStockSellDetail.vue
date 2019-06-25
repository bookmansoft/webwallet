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
            <img
              src="http://114.116.148.48:9701/image/1/icon_img.jpg"
              style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
            >
        </div>
      </flexbox-item>
      <flexbox-item :span="9">
        <div style="display:block;margin-left:21px;">
          <div>
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >孤胆车神</span>
          </div>
          <div style="height:17px"></div>
          <div>
            <span
              style="color: #888; font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >魔芋工作室</span>
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
          <span style="color:red; font-size:18px;">2100千克</span>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div>
          <span
            style="color: red; font-size:13px;"
          >↑ 500(+ 20%)</span>

        </div>
      </flexbox-item>
    </flexbox>
    <!-- <p>
      <span>分时K线(用单独的iframe填充)</span>
    </p>-->
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
          >86千克</span>
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
          >2000</span>
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
          >50千克</span>
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
          >2100千克</span>
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
          >2222</span>
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
          >5500</span>
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
          >1200</span>
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
          >420</span>
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
            >12</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="display:block;text-align:center;">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >25</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:center;">
            <div
              style="display:block;margin-left:5px;margin-top:6px;border-radius: 15px;text-align:center;line-height:26px;width:50px;height:26px;background-color:#ff7164;font-size:13px;color:white"
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

    };
  },
  methods: {

  },
  created() {

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
