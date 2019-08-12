<!-- 游戏金发送界面
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
    <div style="background-color:white;">
      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="9">
          <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">接收人地址</span>
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-left:10px;" @click="wxScanCode">
            <img src="/static/img/stock/send/scan.png" style="width:auto;height:auto;max-width:100%;max-height:100%;">
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="11">
        <x-textarea
          :rows="2"
          name="address"
          ref="address"
          v-model="address"
          placeholder="输入地址"
          required
          style="border-style: solid;border-width: 1px;border-color:#888888;width:80%;line-height:20px"
        ></x-textarea>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">发送金额（千克）</span>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="11">
          <x-input name="number" v-model="number" ref="number" title="" required placeholder="请输入发送金额" style="border-style: solid;border-width: 1px;border-color:#888888;width:80%;line-height:20px"></x-input>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <span style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(154,154,154);">可用余额</span>
          <balance ref="balance" :balance="balance"></balance>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>
    </div>

    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:6px;"></div>
        </flexbox-item>
      </flexbox>
    </div>

    <div style="background-color:white;margin-top:50px">
      <flexbox :gutter="0" class="content">
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="8">
          <x-button  style="border-radius:20px;" type="warn" @click.native="sendGamegold">下一步</x-button>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import Balance from "@/components/Balance.vue";
import {
  XHeader,
  XInput,
  XTextarea,
  Group,
  XButton,
  Box,
  Flexbox,
  FlexboxItem
} from "vux";

const re = /^[0-9a-zA-Z]*$/g; //判断字符串是否为数字和字母组合     //判断正整数 /^[1-9]+[0-9]*]*$/
export default {
  components: {
    XHeader,
    XInput,
    XTextarea,
    Group,
    Balance,
    XButton,
    Box,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      headerTitle: "发送游戏金",
      msg1: "输入地址或者扫描地址二维码",
      msg2: "输入游戏金数量",
      address: "",
      number: "",
    };
  },
  computed:{
    userBase() {return this.$store.state.user.auth},
    balance() {return this.$store.state.user.balance},
  },
  methods: {
    onBack() {
      this.$router.push("/wallet");
    },

    /**
     * 调用摄像头
     */
    wxScanCode() {
      let self = this;

      //获取微信令牌
      this.$store.dispatch('user/WechatConfig', {
        uri: window.location.href.split('#')[0],
      }).then(res=>{
        if (res.code == 0) {
          self.$wechat.config(res.data);
          self.$wechat.ready(function(){
            self.$wechat.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function(r) {
                console.log('scanQRCode', r);
                self.address = r.resultStr; // 当needResult 为 1 时，扫码返回的结果
              },
              fail: function(r) {
                console.log('scanQRCode', r);
                self.utils.myAlert(self.$vux.alert, `地址扫描失败${JSON.stringify(r)}`);
              }
            });
          });
        } else {
          self.utils.myAlert(self.$vux.alert, `获取微信签名失败 ${res.code}`);
        }
      })
    },

    sendGamegold() {
      if (this.checkSend() == false) {
        return;
      }
      this.$router.push({name: 'SendConfirm', params: {
        address: this.address,
        amount: this.number,
        fee: 0,
      }});
    },
    checkSend() {
      const confirmed = this.userBase.confirmed;
      let sendGold = !!this.number ? this.number : 0;
      if (this.address == "") {
        this.utils.myAlert(this.$vux.alert, "请输入地址");
        return false;
      } else if (this.utils.checkAddr(this.address) == false) {
        this.utils.myAlert(this.$vux.alert, "无效接收地址");
        return false;
      }
      if (sendGold == 0) {
        this.utils.myAlert(this.$vux.alert, "请输入发送游戏金数量");
        return false;
      } else if (sendGold > confirmed) {
        this.utils.myAlert(this.$vux.alert, "发送游戏金大于你当前可用总数");
        return false;
      }
      return true;
    }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
    }
  }
};
</script>

<style scoped lang="less">
.root {
  overflow-x: hidden;
  margin-left: 0px;
  margin-right: 0px;
}
.content {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 40px;
}
.underline {
  border-style: solid;
  border-color: rgb(230, 230, 230);
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>

