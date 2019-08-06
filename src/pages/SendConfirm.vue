<!-- 游戏金发送确认界面
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
      <flexbox class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block">
            <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">本次发送</span>
          </div>
          <div style="display:block">
            <span style="font-size:22px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">{{sender.amount}}千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>

      <div style="background-color:#f3f3f3">
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:6px;"></div>
          </flexbox-item>
        </flexbox>
      </div>
      <flexbox class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);">本次手续费</span>
          </div>
          <div style="display:block">
            <span style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);">{{sender.fee}}千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>

      <div style="background-color:#f3f3f3">
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:6px;"></div>
          </flexbox-item>
        </flexbox>
      </div>

      <flexbox class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block">
            <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">发送到</span>
          </div>
          <div style="display:block">
            <span style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);">{{sender.address}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
        </flexbox-item>
      </flexbox>

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
            <x-button style="border-radius:20px;" type="warn" @click.native="sendGamegold">发送</x-button>
          </flexbox-item>
          <flexbox-item :span="2"></flexbox-item>
        </flexbox>
      </div>
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
      sender: {
        amount: 0,
        actAmount: 0,
        fee: 0,
        address: '',
      },
    };
  },
  methods: {
    sendGamegold() {
      this.remote.fetching({
        func: "TxSend",
        control: "wallet",
        addr: this.sender.address,
        amount: this.sender.actAmount,
      }).then(res => {
        let that = this;
        if (res.code != 0) {
          this.utils.myAlert(
            this.$vux.alert,
            "发送失败，请确认接收地址是否正确"
          );
        } else {
          this.utils.myAlert(this.$vux.alert, "发送成功", null, function() {
            that.$router.push("/wallet/detail");
          });
        }
      });
    }
  },

  created() {
    this.sender = {
      amount : this.$route.params.amount,
      actAmount: this.assistant.toAtom(this.$route.params.amount),
      fee: this.$route.params.fee,
      address: this.$route.params.address,
    };
  }
};
</script>

<style scoped>
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
  line-height: 35px;
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
