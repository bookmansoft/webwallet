<!-- 众筹支付成功页面
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
      <!-- 内容区 -->
      <flexbox class="content">
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding:2px">
            <img
              src="/static/img/stock/pay/buysuccess.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <div style="display:block;margin-left:5px;line-height:30px">
            <span
              style="font-size:21px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(255,113,100);"
            >支付成功！</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
      </flexbox>

      <flexbox style="margin-top:20px;margin-bottom:40px">
        <flexbox-item :span="4"></flexbox-item>
        <flexbox-item :span="4">
          <div align="ceter" style="display:block;padding:2px">
            <img
              src="/static/img/stock/pay/paysuccess.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="4"></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block;margin-left:10px;margin-right:10px">
            <span style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(163,163,163);">
              恭喜您获得一份神秘大礼，选择收货地址，我们会将神秘大礼送到您选择的地址。
            </span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <flexbox style="margin-top:40px">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block;margin-left:10px;margin-right:20px">
          <x-button
            style="border-radius:5px;background-color:rgb(255,113,101)"
            type="warn"
            @click.native="houseAddress()"
          >选择收货地址</x-button>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
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
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
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
    return {};
  },
  methods: {
    houseAddress() {
      this.$router.push({ name: "HouseAddress"});
    }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
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
.content {
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 60px;
  margin-bottom: 20px;
}
</style>
