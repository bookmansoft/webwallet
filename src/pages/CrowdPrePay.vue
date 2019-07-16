<!-- 选择回报，及支付的前一页 -->
<template>
  <div class="root">
    <div style="background-color:#f3f3f3">
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
            >风险提示：</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >1、您参与众筹是支持创意变为现实的过程，而不是直接的商品交易，因此存在一定风险。请您根据自己的判断选择，支持众筹项目。</span>
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

    <!-- 各类回报的区域 -->
    <div style="background-color:white">
      <!-- 无偿回报 -->
      <div @click="crowdOrder(0)">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
              >○ 无偿回报</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="5"></flexbox-item>
          <flexbox-item :span="4">
            <div style="display:block;text-align:left">
              <span
                style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >已支持2次</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>
      <!-- 第1类：50股 -->
      <div @click="crowdOrder(1)">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
              >○ ￥50元</span>&nbsp;
            </div>
          </flexbox-item>
          <flexbox-item :span="5"></flexbox-item>
          <flexbox-item :span="4">
            <div style="display:block;text-align:left">
              <span
                style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >已支持2次</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="content">
          <flexbox-item :span="12">
            <div style="display:block;text-align:left;margin-right:50px;">
              <span
                style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >
                可爱毛公仔一只 普通毛公仔一只 还有其他各种可爱小饰品由你挑选
                <br>游戏金100千克
              </span>&nbsp;
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 第2类：100股 -->
      <div @click="crowdOrder(2)">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
              >○ ￥100元</span>&nbsp;
            </div>
          </flexbox-item>
          <flexbox-item :span="5"></flexbox-item>
          <flexbox-item :span="4">
            <div style="display:block;text-align:left">
              <span
                style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >已支持2次</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="content">
          <flexbox-item :span="12">
            <div style="display:block;text-align:left;margin-right:50px;">
              <span
                style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >
                可爱毛公仔一只 普通毛公仔一只 还有其他各种可爱小饰品由你挑选
                <br>游戏金100千克
              </span>&nbsp;
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 第3类：200股，payType：4 -->
      <div @click="crowdOrder(4)">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
              >○ ￥200元</span>&nbsp;
            </div>
          </flexbox-item>
          <flexbox-item :span="5"></flexbox-item>
          <flexbox-item :span="4">
            <div style="display:block;text-align:left">
              <span
                style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >已支持22次</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="content">
          <flexbox-item :span="12">
            <div style="display:block;text-align:left;margin-right:50px;">
              <span
                style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >
                可爱毛公仔一只 普通毛公仔一只 还有其他各种可爱小饰品由你挑选
                <br>游戏金100千克
              </span>&nbsp;
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>
      <!-- 第4类：500股，payType:10 -->
      <div @click="crowdOrder(10)">
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span
                style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
              >○ ￥500元</span>&nbsp;
            </div>
          </flexbox-item>
          <flexbox-item :span="5"></flexbox-item>
          <flexbox-item :span="4">
            <div style="display:block;text-align:left">
              <span
                style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >已支持12次</span>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="content">
          <flexbox-item :span="12">
            <div style="display:block;text-align:left;margin-right:50px;">
              <span
                style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >
                可爱毛公仔一只 普通毛公仔一只 还有其他各种可爱小饰品由你挑选
                <br>游戏金100千克
              </span>&nbsp;
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
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
      item: {},
      flagMore: false
    };
  },
  methods: {
    viewMore() {
      console.log("进入viewMore方法");
      this.flagMore = true;
    },
    crowdOrder(payType) {
      console.log("回报类别:", payType);
      this.$router.push({
        name: "CrowdOrder",
        params: { item: this.item, payType: payType }
      });
    }
  },
  created() {
    this.item = this.$route.params.item;
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
  margin-top: 20px;
  margin-bottom: 15px;
}
.content {
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
