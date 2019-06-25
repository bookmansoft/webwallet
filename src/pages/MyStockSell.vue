<template>
  <div class="root" style="background-color:white;margin-top:0px">
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:6px;"></div>
        </flexbox-item>
      </flexbox>
    </div>
    <div>
      <flexbox :gutter="0">
        <flexbox-item :span="6" style="background-color:rgb(233,233,233)">
          <div align="center" width="100%" @click="myStock">
            <span
              style="line-height:40px;font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(159,159,159);"
            >当前持有</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="6" style="background-color:rgb(255,113,101)">
          <div align="center" width="100%">
            <span
              style="line-height:40px;font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:white;"
            >挂单出售中</span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>


    <div style="display:block;margin-top:8px;margin-bottom:8px">
      <flexbox :gutter="0">
        <flexbox-item :span="5">
          <div style="margin-top:0px;" align="center">
            <span style=" font-size:14px;color:rgb(255,112,97);font-weight:bold;">游戏元宝名</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="padding-left:20px">
            <div style="height:24px;margin-top:10px;margin-bottom:-10px;">
              <span style="color:rgb(255,112,97); font-size:14px;font-weight:bold;">挂单价(千克)</span>
            </div>
            <div style="display:block;height:12px"></div>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;padding-right:10px" align="center">
            <div style="margin-top:0px;">
              <span style="color:rgb(255,112,97);font-size:14px;font-weight:bold;">数量</span>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>

    <div style="display:block;margin-top:8px;margin-bottom:8px"  @click="myStockSellDetail">
      <flexbox :gutter="0">
        <flexbox-item :span="2">
          <div class="flex-demo-left">
            <img
              src="http://114.116.148.48:9701/image/1/icon_img.jpg"
              style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="3" style="padding-left:5px">
          <div style="margin-top:0px;">
            <span style=" font-size:12px;">Cypto Dragon</span>
          </div>
          <div style="margin-top:6px;">
            <span style="color: #919191;font-size:12px;">剩余时间 2天</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="padding-left:20px">
            <div
              style="margin-left:5px;display:block;margin-top:6px;border-radius: 5px;text-align:center;line-height:26px;width:60px;height:26px;background-color:#ff7164;font-size:13px;color:white"
            >52.222</div>
            <div style="display:block;height:12px"></div>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;padding-right:10px" align="center">
            <div style="margin-top:0px;">
              <span style=" font-size:12px;">2000</span>
            </div>
            <div style="margin-top:6px;">
              <span style="color: #919191;font-size:12px;">已售320个</span>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:3px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    <div style="display:block;margin-top:8px;margin-bottom:8px" @click="myStockSellDetail">
      <flexbox :gutter="0">
        <flexbox-item :span="2">
          <div class="flex-demo-left">
            <img
              src="http://114.116.148.48:9701/image/2/icon_img.jpg"
              style="width: 45px;height: 45px;margin-left:17px;border-radius: 10%;"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="3" style="padding-left:5px">
          <div style="margin-top:0px;">
            <span style=" font-size:12px;">孤胆车神</span>
          </div>
          <div style="margin-top:6px;">
            <span style="color: #919191;font-size:12px;">剩余时间 12天</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div style="padding-left:20px">
            <div
              style="margin-left:5px;display:block;margin-top:6px;border-radius: 5px;text-align:center;line-height:26px;width:60px;height:26px;background-color:#ff7164;font-size:13px;color:white"
            >27.322</div>
            <div style="display:block;height:12px"></div>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;padding-right:10px" align="center">
            <div style="margin-top:0px;">
              <span style=" font-size:12px;">1200</span>
            </div>
            <div style="margin-top:6px;">
              <span style="color: #919191;font-size:12px;">已售320个</span>
            </div>
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
import { XButton, Tab, TabItem, Flexbox, FlexboxItem, LoadMore } from "vux";
import Navs from "@/components/Navs.vue";

export default {
  components: {
    Navs,
    Tab,
    XButton,
    TabItem,
    Flexbox,
    FlexboxItem,
    LoadMore
  },
  data() {
    return {
      msg: "众筹",
      tabIndex: 0,
      topItem: null,
      isLoadMore: false
    };
  },
  methods: {
    myStock() {
      this.$router.push({ name: "MyStock" });
    },
    myStockSellDetail() {
      this.$router.push({ name: "MyStockSellDetail" });
    }
  },
  created() {}
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
