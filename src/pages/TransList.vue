<template>
  <div class="root">
    <div style="background-color:white;">
      <flexbox class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <div style="display:block">
            <span
              style="font-size:18px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(26,26,26);"
            >明细</span>
          </div>
          <div style="display:block">
            <span
              style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(160,160,160);"
            >6月24日</span>
          </div>
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
    <div style="background-color:white;">
      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-right:10px">
            <img
              src="static/img/stock/translist/wait.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);"
            >正在接收</span>
          </div>
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);"
            >16:40:08</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div align="right" style="display:block">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(190,190,190);"
            >+300.000千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <div style="background-color:#f3f3f3">
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:6px;"></div>
          </flexbox-item>
        </flexbox>
      </div>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-right:10px">
            <img
              src="static/img/stock/translist/send.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(55,63,74);"
            >发送</span>
          </div>
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(55,63,74);"
            >15:32:01</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div align="right" style="display:block">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(55,63,74);"
            >+300.000千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <div style="background-color:#f3f3f3">
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:6px;"></div>
          </flexbox-item>
        </flexbox>
      </div>

      <flexbox :gutter="0" class="content">
        <flexbox-item :span="1">
        </flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-right:10px">
            <img
              src="static/img/stock/translist/receive.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%"
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:14px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,113,100);"
            >接收</span>
          </div>
          <div style="display:block;padding-left:10px">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(55,63,74);"
            >09:20:33</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="4">
          <div align="right" style="display:block">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(255,113,100);"
            >+300.000千克</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>

      <div style="background-color:#f3f3f3">
        <flexbox>
          <flexbox-item :span="12">
            <div style="height:6px;"></div>
          </flexbox-item>
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
  line-height: 25px;
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
