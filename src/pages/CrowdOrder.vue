<!-- 众筹申购页面
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
  price,              //众筹单价，单位 千克
  supply_people_num,  //众筹人数
  cp_name,            //游戏名称
  cp_desc,            //游戏描述
  funding_residue_day,//活动剩余天数
}

跳转链接
1. 微信支付 
    {
      name: "WeChatPay",
      params: {
        order: {
          type: 'crowd',          //商品分类
          id: this.item.payType,  //众筹项目编号，索引到配置表'crowd'中的项目，类似商品编号
          cid: this.item.cid,     //CP编码
          num: this.quantity,     //众筹加成数量
          price: this.realPay,    //实际价格，单位元
          desc: state.crowd.ConfigDict[this.item.payType].desc,
        },
        retPath: "/crowd/my"
      }
    }
2. 返回: Crowds
-->
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
      <div>
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;text-align:left">
              <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">支持数量：</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4"></flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:right" @click="onBuyNumChange(-1)">
              <img src="/static/img/stock/order/minus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:center">
              <span
                style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);"
              >&nbsp;{{quantity}}&nbsp;</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1">
            <div style="display:block;text-align:left" @click="onBuyNumChange(1)">
              <img src="/static/img/stock/order/plus.png" style="width:14px;height:14px">
            </div>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
      <!-- 关键信息：支付总额 -->
      <flexbox class="cell">
        <flexbox-item :span="3">
          <div style="display:block;text-align:left">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">支持金额：</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right">
            <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">￥{{realPay}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 支付方式：微信支付 -->
      <flexbox class="cell">
        <flexbox-item :span="3">
          <div style="display:block;text-align:left;">
            <img src="/static/img/stock/order/wechat_logo.png" style="width:22px;height:19px">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);vertical-align:top;">微信支付</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right">
            <img src="/static/img/stock/order/wechat_ok.png" style="width:14px;height:14px">
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>
    </div>

    <!-- 免责协议区 -->
    <div style="margin-right:15px;background-color:white">
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
            >免责协议：</span>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item :span="12">
          <div style="margin-left:25px;">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">1、点击“确认支付”，即表明您已阅并同意《支持者协议》、《法律声明及隐私权政策-项目众筹》，并自愿承担众筹风险。</span>
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
    <br>
    <div>
      <flexbox style="margin:0px;padding:0px;border-style:outset none outset none;border-width:1px;">
        <flexbox-item :span="7">
          <div style="width:100%;height:100%;align:center;text-align:center">
            <label style="font-weight:bold;font-size:16px;color:rgb(255,113,101);">&yen; {{realPay}}</label>
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-button
            style="border-radius:0px;background-color:rgb(255,113,101)"
            type="warn"
            @click.native="crowdPay()"
            v-bind:show-loading="showLoading"
          >确认支付</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
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
      showLoading: false,
      flagMore: false,
      item: {},     //CP对象
      payType: 0,   //支付类型
      quantity: 1,  //购买数量，预设为1
      realPay: 1,   //支付总额
    };
  },
  computed: {
    crowdConfig () { return this.$store.state.crowd.configDict; },
  },
  methods: {
    viewMore() {
      this.flagMore = true;
    },
    onBuyNumChange(value) {
      this.quantity = this.quantity + value;
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      this.calc();
    },
    onBack() {
      this.$router.push({ name: "CrowdInfo", params: { item: this.item } });
    },
    crowdPay() {
      this.$router.push({
        name: "WeChatPay",
        params: {
          order: {
            type: 'crowd',          //商品分类
            id: this.item.payType,  //众筹项目编号，索引到配置表'crowd'中的项目，类似商品编号
            cid: this.item.cid,     //CP编码
            num: this.quantity,     //众筹数量
            price: this.realPay,
            desc: this.crowdConfig[this.item.payType].desc,
          },
          retPath: "/crowd/my"
        }
      });
    },
    calc() {
      if(this.crowdConfig[this.item.payType].stock > 0) {
        this.realPay = parseFloat(
          this.item.price / this.assistant.unit.kg         //atom化为KG
          * this.crowdConfig[this.item.payType].stock   //选项包含的凭证数量
          * this.quantity                               //选项数量
          * this.assistant.unit.kgprice                    //KG单价
        ).toFixed(2);
      } else {
        this.realPay = this.quantity;
      }
    },
  },
  //#region 生命周期函数
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      if (!this.$route.params.item) {
        this.$router.push({ name: "Crowds" });
      } else {
        this.item = this.$route.params.item;
        this.$store.dispatch('crowd/getConfig').then(config=>{
          this.calc();
        });
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
