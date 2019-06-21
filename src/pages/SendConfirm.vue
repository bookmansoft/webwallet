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
            <span
              style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >本次发送</span>
          </div>
          <div style="display:block">
            <span
              style="font-size:22px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >100.000千克</span>
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
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);"
            >本次手续费</span>
          </div>
          <div style="display:block">
            <span
              style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);"
            >0.002千克</span>
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
            <span
              style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >发送到</span>
          </div>
          <div style="display:block">
            <span
              style="font-size:16px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >tb001gEdQ32PWKKP01OTR32orsQ32gEdQ6</span>
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
    return {};
  },
  methods: {
    sendGamegold() {
      let index = parseInt(Math.random() * 2);
      if (index == 0) {
        this.$router.push("/crowd/SendSuccess");
      } else {
        this.$router.push("/crowd/SendFail");
      }
    }
  },

  created() {}
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
