<!-- 发送的红包页面
-->
<template>
  <div class="root">
    <PanelList :config="config" v-on:panel_item_click="onItemClick"></PanelList>
    <navs></navs>
  </div>
</template>

<script>
import Navs from "@/components/Navs.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'RspSend',
  components: {
    Navs,
    PanelList,
  },
  data: function() {
    return {
      config: {
        type: '2',          //面板样式
        title: '',   //面板标题
        store: 'rpsSend',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
    };
  },
  computed: {
  },
  methods: {
    onItemClick(item) {
      this.$router.push(`/redpackshared/receive/${item.id}`);
    },
  },
  created() {
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  background-color:white;margin-top:-8px
}
</style>
