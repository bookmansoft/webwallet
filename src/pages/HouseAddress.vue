<!-- 收货地址管理页面
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
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-bottom:20px;padding-right:10px;">
            <img
              src="/static/img/stock/address/check.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%; "
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="8">
          <div style="display:block">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >王先生 18805004838</span>
          </div>
          <div style="display:block;margin-top:10px">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(147,147,147);"
            >北京市西城区金融街道北京市西城区金融街道前海西街17号</span>
          </div>
          <div style="display:block;margin-top:10px">
            <flexbox>
              <flexbox-item :span="6"></flexbox-item>
              <flexbox-item :span="3">
                <div
                  style="border-style:solid;border-color:rgb(180,180,180);border-width:1px;width:55px;text-align:center"
                ><img src="/static/img/stock/address/edit.png" style="vertical-align:middle;width:12px;height:12px"><span
                    style="margin-left:5px;font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';line-height:23px;color:rgb(148,148,148)"
                  >编辑</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="3">
                <div
                  style="border-style:solid;border-color:rgb(180,180,180);border-width:1px;width:55px;text-align:center"
                ><img src="/static/img/stock/address/delete.png" style="vertical-align:middle;width:12px;height:12px"><span
                    style="margin-left:5px;font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';line-height:23px;color:rgb(148,148,148)"
                  >删除</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </div>
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:3px;"></div>
        </flexbox-item>
      </flexbox>
    </div>

    <div style="background-color:white">
      <!-- 内容区 -->
      <flexbox class="content">
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="1">
          <div style="display:block;padding-bottom:20px;padding-right:10px;">
            <img
              src="/static/img/stock/address/uncheck.png"
              style="width:auto;height:auto;max-width:100%;max-height:100%; "
            >
          </div>
        </flexbox-item>
        <flexbox-item :span="8">
          <div style="display:block">
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';font-weight:bold;color:rgb(50,58,69);"
            >张三 18868899838</span>
          </div>
          <div style="display:block;margin-top:10px">
            <span
              style="font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';color:rgb(147,147,147);"
            >福建省福州市鼓楼区软件园A区30号楼5层</span>
          </div>
          <div style="display:block;margin-top:10px">
            <flexbox>
              <flexbox-item :span="6"></flexbox-item>
              <flexbox-item :span="3">
                <div
                  style="border-style:solid;border-color:rgb(180,180,180);border-width:1px;width:55px;text-align:center"
                ><img src="/static/img/stock/address/edit.png" style="vertical-align:middle;width:12px;height:12px"><span
                    style="margin-left:5px;font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';line-height:23px;color:rgb(148,148,148)"
                  >编辑</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="3">
                <div
                  style="border-style:solid;border-color:rgb(180,180,180);border-width:1px;width:55px;text-align:center"
                ><img src="/static/img/stock/address/delete.png" style="vertical-align:middle;width:12px;height:12px"><span
                    style="margin-left:5px;font-size:12px;font-family:'黑体','Heiti SC','Droidsansfallback';line-height:23px;color:rgb(148,148,148)"
                  >删除</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </flexbox-item>
        <flexbox-item :span="2"></flexbox-item>
      </flexbox>
    </div>
    <div style="background-color:#f3f3f3">
      <flexbox>
        <flexbox-item :span="12">
          <div style="height:3px;"></div>
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
    return {};
  },
  methods: {},

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
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
