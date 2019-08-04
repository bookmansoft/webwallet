<!-- 添加收货地址页面
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
      <flexbox :gutter="0">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10">
          <flexbox class="content underline">
            <flexbox-item :span="4">
              <div style="display:block">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
                >收货人</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="8">
              <div style="display:block;">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(189,189,189);"
                >填写收货人</span>
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox class="content underline">
            <flexbox-item :span="4">
              <div style="display:block">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
                >手机号</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="8">
              <div style="display:block;">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(189,189,189);"
                >填写手机号</span>
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox class="content underline">
            <flexbox-item :span="4">
              <div style="display:block">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
                >所在地市</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="8">
              <div style="display:block;">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(189,189,189);"
                >省/市</span>
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox class="content underline">
            <flexbox-item :span="4">
              <div style="display:block">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
                >详细地址</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="8">
              <div style="display:block;">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(189,189,189);"
                >请填写详细地址和门牌号</span>
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox class="content underline">
            <flexbox-item :span="4">
              <div style="display:block">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
                >邮政编码</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="8">
              <div style="display:block;">
                <span
                  style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(189,189,189);"
                >请填写邮政编码</span>
              </div>
            </flexbox-item>
          </flexbox>

        </flexbox-item>
        <flexbox-item :span="1"></flexbox-item>
      </flexbox>
      <!-- 内容区 -->
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
  methods: {},

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
  line-height: 60px
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
