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
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">风险提示：</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">1、您参与众筹是支持创意变为现实的过程，而不是直接的商品交易，因此存在一定风险。请您根据自己的判断选择，支持众筹项目。</span>
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

    <!-- 回报项选择区 -->
    <div style="background-color:white">
      <div v-for="(item, index) in crowdItems" :key="index">
        <div v-on:click="crowdOrder(item.payType)">
          <flexbox class="cell">
            <flexbox-item :span="3">
              <div style="display:block;text-align:left">
                <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">○ {{item.name}}</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="5"></flexbox-item>
            <flexbox-item :span="4">
              <div style="display:block;text-align:left">
                <span style="font-size:11px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">参与人次 {{item.count||0}}</span>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <flexbox class="content">
          <flexbox-item :span="12">
            <div  v-if="item.price > 0" style="display:block;text-align:left;margin-right:50px;">
              <span style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">
                {{item.desc}}<br>捐赠: &yen; {{item.price}}
              </span>
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
      crowdItems: [],
      flagMore: false
    };
  },
  methods: {
    viewMore() {
      this.flagMore = true;
    },
    crowdOrder(payType) {
      this.item.payType = payType;
      this.$router.push({
        name: "CrowdOrder",
        params: { item: this.item },
      });
    }
  },
  //#region 生命周期函数
  created() {
    this.item = this.$route.params.item;
    this.GLOBAL.ConfigMgr.get('crowd', (err, config) => {
      if(!err) {
        this.crowdItems = Object.keys(config).map(key=>config[key]);
      }

      //todo 还需要为配置表项中的 count(支持人数) 填充数值
    });
  }
  //#endregion
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
