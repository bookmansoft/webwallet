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
          <span
            style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
          >接收人地址</span>
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-left:10px;" @click="wxScanCode">
            <img
              src="static/img/stock/send/scan.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%; "
            >
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
          placeholder="输入地址"
          v-model="address"
          required
          style="border-style: solid;border-width: 1px;border-color:#888888;width:80%;line-height:20px"
        ></x-textarea>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <span
            style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
          >发送金额（千克）</span>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="11">
        <x-input title="" required placeholder="请输入游戏金金额" style="border-style: solid;border-width: 1px;border-color:#888888;width:80%;line-height:20px"></x-input>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <span
            style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(154,154,154);"
          >可用余额</span>
          <span
            style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
          >100.123千克</span>
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

    <!-- <box gap="8px 8px">
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="接收地址">
        <x-textarea
          :rows="2"
          name="address"
          ref="address"
          placeholder="输入地址"
          v-model="address"
          required
        ></x-textarea>
      </group> -->
      <!-- <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <x-button @click.native="wxScanCode">扫描二维码</x-button>
      </group> -->
      <!-- <br>
      <group label-width="4em" label-margin-right="1.5em" label-align="right" title="游戏金(千克)">
        <x-input
          type="number"
          name="number"
          ref="number"
          placeholder="输入游戏金数量"
          v-model="number"
          required
        ></x-input>
      </group>
      <br>
      <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <x-button type="primary" @click.native="sendGamegold">发送</x-button>
      </group>
    </box> -->
    <!-- <balance ref="balance"></balance> -->
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
      number: ""
    };
  },
  methods: {
    onBack() {
      this.$router.push("/wallet");
    },
    getWxConfig() {
      const url = location.href.split("#")[0];
      let data = {
        func: "WechatConfig",
        control: "wechat",
        url: url,
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios
        .post(this.GLOBAL.apiUrl, data)
        .then(res => {
          console.log(res.data);
          this.$wechat.config(res.data.wxconfig);
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 调用摄像头
    wxScanCode() {
      let that = this;
      that.$wechat.scanQRCode({
        needResult: 1,
        scanType: ["qrCode", "barCode"],
        success: function(res) {
          console.log(res);
          let resultStr = res.resultStr;
          that.address = resultStr;
        },
        fail: function(res) {
          that.GLOBAL.myAlert(that.$vux.alert, "地址扫描失败");
        }
      });
    },
    sendGamegold() {
      if (true) {
        this.$router.push("/crowd/SendConfirm");
      }

      if (this.chenkSend() == false) {
        return;
      }
      let data = {
        func: "TxSend",
        control: "wallet",
        addr: this.address,
        amount: this.GLOBAL.gameGoldOrigin(this.number),
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log(res.data);
        let that = this;
        if (res.data.ret == null) {
          this.GLOBAL.myAlert(
            this.$vux.alert,
            "发送失败，请确认接收地址是否正确"
          );
        } else {
          this.GLOBAL.myAlert(this.$vux.alert, "发送成功", null, function() {
            that.$router.push("/wallet/detail");
          });
        }
      });
    },
    chenkSend() {
      const confirmed = this.$refs.balance.getConfirmed();
      let sendGold = !!this.number ? this.number : 0;
      if (this.address == "") {
        this.GLOBAL.myAlert(this.$vux.alert, "请输入地址");
        return false;
      } else if (this.GLOBAL.checkAddr(this.address) == false) {
        this.GLOBAL.myAlert(this.$vux.alert, "无效接收地址");
        return false;
      }
      if (sendGold == 0) {
        this.GLOBAL.myAlert(this.$vux.alert, "请输入发送游戏金数量");
        return false;
      } else if (sendGold > confirmed) {
        this.GLOBAL.myAlert(this.$vux.alert, "发送游戏金大于你当前可用总数");
        return false;
      }
      return true;
    }
  },
  created() {
    this.getWxConfig();
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

