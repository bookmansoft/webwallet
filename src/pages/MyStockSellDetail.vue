<template>
  <div class="root">
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:6px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" style="margin-top:14px;margin-bottom:14px;">
      <flexbox-item :span="2">
        <div style="display:block;margin-left:10px;margin-right:10px">
          <img
            src="http://114.116.148.48:9701/image/1/icon_img.jpg"
            style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
          >
        </div>
      </flexbox-item>
      <flexbox-item :span="10">
        <div style="display:block;margin-left:21px;">
          <div>
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';">孤胆车神</span>
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
          <span style="color: red; font-size:13px;">↑ 500(+ 20%)</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" style="margin-top:14px">
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(156,156,156)"
          >持有数量：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >86千克</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" style="margin-top:14px;">
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="3">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(156,156,156)"
          >当前价值：</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="8">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >50000.000千克</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top:14px">
      <flexbox-item :span="6" style="text-align:center">
        <div style="display:block;margin-left:21px;">
          <span
            style="text-align:right;font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >昨日收益(游戏金)</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="6" style="text-align:center">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >累计收益(游戏金)</span>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px;margin-bottom:14px">
      <flexbox-item :span="6" style="text-align:center">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >+0.155千克</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="6" style="text-align:center">
        <div style="display:block;">
          <span
            style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
          >+20.155千克</span>
        </div>
      </flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    <div style="background-color:white;">
      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block;margin-top:-8px">
            <span
              style="font-size:16px;line-height:25px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
            >收益明细</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;">
            <img src="static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:8px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="content">
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="10">
        <div style="display:block;margin-top:-8px">
          <span
            style="font-size:16px;line-height:25px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
          >到自由市场查看</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1">
        <div style="display:block;">
          <img src="static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
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

    <div style="display:block;margin-top:8px;margin-bottom:8px;margin-left:0px;margin:right:0px">
      <flexbox :gutter="0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="6" style="padding-left:5px">
          <div style="padding-top:0px;">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight: bold;color:rgb(255,113,100);"
            >买入</span>
          </div>
          <div style="padding-top:6px;">
            <span style="color: #919191;font-size:12px;">2019-6-25</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="padding-left:10px">
            <span style="color: #919191; font-size:12px;line-height:18px;">+100个</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;" align="left">
            <img src="static/img/stock/mywallet/arrow.png" style="width:7px;height:13px;">
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:3px;background-color:#f3f3f3"></div>
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
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
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
  line-height: 30px;
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
