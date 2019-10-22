<!-- 第三方订单支付页面

1. 第三方应用通过 URLSchema 模式跳转到本页面，跳转时携带如下参数：
```json
{
  cid,        //CP编码
  sn,         //订单编号
  price,      //订单金额, 单位尘
  url,        //回转地址
}
```

2. 用户在本页面上完成支付
3. 用户根据提示跳转回第三方应用
4. 第三方应用提示用户完成了全部支付流程

-->
<template>
  <div class="root">
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12"><div style="height:6px;"></div></flexbox-item>
      </flexbox>
    </div>
    <div v-if="!!item" style="background-color:white">
      <div>
        <flexbox class="cell">
          <flexbox-item :span="3">
            <div style="display:block;padding:8px">
              <img src="/static/img/stock/orderfree/head.png" style="width:auto;height:auto;max-width:100%;max-height:100%">
            </div>
          </flexbox-item>
          <flexbox-item :span="9">
            <div style="display:block;margin-left:5px;line-height:30px">
              <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);">{{item.desc}}</span><br />
              <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);">{{parseFloat(item.price/100000).toFixed(3)}}千克</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:2px;background-color:#f3f3f3"></div>
        </flexbox-item>
      </flexbox>

      <!-- 支付方式 -->
      <flexbox class="cell">
        <flexbox-item :span="4">
          <div style="display:block;text-align:left;">
            <img src="/static/img/stock/orderfree/buy.png" style="width:22px;height:19px">
            <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(50,58,69);vertical-align:top;">游戏金支付</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="3"></flexbox-item>
        <flexbox-item :span="3">
          <div style="display:block;text-align:right"><img src="/static/img/stock/order/wechat_ok.png" style="width:14px;height:14px"></div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </div>

    <div>
      <flexbox style="margin:0px;padding:0px;border-style:outset none outset none;border-width:1px;">
        <flexbox-item :span="7">
          <div  style="width:100%;height:100%;align:center;text-align:center"><label style="font-weight:bold;font-size:16px;color:rgb(255,113,101);" >{{parseFloat(item.price/100000).toFixed(3)}}千克</label></div>
        </flexbox-item>
        <flexbox-item :span="5">
          <x-button style="border-radius:0px;background-color:rgb(255,113,101)" type="warn" @click.native="OrderPay()" v-bind:show-loading="showLoading">确认支付</x-button>
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
import Navi from "@/components/Navi.vue";

export default {
  components: {
    Navi,
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
      headerTitle: "凭证购买",
      tabIndex: 0,
      item: {},
      showLoading: false,
      flagMore: false,
    };
  },
  computed: {
    userBase() {
      return this.$store.state.user.auth;
    }
  },
  methods: {
    viewMore() {
      console.log("进入viewMore方法");
      this.flagMore = true;
    },
    OrderPay() {
      this.$store.dispatch('wallet/pay', {
          sn: this.item.sn,
          cid: this.item.cid,
          price: this.item.price,
      }).then(res => {
          if(res.code == 0) {
            this.$vux.alert.show({
              title: '购买成功',
              content: '购买成功',
            })
          } else {
            this.$vux.alert.show({
              title: '购买失败',
              content: res.msg,
            })
          }

          this.$store.dispatch('cp/getItem', this.item.cid).then(dt => {
            let url = dt.cpurl;
            this.$store.dispatch('cp/UserToken', {
              cid: this.item.cid,
            }).then(res => {
              if(res.code == 0) {
                window.location.href = `${url}?kyc=${encodeURIComponent(JSON.stringify(res.data))}`;
              }
            });
          });
      }).catch(e => {
        console.log(e);
      });  
    }
  },

  created() {
    if(!this.$route.params.order) {
      if(!this.userBase.uid) { 
        this.$router.push({ name: 'Login'});
      } else {
        this.$router.push('/home');
      }
    } else if(!this.userBase.uid) {
        this.$router.push({ name: 'Login', params: { path: `/wallet/pay/${this.$route.params.order}` }});
    } else {
      this.item = this.$route.params.order;
      if(typeof this.item == 'string') {
        this.item = JSON.parse(decodeURIComponent(this.item));
      }
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
