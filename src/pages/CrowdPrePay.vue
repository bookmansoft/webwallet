<!-- 众筹预支付页面
数据接口
1. item: 
{
  icon_url,           //游戏图标
  small_img_url,      //游戏小图
  large_img_url，     //游戏大图
  pic_urls,           //游戏截屏图数组
  funding_text,       //众筹描述
  provider,           //游戏开发商
  percent2,           //完成进度(Calc)
  price,              //众筹单价
  supply_people_num,  //众筹人数
  cp_name,            //游戏名称
  cp_desc,            //游戏描述
  funding_residue_day,//活动剩余天数
}
2. this.$store.state.crowd.configList -> crowdConfigList,

跳转链接
1. 支付页面 { name: "CrowdOrder", params: { item: this.item } }
2. 返回: Crowds
-->
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
      <div v-for="(item, index) in crowdConfigList" :key="index">
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
            <div style="display:block;text-align:left;margin-right:50px;">
              <span style="word-break: normal;font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">
                {{item.desc}}<br>捐赠: &yen; {{parseFloat(item.stock*factor||1).toFixed(2)}}
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
import Nav from "@/components/Nav.vue";

export default {
  components: {
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
      item: {},
      factor: 0,
      flagMore: false
    };
  },
  computed: {
    crowdConfigList() {return this.$store.state.crowd.configList},
    unit() {return this.$store.state.config.dict['base'];},
  },
  methods: {
    viewMore() {
      this.flagMore = true;
    },
    //从配置表选项中进行选择，然后跳转至支付页面
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
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      this.item = this.$route.params.item;
      if(!this.item) {
        this.$router.push("/crowds");
      } else {
        this.factor = this.item.price / this.unit.kg * this.unit.kgprice;
        this.$store.dispatch('crowd/getConfig');
      }
    }
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
