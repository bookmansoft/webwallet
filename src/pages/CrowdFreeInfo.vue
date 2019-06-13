<template>
  <div>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:6px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px;margin-bottom:14px;">
      <flexbox-item :span="3">
        <div style="display:block;margin-left:21px;">
          <img
            :src="crowdFreeItem.icon_url"
            style="width:auto;height:auto;max-width:100%;max-height:100%"
          >
        </div>
      </flexbox-item>
      <flexbox-item :span="9">
        <div style="display:block;margin-left:21px;">
          <div>
            <span
              style="font-size:15px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >{{crowdFreeItem.cp_text}}</span>
          </div>
          <div style="height:17px"></div>
          <div>
            <span
              style="color: #888; font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';"
            >{{crowdFreeItem.provider}}</span>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:12px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top:14px">
      <flexbox-item :span="12">
        <div style="display:block;margin-left:21px">
          <span style="font-size:13px;font-family:'黑体','Heiti SC','Droidsansfallback';">当前交易价(游戏金)</span>
        </div>
      </flexbox-item>
    </flexbox>
    <div>
      <flexbox>
        <flexbox-item :span="5" style="padding:0.3rem;">
          <p>
            <span style="color:red; font-size:16px;">1100千克</span>
          </p>
        </flexbox-item>
        <flexbox-item>
          <p>
            <span style="color:red; font-size:13px;">↑ +100.000 (+10%)</span>
          </p>
        </flexbox-item>
      </flexbox>
      <p>
        <span>分时K线</span>
      </p>
    </div>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, TabItem, Group, Flexbox, FlexboxItem } from "vux";
import Navs from "@/components/Navs.vue";

export default {
  components: {
    Navs,
    Tab,
    XButton,
    TabItem,
    Group,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      msg: "众筹",
      crowdFreeItem: null
    };
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex);
    }
  },
  created() {
    this.crowdFreeItem = this.$route.params.item;
  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
