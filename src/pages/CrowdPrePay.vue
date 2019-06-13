// 选择回报，及支付的前一页
<template>
  <div class="root">
    <flexbox>
      <flexbox-item :span="12">
        <div style="height:6px;background-color:#f3f3f3"></div>
      </flexbox-item>
    </flexbox>

    
  </div>
</template>
<script>
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
      item: {},

    };
  },
  methods: {

  },
  created() {
    this.item = this.$route.params.item;

  }
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  margin-left: 0px;
  margin-right: 0px;
}
</style>
